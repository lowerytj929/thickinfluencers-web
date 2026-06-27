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
              Welcome to ThickInfluencers and Vault Empire (&quot;the Platform,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing,
              browsing, or using the Platform at <strong>thickinfluencers.com</strong> or any associated subdomains,
              you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms,
              you must not access or use the Platform in any manner.
            </p>
            <p className="leading-relaxed">
              These Terms constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and
              ThickInfluencers / Vault Empire. The Platform is a membership-based content subscription service
              providing access to adult-oriented media (&quot;Content&quot;). <strong>You must be at least 18 years of age
              (or the age of majority in your jurisdiction, whichever is higher) to use this Platform.</strong> By
              using the Platform, you represent and warrant that you meet this age requirement and that you are
              not located in a jurisdiction where adult content is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. Account Registration and Security</h2>
            <p className="leading-relaxed mb-4">
              To access premium Content and features, you must create an account. When registering, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide accurate, current, and complete registration information</li>
              <li>Maintain and promptly update your account information to keep it accurate</li>
              <li>Create and maintain a secure password &mdash; you are solely responsible for all activity under your account</li>
              <li>Notify us immediately at <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a> of any unauthorized use</li>
              <li>Not share, sell, transfer, or license your account credentials to any third party</li>
              <li>Not create multiple accounts for the purpose of abusing free trials, promotions, or referral programs</li>
            </ul>
            <p className="leading-relaxed">
              We reserve the right to suspend or permanently terminate any account that violates these Terms,
              provides false information, or engages in fraudulent or abusive conduct. You may delete your account
              at any time through your account dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. Membership Subscriptions and Billing</h2>
            <p className="leading-relaxed mb-4">
              The Platform offers two membership tiers for accessing premium Content:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Vault Access</strong> &mdash; $15.00 per month, providing access to standard premium Content</li>
              <li><strong>Vault Pro</strong> &mdash; $25.00 per month, providing access to all premium Content including exclusive and early-release material</li>
            </ul>
            <p className="leading-relaxed mb-4">
              By purchasing a subscription, you agree to the following terms:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>All fees are charged upfront at the beginning of each billing period</li>
              <li>Subscriptions automatically renew at the end of each billing period unless cancelled before the renewal date</li>
              <li>You may cancel your subscription at any time through your account dashboard settings</li>
              <li>Cancellation takes effect at the end of the current paid billing period &mdash; you retain access until that date</li>
              <li>All fees are non-refundable except as expressly required by applicable consumer law</li>
              <li>We reserve the right to modify subscription fees with at least 30 days&apos; notice via email</li>
              <li>Continued use after a fee change takes effect constitutes your acceptance of the new fee</li>
            </ul>
            <p className="leading-relaxed">
              All payments are processed securely through Stripe, our third-party payment processor. We do not
              store full credit card numbers on our servers. By providing payment information, you represent that
              you are authorized to use the payment method and authorize Stripe and us to charge the applicable fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. Free Trials and Promotions</h2>
            <p className="leading-relaxed mb-4">
              From time to time, we may offer free trials or promotional pricing. Terms and conditions of any trial
              or promotion will be disclosed at the time of offer. Unless otherwise stated:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Free trials are available only to new users who have not previously held a paid subscription</li>
              <li>You must cancel before the trial ends to avoid being charged the applicable subscription fee</li>
              <li>We reserve the right to withdraw or modify any promotion at any time without notice</li>
              <li>Abuse of free trials (including creating multiple accounts) is grounds for immediate termination</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. User Conduct and Prohibited Activities</h2>
            <p className="leading-relaxed mb-4">
              You agree to use the Platform only for lawful purposes and in accordance with these Terms. The
              following activities are strictly prohibited:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Copying, downloading, recording, screen-capturing, distributing, or publicly displaying any Content without express written authorization</li>
              <li>Using the Platform for any unlawful purpose or in violation of any local, state, national, or international law</li>
              <li>Circumventing or attempting to circumvent any access controls, paywalls, subscription requirements, or technological protection measures</li>
              <li>Harassing, threatening, stalking, or abusing any user, creator, or staff member</li>
              <li>Uploading, posting, or transmitting any malware, viruses, or malicious code</li>
              <li>Using automated tools, bots, scrapers, crawlers, or scripts to access the Platform without our express written permission</li>
              <li>Impersonating any person or entity, or misrepresenting your affiliation with any person or entity</li>
              <li>Interfering with or disrupting the integrity or performance of the Platform or its infrastructure</li>
              <li>Engaging in any activity that could damage, disable, overburden, or impair the Platform</li>
            </ul>
            <p className="leading-relaxed">
              Violation of these prohibitions may result in immediate account termination, legal action, and
              reporting to appropriate authorities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Intellectual Property Rights</h2>
            <p className="leading-relaxed mb-4">
              All Content available on the Platform &mdash; including but not limited to images, videos, text, graphics,
              logos, audio, software, and design elements &mdash; is owned by ThickInfluencers, its content creators,
              or its licensors and is protected by United States and international copyright, trademark, and
              intellectual property laws.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>License to Users.</strong> Upon purchasing a subscription, you are granted a limited,
              personal, non-exclusive, non-transferable, and revocable license to access and view Content solely
              for personal, non-commercial, entertainment purposes. This license does not transfer any ownership
              or copyright interest to you.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Content by Creators.</strong> Independent content creators retain all rights to their
              original works. By uploading Content to the Platform, creators grant ThickInfluencers a worldwide,
              royalty-free, non-exclusive license to host, store, display, reproduce, distribute, and perform
              that Content as necessary to operate and provide the Platform services.
            </p>
            <p className="leading-relaxed">
              <strong>Trademarks.</strong> &quot;ThickInfluencers,&quot; &quot;Vault Empire,&quot; &quot;Vault Access,&quot; &quot;Vault Pro,&quot;
              and associated logos are trademarks of ThickInfluencers. You may not use these marks without our
              prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">7. DMCA and Copyright Infringement</h2>
            <p className="leading-relaxed mb-4">
              We respect the intellectual property rights of others and comply with the Digital Millennium Copyright
              Act (DMCA). If you believe that any Content on the Platform infringes your copyright, please submit
              a DMCA takedown notice to our designated Copyright Agent.
            </p>
            <p className="leading-relaxed mb-4">
              Your notice must include: (a) your signature (physical or electronic); (b) identification of the
              copyrighted work claimed to be infringed; (c) identification of the infringing material with enough
              detail for us to locate it; (d) your contact information; (e) a statement of good faith belief that
              the use is not authorized; and (f) a statement, under penalty of perjury, that the information is
              accurate and you are the copyright owner or authorized to act on their behalf.
            </p>
            <p className="leading-relaxed">
              Submit notices to: <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a>.
              We maintain a policy of terminating accounts of repeat infringers. For a detailed explanation of our
              DMCA procedures, please see our{" "}
              <Link href="/copyright" className="text-accent-pink hover:underline">Copyright Policy</Link>{" "}
              and{" "}
              <Link href="/takedown" className="text-accent-pink hover:underline">DMCA Takedown Request</Link>{" "}
              pages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">8. Third-Party Services and Links</h2>
            <p className="leading-relaxed mb-4">
              The Platform may contain links to third-party websites, services, or resources, including but not
              limited to Stripe (payment processing), Discord, Telegram, and Reddit communities. We are not
              responsible for the availability, content, products, services, or privacy practices of any
              third-party service. We encourage you to review the terms and policies of any third-party service
              before engaging with it.
            </p>
            <p className="leading-relaxed">
              Our community presence on Telegram (<strong>@richballer1</strong>, 200K+ members) and Reddit
              (<strong>r/thickinfluencersNSFW</strong>, 100K+ members) is operated by the same team, but
              those platforms are governed by their respective terms of service and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">9. 18 U.S.C. &sect; 2257 Compliance</h2>
            <p className="leading-relaxed mb-4">
              All persons appearing in any visual depiction of sexually explicit conduct on the Platform were at
              least 18 years of age at the time of creation. ThickInfluencers is not a primary producer (as
              defined in 18 U.S.C. &sect; 2257) of Content; independent creators are responsible for maintaining
              their own age-verification records. See our full{" "}
              <Link href="/compliance" className="text-accent-pink hover:underline">2257 Compliance</Link>{" "}
              statement for details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">10. Age Restriction and Warning</h2>
            <p className="leading-relaxed mb-4">
              <strong>18 U.S.C. &sect; 2257 WARNING:</strong> The Platform contains adult-oriented material that may
              be sexually explicit. By accessing the Platform, you confirm that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You are at least 18 years of age (or the age of majority in your jurisdiction)</li>
              <li>You are voluntarily choosing to view adult content</li>
              <li>You are not offended by sexually explicit material</li>
              <li>Viewing such material is legal in your jurisdiction</li>
              <li>You will not share any Content with minors</li>
            </ul>
            <p className="leading-relaxed">
              We use age-gating and age-verification mechanisms at account creation. If you are under 18, you
              must immediately leave this Platform and not access it again.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">11. Disclaimer of Warranties</h2>
            <p className="leading-relaxed mb-4">
              THE PLATFORM AND ALL CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY
              WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW,
              THICKINFLUENCERS DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
              <li>Warranties that the Platform will be uninterrupted, error-free, secure, or virus-free</li>
              <li>Warranties regarding the accuracy, reliability, or quality of any Content</li>
              <li>Warranties that Content will continue to be available or accessible</li>
            </ul>
            <p className="leading-relaxed">
              No advice or information obtained from us or through the Platform creates any warranty not expressly
              stated in these Terms. You use the Platform at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">12. Limitation of Liability</h2>
            <p className="leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THICKINFLUENCERS, ITS OFFICERS,
              DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
              <li>Damages resulting from your access to or inability to access the Platform</li>
              <li>Damages resulting from any conduct or Content of any third party</li>
              <li>Unauthorized access to or alteration of your transmissions or data</li>
              <li>Statements or conduct of any user or creator on the Platform</li>
            </ul>
            <p className="leading-relaxed mb-4">
              Our total liability to you for any claims arising from or relating to these Terms or your use of
              the Platform shall not exceed the greater of (a) the amount you have paid us in the twelve (12)
              months preceding the claim, or (b) one hundred dollars ($100.00).
            </p>
            <p className="leading-relaxed">
              Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability
              for incidental or consequential damages, so some of the above limitations may not apply to you.
              In such cases, our liability will be limited to the fullest extent permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">13. Indemnification</h2>
            <p className="leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless ThickInfluencers, its officers, directors,
              employees, agents, and affiliates from and against any and all claims, liabilities, damages,
              losses, costs, and expenses (including reasonable attorneys&apos; fees) arising from or relating to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your use of or access to the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party right, including intellectual property or privacy rights</li>
              <li>Any content you upload, post, or transmit through the Platform</li>
              <li>Any fraudulent, abusive, or illegal activity by you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">14. Termination</h2>
            <p className="leading-relaxed mb-4">
              We may terminate or suspend your account and access to the Platform at any time, without prior
              notice or liability, for any reason, including if you breach these Terms or engage in conduct
              that we, in our sole discretion, consider harmful to the Platform, other users, or third parties.
            </p>
            <p className="leading-relaxed mb-4">
              You may terminate your account at any time through your account settings. Upon termination:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your right to access and use the Platform immediately ceases</li>
              <li>Any subscription fees paid are non-refundable (except as required by law)</li>
              <li>Sections 5 (User Conduct), 6 (Intellectual Property), 11 (Disclaimer), 12 (Limitation of Liability), 13 (Indemnification), and 16 (Dispute Resolution) survive termination</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">15. Modifications to Terms</h2>
            <p className="leading-relaxed mb-4">
              We reserve the right to modify or update these Terms at any time at our sole discretion. When we
              make material changes, we will notify you via email (to the address associated with your account)
              and/or by posting a prominent notice on the Platform. Your continued use of the Platform after
              the effective date of any changes constitutes your acceptance of the revised Terms.
            </p>
            <p className="leading-relaxed">
              If you do not agree to the revised Terms, you must stop using the Platform and cancel your
              subscription before the changes take effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">16. Dispute Resolution and Governing Law</h2>
            <p className="leading-relaxed mb-4">
              <strong>Governing Law.</strong> These Terms and any disputes arising out of or relating to them
              shall be governed by and construed in accordance with the laws of the State of Delaware, without
              regard to its conflict of laws principles.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Informal Resolution.</strong> Before filing any claim, you agree to attempt to resolve
              the dispute informally by contacting us at{" "}
              <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a>.
              We will attempt to resolve the dispute within 30 days.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Arbitration.</strong> If the dispute cannot be resolved informally, you agree that any
              dispute shall be resolved by binding individual arbitration administered by the American Arbitration
              Association under its Consumer Arbitration Rules. You agree that claims must be brought in your
              individual capacity only, and not as a plaintiff or class member in any class, consolidated, or
              representative action.
            </p>
            <p className="leading-relaxed">
              <strong>Jurisdiction.</strong> Notwithstanding the foregoing, either party may seek equitable
              relief in any court of competent jurisdiction to protect its intellectual property rights. Any
              litigation not subject to arbitration shall be brought exclusively in the state or federal courts
              located in Delaware.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">17. Entire Agreement</h2>
            <p className="leading-relaxed">
              These Terms, together with our Privacy Policy, Copyright Policy, and 2257 Compliance Statement,
              constitute the entire agreement between you and ThickInfluencers regarding your use of the
              Platform and supersede all prior or contemporaneous agreements. If any provision of these Terms
              is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">18. Contact Information</h2>
            <p className="leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding these Terms, please contact us:
            </p>
            <div className="bg-bg-card border border-border-dark rounded-xl p-5 space-y-1 text-sm">
              <p className="text-text-primary font-medium">ThickInfluencers / Vault Empire</p>
              <p>Email: <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a></p>
              <p>Telegram: <a href="https://t.me/richballer1" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">@richballer1</a></p>
              <p>Reddit: <a href="https://reddit.com/r/thickinfluencersNSFW" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">r/thickinfluencersNSFW</a></p>
            </div>
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
            <Link href="/takedown" className="text-accent-pink hover:underline flex items-center gap-1">
              DMCA Takedown <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}