from typing import Optional
from sqlalchemy import JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Contact(Base):
    __tablename__ = "contact"

    org_id: Mapped[str] = mapped_column(index=True)
    name: Mapped[str]
    emails: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    phones: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    telegram_id: Mapped[Optional[str]] = mapped_column(index=True, nullable=True)
    tags: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)

