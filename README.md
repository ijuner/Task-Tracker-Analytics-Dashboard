# Task-Tracker-Analytics-Dashboard
Task Tracker &amp; Analytics Dashboard Web App where users can create, update, and visualize tasks. The app include a backend API and a frontend dashboard and all the lifecycle of development..

Stack: FastAPI (backend) + React + TypeScript (frontend)
Features:

    User registration, login, JWT-based authentication
    Task CRUD: title, description, status, priority, timestamps
    Advanced filtering by status, priority, search
    Analytics endpoints: task status distribution, priority distribution

Structure:
    backend/app/ with modular folders: api, core, db, schemas
    frontend/src/ with components, context, pages, api
    Deployment-ready: Dockerized with docker-compose.yml

Issues encountered:
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

