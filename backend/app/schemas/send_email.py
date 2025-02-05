from pydantic import BaseModel, EmailStr


class SendEmailRequest(BaseModel):
    email: EmailStr
    subject: str
    body: str
    copy_emails: list[EmailStr] = []

class SendOpportunityEmailRequest(BaseModel):
    email: EmailStr
    subject: str
    body: str
    copy_email: EmailStr
    opportunity_id: str
    file_base64: str
