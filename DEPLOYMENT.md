# Deployment Guide - Campaign Hub

This application is fully platform-agnostic and can be deployed to any hosting provider that supports Node.js and PostgreSQL.

## Prerequisites

1. **PostgreSQL Database** (any provider)
2. **Gemini API Key** (for AI image generation)
3. **Node.js 20+** runtime environment

## Platform Deployment Guides

### 🚀 Option 1: Railway

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Add PostgreSQL service: "New" → "Database" → "PostgreSQL"
4. Set environment variables in Railway dashboard:
   - `DATABASE_URL` (auto-populated by Railway)
   - `GEMINI_API_KEY` (from Google AI Studio)
   - `PORT=5000`
5. Deploy automatically on git push

**Cost**: ~$5-10/month (includes database)

---

### 🚀 Option 2: Vercel + Neon

1. **Database Setup (Neon)**
   - Sign up at [neon.tech](https://neon.tech)
   - Create new project → Get connection string
   - Copy `DATABASE_URL`

2. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```
   
3. **Add Environment Variables** (Vercel Dashboard):
   - `DATABASE_URL` (from Neon)
   - `GEMINI_API_KEY`

4. **Run Database Migration**
   ```bash
   npm run db:push
   ```

**Cost**: Free (Vercel hobby + Neon free tier)

---

### 🚀 Option 3: Fly.io

1. Install Fly CLI:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. Create `fly.toml`:
   ```toml
   app = "your-campaign-hub"
   
   [build]
     dockerfile = "Dockerfile"
   
   [env]
     PORT = "5000"
   
   [[services]]
     internal_port = 5000
     protocol = "tcp"
   
     [[services.ports]]
       handlers = ["http"]
       port = 80
   
     [[services.ports]]
       handlers = ["tls", "http"]
       port = 443
   ```

3. Add PostgreSQL:
   ```bash
   fly postgres create
   fly postgres attach <postgres-app-name>
   ```

4. Set secrets:
   ```bash
   fly secrets set GEMINI_API_KEY=your_key_here
   ```

5. Deploy:
   ```bash
   fly deploy
   ```

**Cost**: ~$3-8/month

---

### 🚀 Option 4: Docker (Self-hosted)

1. **Create docker-compose.yml**:
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - DATABASE_URL=postgresql://postgres:password@db:5432/campaignhub
         - GEMINI_API_KEY=${GEMINI_API_KEY}
       depends_on:
         - db
     
     db:
       image: postgres:16-alpine
       environment:
         - POSTGRES_DB=campaignhub
         - POSTGRES_PASSWORD=password
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

2. **Deploy**:
   ```bash
   docker-compose up -d
   ```

**Cost**: Free (your own server)

---

### 🚀 Option 5: Render

1. Create account at [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Add PostgreSQL: "New" → "PostgreSQL"
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Environment Variables**:
     - `DATABASE_URL` (auto-set by Render)
     - `GEMINI_API_KEY`

**Cost**: $7/month (web service) + $7/month (database)

---

## Environment Variables Reference

All platforms need these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `PORT` | Server port (optional) | `5000` (default) |
| `NODE_ENV` | Environment | `production` |

## Database Setup

After deployment, run the database migration:

```bash
# Set your DATABASE_URL first
export DATABASE_URL="your_connection_string"

# Push schema to database
npm run db:push

# Seed initial data (optional)
npm run seed
```

## PostgreSQL Provider Options

Choose any PostgreSQL provider:

1. **Neon** - Free tier, serverless → [neon.tech](https://neon.tech)
2. **Supabase** - Free tier, includes auth → [supabase.com](https://supabase.com)
3. **Railway** - Simple setup → [railway.app](https://railway.app)
4. **Vercel Postgres** - Integrated with Vercel → Built-in
5. **AWS RDS** - Enterprise-grade → AWS Console
6. **Google Cloud SQL** - Managed PostgreSQL → GCP Console

All work the same - just copy the `DATABASE_URL` connection string!

## Backup & Migration

### Export Database
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Import to New Database
```bash
psql $NEW_DATABASE_URL < backup.sql
```

## Platform Comparison

| Platform | Setup Time | Monthly Cost | Best For |
|----------|------------|--------------|----------|
| **Vercel + Neon** | 5 min | Free | Quick start |
| **Railway** | 3 min | $5-10 | Simplicity |
| **Fly.io** | 10 min | $3-8 | Performance |
| **Render** | 5 min | $14 | Full-featured |
| **Docker** | 15 min | Free | Full control |

## No Replit Dependencies!

This application uses only standard technologies:
- ✅ Standard PostgreSQL (works anywhere)
- ✅ Standard Node.js/Express (works anywhere)
- ✅ Standard environment variables (works anywhere)
- ✅ Docker support (works anywhere)

**Zero vendor lock-in!** Deploy wherever you want.
