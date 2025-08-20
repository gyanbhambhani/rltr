from fastapi import APIRouter
from app.core.db import engine

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/live")
def live():
    return {"ok": True}

@router.get("/ready")
def ready():
    try:
        with engine.connect() as _:
            pass
        return {"ok": True}
    except Exception:
        return {"ok": False}
