from pydantic import BaseModel

class TokenData(BaseModel):
    sub: str
    org_id: str
    scopes: list[str] = []

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    org_id: str
    is_admin: bool
