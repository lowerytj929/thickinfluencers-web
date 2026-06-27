"use client";

import { useState } from "react";
import { FileText, Send, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function TakedownPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    copyrightedWork: "",
    infringingUrls: "",
    description: "",
    goodFaith: false,
    accuracyPerjury: false,
    isOwner: false,
    additionalInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    const requiredFields = ["fullName", "email", "copyrightedWork", "infringingUrls"];
    const missing = requiredFields.filter((f) => !formData[f as keyof typeof formData]);
    if (missing.length > 0) {
      setError("Please fill in all required fields marked with *.");
      setLoading(false);
      return;
    }

    if (!formData.goodFaith || !formData.accuracyPerjury || !formData.isOwner) {
      setError("You must acknowledge all three legal statements to submit a DMCA notice.");
      setLoading(false);
      return;
    }

    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-green-900/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">DMCA Takedown Request Submitted</h1>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Your DMCA takedown notice has been received by our Copyright Agent. We will review your request
            and respond within 2-3 business days. A confirmation copy has been sent to{" "}
            <strong className="text-text-primary">{formData.email}</strong>.
          </p>
          <div className="bg-bg-card border border-border-dark rounded-xl p-5 mb-8 text-sm text-text-muted text-left max-w-md mx-auto">
            <p className="mb-2"><strong className="text-text-primary">Reference:</strong> Please retain your confirmation email for your records. Include the reference number in any follow-up correspondence.</p>
            <p className="text-text-muted">If you do not receive a confirmation within 24 hours, please check your spam folder or contact us directly.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-pink text-white font-semibold rounded-xl hover:opacity-90 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/copyright"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-surface border border-border-dark text-text-secondary font-medium rounded-xl hover:border-accent-pink/30 hover:text-text-primary transition-all"
            >
              View Copyright Policy
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-pink/10 border border-accent-pink/20 mb-4">
            <FileText className="w-4 h-4 text-accent-pink" />
            <span className="text-xs font-semibold text-accent-pink uppercase tracking-wider">DMCA</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            DMCA Takedown Request
          </h1>
          <p className="text-text-secondary">
            Submit a formal copyright infringement notice under the Digital Millennium Copyright Act
            (17 U.S.C. &sect; 512). All fields marked with <span className="text-accent-pink">*</span> are required.
          </p>
        </div>

        {/* Legal preamble */}
        <div className="bg-bg-card border border-border-dark rounded-xl p-5 mb-8 text-sm text-text-muted leading-relaxed">
          <p className="text-text-primary font-semibold mb-2">Important Legal Notice</p>
          <p className="mb-2">
            This form is for reporting copyright infringement only. Section 512(f) of the DMCA provides
            that <strong>any person who knowingly materially misrepresents</strong> that material or activity
            is infringing may be subject to liability for damages, including costs and attorneys&apos; fees.
            Please ensure your claim is accurate and made in good faith.
          </p>
          <p>
            For non-copyright issues (harassment, privacy violations, terms abuse), please contact us at{" "}
            <a href="mailto:privacy@thickinfluencers.com" className="text-accent-pink hover:underline">privacy@thickinfluencers.com</a>.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information Section */}
          <div className="bg-bg-card border border-border-dark rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Your Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary mb-2">
                  Full Legal Name <span className="text-accent-pink">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-2">
                  Title / Role
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
                  placeholder="Copyright Owner"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address <span className="text-accent-pink">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                  Telephone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-text-secondary mb-2">
                  Street Address <span className="text-text-muted">(physical address required)</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-text-secondary mb-2">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
                  placeholder="Los Angeles"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-text-secondary mb-2">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
                    placeholder="CA"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-text-secondary mb-2">
                    ZIP Code
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
                    placeholder="90001"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Infringement Details Section */}
          <div className="bg-bg-card border border-border-dark rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Infringement Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="copyrightedWork" className="block text-sm font-medium text-text-secondary mb-2">
                  Description of Copyrighted Work <span className="text-accent-pink">*</span>
                </label>
                <textarea
                  id="copyrightedWork"
                  name="copyrightedWork"
                  value={formData.copyrightedWork}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all resize-none"
                  placeholder="Describe the original copyrighted work you believe has been infringed. Include title, creator, publication date, registration number (if any), and any other identifying information..."
                />
              </div>

              <div>
                <label htmlFor="infringingUrls" className="block text-sm font-medium text-text-secondary mb-2">
                  URL(s) of Infringing Content <span className="text-accent-pink">*</span>
                </label>
                <textarea
                  id="infringingUrls"
                  name="infringingUrls"
                  value={formData.infringingUrls}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all resize-none"
                  placeholder="https://thickinfluencers.com/gallery/... (one URL per line for multiple items)"
                />
                <p className="text-xs text-text-muted mt-1">Provide the full, specific URL(s) where the infringing material appears.</p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-2">
                  Additional Information
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all resize-none"
                  placeholder="Any additional context, such as authorization status, prior correspondence, or search terms used to locate the content..."
                />
              </div>
            </div>
          </div>

          {/* Legal Declarations Section */}
          <div className="bg-bg-card border border-border-dark rounded-xl p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Legal Declarations</h2>
            <p className="text-sm text-text-muted mb-4">
              You must acknowledge all of the following statements to submit this notice. These declarations
              are made under penalty of perjury pursuant to 17 U.S.C. &sect; 512(c)(3) and 28 U.S.C. &sect; 1746.
            </p>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="isOwner"
                  checked={formData.isOwner}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-border-dark bg-bg-surface accent-accent-pink"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  I am the copyright owner, or I am authorized to act on behalf of the copyright owner
                  of the work identified above.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="goodFaith"
                  checked={formData.goodFaith}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-border-dark bg-bg-surface accent-accent-pink"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  I have a good faith belief that the use of the material in the manner complained of
                  is not authorized by the copyright owner, its agent, or the law.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="accuracyPerjury"
                  checked={formData.accuracyPerjury}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-border-dark bg-bg-surface accent-accent-pink"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  I declare, under penalty of perjury, that the information in this notification is
                  accurate and that I am the copyright owner or authorized to act on the copyright
                  owner&apos;s behalf.
                </span>
              </label>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-900/20 border border-red-900/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-bold text-base rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-accent-pink/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Takedown Request
                </>
              )}
            </button>
            <Link
              href="/copyright"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-bg-surface border border-border-dark text-text-secondary text-base font-medium rounded-xl hover:border-accent-pink/30 hover:text-text-primary transition-all"
            >
              View Copyright Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}