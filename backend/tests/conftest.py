import pytest
from app.database import get_db
from app import app
from fastapi.testclient import TestClient

from tests.in_memory_db import InMemoryDatabase


# Sets up the environment variables for the tests
@pytest.fixture(autouse=True)
def set_env_vars(monkeypatch):
    monkeypatch.setenv("JWT_KEY", "super-secret-jwt-key")
    monkeypatch.setenv("USERS_TABLE_ID", "users_id")


@pytest.fixture(scope="function")
def test_db():
    yield InMemoryDatabase()


@pytest.fixture(scope="function")
def client(test_db):
    def override_get_db():
        try:
            yield test_db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as client:
        yield client
