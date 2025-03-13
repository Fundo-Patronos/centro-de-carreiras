from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
import jwt
from app.crud.users_table import UsersTable
from app.dependencies import get_users_table
from app.schemas.user import (
    UserCreate,
    UserCreateRequest,
    UserResponse,
    UserLogin,
    UserLoginResponse,
    UserVerifyRequest,
    UserChangePasswordRequest,
    UserForgotPasswordRequest,
)
from app.schemas.error import DefaultErrorResponse, SignUpConflictErrorResponse
from app.utils.auth import Auth
from app.exceptions import DataNotFound
from fastapi import Response
from fastapi import Header

router = APIRouter()


@router.post(
    "/signup",
    response_model=UserResponse,
    responses={
        409: {
            "model": SignUpConflictErrorResponse,
            "description": "Conflict - Email already in use",
        },
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to register user",
        },
        502: {
            "model": DefaultErrorResponse,
            "description": "Bad Gateway - Failed to send verification email",
        },
    },
    summary="User Signup",
    description=(
        "Create a new user account. This endpoint registers a user by accepting "
        "an email and password, hashes the password, generates a JWT token for email "
        "verification, and sends a verification email to the user. If the email is "
        "already in use, it returns a conflict status."
    ),
)
async def signup(
    user: UserCreateRequest, users_table: UsersTable = Depends(get_users_table)
):
    auth = Auth()

    email_in_use = False

    # Check if user already exists
    try:
        users_table.get_user(user.email)
        email_in_use = True
    except DataNotFound:
        pass
    except RuntimeError as e:
        print("Runtime error:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    if email_in_use:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content=SignUpConflictErrorResponse(
                email_in_use=email_in_use
            ).model_dump(),
        )

    # Generate a token for email verification
    token = auth.create_jwt_token_from_email(user.email)

    user.password = auth.get_password_hash(user.password)

    users_table.create_user(
        UserCreate(
            **{
                key: value
                for key, value in user.model_dump().items()
                if key != "is_domain_valid"
            }
        )
    )

    if not user.is_domain_valid:
        return {
            "email": user.email,
            "email_sent": False,
        }

    # Send email verification
    try:
        auth.send_verification_email(user.email, user.name, token)
    except Exception as e:
        print("Failed to send email. Message:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send verification email. ",
        )

    return {
        "email": user.email,
        "email_sent": True,
    }


@router.post(
    "/verify",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        408: {
            "model": DefaultErrorResponse,
            "description": "Request Timeout - Token has expired",
        },
        406: {
            "model": DefaultErrorResponse,
            "description": "Not Acceptable - Invalid token",
        },
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to verify user",
        },
    },
    summary="User Verification",
    description=(
        "Verify a user account. This endpoint accepts a JWT token and verifies the "
        "user account associated with the email in the token. It returns the email"
        "and a boolean indicating if the user is verified."
    ),
)
async def verify(
    token_request: UserVerifyRequest,
    users_table: UsersTable = Depends(get_users_table),
):
    token = token_request.token
    print("token received:", token)
    auth = Auth()
    try:
        email = auth.decode_jwt_token_to_email(token)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT,
            detail="Token has expired",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Invalid token",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    try:
        user = users_table.get_user(email)
        user.is_verified = True
        users_table.update_user(user)
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
    except DataNotFound as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.post(
    "/signin",
    response_model=UserLoginResponse,
    responses={
        401: {
            "model": DefaultErrorResponse,
            "description": "Unauthorized - Invalid password",
        },
        406: {
            "model": DefaultErrorResponse,
            "description": "Not Acceptable - Invalid email",
        },
        425: {
            "model": DefaultErrorResponse,
            "description": "Too Early - Unverified user",
        },
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to login user",
        },
    },
    summary="User Signin",
    description=(
        "Authenticate an existing user. This endpoint checks the user's credentials "
        "by verifying the email and password, and returns a JWT token if the authentication is "
        "successful. If the credentials are invalid, it returns an unauthorized status."
    ),
)
async def signin(
    user: UserLogin,
    users_table: UsersTable = Depends(get_users_table),
    response: Response = Response(),
):
    auth = Auth()

    try:
        existing_user = users_table.get_user(user.email)

    except DataNotFound:
        print("Got email not present in the database")
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Invalid email",
        )
    except RuntimeError as e:
        print("Error occurred when trying to get email: " + str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    if not auth.does_password_match(user.password, existing_user.password):
        print("Invalid password received")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
        )

    if not existing_user.is_verified:
        print("Unverified user received")
        raise HTTPException(
            status_code=status.HTTP_425_TOO_EARLY, detail="Unverified user"
        )

    token = auth.create_jwt_token_from_email(user.email)
    refresh_token = auth.create_refresh_token_from_email(user.email)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=Auth.REFRESH_TOKEN_EXPIRE_TIME_IN_DAYS * 3600 * 24,
    )

    # Track how many times the user is accessing the platform:
    existing_user.total_sign_ins += 1
    users_table.update_user(existing_user)

    return {
        "user_name": existing_user.name,
        "email": existing_user.email,
        "token": token,
    }


