import os
import requests
from typing import Any, Optional
from pydantic import BaseModel
from urllib.parse import urlencode, quote_plus

from app.database.database import Database
from app.exceptions import DataNotFound


class AirtableDatabase(Database):
    def __init__(self):
        optional_api_key = os.getenv("AIRTABLE_API_KEY", None)
        if optional_api_key is None:
            raise ValueError("AIRTABLE_API_KEY environment variable is not set.")
        self._url = "https://api.airtable.com/v0/{base_id}/{table_id}"
        self._api_key = optional_api_key
        self._base_id = os.getenv("WORKSPACE_ID")
        if self._base_id is None:
            raise ValueError("AIRTABLE_BASE_ID environment variable is not set.")

    def read_one(self, table_id: str, params: dict[str, Any]) -> dict:
        """Gets a single record from the Airtable database using filterByFormula.

        Args:
            table_id (str): The table name or ID to be queried.
            params (dict): The parameters to filter records.

        Returns:
            dict: A dictionary containing the record data.

        Raises:
            DataNotFound: If no records match the given parameters.
        """
        # Construct the filterByFormula parameter
        # For example, if params = {'email': 'example@example.com'}
        # The formula will be: {email} = 'example@example.com'
        filter_expressions = []
        for field, value in params.items():
            # Airtable field names need to be enclosed in {}
            # String values should be enclosed in single quotes
            expression = f"{{{field}}} = '{value}'"
            filter_expressions.append(expression)

        # Combine expressions using AND if multiple parameters are provided
        filter_formula = "AND(" + ", ".join(filter_expressions) + ")" if len(filter_expressions) > 1 else filter_expressions[0]

        # URL encode the filterByFormula parameter
        query_params = {
            "filterByFormula": filter_formula
        }

        headers = {
            "Authorization": f"Bearer {self._api_key}"
        }

        print('query_params', query_params)
        

        response = requests.get(
            url=self._url.format(base_id=self._base_id, table_id=table_id),
            headers=headers,
            params=query_params,
        )

        if response.status_code == 403:
            raise PermissionError("Access forbidden: check your API key and permissions.")
        elif response.status_code != 200:
            raise RuntimeError(f"Failed to retrieve data from Airtable. Status code: {response.status_code}")

        records = response.json().get("records", [])
        if not records:
            raise DataNotFound("No items found with the given parameters.")

        # Return the first matching record
        return records[0]

    def read_all(
        self, table_id: str, params: Optional[dict[str, Any]] = None
    ) -> list[dict]:
        """Gets all records from the Airtable database, optionally filtered.

        Args:
            table_id (str): The table name or ID to be queried.
            params (dict): The parameters to filter records.

        Returns:
            list[dict]: A list of dictionaries containing the records data.
        """
        headers = {
            "Authorization": f"Bearer {self._api_key}"
        }

        query_params = {}

        if params:
            # Construct the filterByFormula parameter
            filter_expressions = []
            for field, value in params.items():
                expression = f"{{{field}}} = '{value}'"
                filter_expressions.append(expression)

            filter_formula = "AND(" + ", ".join(filter_expressions) + ")" if len(filter_expressions) > 1 else filter_expressions[0]
            query_params["filterByFormula"] = filter_formula

        all_records = []
        offset = None

        while True:
            if offset:
                query_params["offset"] = offset

            response = requests.get(
                url=self._url.format(base_id=self._base_id, table_id=table_id),
                headers=headers,
                params=query_params,
            )

            response.raise_for_status()
            data = response.json()
            records = data.get("records", [])
            all_records.extend(records)

            offset = data.get("offset")
            if not offset:
                break

        return all_records

    def create(self, table_id: str, items: list[BaseModel]) -> None:
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json"
        }

        data = {
            "records": [{"fields": item.model_dump()} for item in items]
        }

        print('data', data)

        response = requests.post(
            url=self._url.format(base_id=self._base_id, table_id=table_id),
            headers=headers,
            json=data,
        )
        response.raise_for_status()

    def update(self, table_id: str, item: BaseModel) -> None:
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json"
        }

        if not hasattr(item, "id") or not item.id:
            raise ValueError("Item must have an 'id' attribute for updating.")

        data = {
        "fields": {k: v for k, v in item.model_dump().items() if k != "id"}
        }


        # Construct the URL with the record ID
        url = f"{self._url.format(base_id=self._base_id, table_id=table_id)}/{item.id}"
        print('data', data)
        response = requests.patch(
            url=url,
            headers=headers,
            json=data,
        )

        if response.status_code == 403:
            raise PermissionError("Access forbidden: check your API key and permissions.")
        elif response.status_code == 404:
            raise DataNotFound(f"Record with ID {item.id} not found.")
        response.raise_for_status()