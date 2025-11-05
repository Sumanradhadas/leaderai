# Campaign Hub - Multi-Tenant Political Campaign Platform

## Overview
A scalable platform for creating AI-powered political campaign websites. Each leader gets a fully customized campaign site with the same powerful functionality - AI photo generation, token management, and content control.

## Project Structure

### Multi-Tenant Architecture
The platform is designed to support multiple political leaders from a single codebase:
- **Campaign Sites**: Each leader gets a unique branded experience at their own URL
- **Centralized Admin Panel**: One admin dashboard to manage all campaigns
- **Config-Based Customization**: Easy leader addition through simple configuration files

### File Organization
```
client/src/
├── components/          # Reusable UI components
│   ├── CampaignHero.tsx        # Full-screen hero section
│   ├── AboutSection.tsx        # Leader bio and party info
│   ├── PhotoGenerator.tsx      # AI image generation interface
│   ├── HowItWorks.tsx          # Step-by-step guide
│   ├── Gallery.tsx             # Example images showcase
│   ├── Manifesto.tsx           # Policy/vision section
│   ├── CampaignFooter.tsx      # Campaign footer
│   ├── TokenBadge.tsx          # Token counter display
│   ├── GenerationModal.tsx     # Image generation overlay
│   ├── AdminDashboard.tsx      # Stats overview
│   ├── AdminTokenManager.tsx   # Token CRUD
│   ├── AdminContentEditor.tsx  # Content management
│   ├── AdminTemplateManager.tsx # Template CRUD
│   └── AdminGenerationLogs.tsx  # Activity history
├── pages/
│   ├── CampaignSite.tsx  # Main campaign landing page
│   └── AdminPanel.tsx    # Admin interface
shared/
└── schema.ts             # Data models for campaigns, templates, logs
```

## Features

### Campaign Site Features
1. **Hero Section**: Full-screen impact with leader image, slogan, and CTA
2. **About Section**: Leader biography, party logo, and message
3. **How It Works**: Step-by-step guide for users
4. **Photo Generator**: 
   - Upload user photo
   - Select from available templates
   - AI-powered image generation
   - Download and share functionality
5. **Gallery**: Showcase of example generated images
6. **Manifesto**: Rich text policy section above footer
7. **Token System**: Real-time balance display

### Admin Panel Features
1. **Dashboard**: Overview of token usage, generations, and popular templates
2. **Token Management**: Add/view token balance
3. **Content Editor**: 
   - Update leader name, party name, slogan
   - Edit about message and manifesto
   - Customize party colors (primary/secondary)
   - Upload hero images, portraits, and logos
4. **Template Manager**: 
   - Upload/delete templates
   - Each template has: name, thumbnail, main image, prompt
5. **Generation Logs**: Track all image generations with timestamps

## Adding a New Leader Campaign

To add a new political leader (e.g., "Sarah Johnson"):

1. **Create Leader Config** (future):
   - Add entry to `campaigns` table with all branding details
   - Upload leader's images (hero, portrait, party logo)
   - Set party colors (hex codes)

2. **Add Templates**:
   - Upload 3-5 campaign templates via admin panel
   - Each template needs thumbnail and generation prompt

3. **Set Token Balance**:
   - Allocate initial tokens via admin panel
   - Monitor usage through dashboard

4. **Customize Content**:
   - Write about message
   - Add manifesto/policy sections
   - Set campaign slogan

## Data Model

### Campaign
- Leader name, party name, slogan
- Hero image, portrait, party logo
- About message, manifesto
- Primary/secondary colors
- Token balance

### Template
- Name, thumbnail, main image
- AI generation prompt
- Associated campaign

### Generation Log
- Timestamp
- Template used
- Tokens consumed
- Campaign reference

## Technology Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **UI Components**: Shadcn UI
- **AI**: Gemini 2.5 Flash API
- **Database**: PostgreSQL (platform-agnostic via DATABASE_URL)
- **Backend**: Express.js with Drizzle ORM
- **Deployment**: Fully portable - works on any platform (Vercel, Railway, Fly.io, Docker, etc.)

## Admin Access
**Default Admin Password**: `admin123`
- Change this in `client/src/pages/AdminPanel.tsx` (line with `const ADMIN_PASSWORD`)
- Admin panel accessible at `/admin` route
- Password protection prevents unauthorized access to campaign management

## Environment Setup
- **Node.js**: 20+ required
- **Database**: PostgreSQL via DATABASE_URL (works with any PostgreSQL provider)
- **Port Configuration**: Server runs on port 5000 (both API and frontend)
- **Platform Agnostic**: Zero vendor lock-in - deploy anywhere
- **Docker Support**: Dockerfile included for containerized deployment

## Current Status
✅ Frontend prototype complete with all components
✅ Multi-tenant architecture implemented
✅ Design system implemented
✅ Admin password protection added
✅ Token counter moved to footer
✅ Backend storage interface ready
✅ PostgreSQL database configured and tables created
✅ Development environment setup complete
✅ **Platform-agnostic deployment ready** - Works on Vercel, Railway, Fly.io, Docker, etc.
✅ Backend API routes implemented (campaigns, templates, logs, tokens)
✅ Gemini AI integration complete with image generation
✅ Database storage implementation (using PostgreSQL with Drizzle ORM)
✅ Campaign Site updated to use APIs for data fetching
✅ Database seeded with initial campaign and templates
✅ **Admin Panel API integration COMPLETE** - All handlers connected to real database
✅ **Admin changes now persist and reflect on campaign site**
✅ **Token management bug fixed** - Add tokens working properly
✅ **Deployment documentation complete** - See DEPLOYMENT.md for 5+ platform options
🔄 Authentication/Authorization for admin routes (security enhancement needed)
🔄 Request body validation with Zod schemas (enhancement needed)

## Backend API Endpoints
- `GET /api/campaigns/:id` - Get campaign by ID
- `GET /api/campaigns` - Get all campaigns
- `PATCH /api/campaigns/:id` - Update campaign
- `POST /api/campaigns` - Create new campaign
- `GET /api/templates/:campaignId` - Get templates for campaign
- `POST /api/templates` - Create new template
- `DELETE /api/templates/:id` - Delete template
- `GET /api/logs/:campaignId` - Get generation logs
- `POST /api/logs` - Create generation log
- `PATCH /api/campaigns/:id/tokens` - Add/remove tokens
- `POST /api/generate` - Generate AI image with Gemini (requires GEMINI_API_KEY)

## Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string (auto-configured in Replit)
- `GEMINI_API_KEY` - Google Gemini AI API key for image generation (**REQUIRED** for photo generation feature)

## Next Steps
1. **Get Gemini API Key**: Ask for GEMINI_API_KEY to enable AI image generation
2. **Complete Admin Panel Integration**: Update admin handlers to call API endpoints
3. **Add Authentication**: Implement backend authentication/authorization for admin routes
4. **Add Request Validation**: Use Zod schemas to validate request bodies
5. Implement multi-campaign switching in admin
6. Add image cropping/processing for white border removal
7. Deploy and test with first client campaign

## Development
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Database Push**: `npm run db:push` (sync schema changes to database)
- **Database Seed**: `npm run seed` (populate with initial data)
- **Type Check**: `npm run check`

## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides for:
- Vercel + Neon (Free tier available)
- Railway (Simple, all-in-one)
- Fly.io (Performance-focused)
- Render (Full-featured)
- Docker (Self-hosted)

**No platform lock-in!** This application uses standard PostgreSQL and can be deployed anywhere.
