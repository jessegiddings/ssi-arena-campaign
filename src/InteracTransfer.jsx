import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Mail, Copy, CheckCircle2 } from 'lucide-react';

const InteracTransfer = () => {
  const [copied, setCopied] = useState(false);
  const email = 'healthylivingssi@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Interac e-Transfer
          </h3>
          <p className="text-slate-600">
            Prefer to donate via online banking? Zero fees means 100% goes to the project!
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-sm text-green-900">
            <strong>💰 Zero Transaction Fees</strong> — The Society receives your full donation amount
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-slate-900">How to send an e-Transfer:</h4>

          <ol className="space-y-3 text-slate-700">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mr-3 flex-shrink-0 mt-0.5">
                1
              </span>
              <span>Log in to your online banking or mobile banking app</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mr-3 flex-shrink-0 mt-0.5">
                2
              </span>
              <span>Select "Interac e-Transfer" or "Send Money"</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mr-3 flex-shrink-0 mt-0.5">
                3
              </span>
              <div className="flex-1">
                <span className="block mb-2">Send to this email address:</span>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border-2 border-purple-200">
                  <Mail className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <code className="flex-1 text-purple-700 font-semibold break-all">
                    {email}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded transition-colors flex items-center gap-1 text-sm font-semibold flex-shrink-0"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mr-3 flex-shrink-0 mt-0.5">
                4
              </span>
              <span>
                Enter your donation amount and <strong>include your name and email</strong> in the message
                (so the Society can send you a confirmation)
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mr-3 flex-shrink-0 mt-0.5">
                5
              </span>
              <span>Complete the transfer — no security question required (auto-deposit enabled)</span>
            </li>
          </ol>
        </div>

        {/* Note */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-sm text-slate-700">
            <strong>Note:</strong> As a registered non-profit, the Society cannot yet issue tax receipts.
            The organization is working toward charitable status. All e-Transfer donations will be tracked
            for future tax receipt issuance when available.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteracTransfer;
