"use client";

import { Copyright, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-pink/10 border border-accent-pink/20 mb-4">
            <Copyright className="w-4 h-4 text-accent-pink" />
            <span className="text-xs font-semibold text-accent-pink uppercase tracking-wider">Copyright</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Copyright Policy
          </h1>
          <p className="text-text-secondary">
            Last updated: June 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">1. Respect for Intellectual Property</h2>
            <p className="leading-relaxed mb-4">
              ThickInfluencers / Vault Empire (the &quot;Platform&quot;) respects the intellectual property rights of others
              and expects its users and content creators to do the same. We respond to clear notices of alleged
              copyright infringement in accordance with the Digital Millennium Copyright Act (DMCA), 17 U.S.C.
              &sect; 512 (&quot;DMCA&quot;).
            </p>
            <p className="leading-relaxed">
              It is our policy to terminate, in appropriate circumstances, the accounts of users and creators
              who are determined to be repeat infringers of the copyrights of others. We also reserve the right
              to terminate accounts for a single instance of flagrant infringement at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. Copyright Ownership</h2>
            <p className="leading-relaxed mb-4">
              All content uploaded to the Platform by independent creators &mdash; including but not limited to
              images, videos, audio, text, and graphics &mdash; remains the intellectual property of the respective
              creators. Creators retain full ownership and copyright of their original works.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>Creator License to Platform.</strong> By uploading content to ThickInfluencers, creators
              grant the Platform a non-exclusive, worldwide, royalty-free license to host, store, display,
              reproduce, distribute, and perform that content for the purpose of operating, providing, and
              promoting the Platform. This license expires upon removal of the content from the Platform.
            </p>
            <p className="leading-relaxed mb-4">
              <strong>User License.</strong> Subscribers and visitors are granted a limited, personal,
              non-commercial, non-transferable, revocable license to access and view content solely through
              the Platform&apos;s authorized interface. This license explicitly does not include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Downloading, copying, or saving content to any local device or storage</li>
              <li>Screen-capturing, recording, or otherwise reproducing content</li>
              <li>Redistributing, sharing, publicly displaying, or performing content</li>
              <li>Creating derivative works based on content</li>
              <li>Selling, licensing, or commercially exploiting content in any way</li>
            </ul>
            <p className="leading-relaxed">
              All rights not expressly granted to users are reserved by the content creators and the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. Designated Copyright Agent</h2>
            <p className="leading-relaxed mb-4">
              ThickInfluencers has designated the following Copyright Agent to receive notifications of
              alleged copyright infringement:
            </p>
            <div className="bg-bg-card border border-border-dark rounded-xl p-5 mt-4 space-y-1 text-sm">
              <p className="text-text-primary font-medium">Designated Copyright Agent</p>
              <p>ThickInfluencers Legal Department</p>
              <p>Email: <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a></p>
              <p>Telegram: <a href="https://t.me/richballer1" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">@richballer1</a></p>
            </div>
            <p className="leading-relaxed mt-4">
              All DMCA notices and counter-notifications must be submitted to the Copyright Agent at the email
              address above. You may also use our{" "}
              <Link href="/takedown" className="text-accent-pink hover:underline">DMCA Takedown Request Form</Link>{" "}
              for submitting infringement notices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. Filing a DMCA Takedown Notice</h2>
            <p className="leading-relaxed mb-4">
              If you believe in good faith that your copyrighted work has been reproduced or displayed on the
              Platform without authorization in a way that constitutes copyright infringement, please submit
              a written DMCA notice containing the following information:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li><strong>Your signature</strong> &mdash; A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
              <li><strong>Identification of the copyrighted work</strong> &mdash; A description of the copyrighted work you claim has been infringed. If multiple works are involved, you may provide a representative list</li>
              <li><strong>Identification of infringing material</strong> &mdash; Sufficient information to locate the infringing material on the Platform, including the specific URL(s) where the material appears</li>
              <li><strong>Your contact information</strong> &mdash; Your name, address, telephone number, and email address</li>
              <li><strong>Good faith statement</strong> &mdash; A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law</li>
              <li><strong>Accuracy statement</strong> &mdash; A statement, made under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorized to act on the owner&apos;s behalf</li>
            </ol>
            <p className="leading-relaxed">
              <strong>Important:</strong> Under Section 512(f) of the DMCA, any person who knowingly materially
              misrepresents that material or activity is infringing may be subject to liability for damages.
              Please ensure your notice is accurate and complete.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. Notice Takedown Procedure</h2>
            <p className="leading-relaxed mb-4">
              Upon receipt of a valid DMCA notice, we will take the following actions:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>Acknowledge receipt of the notice within 1-2 business days</li>
              <li>Review the notice for compliance with DMCA requirements</li>
              <li>Remove or disable access to the allegedly infringing material promptly</li>
              <li>Notify the content uploader/creator of the removal and provide them with a copy of the notice</li>
              <li>Maintain a record of the notice for legal and compliance purposes</li>
            </ol>
            <p className="leading-relaxed">
              We act expeditiously to remove content upon receipt of a valid notice. We are not in a position
              to adjudicate disputes between parties; our role is to comply with the DMCA safe harbor provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Counter-Notification Procedure</h2>
            <p className="leading-relaxed mb-4">
              If you believe that material you uploaded was removed or access to it was disabled as a result
              of a mistake or misidentification, you may submit a counter-notification. To be effective, a
              counter-notification must include the following:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li><strong>Your signature</strong> &mdash; A physical or electronic signature</li>
              <li><strong>Identification of removed material</strong> &mdash; Identification of the material that was removed and the location where it appeared before removal</li>
              <li><strong>Statement of good faith</strong> &mdash; A statement under penalty of perjury that you have a good faith belief the material was removed or disabled as a result of mistake or misidentification</li>
              <li><strong>Your contact information</strong> &mdash; Your name, address, telephone number, and email address</li>
              <li><strong>Consent to jurisdiction</strong> &mdash; A statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located (or if outside the U.S., any jurisdiction where we may be found), and that you will accept service of process from the person who submitted the original notice</li>
            </ol>
            <p className="leading-relaxed mb-4">
              Submit your counter-notification to our Copyright Agent at{" "}
              <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a>.
            </p>
            <p className="leading-relaxed">
              Upon receipt of a valid counter-notification, we will forward it to the original complainant.
              If the original complainant does not file a court action seeking to restrain the allegedly
              infringing activity within 10-14 business days, we may restore the removed content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">7. Repeat Infringer Policy</h2>
            <p className="leading-relaxed mb-4">
              In accordance with the DMCA and other applicable laws, ThickInfluencers maintains a policy to
              terminate, in appropriate circumstances, the accounts of users and creators who are repeat
              copyright infringers. Our policy includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Tracking and documenting all DMCA notices received against user accounts</li>
              <li>Providing written warnings for first-time violations</li>
              <li>Terminating accounts after multiple verified infringement notices</li>
              <li>Reserving the right to terminate accounts immediately for egregious or flagrant infringements</li>
            </ul>
            <p className="leading-relaxed">
              We also reserve the right to terminate accounts of users who attempt to circumvent our content
              protection measures, including by re-uploading content that has been previously removed pursuant
              to a valid DMCA notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">8. Platform Content Protection</h2>
            <p className="leading-relaxed mb-4">
              ThickInfluencers employs technological measures to protect the copyrighted content of its creators
              and the Platform, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access controls and authentication requirements for premium content</li>
              <li>Watermarking or digital fingerprinting of content where feasible</li>
              <li>Monitoring for unauthorized redistribution of content</li>
              <li>Prompt response to DMCA notices and removal of infringing material</li>
            </ul>
            <p className="leading-relaxed">
              Users who discover their content being redistributed on unauthorized third-party sites are
              encouraged to report it to us. We will take appropriate action, including issuing takedown
              notices to the hosting platforms where feasible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">9. Reporting Non-Copyright Abuse</h2>
            <p className="leading-relaxed">
              To report content that violates our Terms of Service for reasons other than copyright
              infringement (such as harassment, impersonation, or prohibited content), please contact us at{" "}
              <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a>{" "}
              or use the in-platform reporting function. We review and respond to all reports promptly.
            </p>
          </section>
        </div>

        {/* Related links */}
        <div className="mt-12 pt-8 border-t border-border-dark">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-accent-pink hover:underline flex items-center gap-1">
              Terms of Service <ChevronRight className="w-3 h-3" />
            </Link>
            <Link href="/privacy" className="text-accent-pink hover:underline flex items-center gap-1">
              Privacy Policy <ChevronRight className="w-3 h-3" />
            </Link>
            <Link href="/takedown" className="text-accent-pink hover:underline flex items-center gap-1">
              DMCA Takedown Request <ChevronRight className="w-3 h-3" />
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