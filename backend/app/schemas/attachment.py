from pydantic import BaseModel


class AttachmentCreate(BaseModel):
    unique_id: str
    attachment: list[dict[str, str]]

