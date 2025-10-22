import React, { useState } from "react";
import { X, CheckCircle, Sparkles, Link2, Copy, Check, Users, Megaphone, Heart } from "lucide-react";
import SocialShare from "./SocialShare";

/**
 * Thank you modal that appears after signing petition or making a pledge
 * URGENTLY encourages social sharing with easy copy-paste options
 */
export default function ThankYouModal({
  isOpen,
  onClose,
  type = "signature", // "signature" or "pledge"
  pledgeAmount = 0,
  signatureNumber = null,
  supporterName = ""
}) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);

  if (!isOpen) return null;

  const petitionUrl = "https://ssiarena.com/petition";

  // Pre-written messages for easy sharing
  const shareMessages = {
    text: `I just signed the petition for Salt Spring Island's Community Arena! 🏒

We need YOUR signature to show the government that our island community is serious about this project.

It takes 30 seconds to sign:
${petitionUrl}

Can you help by signing and sharing? We need 2,000 signatures.

#SSIArena #SaltSpringIsland`,

    email: `Subject: Help Salt Spring Island get a Community Arena!

Hi,

I just signed a petition for a community arena on Salt Spring Island and I'm hoping you'll add your name too.

This is a once-in-a-generation opportunity to bring a world-class recreation facility to our island - NHL rink, fitness center, walking track, and community gathering space.

We need 2,000 signatures to show government funders that the community is behind this.

Can you take 30 seconds to sign?
${petitionUrl}

And if you believe in this project, please share it with other islanders you know!

Thank you!`,

    short: `Help Salt Spring Island get a community arena! Sign the petition (30 seconds): ${petitionUrl} - We need your support! 🏒`
  };

  const copyToClipboard = async (text, setCopiedState) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleCopyLink = () => {
    copyToClipboard(petitionUrl, setLinkCopied);
  };

  const handleCopyMessage = () => {
    copyToClipboard(shareMessages.text, setMessageCopied);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 pointer-events-auto animate-slideUp relative my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>

          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Thank You for Signing!
            </h2>
            <p className="text-lg font-semibold text-sky-600 mb-3">
              You're now part of the movement
            </p>
          </div>

          {/* URGENT PLEA */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <Megaphone className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  🙏 We Need Your Help Right Now!
                </h3>
                <p className="text-slate-800 font-medium mb-2">
                  We need <strong>2,000 signatures</strong> to convince the government to fund this project.
                </p>
                <p className="text-slate-700 text-sm">
                  <strong className="text-orange-700">Please - share this petition with everyone you know on Salt Spring Island.</strong> Text it to your neighbors.
                  Post it in island Facebook groups. Email your friends. We can't do this without you!
                </p>
              </div>
            </div>
          </div>

          {/* BIG COPY LINK BUTTON */}
          <div className="mb-6">
            <button
              onClick={handleCopyLink}
              className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 ${
                linkCopied
                  ? 'bg-green-600 text-white'
                  : 'bg-gradient-to-r from-sky-600 to-blue-600 text-white hover:from-sky-700 hover:to-blue-700'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                {linkCopied ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>Link Copied! Now Paste & Send It!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-6 h-6" />
                    <span>Copy Petition Link</span>
                  </>
                )}
              </div>
            </button>
            <p className="text-xs text-slate-500 text-center mt-2">
              Click to copy, then paste into texts, emails, or Facebook posts
            </p>
          </div>

          {/* CHALLENGE */}
          <div className="bg-sky-50 border-2 border-sky-300 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-5 h-5 text-sky-600" />
              <h3 className="font-bold text-slate-900">
                Can You Share with 5 People Right Now?
              </h3>
            </div>
            <p className="text-sm text-slate-700 text-center mb-4">
              If everyone who signs shares with just 5 islanders, we'll reach our goal in days!
            </p>

            {/* Pre-written message to copy */}
            <div className="bg-white rounded-lg p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-600">PRE-WRITTEN MESSAGE (JUST COPY & SEND):</p>
                <button
                  onClick={handleCopyMessage}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    messageCopied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                  }`}
                >
                  {messageCopied ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3" />
                      Copy Message
                    </span>
                  )}
                </button>
              </div>
              <div className="text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded border border-slate-200 whitespace-pre-wrap">
                {shareMessages.short}
              </div>
            </div>

            {/* Quick action suggestions */}
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-slate-800">Quick ideas:</p>
              <ul className="space-y-1 text-slate-700">
                <li>📱 Text 5 island friends right now</li>
                <li>📧 Email your book club / sports team / neighbors</li>
                <li>📘 Post in "Salt Spring Island Community" Facebook group</li>
                <li>💬 Share in your island WhatsApp groups</li>
                <li>🗣️ Ask local businesses to share with customers</li>
              </ul>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="mb-6">
            <p className="text-center text-sm font-semibold text-slate-700 mb-3">
              Or share directly on social media:
            </p>
            <SocialShare
              url={petitionUrl}
              title="I just signed the petition for Salt Spring Island's Community Arena!"
              description={shareMessages.text}
              hashtags="SSIArena,SaltSpringIsland,CommunityArena"
              size="large"
              showLabels={false}
            />
          </div>

          {/* Goal Info - no specific numbers until we have real data */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-slate-700 font-medium mb-1">
                Our Goal: <strong>2,000 Signatures</strong>
              </p>
              <p className="text-xs text-slate-600">
                Every signature brings us closer to making this happen!
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            {type === "signature" && pledgeAmount === 0 && (
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const pledgeSection = document.getElementById('pledge');
                    if (pledgeSection) {
                      pledgeSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 300);
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Make a Financial Pledge Too
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Close
            </button>
          </div>

          {/* Final reminder */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm font-medium text-slate-700 mb-1">
              🙏 Every share counts. Every signature matters.
            </p>
            <p className="text-xs text-slate-500">
              Together we can make this happen for Salt Spring Island!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
