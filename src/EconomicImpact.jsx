import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, DollarSign, TrendingUp, Users, Calendar, Hotel, Ship, ShoppingBag, UtensilsCrossed } from "lucide-react";
import SEO from "./components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EconomicImpact() {
  const eventTypes = [
    {
      name: "Hockey Tournament",
      icon: <Users className="w-6 h-6" />,
      impactPerEvent: 60000,
      hotelNights: 150,
      ferryTrips: 300,
      description: "Weekend tournament with 8-12 teams",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Major Concert",
      icon: <Users className="w-6 h-6" />,
      impactPerEvent: 150000,
      hotelNights: 200,
      ferryTrips: 1000,
      description: "5,000+ attendance touring artist",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Trade Show",
      icon: <ShoppingBag className="w-6 h-6" />,
      impactPerEvent: 40000,
      hotelNights: 100,
      ferryTrips: 250,
      description: "2-3 day vendor expo",
      color: "from-orange-500 to-amber-500"
    },
    {
      name: "Conference",
      icon: <Calendar className="w-6 h-6" />,
      impactPerEvent: 80000,
      hotelNights: 200,
      ferryTrips: 400,
      description: "Multi-day business conference",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Figure Skating Competition",
      icon: <Users className="w-6 h-6" />,
      impactPerEvent: 45000,
      hotelNights: 120,
      ferryTrips: 250,
      description: "Regional competition weekend",
      color: "from-sky-500 to-blue-500"
    },
    {
      name: "Community Event/Festival",
      icon: <UtensilsCrossed className="w-6 h-6" />,
      impactPerEvent: 25000,
      hotelNights: 50,
      ferryTrips: 150,
      description: "Food festival, cultural event, etc.",
      color: "from-rose-500 to-red-500"
    }
  ];

  const [eventCounts, setEventCounts] = useState(
    eventTypes.reduce((acc, event) => ({ ...acc, [event.name]: 0 }), {})
  );

  const handleEventChange = (eventName, value) => {
    const numValue = parseInt(value) || 0;
    setEventCounts(prev => ({ ...prev, [eventName]: Math.max(0, Math.min(50, numValue)) }));
  };

  const totalAnnualImpact = eventTypes.reduce(
    (sum, event) => sum + (event.impactPerEvent * (eventCounts[event.name] || 0)),
    0
  );

  const totalHotelNights = eventTypes.reduce(
    (sum, event) => sum + (event.hotelNights * (eventCounts[event.name] || 0)),
    0
  );

  const totalFerryTrips = eventTypes.reduce(
    (sum, event) => sum + (event.ferryTrips * (eventCounts[event.name] || 0)),
    0
  );

  const totalEvents = Object.values(eventCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Economic Impact Calculator - Salt Spring Island Arena"
        description="Calculate the economic impact of the Salt Spring Island Community Arena. See how tournaments, concerts, and events will generate millions in local economic activity."
        url="https://ssiarena.com/economic-impact"
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
              <h1 className="font-bold text-lg">Economic Impact</h1>
              <p className="text-xs text-slate-500">Calculate the Benefits</p>
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
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6 shadow-lg">
            <DollarSign className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            The $2M Question
          </h1>
          <p className="text-2xl md:text-3xl text-green-700 font-semibold mb-6">
            Can Salt Spring Afford NOT to Build This?
          </p>
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            Every event generates hotel bookings, restaurant traffic, ferry ridership, and shopping. Use the calculator below to see how hosting just a few events per year creates <strong>millions in local economic impact</strong>.
          </p>
        </div>
      </section>

      {/* Total Impact Display */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white sticky top-0 z-20 shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">${(totalAnnualImpact / 1000000).toFixed(2)}M</p>
              <p className="text-green-100 text-lg">Annual Economic Impact</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">{totalEvents}</p>
              <p className="text-green-100 text-lg">Events Per Year</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">{totalHotelNights.toLocaleString()}</p>
              <p className="text-green-100 text-lg">Hotel Room Nights</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">{totalFerryTrips.toLocaleString()}</p>
              <p className="text-green-100 text-lg">Ferry Crossings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Interactive Impact Calculator</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Adjust the number of events below to see how the arena can generate economic activity for our island. These are conservative estimates based on similar facilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((event, index) => (
              <Card key={index} className="overflow-hidden border-2 hover:border-green-300 hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {event.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{event.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{event.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Impact per event:</span>
                      <span className="font-semibold text-green-600">${(event.impactPerEvent / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Hotel nights:</span>
                      <span className="font-semibold">{event.hotelNights}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Ferry trips:</span>
                      <span className="font-semibold">{event.ferryTrips}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Label htmlFor={`event-${index}`} className="text-sm font-semibold text-slate-700 mb-2 block">
                      Events per year:
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id={`event-${index}`}
                        type="number"
                        min="0"
                        max="50"
                        value={eventCounts[event.name]}
                        onChange={(e) => handleEventChange(event.name, e.target.value)}
                        className="text-center text-lg font-bold"
                      />
                      <div className="text-right min-w-[80px]">
                        <p className="text-lg font-bold text-green-600">
                          ${((event.impactPerEvent * eventCounts[event.name]) / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-slate-500">annual</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Presets */}
          <div className="mt-12 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8 border-2 border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Quick Scenarios</h3>
            <p className="text-center text-slate-600 mb-6">Try these realistic event schedules:</p>

            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setEventCounts({
                  "Hockey Tournament": 6,
                  "Major Concert": 2,
                  "Trade Show": 3,
                  "Conference": 2,
                  "Figure Skating Competition": 4,
                  "Community Event/Festival": 4
                })}
                className="bg-white border-2 border-green-500 rounded-lg p-6 hover:bg-green-50 transition-all"
              >
                <p className="font-bold text-lg text-slate-900 mb-2">Conservative</p>
                <p className="text-sm text-slate-600 mb-3">21 events/year</p>
                <p className="text-2xl font-bold text-green-600">~$1.3M</p>
              </button>

              <button
                onClick={() => setEventCounts({
                  "Hockey Tournament": 10,
                  "Major Concert": 4,
                  "Trade Show": 4,
                  "Conference": 3,
                  "Figure Skating Competition": 6,
                  "Community Event/Festival": 6
                })}
                className="bg-white border-2 border-green-600 rounded-lg p-6 hover:bg-green-50 transition-all"
              >
                <p className="font-bold text-lg text-slate-900 mb-2">Realistic</p>
                <p className="text-sm text-slate-600 mb-3">33 events/year</p>
                <p className="text-2xl font-bold text-green-600">~$2.1M</p>
              </button>

              <button
                onClick={() => setEventCounts({
                  "Hockey Tournament": 15,
                  "Major Concert": 6,
                  "Trade Show": 6,
                  "Conference": 5,
                  "Figure Skating Competition": 8,
                  "Community Event/Festival": 10
                })}
                className="bg-white border-2 border-green-700 rounded-lg p-6 hover:bg-green-50 transition-all"
              >
                <p className="font-bold text-lg text-slate-900 mb-2">Optimistic</p>
                <p className="text-sm text-slate-600 mb-3">50 events/year</p>
                <p className="text-2xl font-bold text-green-600">~$3.2M</p>
              </button>
            </div>

            <button
              onClick={() => setEventCounts(eventTypes.reduce((acc, event) => ({ ...acc, [event.name]: 0 }), {}))}
              className="mt-4 w-full bg-slate-100 text-slate-700 py-3 rounded-lg hover:bg-slate-200 transition-all font-medium"
            >
              Reset All
            </button>
          </div>
        </div>
      </section>

      {/* What This Means Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">What This Means for Salt Spring</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Hotel className="w-8 h-8 text-orange-600" />
                  <h3 className="text-2xl font-bold text-slate-900">For Hotels & Accommodations</h3>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Every tournament weekend fills rooms that would otherwise be empty. B&Bs, hotels, and vacation rentals benefit directly from visitors who need places to stay.
                </p>
                <div className="bg-white/70 rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-sm text-slate-600">Example: 10 hockey tournaments = <strong className="text-orange-600">1,500 room nights/year</strong></p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <UtensilsCrossed className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-slate-900">For Restaurants & Cafes</h3>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Visiting teams and concert-goers need to eat. Events mean packed restaurants, busy cafes, and food service opportunities that create jobs and revenue.
                </p>
                <div className="bg-white/70 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-sm text-slate-600">Visitors spend an average of <strong className="text-blue-600">$75-150 per person</strong> on food during events</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-white to-green-50/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-slate-900">For Retail & Services</h3>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Event visitors shop at local stores, buy gas, and use services. Every visitor dollar spent multiplies through our local economy.
                </p>
                <div className="bg-white/70 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-sm text-slate-600">Economic multiplier effect: Every <strong className="text-green-600">$1 spent = $1.70 in total economic activity</strong></p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Ship className="w-8 h-8 text-purple-600" />
                  <h3 className="text-2xl font-bold text-slate-900">For Transportation</h3>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Every event means ferry crossings, gas purchases, and transportation services. This infrastructure supports jobs and generates tax revenue.
                </p>
                <div className="bg-white/70 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-sm text-slate-600">A single tournament: <strong className="text-purple-600">300+ ferry crossings</strong> in one weekend</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conservative vs Reality */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">These Numbers Are Conservative</h2>
          <p className="text-xl mb-8 text-amber-50 leading-relaxed">
            Our estimates are based on <strong>proven results</strong> from similar facilities in BC. Many communities see even higher impacts once their facilities are established and word spreads.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-xl p-8">
            <p className="text-2xl font-bold mb-4">The Question Isn't:</p>
            <p className="text-3xl mb-6">"Can we afford to build this?"</p>
            <p className="text-2xl font-bold mb-4">The Question Is:</p>
            <p className="text-3xl">"Can we afford NOT to?"</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Build Our Economic Future?</h2>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            This isn't just about recreation — it's about building infrastructure that generates revenue, creates jobs, and strengthens our local economy for generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all font-semibold text-lg shadow-lg">
                Sign the Petition
              </button>
            </Link>
            <Link to="/more-than-hockey">
              <button className="px-8 py-4 bg-white border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-all font-semibold text-lg">
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
