'use client';

export default function MidPageCTA() {
  const scrollToHero = () => {
    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
      <div className="container-narrow text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Join thousands of proactive pet parents
        </h2>
        <p className="text-teal-100 mb-8 max-w-xl mx-auto">
          Get early access to AI-powered health insights for your furry family members.
          First 500 members get Premium free for 14 days.
        </p>
        <button
          onClick={scrollToHero}
          className="bg-white text-teal-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
        >
          Get Early Access
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
