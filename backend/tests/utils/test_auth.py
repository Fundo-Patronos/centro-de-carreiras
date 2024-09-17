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
    decoded_token = auth.decode_jwt_token(token)
    assert decoded_token["email"] == email

def test_raise_value_error_when_jwt_key_is_not_set(monkeypatch):
    monkeypatch.delenv("JWT_KEY", raising=False)
    with pytest.raises(ValueError):
        Auth()
