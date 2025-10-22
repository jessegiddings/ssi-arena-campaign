# Salt Spring Island Arena - Marketing & SEO Guide

This guide will help you set up and run successful Google Ads and Facebook marketing campaigns for the Salt Spring Island Community Arena campaign.

## What's Been Set Up

Your site is now optimized for marketing success with:

1. **Comprehensive SEO** - Meta tags, Open Graph, and Twitter Cards
2. **Conversion Tracking** - Google Ads and Facebook Pixel integration
3. **Event Tracking** - Automatic tracking of signatures, pledges, and newsletter signups
4. **Dynamic Page SEO** - Each page has optimized titles and descriptions
5. **Structured Data** - Schema.org markup for better search visibility
6. **Local SEO** - Geographic targeting for Salt Spring Island

## Step 1: Set Up Your Marketing Accounts

### Google Ads Setup

1. **Create a Google Ads Account**
   - Go to https://ads.google.com
   - Sign up with your business email
   - Set up billing information

2. **Set Up Conversion Tracking**
   - In Google Ads, go to Tools & Settings > Measurement > Conversions
   - Click "+ New conversion action" > Website
   - Create these conversions:
     - **Petition Signature** (Category: Lead)
     - **Pledge Commitment** (Category: Lead, track value)
     - **Newsletter Signup** (Category: Lead)
   - You'll receive a Conversion ID that looks like: `AW-XXXXXXXXXX`

3. **Add Your Google Ads ID to the Site**
   - Open `index.html` (lines 78-85)
   - Replace `AW-XXXXXXXXXX` with your actual Conversion ID
   - Uncomment the code by removing the `<!--` and `-->`

### Facebook Pixel Setup

1. **Create a Facebook Business Account**
   - Go to https://business.facebook.com
   - Create or link your business page

