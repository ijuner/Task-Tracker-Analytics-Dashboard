from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    name: str = "Adrian"

settings = Settings()
print(settings.name)
