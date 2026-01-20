# Blog System Setup Guide

## Database: Supabase

Your blog system uses **Supabase** (PostgreSQL) as the database.

- **Supabase URL**: `https://0ec90b57d6e95fcbda19832f.supabase.co`
- **Database Dashboard**: Visit [Supabase Dashboard](https://supabase.com/dashboard) to manage your database

## Admin Access

### Current Status
⚠️ **Important**: The blog admin pages currently require authentication but don't have a dedicated blog admin system yet.

### Backend Admin Credentials (for main platform)
If you want to use the existing backend authentication:
- **Email**: `admin@noonmarine.com`
- **Password**: `Admin@123`

### Accessing Blog Admin
1. Login at `/login` with the admin credentials above
2. Navigate to `/admin/blogs` to manage blog posts

## Vercel Deployment Setup

### Required Environment Variables

Add these to your Vercel project settings:

```bash
NEXT_PUBLIC_BASE_URL=https://noonmarine.uk
NEXT_PUBLIC_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Steps to Deploy on Vercel:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Select Your Project**

3. **Go to Settings → Environment Variables**

4. **Add Each Variable**:
   - Click "Add New"
   - Enter the variable name and value
   - Select all environments (Production, Preview, Development)
   - Click "Save"

5. **Redeploy**:
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

### Common Deployment Issues:

**Issue**: Build fails with Supabase connection error
- **Solution**: Ensure all environment variables are set in Vercel

**Issue**: Sitemap generation fails
- **Solution**: Already fixed with error handling in sitemap.ts

**Issue**: 404 on blog pages
- **Solution**: Make sure the build completed successfully and check Vercel logs

## Blog Features

### Admin Features (`/admin/blogs`):
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Rich text editor with formatting (bold, italic, headings, lists, links, images)
- ✅ SEO fields (meta title, description, keywords, tags)
- ✅ Publish/Unpublish posts
- ✅ Delete posts
- ✅ View analytics (view counts)

### Public Features:
- ✅ Blog listing page (`/blog`)
- ✅ Individual blog posts (`/blog/[slug]`)
- ✅ SEO-optimized pages
- ✅ Automatic sitemap generation (`/sitemap.xml`)
- ✅ View tracking
- ✅ Social sharing

## SEO Features

### Automatic Sitemap
- All published blogs automatically appear in `/sitemap.xml`
- Updates dynamically when new posts are published
- Includes proper lastModified dates and priorities

### Meta Tags
Each blog post includes:
- SEO Title
- Meta Description
- Keywords
- Open Graph tags (for social media)
- Article tags

### Best Practices:
- **SEO Title**: 50-60 characters
- **Meta Description**: 150-160 characters
- **Keywords**: 5-10 relevant keywords
- **Tags**: 3-5 tags for categorization

## Troubleshooting

### Cannot access admin pages
- Make sure you're logged in at `/login`
- Use the admin credentials listed above

### Blog posts not showing
- Check that posts are set to "PUBLISHED" status
- Verify in Supabase dashboard that data is in `blog_posts` table

### Sitemap not updating
- Clear Vercel cache and redeploy
- Check that environment variables are set correctly

### Images not displaying
- Make sure image URLs are publicly accessible
- Use direct image URLs (not local paths)
- Consider using a CDN or Supabase Storage for images

## Database Structure

The `blog_posts` table includes:
- Basic fields: title, slug, content, excerpt, featured_image
- SEO fields: seo_title, seo_description, seo_keywords[], seo_tags[]
- Metadata: author_name, status, published_at, view_count
- Timestamps: created_at, updated_at

## Next Steps

1. **Add your domain** to `NEXT_PUBLIC_BASE_URL` in Vercel
2. **Test the deployment** after adding environment variables
3. **Create your first blog post** at `/admin/blogs/new`
4. **Verify the sitemap** at `https://noonmarine.uk/sitemap.xml`

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Check Supabase dashboard for database connectivity
4. Review browser console for JavaScript errors
