from abc import ABC
from pydantic import BaseModel, EmailStr


class User(BaseModel, ABC):
    id: int
    username: str
    name: str
    email: EmailStr
    encrypted_password: str
    linkedin: str
    description: str
    role: str
    tags: str
    graduation_year: int
    course: str
