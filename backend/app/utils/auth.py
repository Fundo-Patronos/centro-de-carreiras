from __future__ import annotations
from typing import Optional
import jwt
import os
import datetime
import requests
from urllib.parse import quote

import bcrypt

from pydantic import EmailStr

from app.utils.email_sender import EmailSender


class Auth:
    # Assert that the class is a singleton
    _instance: Optional[Auth] = None

    def __new__(cls: type[Auth]) -> Auth:
        if cls._instance is None:
            cls._instance = super(Auth, cls).__new__(cls)

        return cls._instance

    JWT_TOKEN_EXPIRE_TIME_IN_MINUTES = 30
    REFRESH_TOKEN_EXPIRE_TIME_IN_DAYS = 1
    PASSWORD_RESET_TOKEN_EXPIRE_TIME_IN_MINUTES = 5

    def __init__(self):
        optional_jwt_key = os.getenv("JWT_KEY", None)
        base_url = os.getenv("FRONT_END_BASE_URL", None)

        if optional_jwt_key is None:
            raise ValueError("JWT_KEY environment variable is not set.")

        if base_url is None:
            raise ValueError(
                "FRONT_END_BASE_URL environment variable is not set."
            )

        self.jwt_key = optional_jwt_key
        self.base_url = base_url
        self.email_sender = EmailSender()

    def get_password_hash(self, password: str) -> str:
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    def does_password_match(
        self, plain_password: str, hashed_password: str
    ) -> bool:
        return bcrypt.checkpw(
            plain_password.encode(), hashed_password.encode()
        )

    def create_jwt_token_from_email(self, email: EmailStr) -> str:
        payload = {
            "data": {
                "email": email,
            },
            "exp": datetime.datetime.now(datetime.timezone.utc)
            + datetime.timedelta(
                minutes=Auth.JWT_TOKEN_EXPIRE_TIME_IN_MINUTES
            ),
        }
        return self.create_jwt_token(payload)

    def create_refresh_token_from_email(self, email: EmailStr) -> str:
        payload = {
            "data": {
                "email": email,
                "type": "refresh",
            },
            "exp": datetime.datetime.now(datetime.timezone.utc)
            + datetime.timedelta(days=Auth.REFRESH_TOKEN_EXPIRE_TIME_IN_DAYS),
        }
        return self.create_jwt_token(payload)

    def create_password_reset_token_from_email(self, email: EmailStr):
        payload = {
            "data": {
                "email": email,
                "type": "password_reset",
            },
            "exp": datetime.datetime.now(datetime.timezone.utc)
            + datetime.timedelta(
                minutes=Auth.PASSWORD_RESET_TOKEN_EXPIRE_TIME_IN_MINUTES
            ),
        }
        return self.create_jwt_token(payload)

    def decode_jwt_token_to_email(self, token: str) -> EmailStr:
        payload = self.decode_jwt_token(token)
        data = payload.get("data")
        if data is None:
            raise jwt.InvalidTokenError("Token does not contain data")

        return data.get("email")

    def decode_jwt_refresh_token_to_email(
        self, refresh_token: str
    ) -> EmailStr:
        payload = self.decode_jwt_token(refresh_token)
        data = payload.get("data")
        if data is None:
            raise jwt.InvalidTokenError("Token does not contain data")

        if data.get("type") != "refresh":
            raise jwt.InvalidTokenError("Token is not a refresh token")

        return data.get("email")

    def decode_jwt_password_reset_token_to_email(
        self, refresh_token: str
    ) -> EmailStr:
        payload = self.decode_jwt_token(refresh_token)
        data = payload.get("data")
        if data is None:
            raise jwt.InvalidTokenError("Token does not contain data")

        if data.get("type") != "password_reset":
            raise jwt.InvalidTokenError("Token is not a password reset token")

        return data.get("email")

    def create_jwt_token(self, data: dict) -> str:
        return jwt.encode(data, self.jwt_key, algorithm="HS256")

    def decode_jwt_token(self, token: str) -> dict:
        return jwt.decode(token, self.jwt_key, algorithms=["HS256"])

    def send_verification_email(
        self, email: EmailStr, full_name: str, token: str
    ) -> None:
        user_name = full_name.split()[0]

        verify_url = f"{self.base_url}/verify/{quote(token)}"

        subject = "Verificação de Email"

        body = f"""Olá, {user_name}!

Bem-vindo ao Centro de Carreiras! Para finalizar seu cadastro, clique no link: <a href="{verify_url}">Verificar Email</a>."""

        self.email_sender.send_email(email, subject, body)

    def send_password_reset_email(
        self, email: EmailStr, user_name: str
    ) -> None:
        password_reset_token = self.create_password_reset_token_from_email(
            email
        )

        encoded_token = quote(password_reset_token)

        reset_password_url = f"{self.base_url}/reset-password/{encoded_token}"

        subject = "Esqueci minha senha"

        body = f"""Olá, {user_name}!

Recebemos uma solicitação para redefinir sua senha. Se você fez essa solicitação, clique <a href="{reset_password_url}">aqui</a> para criar uma nova senha."""

        self.email_sender.send_email(email, subject, body)
