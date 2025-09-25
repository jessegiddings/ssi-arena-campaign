# Supabase Setup Guide for SSI Arena Campaign

## 🚀 Quick Setup Steps

### 1. Get Your Supabase Credentials
1. Go to [supabase.com](https://supabase.com) and sign in to your account
2. Open your project dashboard
3. Go to **Settings** > **API**
4. Copy your:
   - **Project URL** (starts with `https://`)
   - **anon public** key (the long string)

### 2. Add Environment Variables
1. Open your `.env` file in this project
2. Replace the placeholder values:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 3. Create Database Tables
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the entire contents of `supabase-schema.sql`
3. Click **Run** to create all tables, functions, and triggers

### 4. Test the Integration
1. Restart your development server: `npm run dev`
2. Try signing the petition on your website
3. Check the **Table Editor** in Supabase to see your data

## 📊 What You'll Get

### Real-time Features:
- ✅ Signature counter updates live as people sign
- ✅ Pledge amounts update automatically
- ✅ Progress bars animate with real data
- ✅ All data stored securely in Supabase

### Database Tables Created:
- **signatures** - Names, emails, consent info
- **pledges** - Linked to signatures, amounts & tiers
- **campaign_stats** - Real-time counters

### Admin Access:
- View all signatures in Supabase dashboard
- Export data as CSV
- Real-time analytics
- Secure with Row Level Security

## 🔧 Troubleshooting

**Website shows default numbers?**
- Check your `.env` file has correct credentials
- Restart development server after adding credentials

**Forms not submitting?**
- Check browser console for errors
- Verify database schema was created successfully

**Need help?**
- Check Supabase logs in your dashboard
- All database functions have error handling

## 📈 Next Steps

Once working, you can:
- Set up email notifications for new signatures
- Create admin dashboard for campaign management
- Add CSV export functionality
- Set up automated progress reports

Your campaign site is now ready for real signatures and pledges! 🎉