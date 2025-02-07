import os
from dotenv import load_dotenv
from datetime import time
from pyairtable import Api
from pyairtable.formulas import match

from app.database.database import Database
from app.models.schedule import Schedule

load_dotenv()


class SchedulesTable:
    """Static class to handle all schedule database operations."""

    api = Api(os.environ["AIRTABLE_API_KEY"])
    table = api.table(
        os.environ["WORKSPACE_ID"], os.environ["SCHEDULES_TABLE_ID"]
    )

    @staticmethod
    def get_schedules(mentor_name: str) -> list[Schedule]:
        """Gets all schedules for a mentor"""

        formula = match({"Mentor": mentor_name})
        data = SchedulesTable.table.all(formula=formula)
        schedules = []
        for schedule in data:
            fields = schedule["fields"]
            schedule_params = {
                "day_of_the_week": fields["Dia"],
                "start_time": fields["Horário Início"],
            }
            schedules.append(Schedule(**schedule_params))
        return schedules
