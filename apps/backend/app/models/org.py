from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class Org(Base):
    __tablename__ = "org"
    name: Mapped[str] = mapped_column(index=True)
