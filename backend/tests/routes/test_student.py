from fastapi.testclient import TestClient
from app.crud.student import create
from app.schemas.student import StudentCreate
from sqlalchemy.orm import Session

def test_create_student_route(client: TestClient) -> None:
    response = client.post("/students/", json={
        "email": "test@example.com",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User"
    })
    assert response.status_code == 201
    assert response.json() == {
        "email": "test@example.com",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User"
    }

def test_read_student_route(client: TestClient, db_session: Session) -> None:
    create(db_session, StudentCreate(
        email="test@example.com",
        username="testuser",
        first_name="Test",
        last_name="User"
    ))
    response = client.get("/students/test@example.com")
    assert response.status_code == 200
    assert response.json() == {
        "email": "test@example.com",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User"
    }

def test_update_student_route(client: TestClient, db_session: Session) -> None:
    create(db_session, StudentCreate(
        email="test@example.com",
        username="testuser",
        first_name="Test",
        last_name="User"
    ))
    response = client.put("/students/test@example.com", json={
        "username": "updateduser",
        "first_name": "Updated",
        "last_name": "User"
    })
    assert response.status_code == 200
    assert response.json() == {
        "email": "test@example.com",
        "username": "updateduser",
        "first_name": "Updated",
        "last_name": "User"
    }

def test_delete_student_route(client: TestClient, db_session: Session) -> None:
    create(db_session, StudentCreate(
        email="test@example.com",
        username="testuser",
        first_name="Test",
        last_name="User"
    ))
    response = client.delete("/students/test@example.com")
    assert response.status_code == 204
    response = client.get("/students/test@example.com")
    assert response.status_code == 404
