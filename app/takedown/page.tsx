"use client";

import { useState } from "react";
import { FileText, Send, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function TakedownPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contentDescription: "",
    infringingUrl: "",
    reason: "",
    additionalInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate
    if (!formData.fullName || !formData.email || !formData.contentDescription || !formData.infringingUrl || !formData.reason) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
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
          <h1 className="text-3xl font-bold text-text-primary mb-4">Takedown Request Submitted</h1>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Your DMCA takedown notice has been received. We will review your request and respond within 2-3 business days.
            A confirmation has been sent to {formData.email}.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pink text-white font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Back to Home
          </Link>
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
            Submit a copyright infringement notice under the Digital Millennium Copyright Act.
            All fields marked with * are required.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary mb-2">
                Full Name *
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Email Address *
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
          </div>

          {/* Content Description */}
          <div>
            <label htmlFor="contentDescription" className="block text-sm font-medium text-text-secondary mb-2">
              Description of Copyrighted Work *
            </label>
            <textarea
              id="contentDescription"
              name="contentDescription"
              value={formData.contentDescription}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all resize-none"
              placeholder="Describe the original copyrighted work that you believe has been infringed (e.g., title, creator, publication date)..."
            />
          </div>

          {/* Infringing URL */}
          <div>
            <label htmlFor="infringingUrl" className="block text-sm font-medium text-text-secondary mb-2">
              URL of Infringing Content *
            </label>
            <input
              id="infringingUrl"
              name="infringingUrl"
              type="url"
              value={formData.infringingUrl}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all"
              placeholder="https://thickinfluencers.com/gallery/..."
            />
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-text-secondary mb-2">
              Reason for Takedown *
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-pink/50 transition-all"
            >
              <option value="">Select a reason...</option>
              <option value="unauthorized-use">Unauthorized use of copyrighted material</option>
              <option value="not-authorized">I am not authorized to use this content</option>
              <option value="derivative">Unauthorized derivative work</option>
              <option value="distribution">Unauthorized distribution or display</option>
              <option value="other">Other (please describe below)</option>
            </select>
          </div>

          {/* Additional Info */}
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-text-secondary mb-2">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-bg-surface border border-border-dark rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-pink/50 transition-all resize-none"
              placeholder="Any additional context or supporting information..."
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-900/20 border border-red-900/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Legal notice */}
          <div className="bg-bg-card border border-border-dark rounded-xl p-5 text-sm text-text-muted leading-relaxed">
            <p>
              By submitting this form, you acknowledge that:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>You are the copyright owner or authorized to act on their behalf</li>
              <li>You have a good faith belief that the use is not authorized by law</li>
              <li>The information in this notice is accurate under penalty of perjury</li>
              <li>Knowingly submitting a false claim may result in legal liability</li>
            </ul>
          </div>

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