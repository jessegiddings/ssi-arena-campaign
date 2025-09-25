# Deployment Guide for SSI Arena Campaign Website

## 🚀 Deploy to Vercel (Recommended)

### Option 1: Command Line Deployment
1. **Login to Vercel CLI:**
   ```bash
   npx vercel login
   ```
   Follow the browser authentication process.

2. **Deploy to production:**
   ```bash
   npx vercel --prod
   ```

### Option 2: Web Interface Deployment
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"New Project"**
3. Import your git repository
4. Vercel will auto-detect the Vite framework
5. Deploy with default settings

## 🌐 Connect Your Custom Domain (ssiarena.com)

### Step 1: Add Domain in Vercel
1. Go to your project dashboard on Vercel
2. Click **"Settings"** → **"Domains"**
3. Add `ssiarena.com` and `www.ssiarena.com`

### Step 2: Configure DNS in GoDaddy
1. Login to your GoDaddy account
2. Go to **"My Products"** → **"DNS"**
3. Add these DNS records:

   **For ssiarena.com (root domain):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.19.61` (Vercel's IP)

   **For www.ssiarena.com:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

### Step 3: Wait for DNS Propagation
- DNS changes can take 24-48 hours to fully propagate
- You can check status using `dig ssiarena.com` or online tools

## 🔧 Update Supabase Configuration

### 1. Add Production URL to Supabase
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project → **"Settings"** → **"API"**
3. Under **"URL Configuration"**, add:
   - `https://ssiarena.com`
   - `https://www.ssiarena.com`
   - Your Vercel preview URL (e.g., `https://your-project-name.vercel.app`)

### 2. Configure CORS (if needed)
In your Supabase SQL Editor, run:
```sql
-- Allow your domain for CORS
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_stats ENABLE ROW LEVEL SECURITY;
```

## 📊 Test Your Live Website

After deployment, test these features:
- [ ] Website loads at `https://ssiarena.com`
- [ ] Signature form submission works
- [ ] Pledge form submission works
- [ ] Real-time stats update
- [ ] All images display correctly
- [ ] Mobile responsiveness

## 🔍 Troubleshooting

### Website Not Loading
- Check DNS propagation: `dig ssiarena.com`
- Verify Vercel deployment status
- Check browser console for errors

### Forms Not Working
- Verify Supabase allowed origins include your domain
- Check browser network tab for API errors
- Ensure environment variables are set correctly

### Images Not Displaying
- All images are in the `/public` folder
- Vite automatically handles static assets
- Check browser dev tools for 404 errors

## 🎉 You're Live!

Your SSI Arena campaign website is now live at:
- **Primary:** https://ssiarena.com
- **WWW:** https://www.ssiarena.com
- **Vercel Preview:** [Your Vercel URL]

The website features:
- ✅ Real-time signature tracking
- ✅ Pledge collection system
- ✅ Responsive design
- ✅ Supabase backend integration
- ✅ Professional community presentation