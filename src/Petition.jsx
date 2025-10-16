import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Send, DollarSign, ArrowLeft, PiggyBank } from "lucide-react";
import { submitSignature, submitPledge, getPledgeTier } from "./lib/campaignService.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const PLEDGE_TIERS = [
  { label: "$25", value: 25, description: "Supporter" },
  { label: "$50", value: 50, description: "Friend" },
  { label: "$100", value: 100, description: "Advocate" },
  { label: "$250", value: 250, description: "Champion" },
  { label: "$500", value: 500, description: "Builder" },
  { label: "$1,000", value: 1000, description: "Cornerstone" },
  { label: "$2,500", value: 2500, description: "Pillar" },
  { label: "$5,000", value: 5000, description: "Foundation" },
  { label: "$10,000", value: 10000, description: "Legacy" },
  { label: "Major", value: 25000, description: "Visionary" },
];

export default function Petition() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    pledge: 0,
    consentUpdates: false,
    consentPetition: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.postalCode) {
      setError("Please complete first/last name, email, and postal code.");
      return;
    }
    if (!form.consentPetition) {
      setError("You must agree that your name can be counted toward the community petition.");
      return;
    }

    setSubmitting(true);
    try {
      // Submit signature to Supabase
      const signatureResult = await submitSignature({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        postalCode: form.postalCode,
        consentPetition: form.consentPetition,
        consentUpdates: form.consentUpdates,
      });

      if (!signatureResult.success) {
        throw new Error(signatureResult.error || "Failed to submit signature");
      }

      setSubmitted('signature');
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePledgeSubmit = async () => {
    setError("");

    if (!form.firstName || !form.email) {
      setError("Please provide your first name and email for pledge follow-up.");
      return;
    }
    if (!form.pledge || form.pledge <= 0) {
      setError("Please select or enter a pledge amount.");
      return;
    }

    setSubmitting(true);
    try {
      // First create a basic signature entry for pledge tracking
      const signatureResult = await submitSignature({
        firstName: form.firstName,
        lastName: form.lastName || '',
        email: form.email,
        postalCode: form.postalCode || '',
        consentPetition: false, // This is a pledge-only submission
        consentUpdates: true, // They want follow-up for their pledge
      });

      if (!signatureResult.success) {
        throw new Error(signatureResult.error || "Failed to submit pledge information");
      }

      // Submit the pledge
      const pledgeTier = getPledgeTier(form.pledge);
      const pledgeResult = await submitPledge(signatureResult.signatureId, {
        amount: form.pledge,
        tier: pledgeTier.label,
      });

      if (!pledgeResult.success) {
        throw new Error(pledgeResult.error || "Failed to submit pledge");
      }

      setSubmitted('pledge');
      // Clear the form
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        postalCode: '',
        pledge: 0,
        consentUpdates: false,
        consentPetition: false,
      });
    } catch (err) {
      console.error("Pledge submission error:", err);
      setError("Pledge submission failed: " + (err.message || "Something went wrong. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Simple Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/ssicaalogo.png"
                alt="Salt Spring Island Community Arena Association Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">SSI Arena Petition</h1>
            </div>
          </div>
          <Link to="/" className="text-sm text-sky-600 hover:text-sky-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight uppercase tracking-wide">
            Make Your Voice Heard
          </h1>
          <p className="text-2xl md:text-3xl text-slate-700 mb-8">
            Sign the petition for Salt Spring Island to get an arena.
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Join hundreds of island residents in supporting a year-round community recreation facility
            that will serve families, youth, and seniors alike.
          </p>
          <Link to="/">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-base border-2 border-sky-600 text-sky-700 hover:bg-sky-50 shadow-lg font-semibold"
            >
              Learn More About the Project →
            </Button>
          </Link>
        </div>
      </section>

      {/* Petition Form */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-8 text-white text-center">
              <Send className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Sign the Petition</h2>
              <p className="text-sky-100">Add your support for the Salt Spring Island Arena</p>
            </div>

            <CardContent className="pt-10 pb-8 px-10">
              {submitted === 'signature' ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-green-800 mb-4">Thank You!</h3>
                  <p className="text-lg text-slate-600 max-w-md mx-auto mb-6">
                    Your signature has been added to the petition. You're now part of the movement
                    to bring world-class recreation to Salt Spring Island.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-4"
                  >
                    Sign Another Petition
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First name *</Label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                        className="mt-1"
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name *</Label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                        className="mt-1"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="mt-1"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal code *</Label>
                      <Input
                        id="postalCode"
                        value={form.postalCode}
                        onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                        placeholder="V8K ___"
                        className="mt-1"
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-6">
                    <label className="flex items-start gap-3">
                      <Checkbox
                        checked={form.consentPetition}
                        onCheckedChange={(v) => setForm((f) => ({ ...f, consentPetition: Boolean(v) }))}
                        className="mt-1"
                      />
                      <span className="text-sm">
                        <strong>Required:</strong> Count my signature in support of the Salt Spring Island Community Arena
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <Checkbox
                        checked={form.consentUpdates}
                        onCheckedChange={(v) => setForm((f) => ({ ...f, consentUpdates: Boolean(v) }))}
                        className="mt-1"
                      />
                      <span className="text-sm">
                        Send me project updates and meeting invitations
                      </span>
                    </label>
                  </div>

                  {error && !error.includes('pledge') && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800"
                  >
                    {submitting ? "Submitting..." : "Add My Signature"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pledge Section */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-8 text-white text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Make a Pledge</h2>
              <p className="text-emerald-100">Help us demonstrate community capacity</p>
            </div>

            <CardContent className="pt-10 pb-8 px-10">
              {submitted === 'pledge' ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-green-800 mb-4">Pledge Received!</h3>
                  <p className="text-lg text-slate-600 max-w-md mx-auto">
                    Thank you for your pledge. We'll follow up with you about formal donation options,
                    including tax-receipted gifts and naming opportunities.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-sky-900">
                      <strong>Note:</strong> Pledges are non-binding expressions of intent. We'll follow up later
                      with formal options for tax-receipted donations, naming rights, and sponsorships.
                    </p>
                  </div>

                  <div>
                    <Label className="mb-3 block">Select a pledge amount</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {PLEDGE_TIERS.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => setForm((f) => ({ ...f, pledge: t.value }))}
                          className={`border-2 rounded-xl px-3 py-3 text-sm font-semibold transition-all ${
                            form.pledge === t.value
                              ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                              : "border-slate-200 hover:border-emerald-300"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customPledge">Or enter a custom amount</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-lg font-semibold">$</span>
                      <Input
                        id="customPledge"
                        type="number"
                        min={0}
                        value={form.pledge || ""}
                        onChange={(e) => setForm((f) => ({ ...f, pledge: Number(e.target.value) }))}
                        className="max-w-[200px]"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <h4 className="font-semibold text-lg">Your Contact Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pledgeFirstName">First name *</Label>
                        <Input
                          id="pledgeFirstName"
                          value={form.firstName}
                          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                          className="mt-1"
                          autoComplete="given-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pledgeEmail">Email *</Label>
                        <Input
                          id="pledgeEmail"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="mt-1"
                          autoComplete="email"
                        />
                      </div>
                    </div>
                  </div>

                  {error && error.includes('pledge') && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <Button
                    onClick={handlePledgeSubmit}
                    disabled={!form.pledge || form.pledge <= 0 || !form.firstName || !form.email || submitting}
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 disabled:opacity-50"
                  >
                    {submitting ? "Submitting Pledge..." : `Submit Pledge of $${form.pledge?.toLocaleString() || 0}`}
                  </Button>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-start gap-3 text-sm text-slate-600">
                      <PiggyBank className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-2">Pledge Pathways:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Founding Benefactor: $100k+ (naming opportunities)</li>
                          <li>• Community Builder: $25k–$100k (program endowment)</li>
                          <li>• Family Patron: $5k–$25k (seat/locker dedications)</li>
                          <li>• Local Business Sponsor: $2.5k+ (dasher boards, events)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm mb-2">
            Salt Spring Island Community Arena Association
          </p>
          <p className="text-slate-500 text-xs">
            saltspringislandarena@gmail.com • Registered Non-Profit Society
          </p>
          <div className="mt-4">
            <Link to="/" className="text-sky-400 hover:text-sky-300 text-sm font-medium">
              Learn More About the Project →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
