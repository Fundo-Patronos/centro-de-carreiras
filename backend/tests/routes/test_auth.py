import pytest
from app.schemas.user import UserUpdateWebhook, UserVerificationUpdate
from app.utils.auth import Auth
from unittest.mock import AsyncMock


def create_send_email_mock(monkeypatch):
    mock = AsyncMock()

    monkeypatch.setattr(Auth, "send_verification_notification_email", mock)

    return mock


def create_payload(
    email: str, previous_is_verified: bool, is_verified: bool
) -> UserUpdateWebhook:
    return UserUpdateWebhook(
        data={
            "previous_rows": UserVerificationUpdate(
                email=email, is_verified=previous_is_verified
            ),
            "rows": UserVerificationUpdate(
                email=email, is_verified=is_verified
            ),
        }
    )


def test_notify_route_WHEN_user_was_not_verified_AND_is_verified(
    client, monkeypatch
):
    """
    Test that the notify route sends a verification email when the user was not
    verified and is now verified.
    """
    # Arrange
    email = "user@email.com"
    payload = create_payload(email, False, True)
    # Mocks the Auth.send_verification_notification_email method
    send_email_mock = create_send_email_mock(monkeypatch)
    # Act
    response = client.post("/notify", json=payload.model_dump())

    # Assert
    send_email_mock.assert_called_once()
    send_email_mock.assert_called_with(email)
    assert response.status_code == 204


@pytest.mark.parametrize(
    "previous_is_verified, is_verified",
    [(True, False), (False, False), (True, True)],
)
def test_notify_route_WHEN_email_is_not_sent(
    client, monkeypatch, previous_is_verified, is_verified
):
    """
    Test that the notify route does not send a verification email when the user
    was verified and is still verified.
    """
    # Arrange
    email = "user@email.com"
    payload = create_payload(email, previous_is_verified, is_verified)

    # Mocks the Auth.send_verification_notification_email method
    send_email_mock = create_send_email_mock(monkeypatch)

    # Act
    response = client.post("/notify", json=payload.model_dump())

    # Assert
    send_email_mock.assert_not_called()
    assert response.status_code == 204
