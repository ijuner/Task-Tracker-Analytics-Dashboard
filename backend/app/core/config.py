from pydantic_settings import BaseSettings

from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Task Tracker & Analytics Dashboard"
    API_VERSION: str = "v1"

    # CORS settings
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    # Database settings
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int


    class Config:
        env_file = ".env"

# Instantiate settings
settings = Settings()




