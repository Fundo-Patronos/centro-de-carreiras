import os

from app.database.database import Database
from app.models.user import User


class UsersTable(Database):
    """Static class to handle all database operations for users"""

    table_id: str = os.getenv("USERS_TABLE_ID")

    def get_all_users() -> list[User]:
        """Gets all users from the database.

        Returns:
            list[User]: A list of all users in the database.
        """

        users = UsersTable._get_table(table_id=UsersTable.table_id)
        users = [User(**user) for user in users]
        return users

    def get_user(username: str) -> User:
        """Gets a user from the database.

        Args:
            username (str): The username of the user to be retrieved.

        Returns:
            User: The user retrieved from the database.
        """

        params = {"where": f"(username,eq,{username})"}
        user = UsersTable._get_table(
            table_id=UsersTable.table_id, params=params
        )[0]
        return User(**user)

    def create_user(user: User) -> None:
        """Creates a new user in the database.

        Args:
            user (User): The user to be created.
        """

        UsersTable._set_record(
            table_id=UsersTable.table_id, data=user.model_dump()
        )

    def update_user(user: User) -> None:
        """Updates a user in the database.

        Args:
            user (User): The user to be updated.
        """

        UsersTable._update_record(
            table_id=UsersTable.table_id, data=user.model_dump()
        )
