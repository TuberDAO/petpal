import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | PetPal',
  description: 'PetPal Terms of Service - Rules and guidelines for using our service.',
};

export default function TermsPage() {
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
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: January 2026</p>

          <p>
            Welcome to PetPal. By accessing or using our service, you agree to be bound by these 
            Terms of Service.
          </p>

          <h2>Important Medical Disclaimer</h2>
          <p>
            <strong>
              PetPal provides educational insights only and is NOT a substitute for professional 
              veterinary care. Our AI analysis is for informational purposes only and should not 
              be considered medical diagnosis or advice.
            </strong>
          </p>
          <p>
            For any concerning symptoms, health emergencies, or medical decisions regarding your pet, 
            please consult with a licensed veterinarian immediately. Never delay seeking professional 
            care based on information from PetPal.
          </p>

          <h2>Service Description</h2>
          <p>
            PetPal is an AI-powered pet health monitoring service that helps pet owners track 
            and understand potential health signals through photo analysis. Our service is 
            designed to complement, not replace, professional veterinary care.
          </p>

          <h2>User Responsibilities</h2>
          <p>
            By using PetPal, you agree to:
          </p>
          <ul>
            <li>Provide accurate information about yourself and your pets</li>
            <li>Use the service for its intended purpose only</li>
            <li>Not rely solely on PetPal for medical decisions</li>
            <li>Seek professional veterinary care when needed</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            PetPal and its affiliates shall not be liable for any direct, indirect, incidental, 
            special, consequential, or punitive damages resulting from your use of or inability 
            to use the service.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at:{' '}
            <a href="mailto:legal@petpal.ai">legal@petpal.ai</a>
          </p>
        </article>
      </div>
    </main>
  );
}
