"use client";

import { Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-pink/10 border border-accent-pink/20 mb-4">
            <Shield className="w-4 h-4 text-accent-pink" />
            <span className="text-xs font-semibold text-accent-pink uppercase tracking-wider">Privacy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-text-secondary">
            Last updated: June 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Account Information:</strong> Email address, username, and password when you create an account</li>
              <li><strong>Profile Information:</strong> Display name, avatar, bio, and other profile details you choose to provide</li>
              <li><strong>Payment Information:</strong> Billing details processed through our secure third-party payment processors</li>
              <li><strong>Communications:</strong> Information you provide when contacting support or participating in surveys</li>
            </ul>
            <p className="leading-relaxed mb-4">
              We also automatically collect certain information when you use the Platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Usage Data:</strong> Pages viewed, content interactions, search queries, and feature usage</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
              <li><strong>Cookies:</strong> We use cookies and similar tracking technologies for authentication and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide, maintain, and improve the Platform and its features</li>
              <li>Process transactions and manage your membership subscriptions</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with the Platform</li>
              <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
              <li>Comply with legal obligations and enforce our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. Information Sharing</h2>
            <p className="leading-relaxed mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (payment processing, hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid legal requests</li>
              <li><strong>Protection of Rights:</strong> To protect the rights, property, or safety of ThickInfluencers, its users, or the public</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. Data Security</h2>
            <p className="leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information,
              including encryption in transit and at rest, access controls, and regular security audits.
            </p>
            <p className="leading-relaxed">
              However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot
              guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. Your Rights</h2>
            <p className="leading-relaxed mb-4">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="leading-relaxed">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">
                privacy@thickinfluencers.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Cookies</h2>
            <p className="leading-relaxed mb-4">
              We use cookies and similar technologies for essential Platform functions, authentication, and analytics.
              You can control cookie preferences through your browser settings. Disabling cookies may affect Platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">7. Third-Party Services</h2>
            <p className="leading-relaxed">
              The Platform may contain links to third-party websites or services. We are not responsible for the privacy
              practices of these third parties. We encourage you to review their privacy policies before providing any
              personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">8. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting
              the new policy on this page and updating the "Last updated" date. Your continued use of the Platform
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">9. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">
                privacy@thickinfluencers.com
              </a>.
            </p>
          </section>
        </div>

        {/* Related links */}
        <div className="mt-12 pt-8 border-t border-border-dark">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-accent-pink hover:underline flex items-center gap-1">
              Terms of Service <ChevronRight className="w-3 h-3" />
            </Link>
            <Link href="/copyright" className="text-accent-pink hover:underline flex items-center gap-1">
              Copyright Policy <ChevronRight className="w-3 h-3" />
            </Link>
            <Link href="/compliance" className="text-accent-pink hover:underline flex items-center gap-1">
              2257 Compliance <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}