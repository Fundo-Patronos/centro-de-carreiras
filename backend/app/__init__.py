import os
from fastapi import FastAPI, Request
from dotenv import load_dotenv
from app.routes.auth import router as auth_router
from app.routes.mentoring import router as mentoring_router
#from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware as CORSMiddleware 
from fastapi.responses import JSONResponse

load_dotenv()

front_end_url = os.getenv("FRONT_END_BASE_URL", None)

if front_end_url is None:
    raise ValueError("FRONT_END_BASE_URL is not set")

#app = FastAPI()
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "https://centro-de-carreiras-patronos-722033123279.us-central1.run.app",           
#         "http://localhost:3000", 
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],        
#     allow_headers=["*"],       
# )

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]

app = FastAPI(middleware=middleware)

app.include_router(mentoring_router)
app.include_router(auth_router)
