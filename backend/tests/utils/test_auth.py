import datetime
import jwt
import pytest
import requests
from app.utils.auth import Auth
from unittest.mock import Mock


def test_auth_is_singleton():
    auth1 = Auth()
    auth2 = Auth()
    assert auth1 is auth2


def test_get_password_hash():
    auth = Auth()
    password = "password"
    hashed_password = auth.get_password_hash(password)
    assert auth.does_password_match(password, hashed_password)


def test_jwt_token():
    auth = Auth()
    email = "test@test.com"

    token = auth.create_jwt_token_from_email(email)
    assert email == auth.decode_jwt_token_to_email(token)


@pytest.mark.parametrize(
    "env_var_name",
    [
        "FRONT_END_BASE_URL",
        "VERIFICATION_EMAIL_WEBHOOK_URL",
        "JWT_KEY",
    ],
)
def test_raise_value_error_WHEN_env_var_is_not_set(env_var_name, monkeypatch):
    monkeypatch.delenv(env_var_name, raising=False)
    with pytest.raises(
        ValueError, match=f"{env_var_name} environment variable is not set."
    ):
        Auth()


def test_jwt_token_expiration(monkeypatch):
    original_date_time = datetime.datetime

    class MockDateTime:
        @classmethod
        def now(cls, time_zone=None):
            return original_date_time.now(time_zone) - datetime.timedelta(
                minutes=Auth.JWT_TOKEN_EXPIRE_TIME_IN_MINUTES + 1
            )

    monkeypatch.setattr(datetime, "datetime", MockDateTime)

    # Call the function and assert that the mocked time is returned
    auth = Auth()
    email = "test@test.com"
    token = auth.create_jwt_token_from_email(email)
    with pytest.raises(jwt.ExpiredSignatureError):
        auth.decode_jwt_token(token)


def test_jwt_invalid_token():
    auth = Auth()
    token = auth.create_jwt_token({"email": "email"})
    with pytest.raises(jwt.InvalidTokenError):
        auth.decode_jwt_token_to_email(token)


def test_jwt_refresh_token_expiration(monkeypatch):
    original_date_time = datetime.datetime

    class MockDateTime:
        @classmethod
        def now(cls, time_zone=None):
            return original_date_time.now(time_zone) - datetime.timedelta(
                days=Auth.REFRESH_TOKEN_EXPIRE_TIME_IN_DAYS + 1
            )

    monkeypatch.setattr(datetime, "datetime", MockDateTime)

    auth = Auth()
    email = "test@test.com"
    token = auth.create_refresh_token_from_email(email)
    with pytest.raises(jwt.ExpiredSignatureError):
        auth.decode_jwt_refresh_token_to_email(token)


def test_jwt_refresh_token_type():
    auth = Auth()
    email = "test@test.com"

    token = auth.create_jwt_token_from_email(email)

    with pytest.raises(
        jwt.InvalidTokenError, match="Token is not a refresh token"
    ):
        auth.decode_jwt_refresh_token_to_email(token)


def test_jwt_password_reset_token_expiration(monkeypatch):
    original_date_time = datetime.datetime

    class MockDateTime:
        @classmethod
        def now(cls, time_zone=None):
            return original_date_time.now(time_zone) - datetime.timedelta(
                days=Auth.PASSWORD_RESET_TOKEN_EXPIRE_TIME_IN_MINUTES + 1
            )

    monkeypatch.setattr(datetime, "datetime", MockDateTime)

    auth = Auth()
    email = "test@test.com"
    token = auth.create_refresh_token_from_email(email)
    with pytest.raises(jwt.ExpiredSignatureError):
        auth.decode_jwt_refresh_token_to_email(token) 

def test_jwt_password_reset_token_type():
    auth = Auth()
    email = "test@test.com"

    token = auth.create_jwt_token_from_email(email)

    with pytest.raises(
        jwt.InvalidTokenError, match="Token is not a password reset token"
    ):
        auth.decode_jwt_refresh_token_to_email(token)
    

@pytest.mark.parametrize(
    "response_code",
    [
        200,
        201,
    ],
)
def test_send_verification_email(response_code, monkeypatch):
    # Arrange
    mock_post = Mock()

    mock_post.return_value.status_code = response_code

    monkeypatch.setattr(requests, "post", mock_post)

    auth = Auth()
    email = "email@email.com"
    full_name = "Test User"
    token = auth.create_refresh_token_from_email(email)

    # Act
    if response_code == 200:
        auth.send_verification_email(email, full_name, token)
    else:
        with pytest.raises(
            RuntimeError, match="Failed to send email"
        ):
            auth.send_verification_email(email, full_name, token)

    # Assert
    body = f"""Olá, Test!

Bem-vindo ao Centro de Carreiras! Para finalizar seu cadastro, clique no link: <a href="{auth.base_url}/verify/{token}">Verificar Email</a>."""
    mock_post.assert_called_once_with(
        auth.webhook_url,
        json={
            "email": email,
            "subject": "Verificação de Email",
            "body": body,
        },
    )
