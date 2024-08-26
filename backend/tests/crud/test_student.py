from app.crud.student import create, get, update, delete
from app.schemas.student import StudentCreate, StudentUpdate
from sqlalchemy.orm import Session

def test_create(db_session: Session) -> None:
    student_data = {
        "email": "test@example.com",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User"
    }
    student = create(db_session, StudentCreate(**student_data))
    assert student.email == "test@example.com" # type: ignore
    assert student.username == "testuser" # type: ignore
    assert student.first_name == "Test" # type: ignore
    assert student.last_name == "User" # type: ignore

def test_get(db_session: Session) -> None:
    student_data = {
        "email": "test@example.com",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User"
    }
    create(db_session, StudentCreate(**student_data))
    student = get(db_session, "test@example.com")
    assert student is not None
    assert student.email == "test@example.com" # type: ignore
    assert student.username == "testuser" # type: ignore
    assert student.first_name == "Test" # type: ignore
    assert student.last_name == "User" # type: ignore

def test_update(db_session: Session) -> None:
    student_data = {
        "email": "test@example.com",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User"
    }
    create(db_session, StudentCreate(**student_data))
    updated_data = {"username": "updateduser", "first_name": "Updated"}
    updated_student = update(db_session, "test@example.com", StudentUpdate(**updated_data))
    assert updated_student is not None
    assert updated_student.username == "updateduser" # type: ignore
    assert updated_student.first_name == "Updated" # type: ignore
    assert updated_student.last_name == "User" # type: ignore

def test_delete(db_session: Session) -> None:
    student_data = {
        "email": "test@example.com",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User"
    }
    create(db_session, StudentCreate(**student_data))
    delete(db_session, "test@example.com")
    student = get(db_session, "test@example.com")
    assert student is None
