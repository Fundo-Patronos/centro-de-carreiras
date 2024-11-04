import pytest
from app.crud.users_table import UsersTable
from app.exceptions import DataNotFound
from app.schemas.user import UserCreate

DEFAULT_TEST_EMAIL = "test@test.com"

def create_test_user(email: str = DEFAULT_TEST_EMAIL) -> UserCreate:
    return UserCreate(
        email=email,
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

    assert users_table.get_user(DEFAULT_TEST_EMAIL).email == DEFAULT_TEST_EMAIL


def test_update_user(test_db):
    user = create_test_user()
    users_table = UsersTable(db=test_db)
    users_table.create_user(user)

    user = users_table.get_user(DEFAULT_TEST_EMAIL)
    user.name = "newname"
    users_table.update_user(user)

    assert users_table.get_user(DEFAULT_TEST_EMAIL).name == "newname"


def test_get_all_users(test_db):
    users_table = UsersTable(db=test_db)
    users_table.create_user(create_test_user("test1@test.com"))
    users_table.create_user(create_test_user("test2@test.com"))

    all_users = users_table.get_all_users()
    assert len(all_users) == 2
    assert set([user.email for user in all_users]) == {
        "test1@test.com",
        "test2@test.com",
    }


def test_get_user_WHEN_user_does_not_exist_THEN_raises_DataNotFound(test_db):
    users_table = UsersTable(db=test_db)
    with pytest.raises(DataNotFound):
        users_table.get_user(DEFAULT_TEST_EMAIL)
