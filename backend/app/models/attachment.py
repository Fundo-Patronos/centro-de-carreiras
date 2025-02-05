from app.models.abstract_item import Item


class Attachment(Item):
    unique_id: str
    attachment: list[dict[str, str]]
