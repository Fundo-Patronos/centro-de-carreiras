import requests
import os


class Database:
    """Base Database class to handle the interaction between the back-end and the database.
    This class should not be directly used, but should be inherited by other classes that will
    """

    _url: str = "https://app.nocodb.com/api/v2/tables/{table_id}/records"
    _api_key: str = os.getenv("NOCODB_API_KEY")

    @staticmethod
    def _get_table(table_id: str, params: dict = None) -> list[dict]:
        """Gets a whole table from the database.

        Args:
            table_id (str): The table id to be retrieved.
            params (dict): The parameters to be passed in the request.

        Returns:
            list[dict]: A list of dicts containing the table data.
        """

        response = requests.get(
            url=Database._url.format(table_id=table_id),
            headers={"xc-token": Database._api_key},
            params=params,
        )
        return response.json()["list"]

    @staticmethod
    def _set_record(table_id: str, data: dict) -> None:
        """Sets a new record in the database.

        Args:
            table_id (str): The table id to be updated.
            data (list[dict]): The data to be inserted in the table.

        Returns:

        """

        response = requests.post(
            url=Database._url.format(table_id=table_id),
            headers={"xc-token": Database._api_key},
            json=data,
        )
        response.raise_for_status()

    @staticmethod
    def _update_record(table_id: str, data: dict) -> None:
        """Updates a record in the database.

        Args:
            table_id (str): The table id to be updated.
            data (list[dict]): The data to be updated in the table.

        Returns:

        """

        response = requests.patch(
            url=Database._url.format(table_id=table_id),
            headers={"xc-token": Database._api_key},
            json=data,
        )
        response.raise_for_status()

    @staticmethod
    def _get_record(table_id: str, line_id: str) -> dict:
        """Gets a record from the database.

        Args:
            table_id (str): The table id to be retrieved.
            line_id (str): The record id to be retrieved.

        Returns:
            dict: A dict containing the record data.
        """

        response = requests.get(
            url=Database._url.format(table_id=table_id) + f"/{line_id}",
            headers={"xc-token": Database._api_key},
        )

        return response.json()
