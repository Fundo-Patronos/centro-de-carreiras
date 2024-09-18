import pytest
from app.crud.users_table import UsersTable
from app.schemas.user import UserCreate


def create_test_user(username: str = "testuser") -> UserCreate:
    return UserCreate(
        username=username,
        email="test@test.com",
        password="testpassword",
        name="testname",
        linkedin="testlinkedin",
        graduation_year=2022,
        course="testcourse",
    )


def test_create_user(test_db):
    user = create_test_user()
    users_table = UsersTable(db=test_db)
    users_table.create_user(user)


def test_get_user(test_db):
    user = create_test_user()
    users_table = UsersTable(db=test_db)
    users_table.create_user(user)

    assert users_table.get_user("testuser").username == "testuser"


def test_update_user(test_db):
    user = create_test_user()
    users_table = UsersTable(db=test_db)
    users_table.create_user(user)

    user = users_table.get_user("testuser")
    user.name = "newname"
    users_table.update_user(user)

    assert users_table.get_user("testuser").name == "newname"


def test_get_all_users(test_db):
    users_table = UsersTable(db=test_db)
    users_table.create_user(create_test_user("testuser1"))
    users_table.create_user(create_test_user("testuser2"))

    all_users = users_table.get_all_users()
    assert len(all_users) == 2
    assert set([user.username for user in all_users]) == {
        "testuser1",
        "testuser2",
    }

def test_get_user_WHEN_user_does_not_exist_THEN_raises_value_error(test_db):
    users_table = UsersTable(db=test_db)
    with pytest.raises(ValueError):
        users_table.get_user("testuser")
