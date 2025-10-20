import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Mail, Database } from "lucide-react";
import SEO from "./components/SEO";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Privacy Policy - Salt Spring Island Arena Campaign"
        description="Privacy policy for the Salt Spring Island Community Arena campaign. Learn how we collect, use, and protect your personal information."
        url="https://ssiarena.com/privacy"
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
            <Shield className="w-8 h-8 text-sky-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600">
            Your privacy is important to us. Learn how we protect your information.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Last Updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-sky-600" />
              Introduction
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The Salt Spring Island Community Arena Association ("we," "us," or "our") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
              website and sign our petition or pledge support for the Salt Spring Island Community Arena project.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We are a registered non-profit society in British Columbia and comply with the Personal Information Protection Act
              (PIPA) and other applicable Canadian privacy laws.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-sky-600" />
              Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Personal Information You Provide</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you sign the petition or make a pledge, we collect:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>First and last name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Postal code</li>
              <li>Pledge amount (if applicable)</li>
              <li>Comments or messages you provide</li>
              <li>Consent preferences (petition signature, email updates)</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Automatically Collected Information</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li>IP address and general location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referral source (how you found our site)</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Cookies and Tracking Technologies</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use cookies and similar technologies to improve your experience and track campaign effectiveness:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li><strong>Google Ads:</strong> Tracks conversions from advertising campaigns</li>
              <li><strong>Facebook Pixel:</strong> Measures the effectiveness of Facebook advertising</li>
              <li><strong>Analytics:</strong> Helps us understand how visitors use our site</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-sky-600" />
              How We Use Your Information
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li><strong>Petition Management:</strong> To record and validate your petition signature</li>
              <li><strong>Campaign Updates:</strong> To send you updates about the arena campaign (only if you opt-in)</li>
              <li><strong>Pledge Processing:</strong> To track and acknowledge your financial commitment</li>
              <li><strong>Communication:</strong> To respond to your inquiries or comments</li>
              <li><strong>Advocacy:</strong> To demonstrate community support to government officials and stakeholders</li>
              <li><strong>Marketing:</strong> To measure the effectiveness of our advertising campaigns</li>
              <li><strong>Analytics:</strong> To understand how our website is used and improve the user experience</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information Sharing and Disclosure</h2>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">We DO Share With:</h3>
            <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
              <li><strong>Service Providers:</strong> Third-party services that help us operate our website (database hosting, email delivery)</li>
              <li><strong>Government Officials:</strong> Petition signatures may be shared with local, provincial, and federal government representatives to demonstrate community support</li>
              <li><strong>Public Records:</strong> Petition signature counts (not individual names) may be published publicly</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">We DO NOT:</h3>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Sell your personal information to third parties</li>
              <li>Share your email address with other organizations without your consent</li>
              <li>Publicly display your full name without permission</li>
              <li>Share your pledge amounts publicly (unless you give explicit permission)</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Services</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our website uses the following third-party services:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-3">
              <li>
                <strong>Supabase:</strong> Database hosting and authentication (Privacy Policy: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">supabase.com/privacy</a>)
              </li>
              <li>
                <strong>Google Ads:</strong> Advertising and conversion tracking (Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">policies.google.com/privacy</a>)
              </li>
              <li>
                <strong>Facebook Pixel:</strong> Advertising and analytics (Privacy Policy: <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">facebook.com/privacy/policy</a>)
              </li>
              <li>
                <strong>Email Service Provider:</strong> For sending campaign updates to subscribers
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Privacy Rights</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Under Canadian privacy laws, you have the following rights:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request corrections to inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from email updates at any time</li>
              <li><strong>Withdraw Consent:</strong> Withdraw your petition signature (though signature counts may still reflect historical totals)</li>
              <li><strong>Data Portability:</strong> Request your data in a portable format</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              To exercise any of these rights, please contact us at: <a href="mailto:saltspringislandarena@gmail.com" className="text-sky-600 hover:underline">saltspringislandarena@gmail.com</a>
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Encrypted data transmission (HTTPS/SSL)</li>
              <li>Secure database hosting with enterprise-grade security</li>
              <li>Limited access to personal information (need-to-know basis)</li>
              <li>Regular security assessments and updates</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              While we strive to protect your information, no method of transmission over the internet is 100% secure.
              We cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
            <p className="text-slate-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required by law. Petition signatures and pledges
              may be retained indefinitely as part of the campaign's historical record. Email addresses for updates
              are retained until you unsubscribe or request deletion.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
            <p className="text-slate-700 leading-relaxed">
              Our website is not directed to children under the age of 13. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe we have collected
              information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-slate-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by
              posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you
              to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-sky-600" />
              Contact Us
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="font-semibold text-slate-900 mb-2">Salt Spring Island Community Arena Association</p>
              <p className="text-slate-700">Email: <a href="mailto:saltspringislandarena@gmail.com" className="text-sky-600 hover:underline">saltspringislandarena@gmail.com</a></p>
              <p className="text-slate-700">Location: Salt Spring Island, British Columbia, Canada</p>
              <p className="text-slate-700 mt-2 text-sm">Registered Non-Profit Society</p>
            </div>
          </section>

          {/* Consent */}
          <section className="mb-10">
            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 rounded-r-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Your Consent</h2>
              <p className="text-slate-700 leading-relaxed">
                By using our website and providing your personal information, you consent to the collection, use,
                and disclosure of your information as described in this Privacy Policy. If you do not agree with
                this Privacy Policy, please do not use our website or provide us with your personal information.
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </main>

      {/* Simple Footer */}
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
