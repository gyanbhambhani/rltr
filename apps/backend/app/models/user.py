from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class User(Base):
    __tablename__ = "app_user"
    org_id: Mapped[str] = mapped_column(index=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    name: Mapped[str]
    is_admin: Mapped[bool] = mapped_column(default=False)
