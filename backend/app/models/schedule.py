from abc import ABC
from pydantic import BaseModel
from typing import Literal
from datetime import time


class Schedule(BaseModel):
    day_of_the_week: Literal[
        "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
    ]
    start_time: str
    end_time: str