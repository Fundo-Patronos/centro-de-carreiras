import os
from fastapi import FastAPI
from dotenv import load_dotenv
from app.routes.auth import router as auth_router
from app.routes.mentoring import router as mentoring_router
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

front_end_url = os.getenv("FRONT_END_BASE_URL", None)

if front_end_url is None:
    raise ValueError("FRONT_END_BASE_URL is not set")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite seu front-end em localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

app.include_router(mentoring_router)
app.include_router(auth_router)
