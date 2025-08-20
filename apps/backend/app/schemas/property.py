from pydantic import BaseModel, Field
from typing import Optional

class PropertyBase(BaseModel):
    street: str
    city: str
    state: str
    postal_code: str
    lat: Optional[float] = None
    lon: Optional[float] = None
    price: Optional[int] = None
    beds: Optional[float] = None
    baths: Optional[float] = None
    sqft: Optional[int] = None
    lot_sqft: Optional[int] = None
    year_built: Optional[int] = None
    property_type: Optional[str] = None
    status: Optional[str] = None
    dom: Optional[int] = None
    mls_id: Optional[str] = None

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    price: Optional[int] = None
    status: Optional[str] = None
    dom: Optional[int] = None

class PropertyOut(PropertyBase):
    id: str
