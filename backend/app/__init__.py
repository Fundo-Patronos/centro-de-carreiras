import os
from fastapi import FastAPI, Request
from dotenv import load_dotenv
from app.routes.auth import router as auth_router
from app.routes.mentoring import router as mentoring_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

load_dotenv()

front_end_url = os.getenv("FRONT_END_BASE_URL", None)

if front_end_url is None:
    raise ValueError("FRONT_END_BASE_URL is not set")

app = FastAPI()

@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "https://centro-de-carreiras-patronos-722033123279.us-central1.run.app, http://localhost:3000"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

origins = [
    "https://centro-de-carreiras-patronos-722033123279.us-central1.run.app",
    "http://localhost:3000",
]

app.include_router(mentoring_router)
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],        
    allow_headers=["*"],       
)
