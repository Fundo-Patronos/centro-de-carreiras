from abc import ABC
from typing import Optional
from pydantic import EmailStr

from app.models.abstract_item import Item


class User(Item, ABC):
    id: str
    name: str
    email: EmailStr
    password: str
    graduation_year: int
    course: str

    # Optional fields
    tags: Optional[str] = None
    linkedin: str = ""
    description: str = ""
    role: str = "STUDENT"
    is_verified: bool = False
