"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I get access after payment?",
    answer: "After your payment is confirmed, you will instantly receive an automated message with your private access link and instructions."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes. We use industry-leading encryption and third-party payment processors. We do not store your credit card details."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time through the billing portal or by contacting our support team."
  },
  {
    question: "What content is allowed in the vault?",
    answer: "We strictly enforce a policy of 18+ only, legal, and consensual content. No copyrighted or non-consensual material is allowed."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 bg-[#1A0A12] w-full border-t border-pink-900/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about your membership.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-[#0A0508] border border-pink-900/30 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-left text-white text-lg">{faq.question}</span>
                  <ChevronDown className={cn("w-5 h-5 text-pink-500 transition-transform duration-300", isOpen && "rotate-180")} />
                </button>
                <div 
                  className={cn(
                    "px-6 text-gray-400 overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