2. **Set Up Facebook Pixel**
   - Go to Events Manager (https://business.facebook.com/events_manager)
   - Click "Connect Data Sources" > "Web" > "Facebook Pixel"
   - Name your pixel (e.g., "SSI Arena Campaign")
   - You'll receive a Pixel ID (just numbers, like: `123456789012345`)

3. **Add Your Facebook Pixel ID to the Site**
   - Open `index.html` (lines 87-102)
   - Replace `YOUR_PIXEL_ID` with your actual Pixel ID (in 2 places)
   - Uncomment the code by removing the `<!--` and `-->`

## Step 2: Create Marketing Assets

### Social Sharing Image

You need a compelling image for social media sharing:

**Requirements:**
- Dimensions: 1200 x 630 pixels
- Format: JPG or PNG
- File name: `og-image.jpg`
- Location: `/public/og-image.jpg`

**What to include:**
- Arena rendering or concept image
- Text: "Support Salt Spring Island's Community Arena"
- Your logo
- Call to action: "Sign the Petition"

**Tools to create it:**
- Canva (canva.com) - Free templates
- Photoshop/GIMP
- Hire a designer on Fiverr

### Update the URL

Throughout the site, replace `https://ssiarena.com/` with your actual domain URL:
- `index.html` - Multiple locations
- `src/components/SEO.jsx` - pageSEO object

## Step 3: Google Ads Campaign Setup

### Campaign Type: Search Ads

**Campaign Goal:** Website traffic and leads

**Recommended Keywords for Salt Spring Island:**

*Broad Keywords:*
- salt spring island recreation
- salt spring island arena
- salt spring island ice rink
- community arena bc
- salt spring island activities
- salt spring fitness center

*Intent Keywords:*
- support salt spring arena
- salt spring island petition
- salt spring community projects
- donate to salt spring arena

**Geographic Targeting:**
- Primary: Salt Spring Island, BC
- Secondary: Victoria, BC (commuters)
- Tertiary: Vancouver Island, BC
- Radius: 50km around Salt Spring Island

**Budget Recommendations:**
- Start with $10-20/day
- Run for at least 2 weeks to gather data
- Adjust based on cost per conversion

**Ad Copy Examples:**

```
Headline 1: Support SSI Arena
Headline 2: Sign the Petition Today
Headline 3: Build Our Community Future
Description: Join hundreds of islanders supporting a world-class community arena. NHL rink, fitness center, youth programs. Sign now!
```

```
Headline 1: Salt Spring Needs an Arena
Headline 2: Community Recreation Center
Headline 3: Sign & Pledge Support
Description: Help bring a multi-sport facility to SSI. Hockey, figure skating, fitness, events. Community benefits proven. Take action today!
```

### Campaign Type: Display Ads

**Targeting Options:**
1. **Geographic:** Salt Spring Island + 50km radius
2. **Demographics:**
   - Adults 25-65
   - Parents with children
   - Homeowners
3. **Interests:**
   - Sports & fitness
   - Community involvement
   - Youth sports
   - Hockey
   - Figure skating

**Banner Ad Sizes:**
- 300x250 (Medium Rectangle)
- 728x90 (Leaderboard)
- 160x600 (Wide Skyscraper)
- 300x600 (Half Page)

## Step 4: Facebook Marketing Campaign

### Campaign Type 1: Awareness Campaign

**Objective:** Reach

**Audience:**
- Location: Salt Spring Island + 25km radius
- Age: 25-65
- Interests:
  - Community development
  - Sports and recreation
  - Hockey
  - Figure skating
  - Fitness and wellness
  - Parenting

**Budget:** $5-10/day

**Ad Format:** Image or Video
**Placement:** Facebook Feed, Instagram Feed

**Copy Example:**
```
Salt Spring Island deserves a world-class community arena!

🏒 NHL-sized rink
🏋️ Fitness center
👨‍👩‍👧 Youth programs
🎉 Event space for 3,000

Join 400+ islanders who've already signed the petition.

👉 Make your voice heard: [Link]

#SaltSpringIsland #CommunityArena #SSI #SupportLocal
```

### Campaign Type 2: Conversion Campaign

**Objective:** Conversions (Lead)

**Audience:**
- Custom Audience: Website visitors (last 30 days)
- Lookalike Audience: Based on petition signers (once you have 100+)
- Location: Salt Spring Island + surrounding areas

**Budget:** $10-20/day

**Ad Format:** Carousel or Single Image

**Copy Example:**
```
Your signature matters!

Salt Spring Island's community arena campaign needs YOUR support.

Already 400+ signatures
$35K+ in pledges
2,000 signature goal

Why we need this:
✅ Youth recreation & safety
✅ Senior fitness programs
✅ Economic development
✅ Community gathering space

Sign the petition in 2 minutes →

[Sign Now Button]
```

### Facebook Pixel Events to Monitor

These are automatically tracked by your site:
1. **PageView** - All page visits
2. **Lead** - Petition signatures and pledges
3. **CompleteRegistration** - Newsletter signups

## Step 5: Testing Your Setup

Before launching ads, verify everything works:

### Test Conversion Tracking

1. **Open Browser Developer Tools** (F12)
2. **Go to Console tab**
3. **Sign the petition with test data**
4. **Look for these messages:**
   - "Petition signature tracked"
   - "Google Ads conversion tracked: petition_signature"
   - "Facebook Pixel event tracked: Lead"

### Verify Facebook Pixel

1. Install **Facebook Pixel Helper** Chrome extension
2. Visit your site
3. Click the extension icon - should show your Pixel firing
4. Submit a form - should show "Lead" event

### Verify Google Ads

1. In Google Ads, go to Tools > Conversions
2. Check "Status" column - should say "Recording conversions"
3. Submit a test signature
4. Within 24 hours, check for test conversion (may take up to 9 hours)

## Step 6: Campaign Optimization Tips

### Week 1: Monitor and Learn
- Check daily which ads get best click-through rates (CTR)
- Aim for 2%+ CTR on search ads, 1%+ on display
- Monitor cost per click (CPC) - should be $0.50-$2.00 for local BC campaigns

### Week 2: Optimize
- Pause underperforming keywords (CTR < 1%)
- Increase budget on high-performing ads
- Test new ad copy variations
- Adjust geographic radius if needed

### Week 3+: Scale
- Increase budget by 20-30% if you're getting conversions
- Add remarketing campaigns (target site visitors)
- Create video ads from photos/testimonials
- Test different landing pages (/petition vs. homepage)

## Step 7: Organic Social Media

Don't forget free promotion on:

### Facebook
- Post 2-3x per week
- Share progress updates (signature milestones)
- Highlight community benefits
- Share supporter testimonials
- Use local hashtags: #SaltSpringIsland #SSI #GulfIslands

### Instagram
- Visual content: arena concepts, community events, supporter photos
- Stories: countdown to milestones, behind-the-scenes
- Reels: short videos about benefits

### Nextdoor
- Highly effective for local community issues
- Post in Salt Spring Island neighborhood groups
- Share petition link with context

### Local Media
- Submit press releases to:
  - Gulf Islands Driftwood
  - Salt Spring Exchange
  - Victoria Times Colonist (BC section)
- Announce major milestones (500 signatures, $50K pledged, etc.)

## Conversion Tracking Reference

Your site automatically tracks these events:

| User Action | Google Ads Event | Facebook Pixel Event | Notes |
|-------------|-----------------|---------------------|-------|
| Signs petition | `petition_signature` | `Lead` | Primary conversion |
| Makes pledge | `pledge_commitment` | `Lead` + value | Includes $ amount |
| Newsletter signup | `newsletter_signup` | `CompleteRegistration` | Secondary conversion |
| Page view | `page_view` | `PageView` | Automatic |

## Performance Benchmarks

Aim for these metrics:

**Google Ads:**
- Click-through rate (CTR): 2%+ on search, 0.5%+ on display
- Cost per click (CPC): $0.50-$2.00
- Conversion rate: 10-20% (visitors who sign)
- Cost per conversion: $5-$15

**Facebook Ads:**
- CTR: 1-2%
- CPC: $0.30-$1.00
- Conversion rate: 15-25%
- Cost per lead: $2-$10

## Budget Recommendations for Salt Spring Island

### Conservative Budget: $500/month
- Google Search Ads: $250/month ($8/day)
- Facebook Ads: $200/month ($6.50/day)
- Display/Remarketing: $50/month ($1.50/day)
- **Expected:** 30-50 signatures/month

### Recommended Budget: $1,000/month
- Google Search Ads: $450/month ($15/day)
- Facebook Ads: $400/month ($13/day)
- Display/Remarketing: $150/month ($5/day)
- **Expected:** 60-100 signatures/month

### Aggressive Budget: $2,000/month
- Google Search Ads: $800/month ($26/day)
- Facebook Ads: $800/month ($26/day)
- Display/Remarketing: $400/month ($13/day)
- **Expected:** 150-200 signatures/month

## Need Help?

**Technical Issues:**
- Check browser console for error messages
- Verify tracking IDs are entered correctly
- Test in incognito mode to avoid cookie issues

**Campaign Performance:**
- Review this guide's benchmarks
- A/B test ad variations
- Consider hiring a local digital marketing consultant

**Questions About This Setup:**
- All tracking code is in `src/lib/tracking.js`
- SEO configuration is in `src/components/SEO.jsx`
- Form submissions are in `src/lib/campaignService.js`

## Privacy & Compliance

**Important:** Your site uses tracking pixels. You must:

1. ✅ Have a Privacy Policy (add one to your site)
2. ✅ Disclose data collection in your petition form
3. ✅ Comply with Canadian privacy laws (PIPEDA)
4. ✅ Consider adding a cookie consent banner

### Recommended Privacy Policy Generator:
- https://www.termsfeed.com/privacy-policy-generator/
- https://www.privacypolicygenerator.info/

Add your privacy policy as a new page and link it from the footer of all pages.

## Summary Checklist

Before launching your campaign, complete this checklist:

- [ ] Google Ads account created
- [ ] Google Ads Conversion ID added to `index.html`
- [ ] Facebook Business account created
- [ ] Facebook Pixel ID added to `index.html`
- [ ] Social sharing image created (`og-image.jpg`)
- [ ] Domain URLs updated in code (replace ssiarena.com)
- [ ] Conversion tracking tested and working
- [ ] Privacy policy page created
- [ ] Budget determined and approved
- [ ] Ad copy written and reviewed
- [ ] Landing pages tested on mobile
- [ ] First campaign created in Google Ads
- [ ] First campaign created in Facebook Ads Manager

## Success! 🎉

Your site is now fully optimized for Google Ads and Facebook marketing campaigns. You have:

✅ Professional SEO for all pages
✅ Social media optimization (Open Graph, Twitter Cards)
✅ Conversion tracking for Google Ads
✅ Facebook Pixel integration
✅ Automatic event tracking for all conversions
✅ Local SEO optimization for Salt Spring Island
✅ Structured data for better search visibility

Good luck with your campaign! The technical foundation is solid - now focus on great ad creative and targeting the right audience.
