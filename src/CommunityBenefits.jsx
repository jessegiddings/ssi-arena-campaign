import React from "react";
import { Link } from "react-router-dom";
import SEO, { pageSEO } from "./components/SEO";
import {
  Heart,
  TrendingUp,
  Users,
  Home,
  Brain,
  Shield,
  Sparkles,
  DollarSign,
  Building2,
  Activity,
  Smile,
  GraduationCap,
  TreePine,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
  FileText
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CommunityBenefits() {
  const executiveTakeaways = [
    {
      text: "Building and operating a recreation centre is a proven, population-level lever to increase physical activity, which in turn improves health, lowers falls and depression, and reduces healthcare costs.",
      sources: [
        { label: "PMC", url: "https://pmc.ncbi.nlm.nih.gov/" },
        { label: "WHO", url: "https://www.who.int/publications/i/item/9789240015128" }
      ]
    },
    {
      text: "Built-environment + destination approaches are formally recommended by the U.S. Community Preventive Services Task Force after a review of 90 studies. A rec centre is exactly the 'everyday destination.'",
      sources: [
        { label: "CDC/CPSTF", url: "https://www.thecommunityguide.org/findings/physical-activity-built-environment-approaches" },
        { label: "PMC", url: "https://pmc.ncbi.nlm.nih.gov/" }
      ]
    },
    {
      text: "In Canada, physical inactivity costs billions annually. Classic estimate: $2.1B/year (2.5% of direct health costs); newer syntheses show large, avoidable costs.",
      sources: [
        { label: "CMAJ", url: "https://www.cmaj.ca/content/163/11/1435" },
        { label: "PMC", url: "https://pmc.ncbi.nlm.nih.gov/" }
      ]
    },
    {
      text: "For older adults, balance/functional training delivered in group classes reduces falls by 24–34%—one of the most expensive, life-altering events for seniors.",
      sources: [
        { label: "Cochrane", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013740.pub2/full" }
      ]
    },
    {
      text: "Exercise reduces depressive symptoms with moderate effect. Walking/jogging, yoga, and strength training are especially effective.",
      sources: [
        { label: "BMJ 2024", url: "https://www.bmj.com/company/newsroom/exercise-more-effective-than-medicines-to-manage-mental-health/" },
        { label: "Cochrane", url: "https://www.cochranelibrary.com/" }
      ]
    }
  ];

  const keyStatistics = [
    {
      number: "$6.8B",
      label: "Canadian cost of physical inactivity (2009)",
      icon: <DollarSign className="w-6 h-6" />,
      source: "Janssen 2012, Health Reports"
    },
    {
      number: "24-34%",
      label: "Falls reduction in seniors via community exercise",
      icon: <Shield className="w-6 h-6" />,
      source: "Cochrane Review"
    },
    {
      number: "39%",
      label: "Canadian children meeting daily activity targets",
      icon: <Activity className="w-6 h-6" />,
      source: "ParticipACTION 2024"
    },
    {
      number: "$372B",
      label: "Canada's 2024 health spending (+5.7% growth)",
      icon: <TrendingUp className="w-6 h-6" />,
      source: "CIHI 2024"
    }
  ];

  const benefitCategories = [
    {
      title: "Youth Development & Community Safety",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-amber-500 to-orange-600",
      benefits: [
        {
          title: "After-School Programs Reduce Delinquency",
          icon: <GraduationCap className="w-6 h-6" />,
          description: "Meta-analyses show after-school programs yield statistically significant positive effects on academic, social, and behavioural outcomes. Delinquency reductions depend on program quality, structure, and staff engagement.",
          citation: "Kremer et al. 2014 systematic review/meta-analysis",
          sources: [
            { label: "PMC Article", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4212416/" },
            { label: "Gottfredson 2004 PDF", url: "https://www.ncjrs.gov/pdffiles1/nij/grants/206013.pdf" }
          ]
        },
        {
          title: "Evening Recreation & Crime Prevention",
          icon: <Shield className="w-6 h-6" />,
          description: "Late-night sport programs ('Midnight Basketball') show contextual crime-prevention effects in quasi-experimental analyses. Well-programmed evening recreation is associated with lower property crime when structured and supervised.",
          citation: "Hartmann & Depro 2006; Spruit et al. 2017",
          sources: [
            { label: "ResearchGate", url: "https://www.researchgate.net/" },
            { label: "Review Studies", url: "https://journals.sagepub.com/" }
          ]
        },
        {
          title: "Safe, Well-Maintained Spaces Reduce Violence",
          icon: <TreePine className="w-6 h-6" />,
          description: "Randomized trials in Philadelphia show that greening vacant lots, improving lighting, and remediating abandoned structures reduce gun violence and improve mental health. Investment in maintained recreation environments has measurable safety benefits.",
          citation: "Branas et al. 2018 (PNAS RCT)",
          sources: [
            { label: "PNAS Study", url: "https://joeornstein.github.io/publications/VacantLotsPhilly.pdf" },
            { label: "JAMA Network Open", url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2687277" },
            { label: "JAMA Internal Med", url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2654699" }
          ]
        },
        {
          title: "Canadian Youth Activity Gap",
          icon: <Activity className="w-6 h-6" />,
          description: "Only 39% of Canadian children and youth meet daily moderate-to-vigorous physical activity (MVPA) targets. Community facilities are a key lever to close this gap and develop healthy habits early.",
          citation: "ParticipACTION 2024 Report Card",
          sources: [
            { label: "ParticipACTION 2024", url: "https://www.participaction.com/en-ca/benefits-and-guidelines/children-and-youth" },
            { label: "Technical Report PDF", url: "https://www.participaction.com/" }
          ]
        }
      ]
    },
    {
      title: "Mental Health Treatment",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-600",
      benefits: [
        {
          title: "Exercise as Effective Treatment for Depression",
          icon: <Brain className="w-6 h-6" />,
          description: "Exercise reduces depressive symptoms with moderate effect compared to no treatment. Walking/jogging, yoga, and strength training show the strongest therapeutic effects—all activities easily delivered in a community recreation centre.",
          citation: "BMJ 2024 umbrella review & Cochrane evidence",
          sources: [
            { label: "BMJ News 2024", url: "https://www.bmj.com/company/newsroom/exercise-more-effective-than-medicines-to-manage-mental-health/" },
            { label: "Noetel et al. (PubMed)", url: "https://pubmed.ncbi.nlm.nih.gov/" },
            { label: "BJSM 2023", url: "https://bjsm.bmj.com/content/57/18/1203" }
          ]
        },
        {
          title: "Programs Accessible to All",
          icon: <Users className="w-6 h-6" />,
          description: "Community recreation centres can offer evidence-based mental health programming through walking groups, yoga classes, and strength training—activities shown in peer-reviewed research to be therapeutic interventions.",
          citation: "Systematic reviews & meta-analyses",
          sources: [
            { label: "BJSM Overview", url: "https://bjsm.bmj.com/" },
            { label: "Cochrane", url: "https://www.cochranelibrary.com/" }
          ]
        }
      ]
    },
    {
      title: "Senior Health: Falls Prevention",
      icon: <Shield className="w-8 h-8" />,
      color: "from-rose-500 to-pink-600",
      benefits: [
        {
          title: "24–34% Reduction in Falls",
          icon: <Activity className="w-6 h-6" />,
          description: "Community exercise programs for older adults reduce falls by approximately 24–34%, with strongest effects from balance/functional training combined with strength exercises. Falls are one of the most expensive and life-altering events for seniors.",
          citation: "Cochrane systematic review—high-certainty evidence",
          sources: [
            { label: "Cochrane Review", url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013740.pub2/full" },
            { label: "2024 Overview", url: "https://pmc.ncbi.nlm.nih.gov/" }
          ]
        },
        {
          title: "Indoor Walking Track Benefits",
          icon: <Heart className="w-6 h-6" />,
          description: "Group-based programs delivered in safe, climate-controlled environments (like indoor walking tracks, tai chi classes, and strength training) are ideal delivery modes for fall prevention. CDC's STEADI program compiles effective approaches.",
          citation: "CDC STEADI Compendium 2023",
          sources: [
            { label: "CDC STEADI PDF", url: "https://www.cdc.gov/steadi/" },
            { label: "Cochrane", url: "https://www.cochranelibrary.com/" }
          ]
        }
      ]
    },
    {
      title: "Canadian Healthcare Cost Savings",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-emerald-500 to-green-600",
      benefits: [
        {
          title: "Physical Inactivity Costs Billions Annually",
          icon: <TrendingUp className="w-6 h-6" />,
          description: "Foundational CMAJ research attributes approximately $2.1B per year in direct healthcare costs to physical inactivity (2.5% of direct costs). Updated modelling places 2009 costs at $6.8B total (direct $2.4B + indirect $4.3B).",
          citation: "Canadian Medical Association Journal",
          sources: [
            { label: "CMAJ Article", url: "https://www.cmaj.ca/content/163/11/1435" },
            { label: "Janssen 2012", url: "https://www150.statcan.gc.ca/n1/pub/82-003-x/2012001/article/11606-eng.htm" }
          ]
        },
        {
          title: "Measurable Savings from Activity Increases",
          icon: <Shield className="w-6 h-6" />,
          description: "CFLRI/CPRA's 'Price of Inactivity' (2023) indicates $629M per year in potential savings from just a 10-point drop in physical inactivity rates. Even modest population-level improvements deliver measurable economic benefits.",
          citation: "Canadian Fitness & Lifestyle Research Institute",
          sources: [
            { label: "Summary PDF", url: "https://lin.ca/resources/the-price-of-inactivity/" },
            { label: "Full Report", url: "https://lin.ca/resources/the-price-of-inactivity/" }
          ]
        },
        {
          title: "Rising Healthcare Spending Context",
          icon: <AlertCircle className="w-6 h-6" />,
          description: "CIHI projects Canada's health spending to reach $372B in 2024, with 5.7% growth. Any local prevention that reduces chronic disease and falls helps bend the cost curve.",
          citation: "Canadian Institute for Health Information, 2024",
          sources: [
            { label: "CIHI Snapshot", url: "https://www.cihi.ca/en/national-health-expenditure-trends-2024-snapshot" },
            { label: "Media Release", url: "https://www.cihi.ca/" }
          ]
        }
      ]
    },
    {
      title: "Evidence-Based Physical Activity Promotion",
      icon: <Activity className="w-8 h-8" />,
      color: "from-sky-500 to-blue-600",
      benefits: [
        {
          title: "CDC/CPSTF Recommended Approach",
          icon: <Shield className="w-6 h-6" />,
          description: "Combining activity-friendly routes (sidewalks, bike lanes) with everyday destinations like a recreation centre increases population physical activity. This recommendation is based on systematic review of 90 studies.",
          citation: "U.S. Community Preventive Services Task Force",
          sources: [
            { label: "CDC Brief", url: "https://www.cdc.gov/physicalactivity/community-strategies/activity-friendly-routes-to-everyday-destinations.html" },
            { label: "CPSTF Finding", url: "https://www.thecommunityguide.org/findings/physical-activity-built-environment-approaches" }
          ]
        },
        {
          title: "WHO Global Physical Activity Guidelines",
          icon: <Heart className="w-6 h-6" />,
          description: "Regular physical activity across the lifespan reduces risk of cardiovascular disease, type 2 diabetes, several cancers, and improves mental health and sleep. Benefits clearly outweigh risks.",
          citation: "WHO recommends 150–300 min/week for adults",
          sources: [
            { label: "WHO 2020 Guidelines", url: "https://www.who.int/publications/i/item/9789240015128" },
            { label: "PMC", url: "https://pmc.ncbi.nlm.nih.gov/" }
          ]
        },
        {
          title: "Access Increases Activity & Reduces Inequalities",
          icon: <Users className="w-6 h-6" />,
          description: "Free or low-cost access to leisure facilities increases physical activity and reduces health inequalities. Access to community facilities is positively associated with meeting American Heart Association guidelines.",
          citation: "UK natural experiment & YMCA-based RCT evidence",
          sources: [
            { label: "BMJ Journal", url: "https://jech.bmj.com/" },
            { label: "PMC Studies", url: "https://pmc.ncbi.nlm.nih.gov/" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO {...pageSEO.benefits} />
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
            <Link to="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <Link to="/community-benefits" className="text-sky-600 font-semibold">Community Benefits</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Evidence-Based Community Benefits
          </h1>
          <p className="text-xl text-slate-700 max-w-4xl leading-relaxed mb-8">
            Comprehensive research from CDC, WHO, Cochrane, CMAJ, and peer-reviewed journals demonstrating
            how recreation centres improve health, reduce costs, and strengthen communities.
          </p>

          {/* Canadian Context Alert */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <Card className="border-l-4 border-sky-600 bg-sky-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8 px-8 pb-8">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-7 h-7 text-sky-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 mb-2 text-base">Canadian Youth Activity Gap</p>
                    <p className="text-sm text-slate-700 leading-relaxed">Only <span className="font-bold text-sky-700">39%</span> of Canadian children meet daily activity targets</p>
                    <a
                      href="https://www.participaction.com/en-ca/benefits-and-guidelines/children-and-youth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1 mt-3 font-medium"
                    >
                      ParticipACTION 2024 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-emerald-600 bg-emerald-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8 px-8 pb-8">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-7 h-7 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 mb-2 text-base">Healthcare Spending Pressure</p>
                    <p className="text-sm text-slate-700 leading-relaxed">Canada's health spending: <span className="font-bold text-emerald-700">$372B</span> in 2024 (+5.7% growth). Prevention matters.</p>
                    <a
                      href="https://www.cihi.ca/en/national-health-expenditure-trends-2024-snapshot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mt-3 font-medium"
                    >
                      CIHI 2024 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Executive Takeaways */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-5">
            {executiveTakeaways.map((takeaway, i) => (
              <Card key={i} className="border-l-4 border-sky-500 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-8 px-10 pb-8">
                  <p className="text-slate-800 leading-relaxed mb-4 text-base">{takeaway.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {takeaway.sources.map((source, j) => (
                      <a
                        key={j}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs bg-sky-100 text-sky-700 px-3 py-1.5 rounded-full hover:bg-sky-200 transition-colors font-medium"
                      >
                        {source.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {keyStatistics.map((stat, i) => (
              <Card key={i} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 px-6 pb-8">
                  <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500/10 to-blue-600/10 flex items-center justify-center mb-4 text-sky-600">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-sky-600 mb-3">{stat.number}</div>
                  <p className="text-sm text-slate-700 mb-2 font-semibold leading-snug">{stat.label}</p>
                  <p className="text-xs text-slate-500 mt-3">{stat.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Benefits Sections */}
      {benefitCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg`}>
                {category.icon}
              </div>
              <h2 className="text-4xl font-bold text-slate-900">{category.title}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {category.benefits.map((benefit, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4" style={{ borderTopColor: `transparent` }}>
                  <CardContent className="pt-10 px-10 pb-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-10 flex items-center justify-center text-slate-700 flex-shrink-0 shadow-sm`}>
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight">{benefit.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-5 text-base">{benefit.description}</p>
                    <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded mb-4">
                      <p className="text-sm font-semibold text-sky-900 leading-relaxed">{benefit.citation}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {benefit.sources.map((source, j) => (
                        <a
                          key={j}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-200 transition-colors font-medium"
                        >
                          {source.label} <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Research Sources */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Research Sources</h2>
          <Card className="shadow-lg">
            <CardContent className="pt-10 px-12 pb-10">
              <p className="text-slate-700 mb-8 leading-relaxed text-base">
                This page synthesizes evidence from the highest-quality health research institutions and peer-reviewed
                medical journals. All sources are publicly accessible and represent the current scientific consensus
                on recreation facility benefits (2020–2025).
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base">
                    <Shield className="w-5 h-5 text-sky-600" />
                    U.S. Federal Health Agencies
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <a href="https://www.thecommunityguide.org/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 flex items-center gap-1">
                        CDC/Community Preventive Services Task Force <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <a href="https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 flex items-center gap-1">
                        HHS Physical Activity Guidelines for Americans <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-600 mt-1">•</span>
                      <a href="https://www.who.int/publications/i/item/9789240015128" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 flex items-center gap-1">
                        WHO Guidelines on Physical Activity <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                    Canadian Health Research
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <a href="https://www.cmaj.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1">
                        Canadian Medical Association Journal (CMAJ) <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <a href="https://www.participaction.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1">
                        ParticipACTION Report Card <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <a href="https://www.cihi.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1">
                        Canadian Institute for Health Information (CIHI) <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <a href="https://lin.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center gap-1">
                        CFLRI/CPRA (Fitness & Lifestyle Research) <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Peer-Reviewed Medical Journals
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <a href="https://www.bmj.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 flex items-center gap-1">
                        BMJ (British Medical Journal) <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <a href="https://bjsm.bmj.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 flex items-center gap-1">
                        British Journal of Sports Medicine <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <a href="https://jamanetwork.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 flex items-center gap-1">
                        JAMA Network <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <a href="https://www.pnas.org/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 flex items-center gap-1">
                        PNAS (Proceedings of National Academy of Sciences) <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-base">
                    <FileText className="w-5 h-5 text-amber-600" />
                    Clinical Evidence Databases
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <a href="https://www.cochranelibrary.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 flex items-center gap-1">
                        Cochrane Library (Systematic Reviews) <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 flex items-center gap-1">
                        PubMed / PMC (NIH Database) <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>Randomized Controlled Trials (RCTs) & Meta-Analyses</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t">
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
                  <strong className="text-slate-900">Evidence Quality:</strong> This page prioritizes systematic reviews, meta-analyses, and randomized controlled trials
                  from Cochrane, JAMA, BMJ, and PNAS—the highest levels of scientific evidence. All Canadian statistics are from
                  Health Canada, CIHI, CMAJ, and ParticipACTION official reports (2020–2025).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-sky-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Bring These Benefits to Salt Spring Island
          </h2>
          <p className="text-xl text-sky-100 mb-8 leading-relaxed">
            The evidence is overwhelming: recreation centres improve health, reduce healthcare costs by millions,
            prevent falls in seniors, treat depression, and create safer communities. Salt Spring Island deserves
            these proven, research-backed benefits.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/petition">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg bg-white text-sky-700 hover:bg-sky-50 shadow-lg font-semibold"
              >
                Sign the Petition
              </Button>
            </Link>
            <Link to="/">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg border-2 border-white text-white hover:bg-white/10 shadow-lg font-semibold"
              >
                Learn About Our Project
              </Button>
            </Link>
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
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/community-benefits" className="hover:text-white transition-colors">Community Benefits</Link></li>
                <li><Link to="/petition" className="hover:text-white transition-colors">Sign Petition</Link></li>
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
              Evidence-based community building
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
