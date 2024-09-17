from __future__ import annotations
from typing import Any, Optional

from pydantic import BaseModel


class Database:
    """Base Database class to handle the interaction between the back-end and the databases.
    This class should not be directly used, but should be inherited by other classes that will
    """

    # Make sure database is a singleton for each of its subclasses
    _instances: dict[type[Database], Database] = {}

    def __new__(cls: type[Database]) -> Database:
        if cls not in cls._instances:
            cls._instances[cls] = super(Database, cls).__new__(cls)
        return cls._instances[cls]

    def read_one(
        self, table_id: str, params: Optional[dict[str, Any]] = None
    ) -> dict:
        """Gets a single record from the database.

        Args:
            table_id (str): The table id to be retrieved.
            params (dict): The parameters to be passed in the request.

        Returns:
            dict: A dict containing the record data.
        """
        raise NotImplementedError

    def read_all(
        self, table_id: str, params: Optional[dict[str, Any]] = None
    ) -> list[dict]:
        """Gets a whole table from the database.

        Args:
            table_id (str): The table id to be retrieved.
            params (dict): The parameters to be passed in the request.

        Returns:
            list[dict]: A list of dicts containing the table data.
        """
        raise NotImplementedError

    def create(self, table_id: str, items: list[BaseModel]) -> None:
        """Creates a new record in the database.

        Args:
            table_id (str): The table id to be updated.
            items (list[BaseModel]): The items to be created.

        Returns:

        """
        raise NotImplementedError

    def update(self, table_id: str, item: BaseModel) -> None:
        """Updates a record in the database.

        Args:
            table_id (str): The table id to be updated.
            item (BaseModel): The item to be updated.

        Returns:

        """
        raise NotImplementedError

    def delete(self, table_id: str, item: BaseModel) -> None:
        """Deletes a record in the database.

        Args:
            table_id (str): The table id to delete from.
            params (dict): The parameters to be passed in the request.

        Returns:

        """
        raise NotImplementedError
