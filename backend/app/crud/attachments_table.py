import os
from app.database.database import Database
from app.models.attachment import Attachment
from app.schemas.attachment import AttachmentCreate


class AttachmentsTable:
    def __init__(self, db: Database):
        optional_table_id = os.getenv("ATTACHMENTS_TABLE_ID")
        if optional_table_id is None:
            raise ValueError("ATTACHMENTS_TABLE_ID environment variable is not set.")
        self.table_id = optional_table_id
        self.db = db

    def get_attachment_real_id(self, unique_id: str) -> str:
        params = {"unique_id": unique_id}
        return self.db.read_one(table_id=self.table_id, params=params)["id"]

    def create_attachment(self, attachment: AttachmentCreate) -> Attachment:
        return Attachment(
            **self.db.create(
                table_id=self.table_id, items=[attachment]
            )[0]
        )

    def delete_attachment(self, auto_generated_id: str) -> None:
        self.db.delete(table_id=self.table_id, item_id=auto_generated_id)
