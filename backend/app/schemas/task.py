from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    priority: str

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    status: Optional[str]
    priority: Optional[str]
    completed_at: Optional[datetime]

class TaskOut(TaskBase):
    id: int
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        orm_mode = True
