import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Mail, Users, HeartHandshake, PiggyBank, BarChart3, ShieldCheck, Send, Trophy, MapPin, Calendar, DollarSign, Target, TrendingUp, Building2, Mountain, Sparkles, Clock, Star } from "lucide-react";
import { submitSignature, submitPledge, getCampaignStats, subscribeToStats, getPledgeTier } from "./lib/campaignService.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Photo placeholder component
function PhotoPlaceholder({ label, aspectRatio = "16/9", overlay = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-sky-100 ${overlay ? '' : 'shadow-lg'}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <Mountain className="w-12 h-12 text-slate-400 mb-2" />
        <p className="text-sm text-slate-500 text-center font-medium">{label}</p>
      </div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      )}
    </div>
  );
}

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

// Baseline signature count (offline signatures collected before website launch)
const BASELINE_SIGNATURE_OFFSET = 400;
console.log('FILE LOADED - BASELINE_SIGNATURE_OFFSET is:', BASELINE_SIGNATURE_OFFSET);

// Default progress data (fallback if Supabase is not configured)
const DEFAULT_PROGRESS_DATA = {
  pledgeAmount: 34750,
  pledgeGoal: 150000,
  signatures: 407,
  signatureGoal: 2000,
  emails: 203,
  emailGoal: 1000
};

