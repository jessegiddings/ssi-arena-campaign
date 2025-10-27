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
      category: "Funding & Taxes",
      icon: <DollarSign className="w-5 h-5" />,
      questions: [
        {
          question: "Will this raise our property taxes?",
          answer: "No. The Salt Spring Island Healthy Living Society has made a clear commitment: this project will not raise local taxes. It will be funded entirely through donations, corporate partnerships, and federal and provincial infrastructure programs. We're also planning to establish a $10 million community endowment to cover any operating shortfall for at least the first decade — ensuring the facility is financially sustainable and not a burden on taxpayers."
        },
        {
          question: "Who's behind the funding plan?",
          answer: "We're proud to be working with one of British Columbia's premier philanthropic consultants, who helped raise nearly $20 million for the Upper Skeena Recreation Centre in Hazelton, BC — a community much like ours. With their experience and guidance, we're confident Salt Spring can achieve the same success."
        },
        {
          question: "What is the total cost of the project?",
          answer: "The projected cost is between $18–22 million, depending on the final design, materials, and amenities. That includes the single-sheet ice rink, indoor walking track, fitness mezzanine, community wellness space, and energy-efficient building systems designed for longevity and low environmental impact."
        },
        {
          question: "How will the arena's annual operations be funded?",
          answer: "Through a combination of endowment income, user programming, and partnerships. We plan to raise a $10 million operating endowment to offset annual costs. We're also in early discussions with organizations like the LA Kings and Vancouver Canucks to explore support for youth hockey and community programs — initiatives that could help keep local participation fees low and accessible."
        },
        {
          question: "What happens if you don't reach your fundraising goal?",
          answer: "We will not break ground until full funding is secured. This is a responsible, community-led project — we will only proceed once construction and operational sustainability are fully guaranteed."
        }
      ]
    },
    {
      category: "Governance & Sustainability",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: "Who will operate the facility?",
          answer: "The facility will be operated by the Salt Spring Island Healthy Living Society, a registered non-profit organization established specifically for this purpose. As a community-led initiative, we're committed to ensuring transparency, local oversight, and long-term accountability to island residents."
        },
        {
          question: "What if operating costs increase in the future?",
          answer: "Our endowment fund will be structured to grow over time, with conservative investment strategies and a long-term horizon. We'll also pursue ongoing partnerships and grants to offset future operating costs, ensuring the facility remains financially sound and community-accessible for generations."
        }
      ]
    },
    {
      category: "Community Impact & Benefits",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: "Why does Salt Spring need this?",
          answer: "Despite being home to over 15,000 residents, Salt Spring Island has no indoor recreation centre, no rink, and no year-round community gathering space. Families currently travel off-island for hockey, skating, and indoor sports. This project will finally provide a safe, inclusive space for children, youth, seniors, and families — promoting health, connection, and year-round activity for everyone."
        },
        {
          question: "Will it be environmentally responsible?",
          answer: "Absolutely. Sustainability is one of our core principles. The facility will be solar-ready, heat-recovery equipped, and designed to meet or exceed BC Step Code 4 energy standards. Our goal is to make it one of the most efficient community recreation facilities in Canada — lowering both emissions and long-term energy costs."
        },
        {
          question: "How will the community be able to use it?",
          answer: "The space will serve far more than hockey. There will be public skating, youth and senior programs, fitness and wellness classes, and a year-round indoor walking track — all designed to be affordable and accessible. It's not just a rink; it's a healthy living hub for the entire island."
        },
        {
          question: "Will this create local jobs?",
          answer: "Yes. The project will generate dozens of local construction jobs during the build and ongoing positions in management, maintenance, and programming once operational — creating year-round employment opportunities right here on Salt Spring."
        }
      ]
    },
    {
      category: "Timeline & Getting Involved",
      icon: <Calendar className="w-5 h-5" />,
      questions: [
        {
          question: "When will construction start?",
          answer: "We're currently in the feasibility and design stage, working collaboratively with regional and local partners. Construction will begin only once land use amendments, funding, and environmental approvals are complete — ensuring we move forward responsibly and debt-free."
        },
        {
          question: "How can I get involved?",
          answer: "There are many ways to help: Sign the community petition to show your support. Submit a Letter of Intent to donate (no money collected until the project moves forward). Share our story and encourage others to join the effort. Every show of support strengthens our case for government and foundation funding."
        },
        {
          question: "If we're building an arena… why not bring a Junior A team to Salt Spring Island?",
          answer: "That's a great question — and honestly, we were thinking the exact same thing. If Gibsons, BC can fill 750 seats every week with a Junior A team — and they've got a population of around 6,000 people — then surely Salt Spring Island, with over 15,000 residents, can do the same or better. We've already been in early conversations with the Pacific Junior Hockey League (PJHL) about the possibility of a Salt Spring team in the future. While our focus right now is on getting the arena built and funded, we're laying the groundwork so that one day, fans here might be cheering for a home team of our own. So yes — you could say this idea is on ice… but in the best possible way. 🏒"
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

        {/* Summary Section */}
        <div className="mt-12 bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">In Summary</h2>
          <p className="text-lg text-slate-700 leading-relaxed text-center max-w-3xl mx-auto">
            The Salt Spring Island Healthy Living Society is building this project for the community, by the community — without adding tax burden, without cutting corners, and with full transparency at every step.
            <br /><br />
            This is about creating a healthier, more connected Salt Spring — a place our kids, families, and seniors can be proud of.
          </p>
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
