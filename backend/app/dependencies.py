from typing import Generator
from fastapi import Depends

from app.crud.attachments_table import AttachmentsTable
from app.crud.opportunities_table import OpportunitiesTable
from app.crud.users_table import UsersTable
from app.database.database import Database
from app.database.airtable_database import AirtableDatabase


def get_db() -> Generator[Database, None, None]:
    yield AirtableDatabase()


def get_users_table(
    db: Database = Depends(get_db),
) -> Generator[UsersTable, None, None]:
    yield UsersTable(db)


def get_opportunities_table(
    db: Database = Depends(get_db),
) -> Generator[OpportunitiesTable, None, None]:
    yield OpportunitiesTable(db)


def get_attachments_table(
    db: Database = Depends(get_db),
) -> Generator[AttachmentsTable, None, None]:
    yield AttachmentsTable(db)
