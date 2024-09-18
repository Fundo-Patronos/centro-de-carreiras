from pydantic import BaseModel


class Opportunity(BaseModel):
    id: int
    title: str
    description: str
