import React from "react";
import { X, CheckCircle, Sparkles, TrendingUp } from "lucide-react";
import SocialShare from "./SocialShare";

/**
 * Thank you modal that appears after signing petition or making a pledge
 * Encourages social sharing and next steps
 */
export default function ThankYouModal({
  isOpen,
  onClose,
  type = "signature", // "signature" or "pledge"
  pledgeAmount = 0,
  signatureNumber = null,
  supporterName = ""
}) {
  if (!isOpen) return null;

  const messages = {
    signature: {
      title: "Thank You for Signing!",
      subtitle: signatureNumber
        ? `You're supporter #${signatureNumber}`
        : "You're now part of the movement",
      description: "Your signature adds powerful momentum to our campaign. Together, we're building something amazing for Salt Spring Island.",
      shareTitle: "I just signed the petition for Salt Spring Island's Community Arena!",
      shareDescription: "Join me in supporting this amazing project for our island. Together we can build a world-class recreation facility for all ages and abilities. Sign the petition today!"
    },
    pledge: {
      title: pledgeAmount > 0 ? "Thank You for Your Pledge!" : "Thank You!",
      subtitle: pledgeAmount > 0
        ? `Your $${pledgeAmount.toLocaleString()} pledge makes a real difference`
        : "Your support means the world to us",
      description: "Your commitment brings us one step closer to making the community arena a reality. Together, we're building our island's future.",
      shareTitle: `I just pledged $${pledgeAmount} to the Salt Spring Island Community Arena!`,
      shareDescription: "Support our community by signing the petition and pledging to the Salt Spring Island Arena. Together we can build an incredible facility for hockey, fitness, events, and community gatherings!"
    }
  };

  const message = messages[type];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 pointer-events-auto animate-slideUp relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {message.title}
            </h2>
            <p className="text-lg font-semibold text-sky-600 mb-3">
              {message.subtitle}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {message.description}
            </p>
          </div>

          {/* Stats/Impact (if available) */}
          {signatureNumber && (
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-700">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>
                  <strong>{signatureNumber}</strong> islanders have signed the petition!
                </span>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mb-6">
            <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-5">
              <h3 className="font-bold text-slate-900 mb-2 text-center">
                🎯 Help us reach our goal faster!
              </h3>
              <p className="text-sm text-slate-700 text-center mb-4">
                Share this campaign with your friends and family. Every signature counts!
              </p>

              {/* Social Share Buttons */}
              <SocialShare
                url="https://ssiarena.com/petition"
                title={message.shareTitle}
                description={message.shareDescription}
                hashtags="SSIArena,SaltSpringIsland,CommunityArena,SupportLocal"
                size="large"
              />
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-3">
            {type === "signature" && pledgeAmount === 0 && (
              <div className="text-center">
                <p className="text-sm text-slate-600 mb-3">Want to do more?</p>
                <button
                  onClick={() => {
                    onClose();
                    // Scroll to pledge section if on home page
                    setTimeout(() => {
                      const pledgeSection = document.getElementById('pledge');
                      if (pledgeSection) {
                        pledgeSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 300);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all font-semibold"
                >
                  💰 Make a Pledge
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              {type === "signature" && pledgeAmount === 0 ? "Maybe Later" : "Close"}
            </button>
          </div>

          {/* Stay Connected */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              We'll keep you updated on campaign progress via email
              {supporterName && `, ${supporterName.split(' ')[0]}`}!
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
