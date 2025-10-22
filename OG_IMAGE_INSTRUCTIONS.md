# Creating Your Social Sharing Image (og-image.jpg)

When people share your campaign on Facebook, Twitter, LinkedIn, or WhatsApp, the **og-image.jpg** file is what appears in the preview. A compelling image can **double or triple your click-through rate** from social shares!

## Requirements

- **File name:** `og-image.jpg`
- **Location:** `/public/og-image.jpg`
- **Dimensions:** 1200 x 630 pixels (Facebook/Twitter standard)
- **File size:** Under 1MB (ideally 200-500KB)
- **Format:** JPG or PNG (JPG preferred for smaller file size)

## What to Include

Your social sharing image should have:

1. **Eye-catching arena image** - Use one of your existing renderings
2. **Bold headline text** - "Support Salt Spring Island's Community Arena"
3. **Your logo** - SSI Arena Association logo
4. **Call to action** - "Sign the Petition" or "Join the Movement"
5. **Optional:** Key benefit or stat - "Building our future together"

## Option 1: Create with Canva (FREE & Easy - 10 minutes)

**Best for:** Non-designers, quick results, professional templates

### Step-by-Step:

1. **Go to Canva.com** (free account)
   - Sign up if you don't have an account

2. **Search for "Open Graph" or "Facebook Post"** templates
   - Or use custom size: 1200 x 630 px

3. **Choose a template** that looks good for your campaign
   - Look for templates with:
     - Space for a large background image
     - Bold text overlay
     - Clean, professional design

4. **Customize the template:**
   - **Background:** Upload one of your arena renderings:
     - `/public/overice1.jpg` - Good overview shot
     - `/public/mezzanine.jpg` - Shows interior
     - `/public/rainbow_masterplan_with_arena.jpg` - Site context

   - **Headline:** Change text to:
     ```
     Support Salt Spring Island's
     Community Arena
     ```

   - **Logo:** Upload `/public/ssicaalogo.png`

   - **Call to Action:** Add text like:
     - "Sign the Petition"
     - "Join 400+ Supporters"
     - "Build Our Future"

