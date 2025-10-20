import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, DollarSign, MapPin, Calendar, Shield, Users, Building2, Lightbulb, Leaf } from "lucide-react";
import SEO from "./components/SEO";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: "Project Basics",
      icon: <Building2 className="w-5 h-5" />,
      questions: [
        {
          question: "How much will the arena cost?",
          answer: "The estimated construction cost for the arena is approximately $15-20 million. This includes an NHL-sized ice rink, fitness center, walking track, multi-purpose space, and all necessary infrastructure. We're working on a detailed feasibility study that will provide more precise cost estimates. The project will be funded through a combination of government grants, community fundraising, and private donations."
        },
        {
          question: "Where will the arena be located?",
          answer: "The arena is proposed to be built at Rainbow Road as part of a larger recreation campus development. This central location was chosen for its accessibility to all islanders, existing infrastructure, and potential for integration with other community facilities. The exact site details are being finalized through community consultation and technical assessments."
        },
        {
          question: "When will construction start?",
          answer: "Our current timeline projects: Q4 2025 - Community engagement and signature gathering; Q1 2026 - Professional feasibility study; Q2 2026 - Grant applications to federal and provincial governments; Q2 2027 - Capital campaign and major donor engagement; Q1 2028 - Groundbreaking; 2029/2030 - Grand opening. This timeline may adjust based on funding approvals and community support."
        },
        {
          question: "Who is behind this campaign?",
          answer: "The campaign is led by the Salt Spring Island Community Arena Association, a registered non-profit society in British Columbia. Our board includes long-time island residents, parents, business owners, and recreation advocates. The project has been designed by Hemsworth Architects, inspired by successful community arenas like the Upper Skeena Recreation Centre."
        }
      ]
    },
    {
      category: "Funding & Financial",
      icon: <DollarSign className="w-5 h-5" />,
      questions: [
        {
          question: "Will my taxes increase?",
          answer: "We are pursuing a funding model that minimizes taxpayer burden. The majority of funding will come from federal and provincial recreation infrastructure grants, private donations, and fundraising. Any local government contribution would likely be subject to a referendum. Our goal is to secure 70-80% of funding through senior government grants before requesting local taxpayer support."
        },
        {
          question: "What happens to my pledge if the project doesn't proceed?",
          answer: "All pledges are conditional commitments, not immediate payments. Pledge collection will only begin once we've secured sufficient government funding and confirmed the project is proceeding. If the project does not move forward, your pledge will not be collected and you will have no financial obligation. We will communicate clearly at every stage of the campaign."
        },
        {
          question: "Can I get a tax receipt for my donation?",
          answer: "Currently, we are working toward charitable status that would allow us to issue tax receipts for donations. In the meantime, pledges and contributions are being recorded. We will update supporters once charitable status is confirmed. Business contributions may be eligible for different tax treatment - consult your accountant."
        },
        {
          question: "How will the arena be financially sustainable?",
          answer: "The arena will generate revenue through ice rentals, fitness memberships, program fees, facility rentals for events, and concession sales. Similar-sized community arenas in BC typically achieve 60-80% cost recovery through user fees. We're designing the facility to be multi-purpose and year-round to maximize utilization and revenue. A detailed business plan is part of our feasibility study."
        }
      ]
    },
    {
      category: "Usage & Programs",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: "Will there be public skating times?",
          answer: "Absolutely! Public skating will be a core program offering. We envision family skates, adult-only sessions, parent-and-tot times, and special events like holiday skating parties. The schedule will balance organized sports (hockey, figure skating, curling) with public access times. Community input will shape the programming schedule."
        },
        {
          question: "What programs will be offered?",
          answer: "The arena will host: Ice sports - hockey leagues, figure skating, public skating, learn-to-skate, curling; Fitness - gym with cardio and weights, group fitness classes, personal training; Youth programs - after-school programs, summer camps, drop-in recreation; Seniors - walking track, gentle fitness, social programs; Summer activities - box lacrosse, ball hockey, roller sports; Community events - concerts, trade shows, farmers markets, gatherings for up to 1,500-3,000 people."
        },
        {
          question: "How can I help beyond signing the petition?",
          answer: "There are many ways to support the campaign: 1) Make a financial pledge, 2) Volunteer for outreach and canvassing, 3) Share the campaign on social media, 4) Attend community meetings and events, 5) Connect us with potential major donors, 6) Offer professional services (legal, accounting, marketing, etc.), 7) Join our mailing list to stay informed and engaged. Every contribution, big or small, makes a difference!"
        }
      ]
    },
    {
      category: "Environmental & Community",
      icon: <Leaf className="w-5 h-5" />,
      questions: [
        {
          question: "What about environmental sustainability?",
          answer: "Sustainability is a core design principle. The arena will feature: Energy-efficient refrigeration systems using natural refrigerants with lower global warming potential; LED lighting throughout; Solar panels on the roof to offset electricity use; Rainwater harvesting for ice resurfacing; High-performance building envelope to minimize heat loss; Consideration for future geothermal or heat pump systems; The design will target LEED Silver certification or equivalent BC Energy Step Code compliance."
        },
        {
          question: "How will this benefit the whole community, not just hockey players?",
          answer: "The arena is designed as a multi-generational, multi-use facility. Benefits include: Youth - Safe recreation, after-school programs, skill development; Seniors - Indoor walking track, gentle fitness, fall prevention programs; Families - Affordable recreation close to home, no travel to Victoria; Businesses - Event space, increased foot traffic, economic activity; Everyone - Community gathering space, emergency shelter capacity, improved quality of life. Research shows recreation centers reduce crime, improve mental health, and save healthcare costs."
        },
        {
          question: "Is the arena association a registered non-profit?",
          answer: "Yes, the Salt Spring Island Community Arena Association is a registered non-profit society in British Columbia. We operate transparently with volunteer board members and are accountable to our members and the community. Financial records and meeting minutes are available to members. We are working toward registered charity status for enhanced accountability and tax receipt eligibility."
        },
        {
          question: "How will the arena impact traffic and parking?",
          answer: "The Rainbow Road location is accessible by bus, bike, and car. We're planning adequate parking for peak times, with shared parking arrangements with adjacent facilities during off-peak hours. Traffic studies will be part of the development approval process. We'll work with the community to minimize impacts through smart scheduling and encouraging alternative transportation."
        }
      ]
    },
    {
      category: "Getting Involved",
      icon: <Lightbulb className="w-5 h-5" />,
      questions: [
        {
          question: "I don't have kids or play hockey. Why should I support this?",
          answer: "The arena benefits everyone on the island: Property values - Communities with recreation facilities have higher property values and attract families; Health care - Recreation centers reduce healthcare costs through preventive health programs; Safety - After-school and evening programs reduce youth crime and delinquency; Seniors - The walking track and fitness programs help prevent falls and support aging in place; Economy - The facility creates jobs, attracts visitors for tournaments, and keeps recreation spending local; Emergency preparedness - The arena can serve as an emergency shelter during disasters. It's an investment in our community's future."
        },
        {
          question: "How can I stay updated on the campaign progress?",
          answer: "Stay connected by: Signing up for our email newsletter (opt-in when you sign the petition); Following our social media accounts; Checking this website for regular updates; Attending community information sessions; Reading coverage in the Gulf Islands Driftwood and other local media. We're committed to transparent communication throughout this journey."
        },
        {
          question: "Can businesses or organizations get involved?",
          answer: "Absolutely! Business support is crucial. Options include: Financial pledges or sponsorships; In-kind contributions (services, materials, expertise); Naming rights opportunities for major contributors; Employee engagement and volunteer programs; Advocacy and promotion to your networks; Event sponsorships and partnerships. Business contributions may qualify for marketing and tax benefits. Contact us at saltspringislandarena@gmail.com to discuss partnership opportunities."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Frequently Asked Questions - Salt Spring Island Arena"
        description="Get answers to common questions about the Salt Spring Island Community Arena project, including costs, location, timeline, programs, and how to support."
        url="https://ssiarena.com/faq"
      />

      {/* Header */}
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
              <h1 className="font-bold text-lg">SSI Arena</h1>
              <p className="text-xs text-slate-500">Building Our Future</p>
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 mb-4">
            <HelpCircle className="w-8 h-8 text-sky-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about the Salt Spring Island Community Arena project.
            Don't see your question? <a href="mailto:saltspringislandarena@gmail.com" className="text-sky-600 hover:underline">Contact us</a>.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="text-sky-600">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{category.category}</h2>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-slate-200">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div key={faqIndex} className="px-6 py-4">
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full text-left flex items-start justify-between gap-4 group"
                      >
                        <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors flex-1">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0 mt-1">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-sky-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-sky-600 transition-colors" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="mt-4 text-slate-700 leading-relaxed pl-0 animate-fadeIn">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-sky-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 text-sky-100">
            We're here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:saltspringislandarena@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-sky-600 rounded-lg hover:bg-sky-50 transition-colors font-semibold"
            >
              Email Us
            </a>
            <Link to="/petition">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors font-semibold">
                Sign the Petition
              </button>
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Salt Spring Island Community Arena Association
          </p>
        </div>
      </footer>
    </div>
  );
}
