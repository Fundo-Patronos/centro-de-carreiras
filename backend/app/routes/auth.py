from fastapi import APIRouter, Depends, HTTPException, status
from app.database import get_users_table
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.schemas.error import ErrorResponse
from app.utils.auth import Auth

router = APIRouter()


@router.post(
    "/signup",
    response_model=UserResponse,
    responses={
        409: {
            "model": ErrorResponse,
            "description": "Conflict - Email already in use",
        }
    },
    summary="User Signup",
    description=(
        "Create a new user account. This endpoint registers a user by accepting "
        "an email and password, hashes the password, generates a JWT token for email "
        "verification, and sends a verification email to the user. If the email is "
        "already in use, it returns a conflict status."
    ),
)
async def signup(user: UserCreate, users_table = Depends(get_users_table)):
    auth = Auth()
    # Check if user already exists
    try:
        existing_user = users_table.get_user_by_email(user.email)
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Email already in use by {existing_user.username}",
        )
    except ValueError:
        pass

    # Hash the password
    user.password = auth.get_password_hash(user.password)

    # users_table.create_user(User(**user.model_dump()))
    print(User(**user.model_dump()))

    # Generate a token for email verification
    token = auth.create_jwt_token_from_email(user.email)

    # Send email verification
    await Auth.send_verification_email(user.email, token)

    return {
        "email": user.email,
        "username": user.username,
        "is_verified": False,
    }
