from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Index
from typing import Optional
from app.models.base import Base

class Property(Base):
    __tablename__ = "property"
    org_id: Mapped[str] = mapped_column(index=True)
    mls_id: Mapped[Optional[str]] = mapped_column(index=True, nullable=True)
    street: Mapped[str] = mapped_column(index=True)
    city: Mapped[str] = mapped_column(index=True)
    state: Mapped[str] = mapped_column(index=True)
    postal_code: Mapped[str] = mapped_column(index=True)
    lat: Mapped[Optional[float]]
    lon: Mapped[Optional[float]]
    price: Mapped[Optional[int]]
    beds: Mapped[Optional[float]]
    baths: Mapped[Optional[float]]
    sqft: Mapped[Optional[int]]
    lot_sqft: Mapped[Optional[int]]
    year_built: Mapped[Optional[int]]
    property_type: Mapped[Optional[str]]
    status: Mapped[Optional[str]]  # active, pending, sold, off
    dom: Mapped[Optional[int]]

Index("ix_property_geo", Property.lat, Property.lon)
