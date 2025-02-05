from __future__ import annotations
import os
from typing import Optional
from google.cloud import storage
from datetime import datetime, timedelta, timezone
import hashlib
import base64

class CVBucketManager:
    # Make it a singleton
    _instance: Optional[CVBucketManager] = None

    def __new__(cls: type[CVBucketManager]) -> CVBucketManager:
        if cls._instance is None:
            cls._instance = super(CVBucketManager, cls).__new__(cls)

        return cls._instance

    def __init__(self):
        """
        Initializes the CVBucketManager.

        :param bucket_name: Name of the Google Cloud Storage bucket.
        :param expiration_minutes: Link expiration time in minutes.
        """
        bucket_name = os.getenv("CV_BUCKET_NAME", None)
        if bucket_name is None:
            raise ValueError("CV_BUCKET_NAME environment variable is not set.")

        self.bucket_name = bucket_name
        self.expiration_minutes = 5
        self.client = storage.Client()
        self.bucket = self.client.get_bucket(bucket_name)

    def save_cv(self, user_email: str, base64_content: str) -> None:
        """
        Saves a CV to the bucket, overriding any existing CV for the user.

        :param user_email: Unique identifier for the user.
        :param base64_content: Base64-encoded content of the CV file.
        """
        blob_name = self._generate_blob_name(user_email)
        blob = self.bucket.blob(blob_name)
        
        # Decode the Base64 content
        file_content = base64.b64decode(base64_content)
        blob.upload_from_string(file_content, content_type="application/pdf")
        print(f"Uploaded CV for user {user_email} to {blob_name}")

    def generate_one_time_link(self, user_email: str) -> str:
        """
        Generates a one-time-access link for the user's CV.

        :param user_email: Unique identifier for the user.
        :return: Signed URL for one-time access.
        """
        blob_name = self._generate_blob_name(user_email)
        blob = self.bucket.blob(blob_name)

        if not blob.exists():
            raise FileNotFoundError(f"CV for user {user_email} does not exist.")

        expiration_time = datetime.now(timezone.utc) + timedelta(minutes=self.expiration_minutes)
        url = blob.generate_signed_url(expiration=expiration_time)

        return url

    def configure_auto_delete(self, user_email: str, retention_days: int) -> None:
        """
        Configures auto-deletion of the CV after a certain retention period.

        :param user_email: Unique identifier for the user.
        :param retention_days: Number of days to retain the CV before automatic deletion.
        """
        blob_name = self._generate_blob_name(user_email)
        blob = self.bucket.blob(blob_name)

        if not blob.exists():
            raise FileNotFoundError(f"CV for user {user_email} does not exist.")

        self.bucket.lifecycle_rules = [
            {
                "action": {"type": "Delete"},
                "condition": {"age": retention_days}
            }
        ]
        self.bucket.patch()
        print(f"Configured auto-delete for CV of user {user_email} after {retention_days} days.")

    def _generate_blob_name(self, user_email: str) -> str:
        """
        Generates a unique blob name for the user's CV.

        :param user_email: Unique identifier for the user.
        :return: A hashed blob name.
        """
        return hashlib.sha256(user_email.encode()).hexdigest() + "/cv.pdf"
