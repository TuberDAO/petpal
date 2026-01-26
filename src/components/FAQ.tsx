'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Is PetPal a replacement for my veterinarian?',
    answer: 'No. PetPal is designed to be a helpful companion tool for proactive pet health monitoring, but it is not a replacement for professional veterinary care. Our AI provides educational insights and early warning signals to help you stay informed about your pet\'s health. For any concerning symptoms, diagnosis, or treatment, please always consult with a licensed veterinarian.',
  },
  {
    question: 'How accurate is the AI analysis?',
    answer: 'Our AI has been trained on thousands of pet health images and is designed to identify potential patterns and changes that may warrant attention. However, it\'s important to understand that AI analysis provides informational guidance, not medical diagnosis. The accuracy varies depending on image quality and the specific condition. We recommend using PetPal as a screening tool to help you decide when to seek professional care.',
  },
  {
    question: 'Which pets are supported?',
    answer: 'We\'re launching with support for dogs and cats, as they make up the vast majority of household pets. We\'re actively working on expanding to other pets including rabbits, birds, and small mammals. Join our waitlist and let us know what pets you have - it helps us prioritize our roadmap!',
  },
  {
    question: 'When will PetPal launch?',
    answer: 'We\'re currently in early access with limited availability. Early access members are being onboarded in batches to ensure a great experience. Join the waitlist to secure your spot - the first 500 members get Premium free for 14 days!',
  },
  {
    question: 'How is my data protected?',
    answer: 'Privacy is a top priority. Your pet photos and health data are encrypted and stored securely. We never sell your personal information to third parties. You can delete your data at any time. We only use anonymized, aggregated data to improve our AI models, and you can opt out of this as well.',
  },
  {
    question: 'What do early access members get?',
    answer: 'Early access members get exclusive perks: 14 days of Premium free (no credit card required), priority access to new features, direct feedback channel to our team, and locked-in pricing when we launch publicly. Plus, you\'ll be helping shape the future of pet health monitoring!',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-gray-50">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about PetPal.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
