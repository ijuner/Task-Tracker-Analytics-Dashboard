from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskOut
from app.core.security import get_current_user
from app.db.models import User
from datetime import datetime
from fastapi import Query
from typing import List, Optional

router = APIRouter()

# create task
@router.post("/", response_model=TaskOut)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = Task(**task.model_dump(), owner_id=current_user.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


# query all tasks
@router.get("/", response_model=list[TaskOut])
def get_all_tasks(
    status: Optional[str] = Query(None, description="Filter by status: todo, in_progress, done"),
    search: Optional[str] = Query(None, description="Search by keyword in title or description"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Tasks per page"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Task).filter(Task.owner_id == current_user.id)

    if status:
        query = query.filter(Task.status == status)
    if priority:
        query = query.filter(Task.priority == priority) 
    if search:
        keyword = f"%{search}%"
        query = query.filter(
            Task.title.ilike(keyword) | Task.description.ilike(keyword)
        )

    tasks = query.offset((page - 1) * page_size).limit(page_size).all()
    return tasks

# update task
@router.put("/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)

    # set completed automatically completed_at
    if "completed" in update_data:
        db_task.completed_at = datetime.utcnow() if update_data["completed"] else None

    db.commit()
    db.refresh(db_task)
    return db_task


# delete task
@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = db.query(Task).filter(Task.id == task_id, Task.owner_id == current_user.id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": f"Task {task_id} deleted"}
