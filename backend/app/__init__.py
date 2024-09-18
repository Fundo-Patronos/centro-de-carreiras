from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

from app.routes.auth import router as auth_router

app.include_router(auth_router)