5. **Design tips:**
   - Use white text with a semi-transparent black overlay for readability
   - Keep text large (headline 60-80px minimum)
   - Leave margins (don't put text right at the edges)
   - Make sure logo is clearly visible

6. **Download:**
   - Click "Share" → "Download"
   - Choose **JPG** format
   - Save as `og-image.jpg`

7. **Upload to your project:**
   - Place file in `/public/og-image.jpg`

**Canva Template Recommendations:**
- Search: "community fundraiser"
- Search: "nonprofit campaign"
- Search: "petition social media"

## Option 2: Hire on Fiverr ($10-25 - 24-48 hours)

**Best for:** Professional polish without design skills

### Step-by-Step:

1. **Go to Fiverr.com**
   - Search: "social media graphics" or "open graph image"

2. **Find a seller** ($10-25 range)
   - Look for:
     - 4.5+ star rating
     - Multiple reviews
     - Fast delivery (24-48 hours)
     - Examples that match your style

3. **Provide to the designer:**
   ```
   Project: Social sharing image for Salt Spring Island Community Arena campaign

   Size: 1200 x 630 pixels
   Format: JPG

   Text:
   - Headline: "Support Salt Spring Island's Community Arena"
   - Subtext: "Sign the Petition | Build Our Future"

   Images: [Attach overice1.jpg and ssicaalogo.png]

   Style: Professional, community-focused, inspiring
   Colors: Blues, whites (match logo)

   Deliverable: JPG file named og-image.jpg
   ```

4. **Review and request revisions** if needed

5. **Download and save** as `/public/og-image.jpg`

## Option 3: DIY with Photoshop/GIMP (Advanced)

**Best for:** If you have design software and skills

### Design Specs:

- Canvas: 1200 x 630 px, 72 DPI
- Background: Arena rendering (slightly dimmed/blurred)
- Overlay: Semi-transparent dark gradient (top to bottom or left to right)
- Logo: Top left, 150-200px width
- Headline: Center, 72-90pt, bold, white with subtle shadow
- CTA: Bottom center, 48-60pt, white or light blue

### Layers:

1. Background image (arena rendering)
2. Dark overlay (40-60% opacity black gradient)
3. Logo (top left with padding)
4. Headline text (centered, bold)
5. CTA text or button (bottom)

### Export Settings:

- Format: JPG
- Quality: 80-90%
- File size: Aim for under 500KB

## Sample Text Options

Choose what resonates best with your campaign:

### Headline Options:
- "Support Salt Spring Island's Community Arena"
- "Build a Community Arena for Salt Spring Island"
- "Join the Movement for SSI Arena"
- "Our Island Needs a Community Arena"

### Subtext Options:
- "Sign the Petition • Join 400+ Supporters"
- "Building our future together"
- "Hockey • Fitness • Community • Future"
- "For all ages and abilities"

### CTA Options:
- "Sign Now"
- "Join Us"
- "Learn More"
- "Take Action"

## Design Best Practices

### DO:
✅ Use high-contrast text (white on dark, or dark on light)
✅ Keep text large and readable on mobile (people will see this on phones!)
✅ Include your logo for brand recognition
✅ Use one of your actual arena renderings (shows it's real!)
✅ Leave "safe zones" - keep important elements 60px from edges
✅ Test on mobile before finalizing

### DON'T:
❌ Use tiny text (won't be readable when shared)
❌ Overcrowd the image with too much text
❌ Use low-quality or pixelated images
❌ Forget to include a call to action
❌ Use stock photos (use YOUR arena renderings!)
❌ Put critical info in corners (can be cropped by platforms)

## Testing Your Image

After creating your og-image.jpg:

1. **Place in `/public/og-image.jpg`**

2. **Test with Facebook Debugger:**
   - Go to: https://developers.facebook.com/tools/debug/
   - Enter your URL: `https://ssiarena.com`
   - Click "Scrape Again" to refresh
   - Preview should show your new image

3. **Test with Twitter Card Validator:**
   - Go to: https://cards-dev.twitter.com/validator
   - Enter your URL
   - See preview

4. **Test on mobile:**
   - Share link in a message to yourself
   - View on your phone
   - Make sure text is readable!

## Quick Checklist

Before finalizing your og-image.jpg:

- [ ] File is exactly 1200 x 630 pixels
- [ ] File size is under 1MB (ideally 200-500KB)
- [ ] Saved as `og-image.jpg` in `/public/` folder
- [ ] Headline is clear and readable
- [ ] Logo is visible
- [ ] Has a call to action
- [ ] Text has good contrast with background
- [ ] Tested on Facebook Debugger
- [ ] Looks good on mobile

## Example Layout

```
┌──────────────────────────────────────────────────┐
│  [Logo]                                          │
│                                                  │
│                                                  │
│         Support Salt Spring Island's             │
│            Community Arena                       │
│                                                  │
│      [Arena Rendering as Background]             │
│                                                  │
│        Sign the Petition • Join 400+             │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Already Have the Image?

Once you've created your `og-image.jpg`:

1. Place it in `/public/og-image.jpg`
2. Push to your repository
3. Clear Facebook/Twitter cache using debugger tools above
4. Test by sharing your link!

## Need Help?

If you get stuck:

1. **Canva issues:** Their help center is excellent
2. **File size too large:** Use TinyJPG.com to compress
3. **Design questions:** Look at successful campaigns for inspiration (search "petition social media" on Google Images)
4. **Still stuck:** Hire someone on Fiverr for $10-15

## Expected Impact

A good social sharing image can:

- **2-3x click-through rate** from social shares
- Make your campaign look more professional
- Increase trust and credibility
- Help your posts stand out in crowded social feeds

**Investing 10 minutes in creating this image is one of the highest-ROI tasks you can do for your campaign!**

---

**Questions?** Contact the campaign team at saltspringislandarena@gmail.com
