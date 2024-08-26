from typing import Optional
from sqlalchemy.orm import Session
from app.models.student import Student
from app.schemas.student import StudentCreate, StudentUpdate

def create(db: Session, student: StudentCreate):
    db_student = Student(**student.model_dump())
    db.add(db_student)
    db.commit()
    return db_student

def get(db: Session, email: str):
    return db.query(Student).filter(Student.email == email).first()

def update(db: Session, email: str, student: StudentUpdate) -> Optional[Student]:
    db_student = db.query(Student).filter(Student.email == email).first()
    if not db_student:
        return None
    for key, value in student.model_dump(exclude_unset=True).items():
        setattr(db_student, key, value)
    db.commit()
    db.refresh(db_student)
    return db_student

def delete(db: Session, email: str):
    db_student = db.query(Student).filter(Student.email == email).first()
    if not db_student:
        return False
    db.delete(db_student)
    db.commit()
    return True
