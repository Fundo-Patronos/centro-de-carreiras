from abc import ABC
from pydantic import BaseModel, EmailStr


class User(BaseModel, ABC):
    id: int
    username: str
    name: str
    email: EmailStr
    password: str
    linkedin: str
    graduation_year: int
    course: str

    # Optional fields
    role: str = "STUDENT"
    is_verified: bool = False
