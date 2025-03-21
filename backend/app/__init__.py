import os
from fastapi import FastAPI, Request
from dotenv import load_dotenv
from app.routes.auth import router as auth_router
from app.routes.mentoring import router as mentoring_router
from app.routes.send_email import router as send_email_router
from app.routes.opportunity import router as opportunity_router
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

load_dotenv()

front_end_url = os.getenv("FRONT_END_BASE_URL", None)

if front_end_url is None:
    raise ValueError("FRONT_END_BASE_URL is not set")

print(f"Front End URL Cloud: {front_end_url}")

app = FastAPI()


@app.middleware("http")
async def redirect_http_to_https(request: Request, call_next):
    x_forwarded_proto = request.headers.get("x-forwarded-proto")
    if x_forwarded_proto == "http":
        url = request.url.replace(scheme="https")
        return RedirectResponse(url, status_code=307)
    response = await call_next(request)
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        front_end_url,
        "https://frontend-722033123279.us-central1.run.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(mentoring_router)
app.include_router(auth_router)
app.include_router(send_email_router)
app.include_router(opportunity_router)
