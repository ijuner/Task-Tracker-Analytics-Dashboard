from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.base import get_db
from app.db.models import Task, User
from app.core.security import get_current_user

router = APIRouter()

@router.get("/")
def get_user_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    total = db.query(func.count(Task.id)).filter(Task.owner_id == current_user.id).scalar()
    completed = db.query(func.count(Task.id)).filter(Task.owner_id == current_user.id, Task.completed == True).scalar()
    pending = total - completed

    avg_completion_time = db.query(
        func.avg(func.extract('epoch', Task.completed_at - Task.created_at))
    ).filter(Task.owner_id == current_user.id, Task.completed == True).scalar()

    return {
        "total_tasks": total,
        "completed_tasks": completed,
        "pending_tasks": pending,
        "average_completion_time_seconds": round(avg_completion_time or 0, 2)
    }
