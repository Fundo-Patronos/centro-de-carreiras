import os

from app.database.database import Database
from app.models.opportunity import Opportunity

class OpportunitiesTable(Database):

    """Static class to handle all database operations for opportunities"""

    table_id: str = os.getenv("OPPORTUNITIES_TABLE_ID")
    
    @staticmethod 
    def get_opportunity(title: str) -> Opportunity:

        """Gets an opportunity from the database.

        Args:
            title (str): The opportunity title to be retrieved.

        Returns:
            Opportunity: The opportunity retrieved from the database.
        """

        params = {"where": f"(title,eq,{title})"}
        opportunity = OpportunitiesTable._get_table(table_id=OpportunitiesTable.table_id, params=params)[0]
        return Opportunity(**opportunity)

    @staticmethod
    def get_all_opportunities():
        
        """Gets all opportunities from the database.
        
        Returns:
            list[Opportunity]: A list of all opportunities in the database.
        """

        opportunities = OpportunitiesTable._get_table(table_id=OpportunitiesTable.table_id)
        opportunities = [Opportunity(**opportunity) for opportunity in opportunities]
        return opportunities

    @staticmethod
    def create_opportunity(opportunity: Opportunity):
        
        """Creates a new opportunity in the database.
        
        Args:
            opportunity (Opportunity): The opportunity to be created.
        """

        OpportunitiesTable._set_record(table_id=OpportunitiesTable.table_id, data=opportunity.model_dump())

    @staticmethod
    def update_opportunity(opportunity: Opportunity):
        
        """Updates an opportunity in the database.
        
        Args:
            opportunity (Opportunity): The opportunity to be updated.
        """

        OpportunitiesTable._update_record(table_id=OpportunitiesTable.table_id, data=opportunity.model_dump())
