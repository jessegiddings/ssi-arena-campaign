import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent } from './components/ui/card';
import { CheckCircle2, CreditCard, AlertCircle } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Preset donation amounts
const DONATION_AMOUNTS = [25, 50, 100, 250, 500, 1000, 2500, 5000];

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePresetClick = (value) => {
    setAmount(value);
    setCustomAmount('');
    setError('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value ? parseFloat(value) : '');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validation
    if (!amount || amount <= 0) {
      setError('Please enter a donation amount');
      return;
    }

    if (!name || !email) {
      setError('Please provide your name and email');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Create payment intent on backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      // Confirm payment with card element
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name,
              email,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setProcessing(false);

        // Reset form
        setAmount('');
        setCustomAmount('');
        setName('');
        setEmail('');
        elements.getElement(CardElement).clear();
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred processing your donation');
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <Card className="border-2 border-green-500 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
          <p className="text-lg text-slate-700 mb-4">
            Your donation of ${amount} CAD has been processed successfully.
          </p>
          <p className="text-slate-600 mb-6">
            You'll receive a confirmation email shortly. While the Society cannot yet issue tax receipts,
            this contribution is moving Salt Spring Island's arena from vision to reality.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Make Another Donation
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-xl border-2 border-sky-200">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Donate Now
            </h3>
            <p className="text-slate-600">
              Your contribution brings this community arena closer to reality
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <p className="text-sm text-amber-900">
              <strong>Note:</strong> As a registered non-profit, the Society cannot yet issue tax receipts.
              The organization is working toward charitable status.
            </p>
          </div>

          {/* Preset Amount Buttons */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Select Amount (CAD)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {DONATION_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handlePresetClick(value)}
                  className={`py-3 px-2 rounded-lg font-semibold transition-all ${
                    amount === value
                      ? 'bg-sky-600 text-white border-2 border-sky-600'
                      : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-sky-400'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label htmlFor="customAmount" className="block text-sm font-semibold text-slate-700 mb-2">
              Or Enter Custom Amount (CAD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                $
              </span>
              <input
                type="number"
                id="customAmount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Donor Information */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-sky-500 focus:outline-none"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-sky-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Card Element */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <CreditCard className="inline w-4 h-4 mr-1" />
              Card Information *
            </label>
            <div className="p-4 border-2 border-slate-300 rounded-lg bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#334155',
                      '::placeholder': {
                        color: '#94a3b8',
                      },
                    },
                    invalid: {
                      color: '#ef4444',
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
              processing
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            {processing ? 'Processing...' : `Donate $${amount || '0'} CAD`}
          </button>

          {/* Security Note */}
          <p className="text-xs text-slate-500 text-center mt-4">
            🔒 Secure payment powered by Stripe. Your card information is never stored on the Society's servers.
          </p>
        </CardContent>
      </Card>
    </form>
  );
};

// Main component with Stripe Elements provider
const DonationForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default DonationForm;
