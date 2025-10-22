import React, { useState } from "react";
import { Facebook, Twitter, Mail, Link2, MessageCircle, Check } from "lucide-react";
import { trackSocialShare } from "../lib/tracking";

/**
 * Social sharing buttons component
 * Allows users to share the campaign on various platforms
 */
export default function SocialShare({
  url = "https://ssiarena.com/",
  title = "Support Salt Spring Island's Community Arena",
  description = "Join me in supporting the Salt Spring Island Community Arena! Sign the petition and help build a world-class facility for our community.",
  hashtags = "SSIArena,SaltSpringIsland,CommunityArena",
  showLabels = true,
  size = "default" // "small", "default", "large"
}) {
  const [copied, setCopied] = useState(false);

  // Encode parameters for URLs
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = encodeURIComponent(hashtags);

  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    default: "w-10 h-10 text-base",
    large: "w-12 h-12 text-lg"
  };

  const iconSizes = {
    small: "w-4 h-4",
    default: "w-5 h-5",
    large: "w-6 h-6"
  };

  const buttonClass = `${sizeClasses[size]} rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95`;
  const iconClass = iconSizes[size];

  // Share handlers
  const handleFacebookShare = () => {
    trackSocialShare('facebook', url);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleTwitterShare = () => {
    trackSocialShare('twitter', url);
    const text = `${title} ${hashtags.split(',').map(tag => `#${tag}`).join(' ')}`;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(text)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleEmailShare = () => {
    trackSocialShare('email', url);
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\nSign the petition here: ${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppShare = () => {
    trackSocialShare('whatsapp', url);
    const text = `${title}\n\n${description}\n\n${url}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackSocialShare('copy_link', url);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {showLabels && (
        <p className="text-sm font-medium text-slate-700">Share this campaign:</p>
      )}

      <div className="flex items-center gap-3 flex-wrap justify-center">
        {/* Facebook */}
        <button
          onClick={handleFacebookShare}
          className={`${buttonClass} bg-[#1877F2] hover:bg-[#0d5dbf] text-white`}
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <Facebook className={iconClass} fill="currentColor" />
        </button>

        {/* Twitter/X */}
        <button
          onClick={handleTwitterShare}
          className={`${buttonClass} bg-[#000000] hover:bg-[#333333] text-white`}
          title="Share on Twitter/X"
          aria-label="Share on Twitter"
        >
          <Twitter className={iconClass} fill="currentColor" />
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsAppShare}
          className={`${buttonClass} bg-[#25D366] hover:bg-[#1faa52] text-white`}
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className={iconClass} />
        </button>

        {/* Email */}
        <button
          onClick={handleEmailShare}
          className={`${buttonClass} bg-slate-600 hover:bg-slate-700 text-white`}
          title="Share via Email"
          aria-label="Share via Email"
        >
          <Mail className={iconClass} />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`${buttonClass} ${copied ? 'bg-green-600' : 'bg-sky-600 hover:bg-sky-700'} text-white relative`}
          title={copied ? "Link copied!" : "Copy link"}
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <Check className={iconClass} />
          ) : (
            <Link2 className={iconClass} />
          )}
        </button>
      </div>

      {copied && (
        <p className="text-xs text-green-600 font-medium animate-pulse">
          Link copied to clipboard!
        </p>
      )}
    </div>
  );
}

/**
 * Compact version for use in tight spaces
 */
export function SocialShareCompact({ url, title, description }) {
  return (
    <SocialShare
      url={url}
      title={title}
      description={description}
      showLabels={false}
      size="small"
    />
  );
}

/**
 * Large version for hero sections and thank you pages
 */
export function SocialShareLarge({ url, title, description, hashtags }) {
  return (
    <SocialShare
      url={url}
      title={title}
      description={description}
      hashtags={hashtags}
      showLabels={true}
      size="large"
    />
  );
}
