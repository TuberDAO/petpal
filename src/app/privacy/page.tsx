import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | PetPal',
  description: 'PetPal Privacy Policy - How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container-narrow py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <article className="prose prose-gray max-w-none bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: January 2026</p>

          <p>
            At PetPal, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our service.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as:
          </p>
          <ul>
            <li>Email address (required for waitlist signup)</li>
            <li>Phone number (optional, for WhatsApp notifications)</li>
            <li>Country (optional)</li>
            <li>Pet type (optional)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Send you early access updates and notifications</li>
            <li>Communicate with you about our services</li>
            <li>Improve and develop our products</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Data Protection</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect 
            your personal information. Your data is encrypted in transit and at rest.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of your data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:privacy@petpal.ai">privacy@petpal.ai</a>
          </p>
        </article>
      </div>
    </main>
  );
}
