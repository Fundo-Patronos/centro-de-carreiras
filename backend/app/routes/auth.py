from fastapi import APIRouter, HTTPException, Depends, status
from google.oauth2 import id_token
from google.auth.transport import requests
from app.schemas.auth import AuthResponse, TokenSchema
from app.schemas.user import User
from datetime import datetime, timedelta
import os
import jwt


router = APIRouter()

CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
JWT_KEY = os.getenv('JWT_KEY')

@router.post(
    "/auth/google-login",
    response_model=AuthResponse,
    tags=["Authentication"],
    summary="Login com Google",
    description="Realiza login de estudantes usando o SSO do Google.",
)
async def google_login(body: TokenSchema):

    try:
        idinfo = id_token.verify_oauth2_token(body.token, requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise HTTPException(status_code=400, detail="Token inválido")

        userid = idinfo['sub']
        username = idinfo.get('name', 'Usuário Desconhecido')

        return AuthResponse(
            access_token=create_session_token(userid),
            user=User(
                id=userid,
                name=username
            )
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail="Token inválido ou expirado")



def create_session_token(user_id: str) -> str:

    expiration = datetime.now() + timedelta(hours=1)  # Token válido por 1 hora
    token_data = {
        "sub": user_id,
        "exp": expiration,
    }
    session_token = jwt.encode(token_data, str(JWT_KEY), algorithm="HS256")
    return session_token