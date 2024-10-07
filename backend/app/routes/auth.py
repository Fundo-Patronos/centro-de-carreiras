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
)
from app.schemas.error import DefaultErrorResponse, SignUpConflictErrorResponse
from app.utils.auth import Auth
from app.exceptions import DataNotFound

router = APIRouter()


@router.post(
    "/signup",
    response_model=UserResponse,
    responses={
        409: {
            "model": SignUpConflictErrorResponse,
            "description": "Conflict - Email or username already in use",
        },
        500: {
            "model": DefaultErrorResponse,
            "description": "Internal Server Error - Failed to register user",
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
    # Check if user already exists
    try:
        users_table.get_user_by_email(user.email)
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content=SignUpConflictErrorResponse(
                email_in_use=True
            ).model_dump(),
        )
    except DataNotFound:
        pass
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    try:
        users_table.get_user(user.username)
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content=SignUpConflictErrorResponse(
                username_in_use=True
            ).model_dump(),
        )
    except DataNotFound:
        pass
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    # Hash the password
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

    # Generate a token for email verification
    token = auth.create_jwt_token_from_email(user.email)

    if not user.is_domain_valid:
        return {
            "email": user.email,
            "username": user.username,
            "email_sent": False,
        }

    # Send email verification
    try:
        auth.send_verification_email(user.email, user.name, token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send email. Message: " + str(e),
        )

    return {
        "email": user.email,
        "username": user.username,
        "email_sent": True,
    }


@router.post(
    "/verify/",
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
        "user account associated with the email in the token. It returns the email, "
        "username, and a boolean indicating if the user is verified."
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
        user = users_table.get_user_by_email(email)
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
            "description": "Unauthorized - Invalid email or password",
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
    user: UserLogin, users_table: UsersTable = Depends(get_users_table)
):
    auth = Auth()

    try:
        existing_user = users_table.get_user_by_email(user.email)

    except DataNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid email",
        )
    except RuntimeError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

    if not auth.does_password_match(user.password, existing_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
        )

    token = auth.create_jwt_token_from_email(user.email)
    refresh_token = auth.create_refresh_token_from_email(user.email)

    return {
        "email": existing_user.email,
        "username": existing_user.username,
        "token": token,
        "refresh_token": refresh_token,
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
        user = users_table.get_user_by_email(email)
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
        "username": user.username,
        "token": new_access_token,
        "refresh_token": refresh_token,
    }
