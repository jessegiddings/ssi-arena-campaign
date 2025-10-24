import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Lightbulb, Send, CheckCircle2, Music, Users, Palette, Calendar } from "lucide-react";
import SEO from "./components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "./lib/supabase";

export default function CommunityVision() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vision: "",
    category: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [visions, setVisions] = useState([]);
  const [loadingVisions, setLoadingVisions] = useState(true);

  const categories = [
    { value: "concerts", label: "Concerts & Music", icon: <Music className="w-4 h-4" /> },
    { value: "sports", label: "Sports & Recreation", icon: <Users className="w-4 h-4" /> },
    { value: "arts", label: "Arts & Culture", icon: <Palette className="w-4 h-4" /> },
    { value: "community", label: "Community Events", icon: <Calendar className="w-4 h-4" /> },
    { value: "business", label: "Business & Trade", icon: <Calendar className="w-4 h-4" /> },
    { value: "other", label: "Other", icon: <Lightbulb className="w-4 h-4" /> }
  ];

  // Load existing visions
  useEffect(() => {
    loadVisions();
  }, []);

  const loadVisions = async () => {
    try {
      const { data, error } = await supabase
        .from('community_visions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      setVisions(data || []);
    } catch (err) {
      console.error('Error loading visions:', err);
    } finally {
      setLoadingVisions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.vision) {
      setError("Please provide your name and vision.");
      return;
    }

    setSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from('community_visions')
        .insert([
          {
            name: formData.name,
            email: formData.email || null,
            vision: formData.vision,
            category: formData.category || 'other'
          }
        ]);

      if (insertError) throw insertError;

      setSubmitted(true);
      setFormData({ name: "", email: "", vision: "", category: "" });

      // Reload visions to show the new one
      setTimeout(() => {
        loadVisions();
      }, 1000);

    } catch (err) {
      console.error('Submission error:', err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Community Vision - Salt Spring Island Arena"
        description="Share your vision for what you'd host at the Salt Spring Island Community Arena. See what others in our community are imagining."
        url="https://ssiarena.com/community-vision"
      />

      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/ssicaalogo.png"
                alt="Salt Spring Island Community Arena Association Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">Community Vision</h1>
              <p className="text-xs text-slate-500">What Would You Host?</p>
            </div>
          </div>
          <Link to="/">
            <button className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white mb-6 shadow-lg">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            "Here's What I'd Host..."
          </h1>
          <p className="text-2xl md:text-3xl text-purple-700 font-semibold mb-6">
            Your Arena. Your Vision. Your Voice.
          </p>
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            We asked Salt Spring residents: <strong>"What would YOU host at the community arena?"</strong> The responses are inspiring. Now it's your turn to share your vision.
          </p>
        </div>
      </section>

      {/* Submit Your Vision Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Card className="shadow-2xl border-2 border-purple-200">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center">
              <Lightbulb className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">Share Your Vision</h2>
              <p className="text-purple-100">What would you host at the arena?</p>
            </div>

            <CardContent className="p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-3">Thank You!</h3>
                  <p className="text-slate-600 max-w-md mx-auto mb-6">
                    Your vision has been shared. Together, we're building something incredible for Salt Spring Island.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Share Another Vision
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John D."
                      className="mt-1"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">First name and last initial are fine</p>
                  </div>

                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                    <p className="text-xs text-slate-500 mt-1">If you'd like us to follow up with you</p>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select a category...</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="vision">What Would You Host? *</Label>
                    <Textarea
                      id="vision"
                      value={formData.vision}
                      onChange={(e) => setFormData({...formData, vision: e.target.value})}
                      placeholder="Example: Annual benefit concert series featuring island musicians - finally a proper venue!"
                      className="mt-1 min-h-[120px]"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">Be specific! Share your dream event or program.</p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {submitting ? "Sharing..." : "Share My Vision"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Visions Display */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Community Visions</h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            See what your neighbors are imagining for Salt Spring's community arena
          </p>

          {loadingVisions ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Loading visions...</p>
            </div>
          ) : visions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visions.map((vision, index) => {
                const category = categories.find(c => c.value === vision.category);
                return (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {category && (
                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                              {category.icon}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-slate-900">{vision.name}</p>
                            {category && (
                              <p className="text-xs text-purple-600">{category.label}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-700 italic leading-relaxed">
                        "{vision.vision}"
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
              <Lightbulb className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 text-lg mb-2">Be the first to share your vision!</p>
              <p className="text-slate-500">Your idea could inspire others.</p>
            </div>
          )}
        </div>
      </section>

      {/* Example Visions (Static - as examples) */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Example Visions from Islanders</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <p className="text-lg italic mb-3">
                "Annual benefit concert series featuring island musicians - finally a proper venue!"
              </p>
              <p className="text-sm text-purple-100">— Sarah M., Local Musician</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <p className="text-lg italic mb-3">
                "Winter farmers market that's not weather-dependent. Vendors need this."
              </p>
              <p className="text-sm text-purple-100">— John K., Farmer</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <p className="text-lg italic mb-3">
                "Gulf Islands Secondary graduation in a facility that honors our students properly."
              </p>
              <p className="text-sm text-purple-100">— Teacher, GISS</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <p className="text-lg italic mb-3">
                "Regional conferences bringing professional development to the island instead of us always traveling."
              </p>
              <p className="text-sm text-purple-100">— Business Owner</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Help Make These Visions Reality</h2>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            Every vision shared strengthens our case. Every signature brings us closer. Every pledge makes this possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg">
                Sign the Petition
              </button>
            </Link>
            <Link to="/more-than-hockey">
              <button className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-700 rounded-lg hover:bg-purple-50 transition-all font-semibold text-lg">
                Explore All Benefits
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm mb-4">
            © {new Date().getFullYear()} Salt Spring Island Community Arena Association
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
            <Link to="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ</Link>
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
