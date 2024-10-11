import os
from fastapi import Depends

from app.database import get_db

from app.database.database import Database
from app.models.opportunity import Opportunity


class OpportunitiesTable:
    """Static class to handle all database operations for opportunities"""

    def __init__(self, db: Database = Depends(get_db)):
        optional_table_id = os.getenv("OPPORTUNITIES_TABLE_ID")
        if optional_table_id is None:
            raise ValueError(
                "OPPORTUNITIES_TABLE_ID environment variable is not set."
            )
        self.table_id = optional_table_id
        self.db = db

    def get_opportunity(self, title: str) -> Opportunity:
        """Gets an opportunity from the database.

        Args:
            title (str): The opportunity title to be retrieved.

        Returns:
            Opportunity: The opportunity retrieved from the database.
        """

        params = {"title": title}
        opportunity = self.db.read_one(table_id=self.table_id, params=params)
        return Opportunity(**opportunity)

    def get_all_opportunities(self):
        """Gets all opportunities from the database.

        Returns:
            list[Opportunity]: A list of all opportunities in the database.
        """

        opportunities = [
            Opportunity(**opportunity)
            for opportunity in self.db.read_all(table_id=self.table_id)
        ]
        return opportunities

    def create_opportunity(self, opportunity: Opportunity):
        """Creates a new opportunity in the database.

        Args:
            opportunity (Opportunity): The opportunity to be created.
        """

        self.db.create(table_id=self.table_id, items=[opportunity])

    def update_opportunity(self, opportunity: Opportunity):
        """Updates an opportunity in the database.

        Args:
            opportunity (Opportunity): The opportunity to be updated.
        """

        self.db.update(table_id=self.table_id, item=opportunity)
