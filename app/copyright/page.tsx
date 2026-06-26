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
              ThickInfluencers respects the intellectual property rights of others and expects its users to do the same.
              We respond to clear notices of alleged copyright infringement in accordance with the Digital Millennium
              Copyright Act (DMCA).
            </p>
            <p className="leading-relaxed">
              It is our policy to terminate, in appropriate circumstances, the accounts of users who repeatedly
              infringe or are believed to be repeat infringers of the copyrights of others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. Copyright Ownership</h2>
            <p className="leading-relaxed mb-4">
              All content uploaded to the Platform by creators remains the intellectual property of the respective
              creators. Creators retain full ownership of their original works.
            </p>
            <p className="leading-relaxed mb-4">
              By uploading content to ThickInfluencers, creators grant the Platform a license to host, display,
              and distribute that content as part of the Platform services. This license is limited to the purpose
              of operating and providing the Platform.
            </p>
            <p className="leading-relaxed">
              Users access content under a limited, personal, non-commercial license. Downloading, copying,
              redistributing, or using Platform content outside of the intended viewing experience is strictly prohibited
              unless expressly authorized.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. Reporting Copyright Infringement</h2>
            <p className="leading-relaxed mb-4">
              If you believe that your copyrighted work has been used on the Platform in a way that constitutes
              copyright infringement, please submit a DMCA takedown notice to our designated Copyright Agent.
            </p>
            <p className="leading-relaxed mb-4">
              Your notice must include the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>A physical or electronic signature of the copyright owner or authorized representative</li>
              <li>Identification of the copyrighted work claimed to have been infringed</li>
              <li>Identification of the material that is claimed to be infringing, with enough detail for us to locate it</li>
              <li>Your contact information (name, address, telephone number, and email address)</li>
              <li>A statement that you have a good faith belief that the use is not authorized</li>
              <li>A statement, under penalty of perjury, that the information in the notice is accurate</li>
            </ul>
            <p className="leading-relaxed">
              Submit DMCA notices to our Copyright Agent:
            </p>
            <div className="bg-bg-card border border-border-dark rounded-xl p-5 mt-4 space-y-1 text-sm">
              <p className="text-text-primary font-medium">Copyright Agent</p>
              <p>ThickInfluencers Legal Department</p>
              <p>Email: <a href="mailto:dmca@thickinfluencers.com" className="text-accent-pink hover:underline">dmca@thickinfluencers.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. Counter-Notification</h2>
            <p className="leading-relaxed mb-4">
              If you believe that material you uploaded was removed or disabled by mistake or misidentification,
              you may submit a counter-notification. Your counter-notification must include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your physical or electronic signature</li>
              <li>Identification of the material that was removed and where it appeared before removal</li>
              <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake</li>
              <li>Your name, address, and telephone number</li>
              <li>A statement that you consent to federal jurisdiction in your judicial district</li>
            </ul>
            <p className="leading-relaxed">
              Submit counter-notifications to the same contact information above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. Repeat Infringer Policy</h2>
            <p className="leading-relaxed">
              ThickInfluencers maintains a policy of terminating the accounts of users who are determined to be
              repeat infringers. We reserve the right to terminate accounts at our discretion, including for a single
              instance of flagrant infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Reporting Abuse</h2>
            <p className="leading-relaxed">
              If you encounter content that you believe violates these policies, please use the report function on the
              Platform or contact us at{" "}
              <a href="mailto:abuse@thickinfluencers.com" className="text-accent-pink hover:underline">
                abuse@thickinfluencers.com
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