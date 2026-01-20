# Backend Deployment to Railway

Railway is easier than Render and doesn't require a credit card for the free tier!

---

## **Step 1: Sign Up for Railway**

1. Go to [railway.app](https://railway.app)
2. Click **"Login"**
3. Sign in with **GitHub** (easiest option)
4. Authorize Railway to access your GitHub

**No credit card required!**

---

## **Step 2: Create New Project**

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `sachinchanguthodi/Noon_marine`
4. Railway will start deploying automatically

---

## **Step 3: Configure Root Directory**

Since we have a monorepo, we need to tell Railway to use the `backend` folder:

1. Click on your service (the deployment that just started)
2. Go to **"Settings"** tab
3. Scroll to **"Build"** section
4. Set **"Root Directory"**: `backend`
5. Click **"Save"**

---

## **Step 4: Add Environment Variables**

1. Click on the **"Variables"** tab
2. Click **"+ New Variable"** and add each of these:

```bash
DATABASE_URL
postgresql://postgres:W%2BlO%2F%26b%3Fv%7Bv8d%26O0l%2F@db.wvsunqtytkyjknklmyuk.supabase.co:5432/postgres

JWT_SECRET
noon-marine-super-secret-jwt-key-2024-production-ready

JWT_EXPIRE
7d

FRONTEND_URL
https://noonmarine.uk

NODE_ENV
production

PORT
5000
```

3. After adding all variables, Railway will automatically redeploy

---

## **Step 5: Get Your Backend URL**

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. You'll get a URL like: `https://noon-marine-backend.up.railway.app`

**Copy this URL!**

---

## **Step 6: Update Vercel**

1. Go to Vercel Dashboard
2. Your Project → **Settings** → **Environment Variables**
3. Find `NEXT_PUBLIC_API_URL` and edit it:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app
   ```
4. Click **Save**
5. Go to **Deployments** → Latest deployment → **Redeploy**

---

## **Railway Free Tier Limits:**

- ✅ **$5 credit per month** (free trial)
- ✅ **500 hours of usage**
- ✅ **No credit card needed** for trial
- ✅ **Perfect for development and small projects**

---

## **Testing Your Backend**

Once deployed, test:

```bash
# Health check
curl https://your-app.up.railway.app/health

# API docs (if available)
https://your-app.up.railway.app/api-docs
```

---

## **Troubleshooting**

### **Build Fails**
- Check the build logs in Railway dashboard
- Make sure Root Directory is set to `backend`

### **Database Connection Error**
- Verify DATABASE_URL is correct
- Check Supabase allows connections from Railway's IP

### **Port Issues**
- Railway automatically assigns a PORT
- Make sure your Express app uses `process.env.PORT`

---

## **Alternative: Vercel Serverless Functions**

If Railway doesn't work, we can also deploy the backend as Vercel serverless functions (but requires some code refactoring).
