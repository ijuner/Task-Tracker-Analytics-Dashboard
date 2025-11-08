# Task-Tracker-Analytics-Dashboard
Task Tracker &amp; Analytics Dashboard Web App where users can create, update, and visualize tasks. The app include a backend API and a frontend dashboard and all the lifecycle of development..

## Stack: FastAPI (backend) + React + TypeScript (frontend)
Features:

    User registration, login, JWT-based authentication
    Task CRUD: title, description, status, priority, timestamps
    Advanced filtering by status, priority, search
    Analytics endpoints: task status distribution, priority distribution

## Structure:
    backend/app/ with modular folders: api, core, db, schemas
    frontend/src/ with components, context, pages, api
    Deployment-ready: Dockerized with docker-compose.yml

## Issues encountered:
    ImportError: cannot import name 'get_db' → fixed by importing from session.py
    User model not found → resolved by defining User in models.py
    PydanticUserError due to OAuth2PasswordBearer in Settings → fixed by moving it outside the class
    AttributeError: 'Settings' object has no attribute 'oauth2_scheme' → resolved by using module-level import
    ModuleNotFoundError: No module named 'app' → fixed by running from project root with correct module path
    OperationalError: could not translate host name "db" → resolved by switching POSTGRES_HOST=db to localhost for local dev
    email-validator not installed → resolved by installing pydantic[email]

Setup Instructions:
###  1. Clone the repo
    ```bash
    git clone https://github.com/ijuner/Task-Tracker-Analytics-Dashboard.git
    cd Task-Tracker-Analytics-Dashboard
###  2. Backend Setup
    Install PostgreSQL locally and create a database
    Update .env with:
        POSTGRES_HOST=localhost
    Install dependencies:
        cd backend
        pip install -r requirements.txt
    uvicorn app.main:app --reload
###  3. Frontend Setup
    cd frontend
    npm install
    npm run dev

###  ********************************* API Endpoints **********************************

POST	/register	Register new user
POST	/login	Login and receive JWT token
GET	/me	Get current user info
POST	/tasks	Create a new task
GET	/tasks	Get tasks with filters
PATCH	/tasks/{id}	Update task
DELETE	/tasks/{id}	Delete task
GET	/stats/status	Task status distribution
GET	/stats/priority	Task priority distribution

###  ********************************* Common Issues & Fixes **********************************

ImportError: cannot import name 'get_db'	Import from session.py instead of base.py
User model not found	Ensure User is defined in models.py
PydanticUserError	Move OAuth2PasswordBearer outside Settings class
AttributeError: 'Settings' object has no attribute 'oauth2_scheme'	Use module-level import
ModuleNotFoundError: No module named 'app'	Run from project root with backend.app.main:app
OperationalError: could not translate host name "db"	Use localhost for local dev
email-validator not installed	Run pip install "pydantic[email]"



## Backend (FastAPI)
Platform: Render

Method: Web Service with Python environment

Root Directory: backend

Build Command: pip install -r requirements.txt

Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT

Environment Variables: Loaded from .env.production


## Frontend (React)
Platform: Render Static Site or Vercel

Build Command: npm install && npm run build

Publish Directory: dist

Environment Variables: API base URL configured in .env

Database
Option A: Local PostgreSQL for dev

Live Demo
access url: https://task-tracker-analytics-dashboard.onrender.com


## Limitations & Areas for Improvement
While the Task Tracker & Analytics Dashboard demonstrates a solid full-stack architecture and functional feature set, there are several areas that can be improved or extended:
### Backend Limitations
    . No production-grade user management Currently, user registration is open and lacks email verification, password reset, or role-based access control.

    . No rate limiting or throttling The API is publicly exposed without protection against brute-force attacks or abuse.

    . Limited error handling Some routes return generic HTTP errors without detailed validation messages or logging.

    . No pagination or sorting on task list The /tasks endpoint returns all tasks without pagination, which may affect performance with large datasets.

    . Analytics endpoints are basic /stats/status and /stats/priority provide counts but lack time-series trends or user-specific breakdowns.

    . No background jobs or async processing All operations are synchronous; long-running tasks (e.g., analytics aggregation) could benefit from Celery or FastAPI background tasks.
### Frontend Limitations
    . No form validation or error feedback Task forms and login lack robust validation (e.g., empty fields, invalid formats).

    . No loading states or skeletons API calls don’t show spinners or loading indicators, which affects UX during slow responses.

    . No persistent session storage JWT is stored in memory or localStorage without refresh token logic or expiration handling.

    . Limited mobile responsiveness While the layout is functional, some components may not adapt well to smaller screens.

    . No unit or integration tests The frontend lacks automated tests for components, pages, or API logic.

### Deployment & DevOps Limitations
    . No CI/CD pipeline Code is manually deployed; automated testing and deployment via GitHub Actions or Render hooks would improve reliability.

    . No monitoring or logging There’s no centralized logging or error tracking (e.g., Sentry, LogRocket, Prometheus).

    . Database not yet connected in production The backend is deployed, but PostgreSQL integration is pending due to platform limitations.

    . No HTTPS or custom domain The app runs on default Render URLs without SSL configuration or branded domain.


Summary:
    This project demonstrates full-stack proficiency across:
    API design and modular backend architecture
    Secure authentication and user isolation
    Responsive frontend with protected routing
    Docker-based deployment and environment management
    Real-world debugging and error resolution

