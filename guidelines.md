# Project Guidelines & Reference

> **Last Updated:** February 15, 2026  
> **Project Status:** Development Complete / Production Ready

---

## 📋 Project Information

- **Project Name:** Profile Guestbook App
- **Repository:** [lMarul/WEBPROG-Finals](https://github.com/lMarul/WEBPROG-Finals)
- **Owner:** lMarul (Marwin John Gonzales)
- **Version:** 1.0.0
- **License:** MIT
- **Local Path:** `C:\Users\Maru\Desktop\Projects\React, Nest.js, Supabase App`

---

## 🎯 What This Project Is About

This is a **personal profile website with guestbook functionality** that allows visitors to:

- View the owner's profile information (name, bio, skills, social links)
- Sign a digital guestbook with their name and message
- **Full CRUD operations** on guestbook entries:
  - ✅ **CREATE:** Add new guestbook entries
  - ✅ **READ:** View all guestbook entries
  - ✅ **UPDATE:** Edit existing entries
  - ✅ **DELETE:** Remove entries

### Key Features

- **Modern UI/UX:** Beautiful, responsive design with red and black theme
- **Real-time Updates:** Instant feedback on all operations
- **Form Validation:** Both client-side and server-side validation
- **Error Handling:** Graceful error handling with user-friendly messages
- **Serverless Architecture:** Deployed on Vercel with serverless functions
- **Database Security:** Row-level security with Supabase

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Framework |
| **Vite** | 5.4.21 | Build tool & dev server |
| **TypeScript** | 5.3.3 | Type safety |
| **React Router** | 6.21.1 | Client-side routing |
| **Tailwind CSS** | 3.4.0 | Styling framework |
| **Lucide React** | 0.303.0 | Icon library |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | 10.3.0 | Backend framework |
| **TypeScript** | 5.3.3 | Type safety |
| **Express** | 4.18.2 | HTTP server |
| **class-validator** | 0.14.0 | DTO validation |
| **class-transformer** | 0.5.1 | Object transformation |

### Database & Services

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.39.0 | PostgreSQL database + Auth |
| **Supabase JS Client** | 2.39.0 | Database client |

### Deployment

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting & serverless functions |
| **GitHub** | Version control & CI/CD |

### Development Tools

- **Node.js:** >= 20.0.0
- **npm:** Package manager
- **Concurrently:** Run multiple dev servers
- **ESLint:** Code linting
- **Prettier:** Code formatting

---

## 🎨 Design Theme

The application uses a **red and black theme**:

- **Primary Colors:** Red variants (#ef4444, #dc2626, #991b1b)
- **Background:** Pure black with red accents
- **Gradients:** Red-to-dark-red gradients
- **Borders:** Red-900 variants with transparency
- **Accent Elements:** Red highlights on hover/focus states

---

## 📁 Project Structure

```
profile-guestbook-app/
├── api/                           # Vercel Serverless Function
│   ├── index.ts                  # API entry point for Vercel
│   └── tsconfig.json             # TypeScript config for API
│
├── backend/                       # NestJS Backend
│   ├── src/
│   │   ├── guestbook/            # Guestbook CRUD module
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── guestbook.controller.ts
│   │   │   ├── guestbook.service.ts
│   │   │   └── guestbook.module.ts
│   │   ├── profile/              # Profile module
│   │   │   ├── dto/
│   │   │   ├── profile.controller.ts
│   │   │   ├── profile.service.ts
│   │   │   └── profile.module.ts
│   │   ├── supabase/             # Supabase client module
│   │   │   ├── supabase.service.ts
│   │   │   └── supabase.module.ts
│   │   ├── health/               # Health check endpoint
│   │   │   ├── health.controller.ts
│   │   │   └── health.module.ts
│   │   ├── app.module.ts         # Root app module
│   │   └── main.ts               # Application entry point
│   ├── dist/                     # Compiled JavaScript (build output)
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
│
├── frontend/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── Layout.tsx        # Main layout wrapper
│   │   │   ├── Navbar.tsx        # Navigation bar
│   │   │   ├── Footer.tsx        # Footer component
│   │   │   └── LoadingSpinner.tsx # Loading states
│   │   ├── pages/                # Page components
│   │   │   ├── HomePage.tsx      # Profile page
│   │   │   ├── GuestbookPage.tsx # Guestbook with CRUD
│   │   │   └── NotFoundPage.tsx  # 404 page
│   │   ├── services/             # API service layer
│   │   │   └── api.ts            # API client
│   │   ├── types/                # TypeScript type definitions
│   │   │   └── index.ts
│   │   ├── App.tsx               # App component with routing
│   │   ├── main.tsx              # React entry point
│   │   └── index.css             # Global styles + Tailwind
│   ├── public/                   # Static assets
│   ├── dist/                     # Build output
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── Prompts/                       # Project prompts/documentation
│   ├── Prompt-1.md
│   ├── Prompt-2.md
│   └── Prompt-3.md
│
├── .env                          # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── package.json                  # Root package.json
├── vercel.json                   # Vercel deployment config
├── README.md                     # Project README
└── guidelines.md                 # This file
```

---

## 💻 Important Commands

### Installation

```bash
# Install all dependencies (root + backend + frontend)
npm run install:all

# Install root dependencies only
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd frontend && npm install
```

### Development

```bash
# Run both backend and frontend concurrently
npm run dev

# Run backend only (localhost:3000)
npm run dev:backend

# Run frontend only (localhost:5173)
npm run dev:frontend
```

### Building

```bash
# Build both backend and frontend
npm run build

# Build backend only (outputs to backend/dist/)
npm run build:backend

# Build frontend only (outputs to frontend/dist/)
npm run build:frontend
```

### Production

```bash
# Start backend in production mode
npm start

# Or navigate to backend
cd backend && npm run start:prod
```

### Backend-Specific Commands

```bash
cd backend

# Development with watch mode
npm run start:dev

# Debug mode
npm run start:debug

# Format code with Prettier
npm run format

# Lint code
npm run lint

# Run tests
npm run test
npm run test:watch
npm run test:cov
```

### Frontend-Specific Commands

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🔄 Development Workflow

### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/lMarul/WEBPROG-Finals.git
cd WEBPROG-Finals

# Install all dependencies
npm run install:all

# Set up environment variables
# Copy .env.example to .env and fill in Supabase credentials
# (Note: .env already exists in project with valid credentials)
```

### 2. Supabase Database Setup

Run this SQL in Supabase SQL Editor:

```sql
-- Create the guestbook table
CREATE TABLE guestbook (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Allow public access to guestbook"
ON guestbook FOR ALL
USING (true)
WITH CHECK (true);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_guestbook_updated_at
  BEFORE UPDATE ON guestbook
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3. Running Locally

```bash
# Start development servers
npm run dev

# Frontend: http://localhost:5173
# Backend API: http://localhost:3000/api
```

### 4. Testing the API

```bash
# Health check
curl http://localhost:3000/api/health

# Get all guestbook entries
curl http://localhost:3000/api/guestbook

# Create a new entry
curl -X POST http://localhost:3000/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "message": "Hello!"}'

# Update an entry
curl -X PUT http://localhost:3000/api/guestbook/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "message": "Updated message"}'

# Delete an entry
curl -X DELETE http://localhost:3000/api/guestbook/1
```

### 5. Building for Production

```bash
# Build both frontend and backend
npm run build

# Verify builds exist
ls backend/dist
ls frontend/dist
```

### 6. Deployment to Vercel

**Via Vercel Dashboard:**

1. Push code to GitHub
2. Import repository in Vercel
3. Configure:
   - **Framework:** Other
   - **Root Directory:** `.` (root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm run install:all`
4. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `VITE_API_URL=/api`
5. Deploy

**Via Vercel CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🔌 API Endpoints

### Base URL

- **Local:** `http://localhost:3000/api`
- **Production:** `https://your-app.vercel.app/api`

### Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/health` | Health check | - |
| GET | `/api/profile` | Get profile info | - |
| GET | `/api/guestbook` | Get all entries | - |
| GET | `/api/guestbook/:id` | Get single entry | - |
| GET | `/api/guestbook/count` | Get entry count | - |
| POST | `/api/guestbook` | Create entry | `{name, message}` |
| PUT | `/api/guestbook/:id` | Update entry | `{name?, message?}` |
| DELETE | `/api/guestbook/:id` | Delete entry | - |

### Request/Response Examples

**Create Entry:**
```json
// POST /api/guestbook
{
  "name": "John Doe",
  "message": "Great website!"
}

// Response
{
  "id": 1,
  "name": "John Doe",
  "message": "Great website!",
  "created_at": "2026-02-15T10:00:00.000Z"
}
```

**Update Entry:**
```json
// PUT /api/guestbook/1
{
  "message": "Updated message!"
}

// Response
{
  "id": 1,
  "name": "John Doe",
  "message": "Updated message!",
  "created_at": "2026-02-15T10:00:00.000Z",
  "updated_at": "2026-02-15T11:00:00.000Z"
}
```

---

## 🔐 Environment Variables

### Required Variables

```env
# Supabase Configuration (REQUIRED)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-role-key

# Frontend API URL (for production)
VITE_API_URL=/api
```

### Optional Profile Configuration

```env
# Profile Information (Optional - has defaults)
PROFILE_NAME=Your Name
PROFILE_TITLE=Full Stack Developer
PROFILE_BIO=Your bio here...
PROFILE_EMAIL=email@example.com
PROFILE_LOCATION=City, Country
PROFILE_GITHUB=https://github.com/yourusername
PROFILE_LINKEDIN=https://linkedin.com/in/yourusername
PROFILE_TWITTER=https://twitter.com/yourusername
PROFILE_WEBSITE=https://yourwebsite.com
PROFILE_SKILLS=JavaScript,TypeScript,React,NestJS,Node.js,Supabase
```

### Current Supabase Configuration

- **URL:** `https://dshrbduwqhwnrlfecyhn.supabase.co`
- **Key:** (Valid anon key stored in `.env`)

---

## 🗄️ Database Schema

### Table: `guestbook`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO INCREMENT | Unique entry ID |
| `name` | TEXT | NOT NULL | Visitor name |
| `message` | TEXT | NOT NULL | Visitor message |
| `created_at` | TIMESTAMP WITH TIMEZONE | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP WITH TIMEZONE | DEFAULT NOW() | Last update timestamp |

### Security

- **Row Level Security (RLS):** Enabled
- **Policy:** Public access allowed for all operations
- **Auto-update:** `updated_at` automatically updates on edit

---

## 🚀 Deployment Configuration

### Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm run install:all",
  "framework": null,
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" }
      ]
    }
  ]
}
```

### Key Points

- **Serverless Function:** API runs as Vercel serverless function at `/api`
- **Static Frontend:** React app served from `frontend/dist`
- **Rewrites:** `/api/*` routes to serverless function, everything else to React
- **CORS:** Enabled for all origins

---

## 🎨 Styling & Theme

### Tailwind Configuration

- **Primary Color:** Red (`#ef4444` to `#450a0a`)
- **Background:** Black with red gradients
- **Custom Classes:**
  - `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-ghost`
  - `.input`, `.card`, `.link`
  - `.text-gradient` (red gradient text)
  - Animation utilities: `animate-fade-in`, `animate-slide-up`, `animate-slide-down`

### Design System

- **Font:** Inter (Google Fonts)
- **Icons:** Lucide React
- **Responsive:** Mobile-first approach
- **Dark Mode:** Pure black backgrounds with red accents
- **Transitions:** Smooth 200ms transitions throughout

---

## 🐛 Troubleshooting

### Common Issues

**CORS Errors in Development:**
- Vite dev server proxies `/api` requests to backend
- Ensure backend is running on port 3000

**"Supabase client not initialized":**
- Check `SUPABASE_URL` and `SUPABASE_KEY` in `.env`
- Verify credentials are correct

**Vercel Deployment Fails:**
- Ensure all environment variables are set in Vercel
- Check build logs for specific errors
- Verify `vercel.json` configuration

**404 on API Routes:**
- Ensure `api/index.ts` exists
- Check rewrites in `vercel.json`
- Verify backend built successfully

**Build Errors:**
```bash
# Clear all builds and reinstall
rm -rf backend/dist frontend/dist node_modules backend/node_modules frontend/node_modules
npm run install:all
npm run build
```

---

## 📝 Development Notes

### Code Organization

- **Backend:** Modular architecture with separate modules for each feature
- **Frontend:** Component-based with clear separation of concerns
- **Types:** Shared TypeScript interfaces for type safety
- **Validation:** DTOs with class-validator decorators

### Best Practices

- **Never commit `.env`** - Contains sensitive Supabase credentials
- **Keep dependencies updated** - Check for security vulnerabilities
- **Test locally first** - Always test changes before deploying
- **Use TypeScript** - Maintain type safety throughout
- **Follow conventions** - ESLint and Prettier configurations are set up

### Future Enhancements

Potential improvements to consider:

- Add authentication (Supabase Auth)
- Rate limiting on API endpoints
- Image uploads for profile avatar
- Pagination for guestbook entries
- Admin panel for managing entries
- Email notifications for new entries
- Comment/reply system
- Like/reaction system

---

## 📚 Additional Resources

### Documentation Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Project Links

- **Repository:** https://github.com/lMarul/WEBPROG-Finals
- **Owner:** lMarul (Marwin John Gonzales)

---

## ✅ Project Status Checklist

- ✅ Database schema created
- ✅ Backend API implemented with full CRUD
- ✅ Frontend UI completed
- ✅ Red and black theme applied
- ✅ Responsive design implemented
- ✅ Form validation (client & server)
- ✅ Error handling
- ✅ Vercel deployment configured
- ✅ Environment variables set up
- ✅ README documentation
- ✅ Guidelines documentation

---

**This project is production-ready and fully functional!** 🎉

The application successfully demonstrates:
- Full-stack development with NestJS and React
- Database integration with Supabase
- Serverless deployment on Vercel
- Modern UI/UX with Tailwind CSS
- Complete CRUD operations
- Type-safe development with TypeScript

For any questions or issues, refer to this guidelines document or the README.md file.
