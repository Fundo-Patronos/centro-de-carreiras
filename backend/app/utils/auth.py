from __future__ import annotations
from typing import Optional
import jwt
import os
import datetime

from passlib.context import CryptContext
from pydantic import EmailStr


class Auth:
    # Assert that the class is a singleton
    _instance: Optional[Auth] = None

    def __new__(cls: type[Auth]) -> Auth:
        if cls._instance is None:
            cls._instance = super(Auth, cls).__new__(cls)

        return cls._instance

    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.jwt_key = os.getenv("JWT_KEY", None)

    def get_password_hash(self, password: str) -> str:
        return self.pwd_context.hash(password)

    def does_password_match(
        self, plain_password: str, hashed_password: str
    ) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)

    def create_jwt_token_from_email(self, email: EmailStr) -> str:
        payload = {
            "data": {"email": email},
            "exp": datetime.datetime.now()
            + datetime.timedelta(minutes=30), # Token expires in 30 minutes
        }
        return self.create_jwt_token(payload)

    def create_jwt_token(self, data: dict) -> str:
        return jwt.encode(data, self.jwt_key, algorithm="HS256")

    def decode_jwt_token(self, token: str) -> dict:
        return jwt.decode(token, self.jwt_key, algorithms=["HS256"])
