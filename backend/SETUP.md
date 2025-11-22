# Backend Setup Guide

## Prerequisites

Make sure you have the following installed:
- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Git

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - UPDATE THIS
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/rahnama_marine?schema=public"

# JWT - CHANGE THIS IN PRODUCTION
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration (Optional for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password
EMAIL_FROM=noreply@rahnamaholding.com

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Pagination
DEFAULT_PAGE_SIZE=20
MAX_PAGE_SIZE=100
```

### 3. Set Up PostgreSQL Database

#### Option A: Using PostgreSQL installed locally

1. Install PostgreSQL from https://www.postgresql.org/download/

2. Create a new database:

```bash
# Access PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE rahnama_marine;

# Create user (optional)
CREATE USER your_username WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE rahnama_marine TO your_username;

# Exit
\q
```

3. Update DATABASE_URL in `.env`:
```
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/rahnama_marine?schema=public"
```

#### Option B: Using Docker (Recommended for development)

```bash
# Run PostgreSQL in Docker
docker run --name rahnama-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=rahnama_marine \
  -p 5432:5432 \
  -d postgres:14

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rahnama_marine?schema=public"
```

### 4. Run Database Migrations

Generate Prisma Client and run migrations:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view/edit data
npm run prisma:studio
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on http://localhost:5000

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio GUI

## API Documentation

Once the server is running, visit:
- API Docs: http://localhost:5000/api-docs
- Health Check: http://localhost:5000/health

## Available Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (Protected)
- PUT `/api/auth/profile` - Update profile (Protected)
- PUT `/api/auth/change-password` - Change password (Protected)

### Vessels
- GET `/api/vessels` - Get all vessels (Public)
- GET `/api/vessels/:id` - Get vessel by ID (Public)
- POST `/api/vessels` - Create vessel (Admin only)
- PUT `/api/vessels/:id` - Update vessel (Admin only)
- DELETE `/api/vessels/:id` - Delete vessel (Admin only)

## Testing the API

### Using cURL

1. Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+971501001882"
  }'
```

2. Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

3. Use the token from login to access protected routes:
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman or Insomnia

Import the API documentation from http://localhost:5000/api-docs

## Database Schema

The database includes the following main entities:

- **Users** - User accounts and authentication
- **Customers** - Customer profiles and information
- **Dealers** - Dealer accounts and territories
- **Vessels** - Vessel inventory and details
- **Services** - Service catalog
- **Bookings** - Service bookings
- **Insurance** - Insurance policies and claims
- **Surveys** - Vessel surveys and classifications
- **Flag Registrations** - Vessel flag registrations
- **Crew Members** - Crew database and certifications
- **Courses** - Training courses
- **Products** - Spare parts and equipment
- **Orders** - Customer orders
- **Invoices & Payments** - Financial transactions
- **Documents** - Document management

## Troubleshooting

### Database Connection Issues

If you get database connection errors:

1. Make sure PostgreSQL is running:
```bash
# Check if PostgreSQL is running
# Windows:
sc query postgresql

# Linux/Mac:
sudo systemctl status postgresql
```

2. Verify DATABASE_URL in `.env` is correct

3. Test connection:
```bash
npx prisma db pull
```

### Migration Issues

If migrations fail:

```bash
# Reset database (WARNING: This will delete all data)
npx prisma migrate reset

# Run migrations again
npm run prisma:migrate
```

### Port Already in Use

If port 5000 is already in use:

1. Change PORT in `.env` to another port (e.g., 5001)
2. Or kill the process using port 5000

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill
```

## Next Steps

1. Set up the frontend application
2. Add more API endpoints for other services
3. Implement file upload functionality
4. Add email notifications
5. Set up testing framework
6. Configure for production deployment

## Support

For issues or questions, contact: info@rahnamaholding.com
