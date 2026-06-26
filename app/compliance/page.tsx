"use client";

import { FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-pink/10 border border-accent-pink/20 mb-4">
            <FileText className="w-4 h-4 text-accent-pink" />
            <span className="text-xs font-semibold text-accent-pink uppercase tracking-wider">Compliance</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            U.S.C. Title 18, Section 2257 Compliance
          </h1>
          <p className="text-text-secondary">
            Record-Keeping Requirements Compliance Statement
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Compliance Statement</h2>
            <p className="leading-relaxed mb-4">
              In compliance with United States Code, Title 18, Section 2257, all persons appearing in any visual
              depiction of sexually explicit conduct (as defined in 18 U.S.C. § 2257) on the ThickInfluencers platform
              are at least 18 years of age at the time of creation of such depictions.
            </p>
            <p className="leading-relaxed mb-4">
              ThickInfluencers acts solely as a platform for the display and distribution of content uploaded by
              independent creators. The operators of ThickInfluencers are not the primary producers (as defined in
              18 U.S.C. § 2257) of any content appearing on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Record-Keeping Responsibilities</h2>
            <p className="leading-relaxed mb-4">
              Pursuant to 18 U.S.C. § 2257 and 28 C.F.R. § 75, each content creator and uploader on ThickInfluencers:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Is responsible for maintaining records of the age and identity of every performer appearing in their content</li>
              <li>Must obtain and retain copies of government-issued identification for all performers</li>
              <li>Must certify upon upload that all performers are at least 18 years of age</li>
              <li>Must maintain these records for the period required by applicable law</li>
              <li>Must make records available to the Attorney General upon request</li>
            </ul>
            <p className="leading-relaxed">
              By uploading content to ThickInfluencers, each creator certifies compliance with 18 U.S.C. § 2257
              and agrees to maintain the required records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Platform Role</h2>
            <p className="leading-relaxed mb-4">
              ThickInfluencers provides the technical infrastructure for content hosting and distribution. As a
              platform operator, ThickInfluencers:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Requires all users to be at least 18 years of age to create an account</li>
              <li>Requires content creators to certify their compliance with 2257 record-keeping requirements</li>
              <li>Provides age verification mechanisms for account creation</li>
              <li>Responds promptly to lawful requests for information from law enforcement</li>
              <li>Removes content that violates our Terms of Service or applicable law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Age Verification</h2>
            <p className="leading-relaxed mb-4">
              All users of ThickInfluencers must confirm they are at least 18 years of age before accessing the
              platform. We employ age verification measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Age confirmation at account registration</li>
              <li>Automated screening for underage accounts</li>
              <li>Reporting mechanisms for suspicious content</li>
              <li>Cooperation with law enforcement investigations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Designated Agent for Records</h2>
            <p className="leading-relaxed mb-4">
              Records required by 18 U.S.C. § 2257 are maintained by the individual content creators and uploaders.
              For inquiries regarding specific content, please contact the respective creator directly through the
              platform.
            </p>
            <p className="leading-relaxed mb-4">
              For general 2257 compliance inquiries, you may contact:
            </p>
            <div className="bg-bg-card border border-border-dark rounded-xl p-5 space-y-1 text-sm">
              <p className="text-text-primary font-medium">2257 Compliance Officer</p>
              <p>ThickInfluencers Legal Department</p>
              <p>Email: <a href="mailto:compliance@thickinfluencers.com" className="text-accent-pink hover:underline">compliance@thickinfluencers.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Reporting Concerns</h2>
            <p className="leading-relaxed">
              If you believe any content on ThickInfluencers violates 18 U.S.C. § 2257 or involves a minor,
              please report it immediately to{" "}
              <a href="mailto:abuse@thickinfluencers.com" className="text-accent-pink hover:underline">
                abuse@thickinfluencers.com
              </a>{" "}
              or use the in-platform reporting function. All reports will be investigated promptly.
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
            <Link href="/copyright" className="text-accent-pink hover:underline flex items-center gap-1">
              Copyright Policy <ChevronRight className="w-3 h-3" />
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