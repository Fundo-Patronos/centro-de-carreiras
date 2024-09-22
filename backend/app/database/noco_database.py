from typing import Any, Optional
from pydantic import BaseModel
import requests
import os

from app.database.database import Database
from app.exceptions import DataNotFound


class NocoDatabase(Database):
    """Base Database class to handle the interaction between the back-end and the database.
    This class should not be directly used, but should be inherited by other classes that will
    """

    def __init__(self):
        optional_api_key = os.getenv("NOCODB_API_KEY", None)
        if optional_api_key is None:
            raise ValueError("NOCODB_API_KEY environment variable is not set.")

        self._url: str = (
            "https://app.nocodb.com/api/v2/tables/{table_id}/records"
        )
        self._api_key = optional_api_key

    def read_one(self, table_id: str, params: dict[str, Any]) -> dict:
        """Gets a single record from the database.

        Args:
            table_id (str): The table id to be retrieved.
            params (dict): The parameters to be passed in the request.

        Returns:
            dict: A dict containing the record data.
        """
        all_items = self.read_all(table_id=table_id, params=params)
        if len(all_items) == 0:
            raise DataNotFound("No items found with the given parameters.")
        return all_items[0]

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
        noco_params = (
            {
                "where": "~and".join(
                    [
                        "(" + key + ",eq," + value + ")"
                        for key, value in params.items()
                    ]
                )
            }
            if params is not None
            else None
        )

        response = requests.get(
            url=self._url.format(table_id=table_id),
            headers={"xc-token": self._api_key},
            params=noco_params,
        )
        if response.status_code != 200:
            raise RuntimeError(f"Failed to retrieve data from NocoDB table.")
        return response.json()["list"]

    def create(self, table_id: str, items: list[BaseModel]) -> None:
        """Creates a new record in the database.

        Args:
            table_id (str): The table id to be updated.
            params (dict): The data to be inserted in the table.

        Returns:

        """
        response = requests.post(
            url=self._url.format(table_id=table_id),
            headers={"xc-token": self._api_key},
            json=[item.model_dump() for item in items],
        )
        response.raise_for_status()

    def update(self, table_id: str, item: BaseModel) -> None:
        """Updates a record in the database.

        Args:
            table_id (str): The table id to be updated.
            params (dict): The parameters to be passed in the request.

        Returns:

        """

        response = requests.patch(
            url=self._url.format(table_id=table_id),
            headers={"xc-token": self._api_key},
            json=item.model_dump(),
        )
        response.raise_for_status()

    def delete(self, table_id: str, item: BaseModel) -> None:
        """Deletes a record in the database.

        Args:
            table_id (str): The table id to delete from.
            item (BaseModel): The item to be deleted.

        Returns:

        """
        raise NotImplementedError
