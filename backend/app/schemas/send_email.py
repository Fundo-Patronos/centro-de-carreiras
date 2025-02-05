from pydantic import BaseModel, EmailStr


class SendEmailRequest(BaseModel):
    email: EmailStr
    subject: str
    body: str
    copy_emails: list[EmailStr] = []

class SendOpportunityEmailRequest(SendEmailRequest):
    email: EmailStr
    subject: str
    body: str
    copy_emails: list[EmailStr] = []
    opportunity_id: int
    file_name: str
    file_base64: str
