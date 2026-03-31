# MixieRigs v2 — Full-Stack Architecture

**AI-Powered Oil & Gas Digital Twin Operations Platform**  
*HoloTwin, LLC · Powered by IntelliMedia Networks, Inc.*

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 · React 18 · TypeScript · Tailwind CSS |
| 3D Engine | Babylon.js v8 (PBR, shadows, ArcRotateCamera) |
| AI | Anthropic Claude (claude-sonnet-4-6) via API |
| Backend | Django 4.2 · Django REST Framework |
| Database | MongoDB (pymongo) |
| Deployment | Netlify (frontend) · Render/Railway (Django API) |

## Project Structure

```
mixierigs-v2/
├── frontend/          # Next.js 14 app
│   ├── src/
│   │   ├── app/           # App Router pages + API routes
│   │   ├── components/    # React components
│   │   │   ├── layout/    # Topbar, Sidebar, Shell, Login
│   │   │   ├── dashboard/ # Fleet dashboard, Alert center
│   │   │   ├── rig/       # Rig detail, subsystem tabs
│   │   │   ├── ai/        # MixieAI chat panel
│   │   │   └── ui/        # Shared UI components
│   │   ├── contexts/      # React context (AppContext)
│   │   └── lib/           # Types, data, hooks
│   ├── netlify.toml
│   └── .env.local
└── backend/           # Django REST API
    ├── rigs/          # Rig CRUD endpoints
    ├── alerts/        # Alerts + acknowledgement
    ├── ai_service/    # AI chat + situation analysis
    └── requirements.txt
```

## Quick Start

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev                   # http://localhost:3000
```

### Backend (optional — frontend uses mock data without it)
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python manage.py runserver    # http://localhost:8000
```

## Deploy to Netlify

```bash
cd frontend
npm run build
# Push to GitHub → connect Netlify → auto-deploy on push
```

Set these environment variables in Netlify dashboard:
- `ANTHROPIC_API_KEY` — your Anthropic API key
- `DJANGO_API_URL` — your deployed Django API URL (optional)

## Demo Accounts

| Role | Email |
|---|---|
| Platform Admin | admin@mixierigs.com |
| Customer Admin (Shell) | ops@shell.com |
| Driller | driller@shell.com |
| OIM (TexOil) | ops@texoil.com |

## License
Proprietary — HoloTwin, LLC. All rights reserved.
