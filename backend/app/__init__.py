from fastapi import FastAPI
from app.routes import student as student_routes
from app.routes import auth as auth_routes


app = FastAPI()

app.include_router(student_routes.router)
app.include_router(auth_routes.router)