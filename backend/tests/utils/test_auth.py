import datetime
import jwt
import pytest
from app.utils.auth import Auth


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


def test_raise_value_error_when_jwt_key_is_not_set(monkeypatch):
    monkeypatch.delenv("JWT_KEY", raising=False)
    with pytest.raises(ValueError):
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

    with pytest.raises(jwt.InvalidTokenError, match="Token is not a refresh token"):
        auth.decode_jwt_refresh_token_to_email(token)
