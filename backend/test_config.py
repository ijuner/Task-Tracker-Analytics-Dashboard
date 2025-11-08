from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    name: str = "Helena"

settings = Settings()
print(settings.name)
