from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.db import SessionLocal
from app.core.rbac import require_scopes
from app.core.security import TokenData
from app.models.property import Property
from app.schemas.property import PropertyCreate, PropertyOut, PropertyUpdate

router = APIRouter(prefix="/properties", tags=["properties"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("", response_model=PropertyOut, dependencies=[Depends(require_scopes("write:property"))])
def create_property(payload: PropertyCreate, user: TokenData = Depends(require_scopes("write:property")), db: Session = Depends(get_db)):
    item = Property(org_id=user.org_id, **payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.get("", response_model=List[PropertyOut], dependencies=[Depends(require_scopes("read:property"))])
def list_properties(
    city: Optional[str] = None,
    state: Optional[str] = None,
    min_price: Optional[int] = Query(None, ge=0),
    max_price: Optional[int] = Query(None, ge=0),
    beds_min: Optional[float] = None,
    baths_min: Optional[float] = None,
    q: Optional[str] = None,
    limit: int = Query(25, le=100),
    offset: int = Query(0, ge=0),
    user: TokenData = Depends(require_scopes("read:property")),
    db: Session = Depends(get_db)
):
    query = db.query(Property).filter(Property.org_id == user.org_id)
    if city: query = query.filter(Property.city.ilike(f"%{city}%"))
    if state: query = query.filter(Property.state == state)
    if min_price is not None: query = query.filter(Property.price >= min_price)
    if max_price is not None: query = query.filter(Property.price <= max_price)
    if beds_min is not None: query = query.filter(Property.beds >= beds_min)
    if baths_min is not None: query = query.filter(Property.baths >= baths_min)
    if q: query = query.filter(Property.street.ilike(f"%{q}%"))
    return query.order_by(Property.updated_at.desc()).offset(offset).limit(limit).all()

@router.get("/{property_id}", response_model=PropertyOut, dependencies=[Depends(require_scopes("read:property"))])
def get_property(property_id: str, user: TokenData = Depends(require_scopes("read:property")), db: Session = Depends(get_db)):
    item = db.query(Property).filter_by(id=property_id, org_id=user.org_id).first()
    if not item:
        raise HTTPException(404, "Not found")
    return item

@router.patch("/{property_id}", response_model=PropertyOut, dependencies=[Depends(require_scopes("write:property"))])
def update_property(property_id: str, payload: PropertyUpdate, user: TokenData = Depends(require_scopes("write:property")), db: Session = Depends(get_db)):
    item = db.query(Property).filter_by(id=property_id, org_id=user.org_id).first()
    if not item:
        raise HTTPException(404, "Not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(item, k, v)
    db.commit()
    db.refresh(item)
    return item
