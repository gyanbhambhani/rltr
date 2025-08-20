from datetime import datetime
from typing import Optional

from sqlalchemy import Index
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey

from app.models.base import Base


class Thread(Base):
    __tablename__ = "thread"

    org_id: Mapped[str] = mapped_column(index=True)
    contact_id: Mapped[Optional[str]] = mapped_column(ForeignKey("contact.id"), index=True, nullable=True)
    deal_id: Mapped[Optional[str]] = mapped_column(index=True, nullable=True)
    subject: Mapped[Optional[str]] = mapped_column(nullable=True)
    channel: Mapped[str] = mapped_column(index=True)
    status: Mapped[str] = mapped_column(default="open")
    last_message_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)


Index("ix_thread_org_id_deal_id", Thread.org_id, Thread.deal_id)

