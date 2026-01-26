'use client';

import { useState } from 'react';
import Link from 'next/link';

const navChips = [
  'Teeth Scan',
  'Stool Check',
  'Eye Check',
  'Skin & Coat',
  'Paws',
  'Mobility',
  'Health Timeline',
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToHero = () => {
    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container-narrow">
        {/* Top row - Logo and CTA */}
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-teal-600 rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-base font-bold text-gray-900">PetPal</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#how-it-works" className="text-xs text-gray-600 hover:text-teal-600 transition-colors">How it works</a>
            <a href="#features" className="text-xs text-gray-600 hover:text-teal-600 transition-colors">Features</a>
            <a href="#pricing" className="text-xs text-gray-600 hover:text-teal-600 transition-colors">Pricing</a>
            <a href="#faq" className="text-xs text-gray-600 hover:text-teal-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToHero}
              className="hidden sm:block btn-primary text-xs py-1.5 px-3"
            >
              Get Early Access
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Chip navigation - Desktop only on xl screens with more than 900px height */}
        <div className="hidden xl:flex items-center gap-1.5 pb-1.5 overflow-x-auto">
          {navChips.map((chip) => (
            <span
              key={chip}
              className="chip whitespace-nowrap text-[10px] py-1 px-2"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-teal-600 py-1.5">How it works</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-teal-600 py-1.5">Features</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-teal-600 py-1.5">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-teal-600 py-1.5">FAQ</a>
              <button onClick={scrollToHero} className="btn-primary text-sm py-2 mt-2">
                Get Early Access
              </button>
            </div>
            
            {/* Chip navigation - Mobile */}
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
              {navChips.map((chip) => (
                <span key={chip} className="chip text-[10px] py-0.5 px-1.5">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
