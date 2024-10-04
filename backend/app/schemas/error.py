from pydantic import BaseModel


class ErrorResponse(BaseModel):
    detail: str


class SignUpConflictErrorResponse(BaseModel):
    email_in_use: bool = False
    username_in_use: bool = False
