# Personal Profile Website with Guestbook

A modern, full-stack personal profile website with a guestbook feature built using **NestJS**, **React**, and **Supabase**.

![Tech Stack](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Tech Stack](https://img.shields.io/badge/NestJS-10.3-E0234E?logo=nestjs)
![Tech Stack](https://img.shields.io/badge/Supabase-2.39-3FCF8E?logo=supabase)
![Tech Stack](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Tech Stack](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)

## Features

- **Personal Profile Page**: Showcase your name, bio, skills, and social links
- **Guestbook with CRUD Operations**:
  - **Create**: Visitors can sign the guestbook
  - **Read**: View all guestbook entries
  - **Update**: Edit existing entries
  - **Delete**: Remove entries
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Updates**: Instant feedback on all operations
- **Form Validation**: Client and server-side validation
- **Error Handling**: Graceful error handling with user feedback
- **Serverless Ready**: Configured for Vercel deployment

## Project Structure

```
profile-guestbook-app/
├── api/                        # Vercel Serverless Function
│   ├── index.ts               # API entry point
│   └── tsconfig.json          # TypeScript config for API
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── guestbook/         # Guestbook module (CRUD)
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── guestbook.controller.ts
│   │   │   ├── guestbook.service.ts
│   │   │   └── guestbook.module.ts
│   │   ├── profile/           # Profile module
│   │   │   ├── dto/
│   │   │   ├── profile.controller.ts
│   │   │   ├── profile.service.ts
│   │   │   └── profile.module.ts
│   │   ├── supabase/          # Supabase client module
│   │   │   ├── supabase.service.ts
│   │   │   └── supabase.module.ts
│   │   ├── health/            # Health check endpoint
│   │   │   ├── health.controller.ts
│   │   │   └── health.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
├── frontend/                   # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── GuestbookPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── services/          # API service
│   │   │   └── api.ts
│   │   ├── types/             # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── package.json               # Root package.json
├── vercel.json                # Vercel deployment config
├── .gitignore
├── .env.example
└── README.md
```

## Prerequisites

- **Node.js** 20.x or higher
- **npm** 9.x or higher
- **Supabase** account (free tier available)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd profile-guestbook-app
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the following SQL:

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

-- Create a policy to allow all operations (for development)
-- For production, consider more restrictive policies
CREATE POLICY "Allow public access to guestbook"
ON guestbook FOR ALL
USING (true)
WITH CHECK (true);

-- Optional: Create a function to auto-update the updated_at column
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

3. Copy your credentials from **Project Settings > API**:
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_KEY`: Your `anon` or `service_role` key

### 3. Configure Environment Variables

Copy the example environment file and add your Supabase credentials:

```bash
# In the backend folder
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
# Required
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-or-service-role-key

# Optional - Customize your profile
PROFILE_NAME=Your Name
PROFILE_TITLE=Full Stack Developer
PROFILE_BIO=Your bio here...
PROFILE_EMAIL=email@example.com
PROFILE_LOCATION=City, Country
PROFILE_GITHUB=https://github.com/yourusername
PROFILE_LINKEDIN=https://linkedin.com/in/yourusername
PROFILE_SKILLS=JavaScript,TypeScript,React,NestJS
```

### 4. Install Dependencies

```bash
npm run install:all
```

### 5. Run the Development Server

```bash
npm run dev
```

This starts both servers:
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

## API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile information |

### Guestbook
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/guestbook` | Get all entries |
| GET | `/api/guestbook/:id` | Get single entry |
| GET | `/api/guestbook/count` | Get entry count |
| POST | `/api/guestbook` | Create new entry |
| PUT | `/api/guestbook/:id` | Update entry |
| DELETE | `/api/guestbook/:id` | Delete entry |

### Request/Response Examples

**Create Entry:**
```bash
curl -X POST http://localhost:3000/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "message": "Hello!"}'
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "message": "Hello!",
  "created_at": "2026-02-15T10:00:00.000Z"
}
```

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `.` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm run install:all`
4. Add Environment Variables:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_KEY`: Your Supabase key
   - `VITE_API_URL`: `/api`
5. Click **Deploy**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

Make sure to add these in **Vercel Dashboard > Project Settings > Environment Variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
| `SUPABASE_KEY` | Your Supabase anon/service key | Production, Preview, Development |
| `VITE_API_URL` | `/api` | Production, Preview |

## Customization

### Profile Information

Edit the environment variables or modify `backend/src/profile/profile.service.ts` to customize:

- Name and title
- Bio/About section
- Social media links
- Skills list
- Avatar image

### Styling

The frontend uses **Tailwind CSS**. Customize the design in:

- `frontend/tailwind.config.js` - Theme configuration
- `frontend/src/index.css` - Global styles and components
- Individual component files for specific styling

### Adding Authentication

To restrict guestbook access to authenticated users:

1. Set up Supabase Auth in your project
2. Update Row Level Security policies
3. Add authentication logic in the NestJS backend
4. Implement login UI in the React frontend

## Troubleshooting

### Common Issues

**CORS Errors in Development:**
- The Vite dev server proxies `/api` requests to the backend
- Ensure the backend is running on port 3000

**"Supabase client not initialized" Error:**
- Check that `SUPABASE_URL` and `SUPABASE_KEY` are set
- Verify the credentials are correct

**Vercel Deployment Issues:**
- Ensure all environment variables are set in Vercel
- Check the build logs for specific errors
- Verify the `vercel.json` configuration

**404 on API Routes:**
- Ensure the `api/index.ts` file exists
- Check that rewrites are configured in `vercel.json`

### Build Commands

```bash
# Install all dependencies
npm run install:all

# Run development servers
npm run dev

# Build for production
npm run build

# Run backend only
npm run dev:backend

# Run frontend only
npm run dev:frontend
```

## Technologies Used

- **Frontend**:
  - React 18 with TypeScript
  - Vite for building and dev server
  - Tailwind CSS for styling
  - React Router for navigation
  - Lucide React for icons

- **Backend**:
  - NestJS 10 with TypeScript
  - class-validator for DTO validation
  - Supabase JS client

- **Database**:
  - Supabase (PostgreSQL)

- **Deployment**:
  - Vercel (Serverless Functions + Static Hosting)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, NestJS, and Supabase
