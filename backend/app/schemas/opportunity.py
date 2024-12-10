from pydantic import BaseModel


class OpportunityCreate(BaseModel):
    Name: str
    Status: str
    Vaga: str
    Tipo: str
    Contato: str
