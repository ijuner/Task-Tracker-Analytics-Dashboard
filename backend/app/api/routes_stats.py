from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Task, User
from app.core.security import get_current_user

router = APIRouter()

@router.get("/stats/status")
def status_distribution(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    statuses = ["todo", "in-progress", "done"]
    result = {}
    for status in statuses:
        count = db.query(Task).filter(Task.owner_id == current_user.id, Task.status == status).count()
        result[status] = count
    return result

@router.get("/stats/priority")
def priority_distribution(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    priorities = ["low", "medium", "high"]
    result = {}
    for priority in priorities:
        count = db.query(Task).filter(Task.owner_id == current_user.id, Task.priority == priority).count()
        result[priority] = count
    return result
