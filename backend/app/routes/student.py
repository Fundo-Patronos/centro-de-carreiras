from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.student import Student
from app.schemas.error import ErrorResponse
from app.schemas.student import StudentCreate, StudentUpdate, StudentRead
from app.crud.student import create, get, update, delete
from app.database import get_db

router = APIRouter()


@router.post(
    "/students/",
    response_model=StudentCreate,
    status_code=status.HTTP_201_CREATED,
    responses={
        409: {
            "model": ErrorResponse,
            "description": "Email or username in use",
        }
    },
)
async def create_endpoint(
    student: StudentCreate, db: Session = Depends(get_db)
):
    db_student = get(db, student.email)
    if db_student is not None:
        raise HTTPException(status_code=409, detail="Email in use")
    try:
        return create(db, student)
    except IntegrityError:
        raise HTTPException(status_code=409, detail="Username in use")


@router.get(
    "/students/{email}",
    response_model=StudentRead,
    responses={
        404: {
            "model": ErrorResponse,
            "description": "Student not found",
        }
    },
)
async def get_endpoint(email: str, db: Session = Depends(get_db)):
    student = get(db, email)
    if student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


@router.put(
    "/students/{email}",
    response_model=StudentRead,
    responses={
        404: {
            "model": ErrorResponse,
            "description": "Student not found",
        }
    },
)
async def update_endpoint(
    email: str, item: StudentUpdate, db: Session = Depends(get_db)
):
    updated = update(db, email, item)
    if updated is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return updated


@router.delete(
    "/students/{email}",
    status_code=status.HTTP_204_NO_CONTENT,
    responses={
        404: {"model": ErrorResponse, "description": "Student not found"}
    },
)
async def delete_endpoint(email: str, db: Session = Depends(get_db)):
    deleted = delete(db, email)
    if not deleted:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student deleted"}
