# Vercel Deployment Guide - Blog System

## Quick Fix for Failed Deployment

Your Vercel deployment failed because the Supabase environment variables weren't set. Here's how to fix it:

### Step 1: Add Environment Variables to Vercel

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**

2. **Select your project** (noon-marine-platform)

3. Click **Settings** → **Environment Variables**

4. Add these variables (one at a time):

```
NEXT_PUBLIC_BASE_URL
Value: https://noonmarine.uk
Environment: Production, Preview, Development

NEXT_PUBLIC_SUPABASE_URL
Value: https://0ec90b57d6e95fcbda19832f.supabase.co
Environment: Production, Preview, Development

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
Environment: Production, Preview, Development

NEXT_PUBLIC_API_URL
Value: http://localhost:5000
(or your backend URL if deployed)
Environment: Production, Preview, Development
```

### Step 2: Redeploy

After adding the environment variables:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **three dots menu (⋯)**
4. Select **"Redeploy"**

**OR** simply push a new commit to trigger a deployment.

### Step 3: Verify Deployment

Once deployed, check these URLs:

- **Homepage**: `https://noonmarine.uk/`
- **Blog Listing**: `https://noonmarine.uk/blog`
- **Admin Panel**: `https://noonmarine.uk/admin/blogs`
- **Sitemap**: `https://noonmarine.uk/sitemap.xml`

---

## Admin Login Credentials

To access the blog admin panel at `/admin/blogs`:

1. First login at `/login` with:
   - **Email**: `admin@noonmarine.com`
   - **Password**: `Admin@123`

2. Then navigate to `/admin/blogs`

---

## Database Information

**Database**: Supabase (PostgreSQL)
- **Dashboard**: https://supabase.com/dashboard
- **Your Project URL**: https://0ec90b57d6e95fcbda19832f.supabase.co
- **Table**: `blog_posts`

---

## Common Issues & Solutions

### Issue: "Supabase URL is required" Error
**Solution**: Make sure you've added all environment variables in Vercel settings and redeployed.

### Issue: Blog pages show no data
**Solution**:
1. Check that environment variables are correct
2. Verify you have `blog_posts` table in Supabase
3. Create a test blog post from admin panel

### Issue: Cannot access admin panel
**Solution**:
1. Login first at `/login`
2. Use the admin credentials above
3. The middleware will redirect you to login if not authenticated

### Issue: 404 on routes
**Solution**:
1. Check Vercel deployment logs
2. Ensure build completed successfully
3. Try clearing Vercel cache and redeploying

---

## Build Status Note

The project includes placeholder values for Supabase to allow successful builds when environment variables aren't available (like during CI/CD).

**The blog will only work properly when you set the actual environment variables in Vercel.**

---

## Next Steps After Deployment

1. ✅ Add environment variables (see Step 1)
2. ✅ Redeploy (see Step 2)
3. ✅ Login to admin panel
4. ✅ Create your first blog post
5. ✅ Test the public blog page
6. ✅ Verify sitemap includes your blog posts
7. ✅ Update `NEXT_PUBLIC_BASE_URL` with your actual domain

---

## Need Help?

Check these resources:
- **Vercel Logs**: Go to your deployment → "View Function Logs"
- **Supabase Logs**: https://supabase.com/dashboard → Your Project → Logs
- **Browser Console**: Open DevTools (F12) to see JavaScript errors
