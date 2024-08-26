from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

DEVELOPMENT_DATABASE_URL = "sqlite:///./develop.db"

DATABASE_URL = os.getenv("DATABASE_URL", DEVELOPMENT_DATABASE_URL)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
