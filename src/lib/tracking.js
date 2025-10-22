/**
 * Marketing and Analytics Tracking Utilities
 *
 * This file provides functions to track events for Google Ads, Facebook Pixel,
 * and other marketing platforms. It handles tracking in a way that works even
 * if the pixels aren't installed yet.
 */

/**
 * Track a Google Ads conversion event
 * @param {string} conversionLabel - The conversion label from Google Ads
 * @param {number} value - Optional conversion value
 */
export function trackGoogleAdsConversion(conversionLabel, value = 0) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `AW-XXXXXXXXXX/${conversionLabel}`,
      'value': value,
      'currency': 'CAD'
    });
    console.log('Google Ads conversion tracked:', conversionLabel, value);
  } else {
    console.log('Google Ads not initialized - would track:', conversionLabel, value);
  }
}

/**
 * Track a Facebook Pixel event
 * @param {string} eventName - The event name (Lead, CompleteRegistration, etc.)
 * @param {Object} params - Optional event parameters
 */
export function trackFacebookPixel(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
    console.log('Facebook Pixel event tracked:', eventName, params);
  } else {
    console.log('Facebook Pixel not initialized - would track:', eventName, params);
  }
}

/**
 * Track a custom event (useful for future analytics integration)
 * @param {string} eventName - The event name
 * @param {Object} params - Event parameters
 */
export function trackCustomEvent(eventName, params = {}) {
  // Google Analytics 4 event tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  console.log('Custom event tracked:', eventName, params);
}

/**
 * Track petition signature event
 * @param {Object} signatureData - The signature data
 */
export function trackPetitionSignature(signatureData) {
  // Track in Google Ads as a conversion
  trackGoogleAdsConversion('petition_signature');

  // Track in Facebook Pixel as a Lead
  trackFacebookPixel('Lead', {
    content_name: 'Petition Signature',
    content_category: 'Petition',
    value: 0,
    currency: 'CAD'
  });

  // Track custom event
  trackCustomEvent('petition_signature', {
    event_category: 'Petition',
    event_label: 'Signature Submitted'
  });
}

/**
 * Track pledge commitment event
 * @param {number} pledgeAmount - The pledge amount
 */
export function trackPledgeCommitment(pledgeAmount) {
  // Track in Google Ads as a conversion with value
  trackGoogleAdsConversion('pledge_commitment', pledgeAmount);

  // Track in Facebook Pixel as a Lead with value
  trackFacebookPixel('Lead', {
    content_name: 'Pledge Commitment',
    content_category: 'Fundraising',
    value: pledgeAmount,
    currency: 'CAD'
  });

  // Track custom event
  trackCustomEvent('pledge_commitment', {
    event_category: 'Fundraising',
    event_label: 'Pledge Submitted',
    value: pledgeAmount
  });
}

/**
 * Track newsletter signup event
 * @param {Object} signupData - The signup data
 */
export function trackNewsletterSignup(signupData) {
  // Track in Google Ads
  trackGoogleAdsConversion('newsletter_signup');

  // Track in Facebook Pixel
  trackFacebookPixel('CompleteRegistration', {
    content_name: 'Newsletter Signup',
    value: 0,
    currency: 'CAD'
  });

  // Track custom event
  trackCustomEvent('newsletter_signup', {
    event_category: 'Engagement',
    event_label: 'Newsletter Subscription'
  });
}

/**
 * Track page view (call this when route changes)
 * @param {string} pagePath - The page path
 * @param {string} pageTitle - The page title
 */
export function trackPageView(pagePath, pageTitle) {
  // Google Analytics 4 page view
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }

  // Facebook Pixel page view
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }

  console.log('Page view tracked:', pagePath, pageTitle);
}

/**
 * Track social share event
 * @param {string} platform - Social platform (facebook, twitter, etc.)
 * @param {string} url - URL being shared
 */
export function trackSocialShare(platform, url) {
  trackCustomEvent('social_share', {
    event_category: 'Social',
    event_label: platform,
    page_path: url
  });
}

/**
 * Track button click event
 * @param {string} buttonName - Name/ID of the button
 * @param {string} location - Where the button is located
 */
export function trackButtonClick(buttonName, location) {
  trackCustomEvent('button_click', {
    event_category: 'Engagement',
    event_label: buttonName,
    location: location
  });
}

/**
 * Initialize tracking pixels
 * Call this function when the user provides their tracking IDs
 * @param {Object} config - Configuration object with tracking IDs
 * @param {string} config.googleAdsId - Google Ads conversion ID (AW-XXXXXXXXXX)
 * @param {string} config.facebookPixelId - Facebook Pixel ID
 */
export function initializeTracking(config = {}) {
  if (config.googleAdsId && typeof window !== 'undefined') {
    // Initialize Google Ads
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAdsId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', config.googleAdsId);

    console.log('Google Ads tracking initialized:', config.googleAdsId);
  }

  if (config.facebookPixelId && typeof window !== 'undefined') {
    // Initialize Facebook Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', config.facebookPixelId);
    window.fbq('track', 'PageView');

    console.log('Facebook Pixel initialized:', config.facebookPixelId);
  }
}
