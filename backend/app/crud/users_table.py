import os

from app.database.database import Database
from app.models.user import User
from app.schemas.user import DefaultValuesUserCreate, UserCreate


class UsersTable:
    """Static class to handle all database operations for users"""

    def __init__(self, db: Database):
        optional_table_id = os.getenv("USERS_TABLE_ID")
        if optional_table_id is None:
            raise ValueError("USERS_TABLE_ID environment variable is not set.")
        self.table_id = optional_table_id
        self.db = db

    def parse_user_data(self, user: dict) -> dict:
        user_data = user.get("fields", {})
        user_data["id"] = user.get("id", "")

        user_data.setdefault("linkedin", "")
        user_data.setdefault("description", "")

        return user_data

    def get_all_users(self) -> list[User]:
        """Gets all users from the database.

        Returns:
            list[User]: A list of all users in the database.
        """

        return [
            User(**user) for user in self.db.read_all(table_id=self.table_id)
        ]

    def get_user(self, username: str) -> User:
        """Gets a user from the database.

        Args:
            username (str): The username of the user to be retrieved.

        Returns:
            User: The user retrieved from the database.
        """

        params = {"username": username}
        user = self.db.read_one(table_id=self.table_id, params=params)
        user_data = self.parse_user_data(user)
        return User(**user_data)

    def get_user_by_email(self, email: str) -> User:
        """
        Gets a user from the database by email.

        Args:
            email (str): The email of the user to be retrieved.

        Returns:
            User: The user retrieved from the database.
        """
        params = {"email": email}
        user = self.db.read_one(table_id=self.table_id, params=params)
        user_data = self.parse_user_data(user)
        return User(**user_data)

    def create_user(self, user: UserCreate) -> None:
        """Creates a new user in the database.

        Args:
            user (User): The user to be created.
        """

        self.db.create(
            table_id=self.table_id,
            items=[DefaultValuesUserCreate(**user.model_dump())],
        )

    def update_user(self, user: User) -> None:
        """Updates a user in the database.

        Args:
            user (User): The user to be updated.
        """

        self.db.update(table_id=self.table_id, item=user)

    def delete_user(self, user_id: int) -> None:
        """Deletes a user from the database by user ID.

        Args:
            user_id (int): The ID of the user to be deleted.
        """
        self.db.delete(table_id=self.table_id, item={"Id": user_id})
