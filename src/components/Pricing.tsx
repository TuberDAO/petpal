'use client';

const tiers = [
  {
    name: 'Free',
    description: 'Get started with basic health tracking',
    price: '$0',
    period: 'forever',
    features: [
      'Create and store pet profile',
      'Log weight and key info',
      'Health timeline over time',
      'Auto-populate log entries from photos',
      'User confirms AI suggestions',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Premium',
    description: 'Full AI-powered health insights',
    price: '$9.99',
    period: '/month',
    badge: '14-day free trial',
    features: [
      'Everything in Free, plus:',
      'Upload photos: face, stool, eyes, paws, fur, teeth/gums',
      'Optional short video: mobility/gait analysis',
      'Comprehensive AI health review across all signals',
      'Early warning alerts for potential issues',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Super Premium',
    description: 'Advanced monitoring with hardware kit',
    price: '$24.99',
    period: '/month',
    badge: 'Coming Soon',
    features: [
      'Everything in Premium, plus:',
      'Phone clip-on kit included',
      'Fundus lens for eye examination',
      'Dermascope for skin analysis',
      'Deeper visibility for advanced monitoring',
      'Monthly health reports',
    ],
    cta: 'Join Waitlist',
    highlighted: false,
  },
];

export default function Pricing() {
  const scrollToHero = () => {
    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start free and upgrade when you&apos;re ready for deeper insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 lg:p-8 ${
                tier.highlighted
                  ? 'bg-teal-600 text-white ring-4 ring-teal-600 ring-offset-2 scale-105 z-10'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {tier.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold ${
                    tier.highlighted
                      ? 'bg-yellow-400 text-yellow-900'
                      : 'bg-teal-100 text-teal-700'
                  }`}
                >
                  {tier.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.highlighted ? 'text-teal-100' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {tier.price}
                </span>
                <span className={`text-sm ${tier.highlighted ? 'text-teal-100' : 'text-gray-500'}`}>
                  {tier.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        tier.highlighted ? 'text-teal-200' : 'text-teal-500'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${tier.highlighted ? 'text-white' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToHero}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  tier.highlighted
                    ? 'bg-white text-teal-600 hover:bg-gray-100'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Early access members get Premium free for 14 days. No credit card required to start.
          </p>
        </div>
      </div>
    </section>
  );
}
