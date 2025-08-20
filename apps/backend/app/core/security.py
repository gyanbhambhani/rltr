from datetime import datetime, timedelta, timezone
import jwt
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer
from pydantic import BaseModel

from app.core.config import settings

bearer = HTTPBearer(auto_error=True)

class TokenData(BaseModel):
    sub: str
    org_id: str
    scopes: list[str] = []

def create_access_token(sub: str, org_id: str, scopes: list[str]):
    expire = datetime.now(tz=timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": sub, "org_id": org_id, "scopes": scopes}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")

def get_current(token = Depends(bearer)) -> TokenData:
    try:
        payload = jwt.decode(token.credentials, settings.SECRET_KEY, algorithms=["HS256"])
        return TokenData(**payload)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
