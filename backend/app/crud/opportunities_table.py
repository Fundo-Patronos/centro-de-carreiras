import os

from app.database.database import Database
from app.models.opportunity import Opportunity
from app.schemas.opportunity import OpportunityCreate


class OpportunitiesTable:
    """Static class to handle all database operations for opportunities"""

    def __init__(self, db: Database):
        optional_table_id = os.getenv("OPPORTUNITIES_TABLE_ID")
        if optional_table_id is None:
            raise ValueError(
                "OPPORTUNITIES_TABLE_ID environment variable is not set."
            )
        self.table_id = optional_table_id
        self.db = db

    def get_all(self) -> list[Opportunity]:
        """Gets all opportunities from the database.

        Returns:
            list[Opportunity]: A list of all opportunities in the database.
        """
        return [
            Opportunity(**opportunity)
            for opportunity in self.db.read_all(table_id=self.table_id)
        ]

    def get(self, id: str) -> Opportunity:
        """
        Gets an opportunity from the database by ID.

        Args:
            opportunity_id (str): The ID of the opportunity to be retrieved.

        Returns:
            Opportunity: The opportunity retrieved from the database.
        """
        params = {"id": id}
        opportunity = self.db.read_one(table_id=self.table_id, params=params)
        return Opportunity(**opportunity)

    def create(self, opportunity: OpportunityCreate) -> None:
        """Creates a new opportunity in the database.

        Args:
            opportunity (OpportunityCreate): The opportunity to be created.
        """
        self.db.create(
            table_id=self.table_id,
            items=[opportunity],
        )

    def update(self, opportunity: Opportunity) -> None:
        """Updates an opportunity in the database.

        Args:
            opportunity (Opportunity): The opportunity to be updated.
        """
        self.db.update(table_id=self.table_id, item=opportunity)

    def delete(self, id: str) -> None:
        """Deletes an opportunity from the database by ID.

        Args:
            id (str): The ID of the opportunity to be deleted.
        """
        self.db.delete(table_id=self.table_id, item_id=id)
