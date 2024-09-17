from app.crud.users_table import UsersTable
from app.models.user import User


def create_test_user(user_id: int = 0) -> User:
    return User(
        id=user_id,
        username="testuser",
        email="test@test.com",
        encrypted_password="testpassword",
        name="testname",
        linkedin="testlinkedin",
        description="testdescription",
        role="testrole",
        tags="testtags",
        graduation_year=2022,
        course="testcourse",
    )


def test_create_user(test_db):
    user = create_test_user()
    users_table = UsersTable(db=test_db)
    users_table.create_user(user)


def test_update_user(test_db):
    user = create_test_user()
    users_table = UsersTable(db=test_db)
    users_table.create_user(user)

    user.name = "newname"
    users_table.update_user(user)

    assert users_table.get_user("testuser").name == "newname"


def test_get_user(test_db):
    user = create_test_user()
    users_table = UsersTable(db=test_db)
    users_table.create_user(user)

    assert users_table.get_user("testuser").username == "testuser"


def test_get_all_users(test_db):
    users_table = UsersTable(db=test_db)
    users_table.create_user(create_test_user(3))
    users_table.create_user(create_test_user(1))

    all_users = users_table.get_all_users()
    assert len(all_users) == 2
    assert set([user.id for user in all_users]) == {1, 3}
