# Getting Started with Rahnama Marine Services Platform

Welcome to the Rahnama Marine Services Platform! This guide will help you set up and run both the backend API and frontend application.

## Project Overview

This is a comprehensive digital platform for marine business operations including:
- Public-facing website
- Customer portal
- Dealer management system
- Internal operations management
- Complete marine services (vessel sales, insurance, flag registration, crew management, training, etc.)

## Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **API Documentation**: Swagger

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios

## Prerequisites

Before you begin, ensure you have:

✅ **Node.js 18+** - [Download here](https://nodejs.org/)
✅ **PostgreSQL 14+** - [Download here](https://www.postgresql.org/download/) or use Docker
✅ **Git** - [Download here](https://git-scm.com/)
✅ **Code Editor** - VS Code recommended

## Quick Start

### Step 1: Install PostgreSQL

#### Option A: Install PostgreSQL locally
1. Download and install PostgreSQL from https://www.postgresql.org/download/
2. During installation, remember your postgres user password
3. After installation, create the database:

```bash
# Open psql
psql -U postgres

# Create database
CREATE DATABASE rahnama_marine;

# Exit
\q
```

#### Option B: Use Docker (Recommended)
```bash
docker run --name rahnama-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=rahnama_marine \
  -p 5432:5432 \
  -d postgres:14
```

### Step 2: Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your database credentials
# Update the DATABASE_URL line:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rahnama_marine?schema=public"

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

The backend should now be running at http://localhost:5000

✅ Check http://localhost:5000/health to verify
✅ Visit http://localhost:5000/api-docs for API documentation

### Step 3: Set Up Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend should now be running at http://localhost:3000

## Verify Installation

1. **Backend Check**:
   - Open http://localhost:5000/health
   - You should see: `{"success": true, "message": "Server is running"}`

2. **Database Check**:
   ```bash
   cd backend
   npm run prisma:studio
   ```
   - This opens Prisma Studio at http://localhost:5555
   - You should see all your database tables

3. **Frontend Check**:
   - Open http://localhost:3000
   - You should see the Rahnama Marine homepage

## Create Your First User

### Using cURL:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@rahnamaholding.com",
    "password": "Admin@123",
    "firstName": "Admin",
    "lastName": "User",
    "phone": "+971501001882"
  }'
```

### Using the Frontend:

1. Go to http://localhost:3000
2. Click "Get Started" or "Sign In"
3. Click "Create Account"
4. Fill in the registration form
5. Submit and you'll be logged in!

## Project Structure

```
Noon_marine_platform/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Express middleware
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   └── index.ts           # Entry point
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── package.json
│   └── SETUP.md               # Detailed backend setup
│
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/               # Next.js pages
│   │   ├── components/        # React components
│   │   ├── lib/               # API client & utilities
│   │   ├── hooks/             # Custom React hooks
│   │   ├── store/             # State management
│   │   └── types/             # TypeScript types
│   ├── public/                # Static files
│   └── package.json
│
├── docs/                      # Documentation
├── README.md                  # Main readme
└── GETTING_STARTED.md         # This file
```

## Available Features

### ✅ Implemented
- User authentication (register, login, logout)
- JWT-based authorization
- User profile management
- Vessel management (CRUD operations)
- Database schema for all services
- API documentation with Swagger
- Responsive frontend homepage
- Role-based access control

### 🚧 Next Steps to Implement
- Customer portal dashboard
- Dealer portal
- Service booking system
- Insurance management
- Flag registration system
- Crew management
- Training course enrollment
- Spare parts catalog
- Order management
- Invoice and payment processing
- Document management
- Email notifications
- File upload functionality

## Common Commands

### Backend

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm start                      # Start production server

# Database
npm run prisma:generate        # Generate Prisma Client
npm run prisma:migrate         # Run migrations
npm run prisma:studio          # Open Prisma Studio
```

### Frontend

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm start                      # Start production server
npm run lint                   # Run linting
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rahnama_marine?schema=public"
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Rahnama Marine Services
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update profile (requires auth)
- `PUT /api/auth/change-password` - Change password (requires auth)

### Vessels
- `GET /api/vessels` - Get all vessels (public)
- `GET /api/vessels/:id` - Get vessel by ID (public)
- `POST /api/vessels` - Create vessel (admin only)
- `PUT /api/vessels/:id` - Update vessel (admin only)
- `DELETE /api/vessels/:id` - Delete vessel (admin only)

## Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure port 5000 is not in use
- Run `npm install` again

### Frontend won't start
- Verify backend is running
- Check NEXT_PUBLIC_API_URL in .env.local
- Ensure port 3000 is not in use
- Run `npm install` again

### Database connection errors
```bash
# Test database connection
cd backend
npx prisma db pull

# Reset database if needed (WARNING: deletes all data)
npx prisma migrate reset
```

### Port already in use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac - Kill process on port 5000
lsof -ti:5000 | xargs kill
```

## Development Workflow

1. **Start PostgreSQL** (if not using Docker)
2. **Start Backend**:
   ```bash
   cd backend && npm run dev
   ```
3. **Start Frontend** (new terminal):
   ```bash
   cd frontend && npm run dev
   ```
4. **Make Changes**:
   - Backend changes auto-reload (nodemon)
   - Frontend changes auto-reload (Next.js)
5. **Test Your Changes**:
   - Use Swagger at http://localhost:5000/api-docs
   - Test frontend at http://localhost:3000

## Next Development Tasks

### Priority 1: Core Features
1. Complete authentication flows (password reset, email verification)
2. Customer dashboard
3. Vessel listing and detail pages
4. Service catalog pages

### Priority 2: Business Features
1. Booking system
2. Quote request system
3. Insurance module
4. Flag registration module

### Priority 3: Advanced Features
1. Payment integration
2. Document upload/management
3. Email notifications
4. Admin panel

## Resources

- **API Documentation**: http://localhost:5000/api-docs
- **Prisma Studio**: Run `npm run prisma:studio` in backend
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Support

For questions or issues:
- Email: info@rahnamaholding.com
- Phone: +971 50 100 1882

## License

Proprietary - Rahnama Holding Company

---

**Happy Coding! 🚀⚓**
