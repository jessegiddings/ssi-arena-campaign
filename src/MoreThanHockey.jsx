import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Music, Users, ShoppingBag, GraduationCap, Palette, Briefcase, Calendar, Heart, Dumbbell, Utensils, Trophy, Activity } from "lucide-react";
import SEO from "./components/SEO";
import { Card, CardContent } from "@/components/ui/card";

export default function MoreThanHockey() {
  const uses = [
    {
      icon: <Music className="w-8 h-8" />,
      title: "Concerts & Performances",
      capacity: "5,000-7,000 people",
      description: "Major touring artists, local musicians, theatre productions, and dance performances. Finally, a venue worthy of Salt Spring's creative spirit.",
      examples: "Rock concerts, symphony performances, musical theatre, comedy shows",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Daily Walking Track",
      capacity: "Year-round access",
      description: "Never weather-dependent again. A climate-controlled indoor track for seniors, families, and anyone wanting safe, comfortable daily exercise.",
      examples: "Morning walks, fitness programs, senior wellness, rehabilitation",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Trade Shows & Markets",
      capacity: "17,000 sq ft floor space",
      description: "Year-round farmers markets, craft fairs, trade shows, and vendor events. No more weather-dependent outdoor markets in winter.",
      examples: "Farmers markets, craft fairs, home shows, vendor expos",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Graduation Ceremonies",
      capacity: "500-700 seated",
      description: "Give our students a proper venue for one of life's biggest moments. Climate-controlled comfort with professional audio/visual.",
      examples: "High school graduations, elementary ceremonies, achievement celebrations",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Art Exhibitions",
      capacity: "Large-scale displays",
      description: "Showcase Salt Spring's incredible artistic talent at scale. Professional lighting and flexible space for exhibitions and installations.",
      examples: "Art shows, gallery events, sculpture exhibitions, cultural showcases",
      color: "from-rose-500 to-red-500"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Conferences & Meetings",
      capacity: "Multiple configurations",
      description: "Bring professional development to the island instead of traveling off-island. Meeting rooms, large conference space, full AV capabilities.",
      examples: "Business conferences, workshops, seminars, corporate retreats",
      color: "from-slate-600 to-slate-700"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Community Gatherings",
      capacity: "Flexible seating",
      description: "Town halls, community meetings, cultural celebrations, fundraisers, and social events. Our community's living room.",
      examples: "Town halls, celebrations, fundraisers, community dinners",
      color: "from-sky-500 to-blue-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Youth Programs",
      capacity: "Safe, supervised space",
      description: "Birthday parties, summer camps, after-school programs, and youth events. Give our kids the facilities they deserve.",
      examples: "Birthday skating parties, day camps, youth concerts, teen events",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Fitness & Wellness",
      capacity: "Daily programs",
      description: "Fitness classes, yoga, wellness programs, and health initiatives. A year-round wellness centre for all ages and abilities.",
      examples: "Fitness classes, yoga, seniors programs, rehabilitation services",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Food Festivals",
      capacity: "Multiple vendors",
      description: "Showcase local food, beverages, and culinary talent. Indoor space means year-round food events regardless of weather.",
      examples: "Food festivals, wine tastings, cooking demonstrations, farmers dinners",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Multi-Sport Events",
      capacity: "17,000 sq ft when ice is out",
      description: "Basketball, volleyball, pickleball, futsal, and more when ice isn't in. Year-round sports programming for all ages.",
      examples: "Basketball tournaments, volleyball leagues, pickleball, indoor soccer",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Cultural Festivals",
      capacity: "Large gatherings",
      description: "Celebrate diversity with indoor cultural events, festivals, and community celebrations that bring everyone together.",
      examples: "Cultural festivals, holiday celebrations, heritage events, multicultural showcases",
      color: "from-fuchsia-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="More Than Hockey - Salt Spring Island Arena"
        description="The Salt Spring Island Community Arena isn't just about hockey. Discover 12+ ways this multi-purpose facility will serve our entire community year-round."
        url="https://ssiarena.com/more-than-hockey"
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
              <h1 className="font-bold text-lg">SSI Arena</h1>
              <p className="text-xs text-slate-500">More Than Hockey</p>
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
      <section className="py-16 bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            "But I Don't Have Kids in Hockey..."
          </h1>
          <p className="text-2xl md:text-3xl text-sky-700 font-semibold mb-8">
            Neither do 80% of the people who will use this facility daily.
          </p>
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            The Salt Spring Island Community Arena is a <strong>year-round community recreation centre</strong> with an NHL-sized rink as just one of many features. Think concerts, walking tracks, trade shows, graduations, fitness programs, and cultural events.
          </p>
          <div className="mt-8 inline-block bg-white rounded-xl shadow-lg px-8 py-4 border-2 border-sky-200">
            <p className="text-3xl font-bold text-sky-600">365 Days</p>
            <p className="text-slate-600 font-medium">of year-round community use</p>
          </div>
        </div>
      </section>

      {/* Key Stat Section */}
      <section className="py-12 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">12+</p>
              <p className="text-sky-100 text-lg">Different Event Types</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">5,000-7,000</p>
              <p className="text-sky-100 text-lg">Concert Capacity</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">17,000</p>
              <p className="text-sky-100 text-lg">Sq Ft Multi-Purpose Space</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Something for Everyone</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From seniors taking their morning walk to teenagers at concerts to businesses hosting conferences — this facility serves our entire community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uses.map((use, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-sky-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${use.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    {use.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{use.title}</h3>
                  <p className="text-sm font-semibold text-sky-600 mb-3">{use.capacity}</p>
                  <p className="text-slate-700 mb-3 leading-relaxed">{use.description}</p>
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-500 font-medium">EXAMPLES:</p>
                    <p className="text-sm text-slate-600 mt-1">{use.examples}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audience-Specific Benefits */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Who Benefits?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Seniors & Wellness</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Your daily wellness centre, rain or shine. Year-round indoor walking track, fitness programs for all abilities, climate-controlled comfort, and social connections with daily drop-in programs.
              </p>
              <ul className="text-slate-600 space-y-2">
                <li>✓ Never weather-dependent</li>
                <li>✓ Safe, accessible design</li>
                <li>✓ Daily social programs</li>
                <li>✓ Active aging support</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Arts & Culture</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Finally, a venue worthy of Salt Spring's creative spirit. Host 5,000+ people with professional lighting and acoustics. Touring artists who skip the Gulf Islands will finally come here.
              </p>
              <ul className="text-slate-600 space-y-2">
                <li>✓ Professional performance venue</li>
                <li>✓ Quality acoustics & lighting</li>
                <li>✓ Exhibition space for artists</li>
                <li>✓ Cultural event hosting</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Business Owners</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                An economic engine for Salt Spring. Every tournament brings hotel nights, every concert fills restaurants, every trade show means ferry trips and local spending.
              </p>
              <ul className="text-slate-600 space-y-2">
                <li>✓ $2M+ annual economic impact</li>
                <li>✓ Year-round events drive traffic</li>
                <li>✓ Conference & meeting space</li>
                <li>✓ 20+ full-time jobs created</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-pink-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Young Families</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Give our kids the facilities they deserve without leaving the island. Birthday parties, summer camps, youth programs, and safe recreational space build community and childhood memories.
              </p>
              <ul className="text-slate-600 space-y-2">
                <li>✓ Youth sports programs</li>
                <li>✓ Birthday party venue</li>
                <li>✓ Summer day camps</li>
                <li>✓ Safe, supervised space</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Impact Callout */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Economic Reality</h2>
          <p className="text-xl mb-8 text-amber-50">
            A single hockey tournament weekend generates <strong>$60,000</strong> in local economic impact. Now imagine 20+ major events per year.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <p className="text-3xl font-bold mb-2">150+</p>
              <p className="text-amber-100">Hotel Room Nights</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <p className="text-3xl font-bold mb-2">300+</p>
              <p className="text-amber-100">Ferry Crossings</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <p className="text-3xl font-bold mb-2">$2M+</p>
              <p className="text-amber-100">Annual Impact</p>
            </div>
          </div>
          <p className="text-lg text-amber-50 italic">
            This isn't just a recreation centre — it's an economic engine for Salt Spring Island.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Support?</h2>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            Whether you're a senior who wants a safe place to walk, an artist who wants a proper venue, a business owner who sees the economic potential, or a parent who wants better facilities for your kids — <strong>this project is for you</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <button className="px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-lg hover:from-sky-700 hover:to-blue-800 transition-all font-semibold text-lg shadow-lg">
                Sign the Petition
              </button>
            </Link>
            <Link to="/faq">
              <button className="px-8 py-4 bg-white border-2 border-sky-600 text-sky-700 rounded-lg hover:bg-sky-50 transition-all font-semibold text-lg">
                Learn More (FAQ)
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
