from typing import Any, Optional
from pydantic import BaseModel
from app.database.database import Database


class InMemoryDatabase(Database):
    def __init__(self):
        self.data: dict[str, Any] = {}
        self.current_id: int = 0

    def create(self, table_id: str, items: list[BaseModel]):
        if table_id not in self.data:
            self.data[table_id] = []
        self.data[table_id].extend(
            [item.model_dump() | {"id": self.current_id} for item in items]
        )
        self.current_id += 1

    def read_all(
        self, table_id: str, params: Optional[dict[str, Any]] = None
    ) -> list[dict]:
        if params is None:
            return self.data.get(table_id, [])

        return [
            item
            for item in self.data.get(table_id, [])
            if all(item[key] == value for key, value in params.items())
        ]

    def read_one(self, table_id: str, params: dict[str, Any]) -> dict:
        for item in self.data.get(table_id, []):
            if all(item[key] == value for key, value in params.items()):
                return item
        raise ValueError("No item found!")

    def update(self, table_id: str, item: BaseModel):
        for table_item in self.data.get(table_id, []):
            if table_item["id"] == item.model_dump()["id"]:
                table_item.update(item.model_dump())

    def delete(self, table_id: str, item: BaseModel):
        self.data[table_id] = [
            table_item
            for table_item in self.data.get(table_id, [])
            if not table_item["id"] == item.model_dump()["id"]
        ]
