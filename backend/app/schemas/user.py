from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    name: str
    email: EmailStr
    password: str
    linkedin: str
    graduation_year: int
    course: str

class UserResponse(BaseModel):
    username: str
    email: EmailStr
    is_verified: bool
