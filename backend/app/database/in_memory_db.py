from typing import Any, Optional
from pydantic import BaseModel
from app.database.database import Database
from app.exceptions import DataNotFound


class InMemoryDatabase(Database):
    data: dict[str, Any] = {}
    current_id: int = 0

    @property
    def _base_id(self) -> str:
        return "in_memory"

    @staticmethod
    def reset():
        InMemoryDatabase.data = {}
        InMemoryDatabase.current_id = 0

    def create(self, table_id: str, items: list[BaseModel]) -> list[dict]:
        if table_id not in self.data:
            self.data[table_id] = []

        created_items = [
            item.model_dump() | {"id": str(self.current_id)} for item in items
        ]
        self.data[table_id].extend(created_items)
        self.current_id += 1

        return created_items

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
        raise DataNotFound("No item found!")

    def update(self, table_id: str, item: BaseModel):
        for table_item in self.data.get(table_id, []):
            if table_item["id"] == item.model_dump()["id"]:
                table_item.update(item.model_dump())

    def delete(self, table_id: str, item_id: str):
        self.data[table_id] = [
            table_item
            for table_item in self.data.get(table_id, [])
            if not table_item["id"] == item_id
        ]
