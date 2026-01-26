'use client';

import LeadForm from './LeadForm';

export default function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-teal-50">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to give your pet the best care?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join the early access list and be among the first to experience AI-powered pet health monitoring.
          </p>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card">
            <LeadForm variant="full" showTabs={true} />
          </div>

          {/* Additional trust elements */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              14-day Premium free
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
