from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine
from app.db.base import init_db

from app.api import routes_tasks, routes_auth, routes_stats
from app.core.config import settings

app = FastAPI(
    title="Task Tracker & Analytics Dashboard",
    description="Enterprise-grade task management API with analytics",
    version="1.0.0"
)

init_db()  # 启动时自动创建表（仅开发环境使用）

# test
print(settings.PROJECT_NAME) 
print("✅ 数据库连接成功：", engine)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 路由注册
app.include_router(routes_auth.router, prefix="/auth", tags=["Auth"])
app.include_router(routes_tasks.router, prefix="/tasks", tags=["Tasks"])
app.include_router(routes_stats.router, prefix="/stats", tags=["Stats"])

# 健康检查
@app.get("/health", tags=["System"])
def health_check():
    return {"status": "ok"}
