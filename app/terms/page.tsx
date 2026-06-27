"use client";

import { Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-pink/10 border border-accent-pink/20 mb-4">
            <Shield className="w-4 h-4 text-accent-pink" />
            <span className="text-xs font-semibold text-accent-pink uppercase tracking-wider">Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-text-secondary">
            Last updated: June 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed mb-4">
              By accessing or using ThickInfluencers (the &quot;Platform&quot;), you agree to be bound by these Terms of Service
              (&quot;Terms&quot;). If you do not agree to all the Terms, you may not access or use the Platform.
            </p>
            <p className="leading-relaxed">
              These Terms apply to all visitors, users, and others who access or use the Platform (&quot;Users&quot;).
              By using the Platform, you represent that you are at least 18 years of age or the age of majority in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. Account Registration</h2>
            <p className="leading-relaxed mb-4">
              To access certain features of the Platform, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide accurate, current, and complete account information</li>
              <li>Maintain and update your account information as needed</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these Terms or provide false information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. Membership Subscriptions</h2>
            <p className="leading-relaxed mb-4">
              The Platform offers various membership tiers with recurring subscription fees. By purchasing a subscription:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You agree to pay the subscription fees as described at the time of purchase</li>
              <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
              <li>You may cancel at any time through your account dashboard</li>
              <li>Cancellation takes effect at the end of the current billing period</li>
              <li>All fees are non-refundable except as required by applicable law</li>
            </ul>
            <p className="leading-relaxed">
              We reserve the right to change subscription fees with reasonable notice. Continued use after fee changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. User Conduct</h2>
            <p className="leading-relaxed mb-4">
              Users agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Copying, distributing, or disclosing any content without authorization</li>
              <li>Using the Platform for any unlawful purpose or in violation of any applicable laws</li>
              <li>Attempting to circumvent any access restrictions or payment mechanisms</li>
              <li>Harassing, abusing, or harming other users or creators</li>
              <li>Uploading malicious code or interfering with Platform operations</li>
              <li>Using automated systems (bots, scrapers) without our express permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. Intellectual Property</h2>
            <p className="leading-relaxed mb-4">
              All content on the Platform, including but not limited to images, videos, text, graphics, logos, and software,
              is the property of ThickInfluencers or its content creators and is protected by copyright and other intellectual
              property laws.
            </p>
            <p className="leading-relaxed mb-4">
              Users are granted a limited, non-exclusive, non-transferable license to access and view content for personal,
              non-commercial purposes. Membership does not transfer any ownership rights to you.
            </p>
            <p className="leading-relaxed">
              Creators retain all rights to their original content. By uploading content to the Platform, creators grant
              ThickInfluencers a license to host, display, and distribute that content as part of the Platform services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Termination</h2>
            <p className="leading-relaxed mb-4">
              We may terminate or suspend your account and access to the Platform at any time, without prior notice,
              if you violate these Terms or engage in conduct that we believe is harmful to the Platform or other users.
            </p>
            <p className="leading-relaxed">
              Upon termination, your right to use the Platform will immediately cease. Sections regarding intellectual
              property, limitations of liability, and dispute resolution shall survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">7. Limitation of Liability</h2>
            <p className="leading-relaxed mb-4">
              The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis. ThickInfluencers makes no warranties,
              express or implied, regarding the operation or availability of the Platform.
            </p>
            <p className="leading-relaxed">
              To the fullest extent permitted by law, ThickInfluencers shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">8. Changes to Terms</h2>
            <p className="leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email
              or through the Platform. Continued use of the Platform after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">9. Contact</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:support@thickinfluencers.com" className="text-accent-pink hover:underline">
                support@thickinfluencers.com
              </a>.
            </p>
          </section>
        </div>

        {/* Related links */}
        <div className="mt-12 pt-8 border-t border-border-dark">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-accent-pink hover:underline flex items-center gap-1">
              Privacy Policy <ChevronRight className="w-3 h-3" />
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