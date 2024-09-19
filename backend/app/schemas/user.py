from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    name: str
    email: EmailStr
    password: str
    linkedin: str
    graduation_year: int
    course: str

class DefaultValuesUserCreate(UserCreate):
    role: str = "STUDENT"
    is_verified: str = "false"

class UserResponse(BaseModel):
    username: str
    email: EmailStr
    is_verified: str
