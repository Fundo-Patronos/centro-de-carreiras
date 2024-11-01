from abc import ABC
from typing import Optional
from pydantic import BaseModel, EmailStr


class User(BaseModel, ABC):
    id: str
    username: str
    name: str
    email: EmailStr
    password: str
    linkedin: str
    graduation_year: int
    course: str

    # Optional fields
    tags: Optional[str] = None
    description: Optional[str] = None
    role: str = "STUDENT"
    is_verified: bool = False
