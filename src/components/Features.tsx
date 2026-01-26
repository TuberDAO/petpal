'use client';

const features = [
  {
    icon: '🛡️',
    title: 'Peace of mind fast',
    description: 'Instant triage-style guidance when you need it most.',
    color: 'bg-blue-50',
  },
  {
    icon: '⚠️',
    title: 'Early warning signals',
    description: 'Spot subtle changes over time that might go unnoticed.',
    color: 'bg-yellow-50',
  },
  {
    icon: '🦷',
    title: 'Teeth & Gums',
    description: 'Monitor dental health and catch plaque buildup early.',
    color: 'bg-purple-50',
  },
  {
    icon: '🔬',
    title: 'Gut health insights',
    description: 'Understand digestion through photo-based stool analysis.',
    color: 'bg-pink-50',
  },
  {
    icon: '✨',
    title: 'Skin & Coat',
    description: 'Track allergy signals, hotspots, and coat quality.',
    color: 'bg-yellow-50',
  },
  {
    icon: '🦴',
    title: 'Joint & Mobility',
    description: 'Monitor gait changes and joint health as they age.',
    color: 'bg-orange-50',
  },
  {
    icon: '⚖️',
    title: 'Overweight risk',
    description: 'Automated body condition scoring to prevent obesity.',
    color: 'bg-amber-50',
  },
  {
    icon: '🧬',
    title: 'Breed specific risks',
    description: "Personalized insights based on your pet's genetic traits.",
    color: 'bg-red-50',
  },
];

const callouts = [
  {
    icon: '🩺',
    title: 'Escalate to online vets',
    description: 'Get connected to a professional if PetPal detects something urgent.',
    color: 'bg-teal-50',
    textColor: 'text-teal-700',
  },
  {
    icon: '💚',
    title: 'Ethical recommendations',
    description: 'Science-backed guidance, not aggressive product pushing.',
    color: 'bg-teal-50',
    textColor: 'text-teal-700',
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Peace of mind for pet parents
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive monitoring for every stage of your pet&apos;s life.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${feature.color}`}
            >
              <span className="text-2xl mb-3 block">{feature.icon}</span>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Callout cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {callouts.map((callout, index) => (
            <div
              key={index}
              className={`${callout.color} rounded-xl p-6 flex items-start gap-4`}
            >
              <span className="text-2xl">{callout.icon}</span>
              <div>
                <h3 className={`font-semibold ${callout.textColor} mb-1`}>{callout.title}</h3>
                <p className={`text-sm ${callout.textColor} opacity-80`}>{callout.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            <strong>Important:</strong> PetPal provides educational insights only and is not a substitute for professional veterinary care. 
            For urgent symptoms or emergencies, please consult a veterinarian immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
