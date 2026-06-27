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
            <h2 className="text-xl font-bold text-text-primary mb-4">1. Introduction</h2>
            <p className="leading-relaxed mb-4">
              ThickInfluencers / Vault Empire (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information
              when you visit our website at <strong>thickinfluencers.com</strong> (the &quot;Platform&quot;) and use our
              membership services.
            </p>
            <p className="leading-relaxed">
              By accessing or using the Platform, you agree to the collection and use of information in
              accordance with this Privacy Policy. If you do not agree with our policies and practices, you
              must not use the Platform. We may update this policy from time to time; material changes will
              be notified via email or a Platform notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect several types of information from and about users of the Platform, including:
            </p>

            <h3 className="text-lg font-semibold text-text-primary mb-3">2.1 Information You Provide to Us</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Account Information:</strong> Email address, username, and password when you create an account</li>
              <li><strong>Profile Information:</strong> Display name, avatar, bio, social media links, and other profile details you choose to provide</li>
              <li><strong>Payment Information:</strong> Billing name, billing address, and payment method details. Full credit card numbers are processed and stored by our payment processor, Stripe &mdash; we never store complete card numbers on our servers</li>
              <li><strong>Communications:</strong> Information you provide when contacting our support team, submitting a DMCA takedown request, or responding to surveys</li>
              <li><strong>Age Verification:</strong> Age confirmation data collected during registration to comply with 18 U.S.C. &sect; 2257 and age-restriction requirements</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-primary mb-3">2.2 Information Automatically Collected</h3>
            <p className="leading-relaxed mb-2">
              When you access or use the Platform, we may automatically collect certain information using
              cookies, web beacons, and similar tracking technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Usage Data:</strong> Pages viewed, Content accessed, time spent on pages, search queries, click patterns, and feature interactions</li>
              <li><strong>Device Information:</strong> IP address, browser type and version, operating system, device type, screen resolution, and unique device identifiers</li>
              <li><strong>Referral Data:</strong> The website or source that referred you to our Platform</li>
              <li><strong>Session Data:</strong> Session duration, navigation path, and interactions within the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Providing Services:</strong> To create and maintain your account, process subscription payments, and deliver the Content and features you request</li>
              <li><strong>Operating the Platform:</strong> To host, display, and distribute Content; to manage access controls and subscription verification</li>
              <li><strong>Payment Processing:</strong> To bill you for subscription fees through Stripe, our authorized payment processor</li>
              <li><strong>Communications:</strong> To send you transactional emails (welcome messages, payment receipts, renewal notices, cancellation confirmations), security alerts, and support responses</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries, troubleshoot issues, and resolve disputes</li>
              <li><strong>Analytics and Improvement:</strong> To monitor usage trends, analyze Platform performance, and improve our services and user experience</li>
              <li><strong>Security and Fraud Prevention:</strong> To detect, investigate, and prevent fraudulent transactions, unauthorized access, abuse, and violations of our Terms of Service</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, and enforceable governmental requests, including 18 U.S.C. &sect; 2257 record-keeping requirements</li>
              <li><strong>Enforcement:</strong> To enforce our Terms of Service, Copyright Policy, and other legal agreements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on the Platform.
              Cookies are small text files placed on your device by your web browser. We use the following
              types of cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Essential Cookies:</strong> Required for the Platform to function properly, including session management, authentication, and access control. These cannot be disabled</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences, settings, and account information to provide a personalized experience</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the Platform, which pages are most visited, and what features are used. We use aggregated, anonymized data for these purposes</li>
            </ul>
            <p className="leading-relaxed mb-4">
              You can control cookie preferences through your browser settings. Most browsers allow you to
              block or delete cookies. Please note that disabling essential cookies may prevent the Platform
              from functioning correctly, including restricting access to member-only Content.
            </p>
            <p className="leading-relaxed">
              We do not currently use third-party advertising cookies or share data with ad networks. We do
              not use cookies for cross-site behavioral tracking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. How We Share Your Information</h2>
            <p className="leading-relaxed mb-4">
              We do not sell, rent, or trade your personal information to third parties for their marketing
              purposes. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Service Providers:</strong> With trusted third-party vendors who perform services on our behalf, including:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Stripe</strong> &mdash; payment processing and billing (their privacy policy applies to data they process: <a href="https://stripe.com/privacy" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>)</li>
                  <li><strong>Vercel</strong> &mdash; web hosting and infrastructure</li>
                  <li><strong>Analytics providers</strong> &mdash; aggregated usage analysis</li>
                  <li><strong>Email service providers</strong> &mdash; transactional email delivery</li>
                </ul>
              </li>
              <li><strong>Legal Requirements:</strong> If required to do so by law or in response to a valid legal request (subpoena, court order, government investigation), including compliance with 18 U.S.C. &sect; 2257 record inspection requirements</li>
              <li><strong>Protection of Rights:</strong> When we believe in good faith that disclosure is necessary to protect the rights, property, or safety of ThickInfluencers, its users, creators, or the public</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, reorganization, sale of assets, or bankruptcy, your information may be transferred as a business asset</li>
              <li><strong>With Your Consent:</strong> In any other situation where you have given your explicit consent to share the information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Data Security</h2>
            <p className="leading-relaxed mb-4">
              We implement industry-standard technical and organizational security measures to protect your
              personal information against unauthorized access, alteration, disclosure, or destruction.
              These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Encryption of data in transit using TLS/SSL (HTTPS)</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Strict access controls and authentication requirements for internal systems</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Tokenization of payment data &mdash; full payment credentials are handled solely by Stripe</li>
            </ul>
            <p className="leading-relaxed">
              Despite these measures, no method of transmission over the Internet or electronic storage is
              100% secure. We cannot guarantee absolute security of your data. You are responsible for
              maintaining the confidentiality of your account password and for any activity under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">7. Data Retention</h2>
            <p className="leading-relaxed mb-4">
              We retain your personal information for as long as your account is active and for a reasonable
              period thereafter to comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Account data:</strong> Retained while your account is active and for 90 days after account deletion, unless a longer retention period is required by law</li>
              <li><strong>Payment data:</strong> Stripe retains transaction records in accordance with their own data retention policies and applicable financial regulations</li>
              <li><strong>Legal records:</strong> Information required for 2257 compliance is maintained by content creators per statutory requirements</li>
              <li><strong>Usage analytics:</strong> Aggregated, anonymized analytics data may be retained indefinitely for business intelligence purposes</li>
            </ul>
            <p className="leading-relaxed">
              When we no longer need your personal information, we will delete or anonymize it securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">8. Your Rights and Choices</h2>
            <p className="leading-relaxed mb-4">
              Depending on your jurisdiction, you may have the following rights regarding your personal information:
            </p>

            <h3 className="text-lg font-semibold text-text-primary mb-3">8.1 General Rights</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements</li>
              <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time where we rely on consent to process your data</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-primary mb-3">8.2 California Privacy Rights (CCPA/CPRA)</h3>
            <p className="leading-relaxed mb-4">
              If you are a California resident, you have the following additional rights under the California
              Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions</li>
              <li><strong>Right to Opt-Out:</strong> We do not sell your personal information. You have the right to direct us not to sell your personal information if we did &mdash; we do not engage in such sales</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA/CPRA rights</li>
            </ul>
            <p className="leading-relaxed mb-4">
              To exercise your California rights, contact us at{" "}
              <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a>.
              We will verify your identity before processing your request.
            </p>

            <h3 className="text-lg font-semibold text-text-primary mb-3">8.3 GDPR Rights (European Economic Area)</h3>
            <p className="leading-relaxed mb-4">
              If you are located in the European Economic Area (EEA) or the United Kingdom, you have the
              following rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Right to Access:</strong> Obtain confirmation that we process your data and access that data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of your data</li>
              <li><strong>Right to Restrict Processing:</strong> Request restriction of processing under certain conditions</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used format</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
            </ul>
            <p className="leading-relaxed">
              Our legal basis for processing your personal information includes: (a) performance of a contract
              (providing subscription services); (b) compliance with legal obligations (2257 record-keeping);
              (c) legitimate interests (security, fraud prevention, service improvement); and (d) consent
              (where requested).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">9. Third-Party Services</h2>
            <p className="leading-relaxed mb-4">
              The Platform integrates with or links to the following third-party services. We are not responsible
              for the privacy practices of these services, and we encourage you to review their policies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Stripe</strong> &mdash; Payment processing (<a href="https://stripe.com/privacy" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
              <li><strong>Vercel</strong> &mdash; Web hosting and deployment (<a href="https://vercel.com/privacy" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
              <li><strong>Telegram</strong> &mdash; Community channel (<a href="https://telegram.org/privacy" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
              <li><strong>Reddit</strong> &mdash; Community forum (<a href="https://www.redditinc.com/policies/privacy-policy" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
            </ul>
            <p className="leading-relaxed">
              The Platform may also contain links to other websites not operated by us. If you click a
              third-party link, you will be directed to that third party&apos;s site. We strongly advise you to
              review the Privacy Policy of every site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">10. Children&apos;s Privacy</h2>
            <p className="leading-relaxed mb-4">
              The Platform contains adult-oriented content and is strictly intended for users who are at least
              18 years of age (or the age of majority in their jurisdiction). We do not knowingly collect
              personal information from anyone under the age of 18.
            </p>
            <p className="leading-relaxed">
              If we become aware that a user under 18 has created an account or provided personal information,
              we will immediately delete the account and any associated data. If you believe a minor has
              provided us with personal information, please contact us immediately at{" "}
              <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">11. International Data Transfers</h2>
            <p className="leading-relaxed mb-4">
              The Platform is hosted in the United States. If you access the Platform from outside the United
              States, your information may be transferred to, stored, and processed in the United States and
              other countries where our service providers operate. By using the Platform, you consent to the
              transfer of your information to countries that may have different data protection laws than
              your country of residence.
            </p>
            <p className="leading-relaxed">
              For users in the EEA or UK, we ensure appropriate safeguards are in place for international
              data transfers, including Standard Contractual Clauses where required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">12. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed mb-4">
              We reserve the right to update this Privacy Policy at any time. When we make material changes,
              we will:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Update the &quot;Last updated&quot; date at the top of this page</li>
              <li>Notify you via email (to the address associated with your account)</li>
              <li>Post a notice on the Platform</li>
            </ul>
            <p className="leading-relaxed">
              We encourage you to review this Privacy Policy periodically. Your continued use of the Platform
              after changes take effect constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">13. Contact Us</h2>
            <p className="leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-bg-card border border-border-dark rounded-xl p-5 space-y-1 text-sm">
              <p className="text-text-primary font-medium">ThickInfluencers / Vault Empire</p>
              <p>Privacy Officer</p>
              <p>Email: <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a></p>
              <p>Telegram: <a href="https://t.me/richballer1" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">@richballer1</a></p>
            </div>
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
            <Link href="/takedown" className="text-accent-pink hover:underline flex items-center gap-1">
              DMCA Takedown <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}