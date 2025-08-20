from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from typing import List

class Settings(BaseSettings):
    APP_ENV: str = "local"
    API_PREFIX: str = "/api"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    POSTGRES_URL: str
    REDIS_URL: str
    LOG_LEVEL: str = "INFO"
    CORS_ORIGINS: List[AnyHttpUrl] = []
    OTEL_EXPORTER: str = "none"

    model_config = {"env_file": ".env", "case_sensitive": True}

settings = Settings()
