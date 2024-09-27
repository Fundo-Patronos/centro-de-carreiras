from fastapi import FastAPI
from app.routes import student as student_routes


app = FastAPI()

app.include_router(student_routes.router)
