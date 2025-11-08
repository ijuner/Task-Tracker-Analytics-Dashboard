from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Task Tracker & Analytics Dashboard"
    API_VERSION: str = "v1"

    # CORS 设置
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    # 数据库配置
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

# ✅ 这行非常关键，确保 main.py 能正确导入
settings = Settings()
