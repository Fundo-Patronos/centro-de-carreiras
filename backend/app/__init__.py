from fastapi import FastAPI
from app.routes import mentoring


app = FastAPI()

app.include_router(mentoring.router)
