# 🎟️ Support Ticket System with LLM Classification

A full-stack Support Ticket System that allows users to create, manage, and analyze support tickets. The system integrates an LLM to automatically classify tickets and suggest priority levels, with user override capability.

---

## 🚀 Features

### 🧩 Core Functionality
- Create, update, and list support tickets
- Filter and browse tickets
- View aggregated ticket statistics

### 🤖 LLM Integration
- Automatically categorizes tickets based on description
- Suggests priority levels (low, medium, high)
- Users can review and override suggestions
- Graceful fallback if API key is unavailable

### 🌐 Frontend
- Simple React UI (Vite)
- Ticket submission form
- Real-time classification preview
- Ticket listing dashboard

### ⚙️ Backend
- Django + Django REST Framework
- RESTful API design
- Modular architecture
- SQLite (for simplicity)

### 🐳 DevOps
- Fully Dockerized (Backend + Frontend)
- Docker Compose for one-command startup

---

## 🏗️ Project Structure
ticket-system/
├── backend/
│ ├── config/
│ ├── tickets/
│ ├── manage.py
│ ├── requirements.txt
│ └── .env
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
├── docker-compose.yml
└── README.md


---

## ⚡ Getting Started

### 🔹 Option 1: Run with Docker (Recommended)

```bash
docker-compose up --build

Access:

Frontend: http://localhost:5173

Backend: http://localhost:8000/api/tickets/

🔹 Option 2: Manual Setup
Backend
cd backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
Frontend
cd frontend
npm install
npm run dev
🔐 Environment Variables

Create a .env file inside backend/:

OPENAI_API_KEY=your_api_key_here

⚠️ If no API key is provided, the system uses a fallback classification.



📡 API Endpoints

Tickets
GET /api/tickets/ → List tickets
POST /api/tickets/ → Create ticket
PATCH /api/tickets/{id}/ → Update ticket

LLM Classification
POST /api/tickets/classify/ → Get category & priority suggestion

Stats
GET /api/tickets/stats/ → Aggregated ticket metrics



🧠 Tech Stack

Backend
Python
Django
Django REST Framework

Frontend
React (Vite)
Axios

DevOps
Docker
Docker Compose

AI Integration
OpenAI API (LLM-based classification)


📊 Example Workflow
User enters ticket description
LLM suggests category & priority
User reviews/overrides suggestion
Ticket is saved
Dashboard updates


🧪 Future Improvements
Authentication (JWT)
PostgreSQL integration
Advanced filtering & search
UI enhancements
Deployment (AWS / Render)


🎯 Key Highlights
Built a full-stack system from scratch
Integrated LLM for intelligent automation
Designed clean REST APIs
Dockerized for easy deployment



👨‍💻 Author
Palash Sinha

⭐ If you found this useful, consider giving it a star!