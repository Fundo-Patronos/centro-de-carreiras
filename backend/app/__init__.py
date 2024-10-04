from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import mentoring


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite seu front-end em localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

app.include_router(mentoring.router)
