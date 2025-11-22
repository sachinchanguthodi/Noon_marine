# Backend Deployment to Render

## Prerequisites

1. **Supabase Database**: Get your PostgreSQL connection string from Supabase
   - Go to: Supabase Dashboard → Project Settings → Database
   - Copy the **Connection String** (URI format)
   - Example format: `postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres`

2. **GitHub Repository**: Your code is already pushed to GitHub

---

## Step 1: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **"New +"** → **"Blueprint"**
3. Connect your repository: `sachinchanguthodi/Noon_marine`
4. Render will detect the `render.yaml` file
5. Click **"Apply"**

### Option B: Manual Setup

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your repository: `sachinchanguthodi/Noon_marine`
4. Configure:
   - **Name**: `noon-marine-backend`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

---

## Step 2: Environment Variables in Render

Add these environment variables in Render Dashboard:

### Required Variables:

```bash
# Database (Get from Supabase)
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres

# JWT Configuration
JWT_SECRET=noon-marine-super-secret-jwt-key-2024-production-ready
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=https://noon-marine.vercel.app

# Node Configuration
NODE_ENV=production
PORT=5000
```

### Optional Variables (if you need email):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@noonmarine.com
```

---

## Step 3: Get Your Supabase Connection String

1. Go to your Supabase project
2. Click **Settings** (gear icon) → **Database**
3. Scroll to **Connection String**
4. Select **URI** format
5. Copy the string (it starts with `postgresql://`)
6. **Important**: Replace `[YOUR-PASSWORD]` with your actual database password
7. Use this as your `DATABASE_URL` in Render

Example:
```
postgresql://postgres.abcdefgh:MyP@ssw0rd!@db.abcdefgh.supabase.co:5432/postgres
```

---

## Step 4: Deploy

1. After adding environment variables, click **"Deploy"**
2. Wait for the build to complete (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://noon-marine-backend.onrender.com`

---

## Step 5: Run Database Migrations

After first deployment:

1. Go to Render Dashboard → Your Service
2. Click **"Shell"** tab
3. Run migration command:
   ```bash
   npm run prisma:migrate
   ```

---

## Step 6: Update Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL`:
   ```
   NEXT_PUBLIC_API_URL=https://noon-marine-backend.onrender.com
   ```
3. Click **Save**
4. Go to **Deployments** → Click on latest deployment → **Redeploy**

---

## Troubleshooting

### Build Fails with Prisma Error
- Make sure `DATABASE_URL` is set correctly
- Check that the connection string has the correct password

### CORS Errors
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Check backend CORS configuration includes the frontend URL

### Database Connection Failed
- Use Supabase **Pooler** connection string (port 6543)
- Not the direct connection (port 5432)

---

## Testing Your Backend

Once deployed, test these endpoints:

```bash
# Health check
curl https://noon-marine-backend.onrender.com/health

# API documentation
https://noon-marine-backend.onrender.com/api-docs
```

---

## Notes

- **Free Tier**: Render free tier spins down after 15 minutes of inactivity
- **First Request**: May take 30-60 seconds to wake up
- **Upgrade**: Consider paid tier ($7/month) for production use
