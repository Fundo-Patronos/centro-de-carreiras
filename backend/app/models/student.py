from sqlalchemy import Column, String
from app.models import Base

class Student(Base):
    __tablename__ = "students"

    email = Column(String, index=True, primary_key=True)
    username = Column(String, index=True, unique=True)
    first_name = Column(String)
    last_name = Column(String)

