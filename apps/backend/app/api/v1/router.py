from fastapi import APIRouter
from .property import router as property_router
from .health import router as health_router

api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(property_router)
