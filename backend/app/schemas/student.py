from typing import Optional
from pydantic import BaseModel, EmailStr


class StudentCreate(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str


class StudentUpdate(BaseModel):
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class StudentRead(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str

    model_config = {"from_attributes": True}