function ProgressMeter({ current, goal, label, prefix = "", icon }) {
  const percentage = Math.min((current / goal) * 100, 100);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(current);
      setAnimatedPercentage(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [current, percentage]);

  return (
    <div className="text-center">
      {icon && <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-600/10 flex items-center justify-center">{icon}</div>}
      <div className="text-3xl font-bold text-sky-600 mb-2">
        {prefix}{animatedValue.toLocaleString()}
      </div>
      <div className="text-sm text-slate-600 mb-3">{label}</div>
      <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
        <div
          className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${animatedPercentage}%` }}
        />
      </div>
      <div className="text-xs text-slate-500">
        {Math.round(animatedPercentage)}% of {prefix}{goal.toLocaleString()} goal
      </div>
    </div>
  );
}

export default function SSIArenaRedesigned() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    role: "resident",
    supportLevel: "yes",
    pledge: 0,
    volunteer: { canvass: false, host: false, proServices: false, match: false },
    comments: "",
    consentUpdates: false,
    consentPetition: false,
  });

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
  const [progressData, setProgressData] = useState(DEFAULT_PROGRESS_DATA);
  const [loadingStats, setLoadingStats] = useState(true);

  // Load campaign stats on component mount and set up real-time updates
  useEffect(() => {
    const loadStats = async () => {
      try {
        console.log('Loading campaign stats...');
        const stats = await getCampaignStats();
        console.log('Loaded stats:', stats);
        console.log('BASELINE_SIGNATURE_OFFSET:', BASELINE_SIGNATURE_OFFSET);
        if (stats) {
          console.log('stats.signatures before offset:', stats.signatures);
          console.log('Adding offset:', stats.signatures, '+', BASELINE_SIGNATURE_OFFSET, '=', stats.signatures + BASELINE_SIGNATURE_OFFSET);
          const newProgressData = {
            signatures: stats.signatures + BASELINE_SIGNATURE_OFFSET,
            signatureGoal: stats.signatureGoal,
            pledgeAmount: stats.pledgeAmount,
            pledgeGoal: stats.pledgeGoal,
            emails: stats.signatures + BASELINE_SIGNATURE_OFFSET, // Using signatures as email count for now
            emailGoal: 1000
          };
          console.log('Setting progress data:', newProgressData);
          setProgressData(newProgressData);
        } else {
          console.log('No stats returned, using default data');
        }
      } catch (error) {
        console.error('Error loading campaign stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();

    // Set up real-time subscription
    console.log('Setting up real-time subscription...');
    const unsubscribe = subscribeToStats((stats) => {
      console.log('Real-time update received:', stats);
      const newProgressData = {
        signatures: stats.signatures + BASELINE_SIGNATURE_OFFSET,
        signatureGoal: stats.signatureGoal,
        pledgeAmount: stats.pledgeAmount,
        pledgeGoal: stats.pledgeGoal,
        emails: stats.signatures + BASELINE_SIGNATURE_OFFSET, // Using signatures as email count
        emailGoal: 1000
      };
      console.log('Updating progress data in real-time:', newProgressData);
      setProgressData(newProgressData);
    });

    return () => {
      console.log('Cleaning up real-time subscription');
      unsubscribe();
    };
  }, []);

  const handleChange = (field, value) => setFormData((f) => ({ ...f, [field]: value }));
  const handleNested = (group, key, value) => setFormData((f) => ({ ...f, [group]: { ...f[group], [key]: value } }));

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
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/ssicaalogo.png"
                alt="Salt Spring Island Community Arena Association Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Salt Spring Island Community Arena Association</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Registered Non-Profit • Tax Receipts Available • For All Ages</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <button onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-sky-600 transition-colors">Vision</button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-sky-600 transition-colors">Benefits</button>
            <Link to="/community-benefits" className="hover:text-sky-600 transition-colors">Research</Link>
            <button onClick={() => document.getElementById('progress')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-sky-600 transition-colors">Progress</button>
            <button onClick={() => document.getElementById('sign')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-sky-600 transition-colors">Sign & Pledge</button>
          </nav>
        </div>
      </header>

      {/* Community Survey Statement */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight uppercase">
            The people of<br />
            Salt Spring Island<br />
            have spoken.
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-6 max-w-4xl mx-auto leading-relaxed">
            When the community was surveyed in May of 2025, the three things at the top of everyone's list of community needs were: an ice rink, an indoor walking track, and a community fitness center.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-sky-700">
            So let's build it. What are we waiting for?
          </p>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Let's build a year‑round arena for Salt Spring Island
              </h2>
              <p className="mt-6 text-lg md:text-xl text-slate-700">
                We propose a <span className="font-semibold text-sky-700">community ice rink</span>, an <span className="font-semibold text-sky-700">indoor walking track</span>, a <span className="font-semibold text-sky-700">fitness center</span>, and a <span className="font-semibold text-sky-700">curling rink</span> open to everyone—kids, families, and seniors alike.
              </p>
              <ul className="mt-8 space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 mt-0.5 text-sky-600 flex-shrink-0" />
                  <span className="text-lg">Safer, healthier winters with inclusive recreation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 mt-0.5 text-sky-600 flex-shrink-0" />
                  <span className="text-lg">Home ice for local hockey, figure skating, and curling, and summer lacrosse, rollerblading, and roller skating, ball hockey, and other indoor events</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 mt-0.5 text-sky-600 flex-shrink-0" />
                  <span className="text-lg">Community hub: gatherings, school programs, tournaments</span>
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg bg-sky-600 text-white hover:bg-sky-700 shadow-lg"
                  onClick={() => document.getElementById('sign')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Send className="w-5 h-5 mr-2" /> Sign the Petition
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-2 border-sky-600 text-sky-700 hover:bg-sky-50 shadow-lg"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Building2 className="w-5 h-5 mr-2" /> View the Design
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ aspectRatio: "16/12" }}>
                <img
                  src="/overice1.jpg"
                  alt="Proposed Salt Spring Island Community Arena - exterior rendering"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6">
                <p className="text-2xl font-bold text-sky-700">Join {progressData.signatures}+ Island Supporters</p>
                <p className="text-slate-600 mt-2">Community members backing this initiative</p>
              </div>
            </div>
          </div>

          {/* Goal Statement */}
          <div className="max-w-4xl mx-auto px-6 mt-8 text-center">
            <p className="text-sm text-slate-500">
              <strong>Goal:</strong> We need 2,000 signatures • $5M in community pledges toward a $13–15M project
            </p>
          </div>
        </div>
      </section>

      {/* Building Community Support Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Building Community Support for Salt Spring Island's Arena
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our vision is simple: bring a community ice arena to Salt Spring Island by building it next to the proposed tennis courts at 262 Rainbow Rd. To make this dream a reality, we need to show the Capital Regional District (CRD) that our community wants this facility. Your signature demonstrates public support for our proposal to amend the current future plan for 262 Rainbow Rd. to include an ice rink. These signatures will be presented to the CRD as proof that Salt Spring Island residents are behind this important community project.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                The Path Forward: Feasibility First, Then Major Funding
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Before we can pursue major government grants, we need a professional feasibility study that proves our arena is viable and sustainable. This critical first step requires $150,000 in community fundraising. Once we have this feasibility report in hand, we'll be eligible to apply for substantial federal and provincial grants that could fund the majority of the project. Think of your contribution as an investment in unlocking much larger funding opportunities – every dollar raised now helps us access the government support needed to build our arena.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                Your Support Makes the Difference
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                We're asking for two things: your signature to show the CRD that Salt Spring wants this arena, and your financial support to fund the feasibility study that will make it possible. Together, these two actions will transform our community arena from a dream into a funded reality.
              </p>
            </div>

            {/* Site Plan Image */}
            <div className="mt-12">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center">
                Proposed Location: 262 Rainbow Road Recreation Centre
              </h3>
              <div className="bg-white rounded-xl shadow-lg p-4">
                <img
                  src="/rainbow_masterplan_with_arena_curling.png"
                  alt="Rainbow Recreation Centre Master Plan showing proposed 50,000 sq ft arena location with curling sheets next to existing tennis courts"
                  className="w-full rounded-lg"
                />
                <p className="text-sm text-slate-600 text-center mt-3">
                  The proposed arena would integrate seamlessly with the current Rainbow Recreation Centre facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Inspired by Excellence</h2>
              <p className="text-lg text-slate-700 mb-6">
                We are in discussions with renowned architect John Hemsworth who designed the award-winning Upper Skeena Recreation Centre in Hazelton BC. This proven design combines stunning West Coast timber architecture with practical, multi-purpose functionality.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Trophy className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Governor General's Medal for Architecture</h3>
                    <p className="text-sm text-slate-600">Upper Skeena Rec Centre, 2018</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Wood Design Award Winner</h3>
                    <p className="text-sm text-slate-600">Showcasing BC timber innovation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Community-Centered Design</h3>
                    <p className="text-sm text-slate-600">Proven success in similar-sized communities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ aspectRatio: "16/10" }}>
                <img
                  src="/mezzanine.jpg"
                  alt="Upper Skeena Rec Centre exterior - timber frame architecture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ aspectRatio: "1/1" }}>
                  <img
                    src="/hockeybench1.jpg"
                    alt="Interior ice rink view"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ aspectRatio: "1/1" }}>
                  <img
                    src="/overice2.jpg"
                    alt="Mezzanine fitness area"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Gallery */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Year-Round Community Benefits</h2>
          <p className="text-center text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
            More than just an ice rink - a true multi-generational, multi-season community hub
          </p>

          <div className="flex justify-center mb-12">
            <Link to="/community-benefits">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-4 text-base border-2 border-sky-600 text-sky-700 hover:bg-sky-50 shadow-lg font-semibold"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                See Research-Backed Community Benefits
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Winter Ice Sports",
                description: "NHL-sized rink for hockey leagues, figure skating, curling, public skating, and learn-to-skate programs",
                icon: <Sparkles className="w-6 h-6" />,
                photo: "Ice hockey game in action",
                image: "/hockeybench1.jpg"
              },
              {
                title: "Senior Walking Track",
                description: "10-foot wide elevated track circling the rink - safe, warm, and social year-round exercise",
                icon: <HeartHandshake className="w-6 h-6" />,
                photo: "Seniors walking on indoor track",
                image: "/seniorswalk1.jpg"
              },
              {
                title: "Fitness Mezzanine",
                description: "Full gym overlooking the ice with cardio equipment, weights, and group fitness space",
                icon: <BarChart3 className="w-6 h-6" />,
                photo: "Modern fitness facility",
                image: "/fitness1.jpg"
              },
              {
                title: "Summer Sports",
                description: "Converts to box lacrosse, ball hockey, and roller sports in offseason",
                icon: <Users className="w-6 h-6" />,
                photo: "Lacrosse game in arena",
                image: "/lacrosse.jpg"
              },
              {
                title: "Community Events",
                description: "Concerts, trade shows, farmers markets, and large gatherings for 1,500 to 3,000 people",
                icon: <Calendar className="w-6 h-6" />,
                photo: "Community event in arena",
                image: "/tradeshow.webp"
              },
              {
                title: "Youth Programs",
                description: "After-school programs, summer camps, and safe recreation space for island youth",
                icon: <Trophy className="w-6 h-6" />,
                photo: "Youth skating lessons",
                image: "/overice1.jpg"
              }
            ].map((feature, i) => (
              <Card key={i} className="h-full overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <img
                    src={feature.image}
                    alt={feature.photo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                  </div>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Petition Section */}
      <section id="sign" className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-5xl mx-auto px-8">
          <Card className="shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-3">Join {progressData.signatures}+ Island Supporters</h2>
              <p className="text-sky-100">Add your voice to the petition</p>
            </div>

            <CardContent className="pt-12 pb-8 px-10">
              {submitted === 'signature' ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-3">Thank You!</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    You're now part of the movement to bring world-class recreation to Salt Spring Island.
                  </p>
                  <p className="text-sm text-slate-500 mt-4">
                    Want to make a pledge too? Check out the pledge section below!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signature-firstName">First name *</Label>
                      <Input
                        id="signature-firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                        className="mt-1"
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signature-lastName">Last name *</Label>
                      <Input
                        id="signature-lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                        className="mt-1"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signature-email">Email *</Label>
                      <Input
                        id="signature-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="mt-1"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signature-postalCode">Postal code *</Label>
                      <Input
                        id="signature-postalCode"
                        name="postalCode"
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

                  {error && (
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

      {/* PLEDGE */}
      <section id="pledge" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="pt-16 pb-10 px-10">
              <div className="md:flex items-start gap-10">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4">Make a non‑binding pledge</h3>
                  <p className="text-slate-600 mt-2 text-sm">Help us demonstrate community capacity. Pledges are expressions of intent—not donations—and we'll follow up later with formal options (naming rights, corporate sponsorships, tax‑receipted gifts via a registered charity partner).</p>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                    {PLEDGE_TIERS.map((t) => (
                      <button key={t.value} onClick={() => setForm((f) => ({ ...f, pledge: t.value }))} className={`border rounded-xl px-3 py-2 text-sm ${form.pledge === t.value ? "border-sky-600 bg-sky-50" : ""}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="custom-pledge-amount">Custom amount</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm">$</span>
                      <Input
                        id="custom-pledge-amount"
                        name="customPledgeAmount"
                        type="number"
                        min={0}
                        value={form.pledge || ""}
                        onChange={(e) => setForm((f) => ({ ...f, pledge: Number(e.target.value) }))}
                        className="max-w-[160px]"
                        placeholder="0"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Submit your pledge separately below.</p>
                  </div>

                  {/* Pledge Form Fields */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="font-semibold mb-4">Your Contact Information (for pledge follow-up)</h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <Label htmlFor="pledge-firstName" className="text-sm">First name</Label>
                        <Input
                          id="pledge-firstName"
                          name="pledgeFirstName"
                          value={form.firstName}
                          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                          className="mt-1 text-sm"
                          placeholder="Your first name"
                          autoComplete="given-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pledge-email" className="text-sm">Email</Label>
                        <Input
                          id="pledge-email"
                          name="pledgeEmail"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="mt-1 text-sm"
                          placeholder="your@email.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handlePledgeSubmit}
                      disabled={!form.pledge || form.pledge <= 0 || !form.firstName || !form.email || submitting}
                      className="w-full py-3 text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:opacity-50"
                    >
                      {submitting ? "Submitting Pledge..." : `Submit Pledge of $${form.pledge?.toLocaleString() || 0}`}
                    </Button>

                    {error && error.includes('pledge') && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}

                    {submitted && submitted === 'pledge' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                        <p className="text-sm text-green-700">✅ Thank you! Your pledge has been recorded.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-1/2 mt-6 md:mt-0">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><PiggyBank className="w-4 h-4"/> Benefactor & Sponsor pathways</h4>
                  <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                    <li>Founding Benefactor: $100k+ (naming opportunities; board recognition)</li>
                    <li>Community Builder: $25k–$100k (program endowment options)</li>
                    <li>Family Patron: $5k–$25k (seat/locker/brick dedications)</li>
                    <li>Local Business Sponsor: $2.5k+ (dasher boards, events)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Campaign Progress Dashboard */}
      <section id="progress" className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-12">
            <h2 className="text-4xl font-bold">Campaign Progress</h2>
            <Button
              onClick={async () => {
                const stats = await getCampaignStats();
                if (stats) {
                  setProgressData({
                    signatures: stats.signatures,
                    signatureGoal: stats.signatureGoal,
                    pledgeAmount: stats.pledgeAmount,
                    pledgeGoal: stats.pledgeGoal,
                    emails: stats.signatures,
                    emailGoal: 1000
                  });
                }
              }}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              Refresh Stats
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12 max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <ProgressMeter
                  current={progressData.signatures}
                  goal={progressData.signatureGoal}
                  label="Community Signatures"
                  icon={<Users className="w-6 h-6 text-sky-600" />}
                />
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <ProgressMeter
                  current={progressData.pledgeAmount}
                  goal={progressData.pledgeGoal}
                  label="Feasibility Study Funding"
                  prefix="$"
                  icon={<DollarSign className="w-6 h-6 text-sky-600" />}
                />
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Project Timeline</h3>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sky-200"></div>
                <div className="space-y-8">
                  {[
                    { date: "Q4 2025", title: "Community Engagement", status: "active", description: "Gathering signatures and initial pledges" },
                    { date: "Q1 2026", title: "Feasibility Study", status: "upcoming", description: "Professional assessment and design refinement" },
                    { date: "Q2 2026", title: "Grant Applications", status: "upcoming", description: "Federal and provincial funding submissions" },
                    { date: "Q2 2027", title: "Capital Campaign", status: "upcoming", description: "Ongoing major donor engagement" },
                    { date: "Q1 2028", title: "Groundbreaking", status: "upcoming", description: "Construction begins!" },
                    { date: "2029/2030", title: "Grand Opening", status: "upcoming", description: "Welcome to your new community arena!" }
                  ].map((item, i) => (
                    <div key={i} className={`relative flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <div className={`inline-block p-4 rounded-xl ${item.status === 'active' ? 'bg-sky-100 border-2 border-sky-500' : 'bg-slate-50'}`}>
                          <div className="font-semibold text-sky-900">{item.date}</div>
                          <div className="font-bold">{item.title}</div>
                          <div className="text-sm text-slate-600">{item.description}</div>
                        </div>
                      </div>
                      <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                        item.status === 'active' ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-slate-300'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organization Logo */}
        <div className="mt-16 text-center">
          <div className="max-w-md mx-auto">
            <img
              src="/ssicaalogo.png"
              alt="Salt Spring Island Community Arena Association Logo"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p className="text-slate-400 text-sm">
                Salt Spring Island Community Arena Association<br />
                saltspringislandarena@gmail.com<br />
                Registered Non-Profit Society
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><button onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Vision</button></li>
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Features</button></li>
                <li><Link to="/community-benefits" className="hover:text-white transition-colors">Community Benefits</Link></li>
                <li><button onClick={() => document.getElementById('progress')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Progress</button></li>
                <li><button onClick={() => document.getElementById('sign')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Sign Petition</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Project Credits</h3>
              <p className="text-slate-400 text-sm">
                Architect: John Hemsworth<br />
                Hemsworth Architects<br />
                Inspired by Upper Skeena Rec Centre
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Salt Spring Island Community Arena Association
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Building our community's future together
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}