@router.get(
    "/refresh-token/{refresh_token}",
    status_code=status.HTTP_200_OK,
    response_model=UserLoginResponse,
    responses={
        401: {
            "model": DefaultErrorResponse,
            "description": "Unauthorized - Invalid or expired refresh token",
        },
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to refresh token",
        },
    },
    summary="Refresh JWT Token",
    description=(
        "This endpoint allows the user to refresh their JWT access token using a valid refresh token. "
        "If the refresh token is valid, a new access token is generated and returned."
    ),
)
async def refresh_token(
    refresh_token: str, users_table: UsersTable = Depends(get_users_table)
):
    auth = Auth()

    try:
        email = auth.decode_jwt_refresh_token_to_email(refresh_token)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token has expired",
        )
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    try:
        user = users_table.get_user(email)
    except DataNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    new_access_token = auth.create_jwt_token_from_email(user.email)
    return {
        "email": user.email,
        "token": new_access_token,
    }


@router.post(
    "/resend-verification-email",
    responses={
        404: {
            "model": DefaultErrorResponse,
            "description": "Not Found - Email does not exist",
        },
        406: {
            "model": DefaultErrorResponse,
            "description": "Not Acceptable - Email already verified",
        },
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to send reset token",
        },
    },
    summary="Send Verification Email",
    description="Allows a user to request a verification email to authenticate the account if not verified yet.",
)
async def resend_verification_email(
    request_data: UserForgotPasswordRequest,
    users_table: UsersTable = Depends(get_users_table),
):
    auth = Auth()

    try:
        user = users_table.get_user(request_data.user_email)
    except DataNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email not found",
        )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    if user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Email already verified. ",
        )

    try:
        token = auth.create_jwt_token_from_email(user.email)
        auth.send_verification_email(user.email, user.name, token)
    except Exception as e:
        print("Failed to send email. Message:", str(e))

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send verification email. ",
        )

    return {
        "message": "Email verification token sent successfully to your email."
    }


@router.post(
    "/forgot-password",
    responses={
        404: {
            "model": DefaultErrorResponse,
            "description": "Not Found - Email does not exist",
        },
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to send reset token",
        },
    },
    summary="Forgot Password",
    description="Allows a user to request a password reset by sending a reset token to their email.",
)
async def forgot_password(
    request_data: UserForgotPasswordRequest,
    users_table: UsersTable = Depends(get_users_table),
):
    auth = Auth()

    try:
        user = users_table.get_user(request_data.user_email)
    except DataNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email not found",
        )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    try:
        auth.send_password_reset_email(email=user.email, user_name=user.name)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send reset email. Message: " + str(e),
        )

    return {"message": "Password reset token sent successfully to your email."}


@router.post(
    "/reset-password",
    responses={
        404: {
            "model": DefaultErrorResponse,
            "description": "Not Found - Invalid or expired token",
        },
        400: {
            "model": DefaultErrorResponse,
            "description": "Bad Request - Invalid new password",
        },
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to reset password",
        },
    },
    summary="Reset Password",
    description="Allows the user to reset their password using a valid reset token.",
)
async def reset_password(
    request_data: UserChangePasswordRequest,
    authorization: str = Header(None),
    users_table: UsersTable = Depends(get_users_table),
):
    auth = Auth()
    token = authorization.split(" ")[1]

    try:
        email = auth.decode_jwt_token_to_email(token)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT,
            detail="Reset token has expired",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail="Invalid reset token",
        )

    try:
        user = users_table.get_user(email)
    except DataNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    # Hash the new password
    user.password = auth.get_password_hash(request_data.new_password)

    # Update the user's password
    try:
        users_table.update_user(user)
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to reset password",
        )

    return {"message": "Your password was changed successfuly."}


@router.post(
    "/logout",
    summary="User Logout",
    responses={
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to remove Refresh Token",
        },
    },
    description="Logout the user and remove the refresh token cookie.",
    status_code=status.HTTP_200_OK,
)
async def logout(response: Response):
    try:
        response.delete_cookie("refresh_token")
        return {"message": "User logged out successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}",
        )
