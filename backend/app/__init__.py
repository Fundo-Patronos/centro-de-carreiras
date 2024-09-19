from fastapi import FastAPI
from dotenv import load_dotenv
from app.routes.auth import router as auth_router

load_dotenv()

app = FastAPI()


app.include_router(auth_router)
