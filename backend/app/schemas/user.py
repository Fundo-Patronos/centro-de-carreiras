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
    is_verified: bool = False


class UserCreateRequest(UserCreate):
    is_domain_valid: bool = False


class UserResponse(BaseModel):
    username: str
    email: EmailStr
    email_sent: bool


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserLoginResponse(BaseModel):
    username: str
    email: EmailStr
    token: str
    refresh_token: str


class UserVerifyRequest(BaseModel):
    token: str


class UserChangePasswordRequest(BaseModel):
    new_password: str
