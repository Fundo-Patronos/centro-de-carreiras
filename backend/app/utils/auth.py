from __future__ import annotations
from typing import Optional
import jwt
import os

import bcrypt
from pydantic import EmailStr


class Auth:
    # Assert that the class is a singleton
    _instance: Optional[Auth] = None

    def __new__(cls: type[Auth]) -> Auth:
        if cls._instance is None:
            cls._instance = super(Auth, cls).__new__(cls)

        return cls._instance

    def __init__(self):
        optional_jwt_key = os.getenv("JWT_KEY", None)
        if optional_jwt_key is None:
            raise ValueError("JWT_KEY environment variable is not set.")
        self.jwt_key = optional_jwt_key

    def get_password_hash(self, password: str) -> str:
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    def does_password_match(
        self, plain_password: str, hashed_password: str
    ) -> bool:
        return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

    def create_jwt_token_from_email(self, email: EmailStr) -> str:
        payload = {
            "email": email,
        }
        return self.create_jwt_token(payload)

    def create_jwt_token(self, data: dict) -> str:
        return jwt.encode(data, self.jwt_key, algorithm="HS256")

    def decode_jwt_token(self, token: str) -> dict:
        return jwt.decode(token, self.jwt_key, algorithms=["HS256"])
