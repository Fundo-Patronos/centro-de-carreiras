from __future__ import annotations
from typing import Optional
import jwt
import os
import datetime
from dotenv import load_dotenv

import bcrypt

from fastapi_mail import ConnectionConfig, MessageSchema, FastMail, MessageType
from pydantic import EmailStr


class Auth:
    # Assert that the class is a singleton
    _instance: Optional[Auth] = None

    def __new__(cls: type[Auth]) -> Auth:
        if cls._instance is None:
            cls._instance = super(Auth, cls).__new__(cls)

        return cls._instance

    JWT_TOKEN_EXPIRE_TIME_IN_MINUTES = 30

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

    def decode_jwt_token_to_email(self, token: str) -> EmailStr:
        payload = self.decode_jwt_token(token)
        data = payload.get("data")
        if data is None:
            raise jwt.InvalidTokenError("Token does not contain data")

        return data.get("email")

    def create_jwt_token(self, data: dict) -> str:
        return jwt.encode(data, self.jwt_key, algorithm="HS256")

    def decode_jwt_token(self, token: str) -> dict:
        return jwt.decode(token, self.jwt_key, algorithms=["HS256"])

    @staticmethod
    async def send_verification_email(email: EmailStr, token: str) -> None:
        load_dotenv()
        mail_username = os.getenv("MAIL_USERNAME", None)
        mail_password = os.getenv("MAIL_PASSWORD", None)
        mail_from = os.getenv("MAIL_FROM", None)
        mail_server = os.getenv("MAIL_SERVER", None)

        if (
            mail_username is None
            or mail_password is None
            or mail_from is None
            or mail_server is None
        ):
            raise ValueError(
                "MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM, or MAIL_SERVER environment variable is not set."
            )
        email_configuration = ConnectionConfig(
            MAIL_USERNAME=mail_username,
            MAIL_PASSWORD=mail_password,
            MAIL_FROM=mail_from,
            MAIL_PORT=587,
            MAIL_SERVER=mail_server,
            MAIL_STARTTLS=True,
            MAIL_SSL_TLS=False,
            USE_CREDENTIALS=True,
        )

        base_url = os.getenv(
            "FRONT_END_BASE_URL", None
        )  # Default to localhost if not set
        if base_url is None:
            raise ValueError(
                "FRONT_END_BASE_URL environment variable is not set."
            )

        verification_url = f"{base_url}/verify/{token}"
        message = MessageSchema(
            subject="Verificação de Email",
            recipients=[email],
            body=f"Verifique o seu email clicando no link: <a href='{verification_url}'>Verificar Email</a>",
            subtype=MessageType.html,
        )
        fm = FastMail(email_configuration)
        await fm.send_message(message)
