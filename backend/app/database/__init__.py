from typing import Generator
from app.database.noco_database import NocoDatabase
from app.database.database import Database

def get_db() -> Generator[Database, None, None]:
    yield NocoDatabase()
