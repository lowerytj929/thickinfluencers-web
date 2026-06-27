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
              In compliance with the United States Code, Title 18, Section 2257 (18 U.S.C. &sect; 2257) and
              Title 28, Part 75 of the Code of Federal Regulations (28 C.F.R. &sect; 75), all persons appearing
              in any visual depiction of actual or simulated sexually explicit conduct on the ThickInfluencers /
              Vault Empire platform (the &quot;Platform&quot;) were at least eighteen (18) years of age at the time
              of the creation of such depictions.
            </p>
            <p className="leading-relaxed mb-4">
              ThickInfluencers acts solely as a content platform and internet service provider for the
              display, distribution, and transmission of content uploaded by independent, third-party creators.
              The operators of ThickInfluencers are not the &quot;primary producer&quot; (as that term is defined in
              18 U.S.C. &sect; 2257(h)(2)(B) and 28 C.F.R. &sect; 75.1(c)(2)) of any of the content appearing on the
              Platform. We do not produce, create, direct, or commission the sexually explicit content
              displayed on the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Statutory Basis</h2>
            <p className="leading-relaxed mb-4">
              18 U.S.C. &sect; 2257 requires that producers of material containing sexually explicit conduct
              maintain records of the age and identity of every performer depicted. The statute and its
              implementing regulations (28 C.F.R. &sect; 75) specify strict requirements for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Obtaining copies of government-issued photo identification for each performer</li>
              <li>Maintaining organized records cross-referenced to specific content</li>
              <li>Making records available for inspection by the Attorney General upon request</li>
              <li>Retaining records for the period required by law</li>
            </ul>
            <p className="leading-relaxed">
              As a platform that hosts user-generated content, ThickInfluencers relies on the exemption
              provided for entities that are not primary producers. Nonetheless, we enforce compliance
              obligations on all content creators who upload to the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Content Creator Obligations</h2>
            <p className="leading-relaxed mb-4">
              Each content creator and uploader on the Platform is a &quot;producer&quot; within the meaning of
              18 U.S.C. &sect; 2257 and bears full responsibility for compliance with the statute. By uploading
              content to ThickInfluencers, each creator certifies, represents, and warrants that they:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Have obtained and retained copies of valid government-issued photo identification (such as a driver&apos;s license, passport, or state ID) for each performer appearing in their content</li>
              <li>Have verified that each performer was at least 18 years of age at the time of the creation of the content</li>
              <li>Maintain organized records that comply with the requirements of 18 U.S.C. &sect; 2257 and 28 C.F.R. &sect; 75</li>
              <li>Will make such records available to the Attorney General of the United States for inspection upon request</li>
              <li>Will retain such records for the period required by applicable law (generally, the longer of five years from the date of creation or the duration of any relevant statutory period)</li>
              <li>Have not and will not upload any content depicting performers who are under 18 years of age</li>
              <li>Will provide accurate age certification data through the Platform&apos;s upload system</li>
            </ul>
            <p className="leading-relaxed">
              Creators who fail to comply with these obligations may have their content removed and their
              accounts terminated. Knowingly uploading content depicting minors is a federal crime and will
              be reported to law enforcement immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Platform Safeguards</h2>
            <p className="leading-relaxed mb-4">
              Although ThickInfluencers is not a primary producer, we have implemented the following policies
              and technical measures to help ensure compliance with 18 U.S.C. &sect; 2257:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Age-Gating:</strong> All users must confirm they are at least 18 years of age before accessing the Platform</li>
              <li><strong>Age Certification at Upload:</strong> Creators certify for each upload that all performers depicted are at least 18</li>
              <li><strong>Terms of Service:</strong> Our Terms expressly prohibit content featuring minors</li>
              <li><strong>Content Moderation:</strong> Automated and manual review processes screen uploaded content</li>
              <li><strong>Reporting Mechanisms:</strong> Users can report suspected 2257 violations through in-platform tools</li>
              <li><strong>Law Enforcement Cooperation:</strong> We promptly respond to lawful requests from law enforcement</li>
              <li><strong>Account Termination:</strong> Violating accounts are immediately terminated and reported</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Record-Keeping Location and Custodian</h2>
            <p className="leading-relaxed mb-4">
              Records required by 18 U.S.C. &sect; 2257 are maintained by the individual content creators and
              uploaders at their respective business addresses. ThickInfluencers does not maintain copies of
              performers&apos; identification documents on our systems.
            </p>
            <p className="leading-relaxed mb-4">
              For inquiries regarding the records for specific content, please contact the respective creator
              directly through the Platform. For general 2257 compliance inquiries, you may reach our
              compliance point of contact:
            </p>
            <div className="bg-bg-card border border-border-dark rounded-xl p-5 space-y-1 text-sm">
              <p className="text-text-primary font-medium">2257 Compliance Inquiry</p>
              <p>ThickInfluencers / Vault Empire</p>
              <p>Email: <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a></p>
              <p>Telegram: <a href="https://t.me/richballer1" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">@richballer1</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Labels on Exempt Content</h2>
            <p className="leading-relaxed mb-4">
              Some content on the Platform may be exempt from 2257 record-keeping requirements, including
              content that does not contain actual or simulated sexually explicit conduct as defined in the
              statute. ThickInfluencers relies on the exemptions set forth in 28 C.F.R. &sect; 75.1(c) for
              material that is not &quot;sexually explicit&quot; within the statutory definition.
            </p>
            <p className="leading-relaxed">
              To the extent required by 28 C.F.R. &sect; 75.6, content that is exempt from 2257 requirements
              will be identified with a statement indicating that it is exempt from the record-keeping
              requirements of 18 U.S.C. &sect; 2257 and 28 C.F.R. &sect; 75.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Reporting Suspected Violations</h2>
            <p className="leading-relaxed mb-4">
              If you believe that any content on ThickInfluencers violates 18 U.S.C. &sect; 2257, involves a
              performer who was under 18 years of age at the time of creation, or that a creator has failed
              to maintain proper records, please report it immediately to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Email: <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a></li>
              <li>Telegram: <a href="https://t.me/richballer1" className="text-accent-pink hover:underline" target="_blank" rel="noopener noreferrer">@richballer1</a></li>
            </ul>
            <p className="leading-relaxed">
              All reports will be investigated promptly and thoroughly. If a violation is confirmed, the
              content will be removed, the creator&apos;s account will be terminated, and the matter will be
              reported to appropriate law enforcement authorities, including the Federal Bureau of
              Investigation (FBI) and the National Center for Missing and Exploited Children (NCMEC).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Legal Notice</h2>
            <p className="leading-relaxed">
              THIS PLATFORM CONTAINS ADULT-ORIENTED MATERIAL. ALL PERFORMERS APPEARING IN SEXUALLY EXPLICIT
              CONTENT ON THIS PLATFORM WERE AT LEAST 18 YEARS OF AGE AT THE TIME OF CREATION. THE RECORDS
              REQUIRED BY 18 U.S.C. &sect; 2257 ARE MAINTAINED BY THE INDEPENDENT CONTENT CREATORS.
              THICKINFLUENCERS IS NOT THE PRIMARY PRODUCER OF ANY CONTENT ON THIS PLATFORM. VIOLATIONS OF
              18 U.S.C. &sect; 2257 ARE FEDERAL CRIMES PUNISHABLE BY IMPRISONMENT AND FINES.
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