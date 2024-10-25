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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        front_end_url,
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.options("/{full_path:path}")
async def preflight_response(full_path: str, request: Request):
    origin = request.headers.get("origin")
    # Confere se a origem é permitida
    if origin in [
        front_end_url,
        "http://localhost:3000",
    ]:
        return JSONResponse(status_code=200, headers={
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "*",
        })
    else:
        return JSONResponse(status_code=403, content={"detail": "Origin not allowed"})

app.include_router(mentoring_router)
app.include_router(auth_router)
