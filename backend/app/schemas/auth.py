from pydantic import BaseModel
from .user import User


class AuthResponse(BaseModel):
    access_token: str
    user: User

class TokenSchema(BaseModel):
    token: str