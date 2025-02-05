from __future__ import annotations
import os
from typing import Optional
from pydantic import EmailStr
import requests


class EmailSender:
    # Assert that the class is a singleton
    _instance: Optional[EmailSender] = None

    def __new__(cls: type[EmailSender]) -> EmailSender:
        if cls._instance is None:
            cls._instance = super(EmailSender, cls).__new__(cls)

        return cls._instance

    def __init__(self):
        send_email_webhook_url = os.getenv("VERIFICATION_EMAIL_WEBHOOK_URL", None)

        if send_email_webhook_url is None:
            raise ValueError(
                "VERIFICATION_EMAIL_WEBHOOK_URL environment variable is not set."
            )

        send_opportunity_email_webhook_url = os.getenv(
            "OPPORTUNITY_EMAIL_WEBHOOK_URL", None
        )

        if send_opportunity_email_webhook_url is None:
            raise ValueError(
                "OPPORTUNITY_EMAIL_WEBHOOK_URL environment variable is not set."
            )

        self.webhook_url = send_email_webhook_url
        self.opportunity_email_webhook_url = send_opportunity_email_webhook_url

    def send_email(
        self,
        email: EmailStr,
        subject: str,
        body: str,
        copy_emails: list[EmailStr] = [],
    ) -> None:
        copy_emails_str = ",".join(copy_emails)
        automation_payload = {
            "email": email,
            "subject": subject,
            "body": body,
            "copy_emails": copy_emails_str,
        }

        response = requests.post(self.webhook_url, json=automation_payload)

        if response.status_code != 200:
            raise RuntimeError("Failed to send email")

    def send_opportunity_email(
        self,
        email: EmailStr,
        subject: str,
        body: str,
        copy_email: EmailStr,
        opportunity_id: str,
    ) -> None:
        unique_id = opportunity_id + ":" + copy_email
        automation_payload = {
            "email": email,
            "subject": subject,
            "body": body,
            "copy_email": copy_email,
            "unique_id": unique_id,
        }

        response = requests.post(
            self.opportunity_email_webhook_url, json=automation_payload
        )

        if response.status_code != 200:
            raise RuntimeError("Failed to send opportunity email")

