from fastapi import Depends, HTTPException, status
from app.core.security import TokenData, get_current

def require_scopes(*required: str):
    def dep(user: TokenData = Depends(get_current)):
        if not set(required).issubset(set(user.scopes)):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient scope")
        return user
    return dep
