from datetime import datetime
from typing import Optional

from sqlalchemy import Index, JSON, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey

from app.models.base import Base


class Message(Base):
    __tablename__ = "message"

    thread_id: Mapped[str] = mapped_column(ForeignKey("thread.id"), index=True)
    org_id: Mapped[str] = mapped_column(index=True)
    direction: Mapped[str]
    channel: Mapped[str]
    body: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    attachments: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    sent_at: Mapped[Optional[datetime]] = mapped_column(index=True, nullable=True)
    delivered_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    read_at: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    provider_message_id: Mapped[Optional[str]] = mapped_column(index=True, nullable=True)
    status: Mapped[str] = mapped_column(default="pending")


Index("ix_message_thread_id_sent_at", Message.thread_id, Message.sent_at)

