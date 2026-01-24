# Rahnama Holding - Marine Services Platform

A comprehensive digital platform for marine business operations, combining public website, customer portal, dealer management, and internal operations system.

## Project Overview

This platform provides end-to-end digital solutions for:
- Vessel Sales & Chartering
- Marine Insurance
- Classification & Survey Booking
- Flag Registration & Licensing
- Vessel Management & Manning
- Repair & Docking Coordination
- Logistics & Support Services
- Training & Certification
- Industrial Bakery Services

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT + Passport.js
- **Database ORM**: Prisma
- **API Documentation**: Swagger
- **File Upload**: Multer
- **Email**: Nodemailer

### Database
- **Primary Database**: PostgreSQL
- **Cache**: Redis (optional for future)
- **File Storage**: Local (development), AWS S3 (production)

## Project Structure

```
Noon_marine_platform/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models (Prisma)
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Entry point
│   ├── prisma/             # Database schema
│   ├── uploads/            # File uploads
│   └── package.json
│
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities
│   │   ├── hooks/         # Custom hooks
│   │   ├── store/         # State management
│   │   └── types/         # TypeScript types
│   ├── public/            # Static assets
│   └── package.json
│
├── docs/                  # Documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start development server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with API URL
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## Development Workflow

1. Backend API runs on port 5000
2. Frontend app runs on port 3000
3. PostgreSQL database on port 5432
4. API documentation available at http://localhost:5000/api-docs

## Key Features

### Public Website
- Service catalog and information
- Vessel tracking
- Online booking system
- Quote calculator
- Contact forms
- News and insights

### Customer Portal
- Personal dashboard
- Vessel management
- Document repository
- Service requests
- Order tracking
- Payment management

### Dealer Portal
- Sales dashboard
- Lead management
- Commission tracking
- Marketing materials
- Performance analytics

### Admin Panel
- User management
- Service management
- Financial operations
- Reporting and analytics
- System configuration

## API Documentation

Once the backend is running, visit http://localhost:5000/api-docs for complete API documentation.

## Database Schema

Key entities:
- Users & Authentication
- Customers & Dealers
- Vessels
- Services & Bookings
- Insurance Policies
- Flag Registrations
- Crew Management
- Training & Certifications
- Financial Transactions
- Documents

## Security

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting
- SQL injection prevention (Prisma ORM)

## Deployment

Documentation for deployment to production environments will be added in future phases.

