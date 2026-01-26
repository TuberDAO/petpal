'use client';

import Image from 'next/image';
import LeadForm from './LeadForm';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="bg-gradient-hero flex items-center"
    >
      <div className="container-narrow py-4 lg:py-6 xl:py-8">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          {/* Left side - Content and Form */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 badge badge-primary mb-2 lg:mb-3">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              Early Access Open
            </div>

            {/* Headline - compact sizes for above-fold fit */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-2 lg:mb-3">
              Know if it&apos;s serious,<br />
              <span className="text-teal-600">in under a minute.</span>
            </h1>

            {/* Subheadline - compact */}
            <p className="text-sm lg:text-base text-gray-600 mb-3 lg:mb-4 leading-relaxed max-w-lg">
              PetPal uses AI to analyze photos of your pet, spotting potential issues before they become emergencies. Build a weekly health timeline with zero typing.
            </p>

            {/* Lead Form - compact padding */}
            <div id="hero-form" className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-card max-w-md">
              <LeadForm variant="hero" showTabs={true} />
            </div>

            {/* Scarcity indicator - compact margin */}
            <div className="mt-2 lg:mt-3 flex items-center gap-3">
              <div className="flex-1 h-1.5 lg:h-2 bg-gray-200 rounded-full overflow-hidden max-w-xs">
                <div className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full" style={{ width: '62%' }}></div>
              </div>
              <span className="text-xs lg:text-sm text-gray-600 font-medium">312 / 500 spots claimed</span>
            </div>
          </div>

          {/* Right side - Hero Visual with premium treatment */}
          <div className="order-1 lg:order-2 relative hidden lg:flex items-center justify-center">
            {/* Teal accent blob behind the image */}
            <div 
              className="absolute -inset-4 xl:-inset-8 opacity-20 blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.4) 0%, rgba(13, 148, 136, 0.2) 40%, transparent 70%)',
              }}
            />
            
            {/* Glass card container */}
            <div className="relative w-full max-w-lg xl:max-w-xl">
              {/* Outer glass wrapper with rounded corners, shadow, and subtle border */}
              <div className="relative rounded-[24px] overflow-hidden bg-white/40 backdrop-blur-sm shadow-xl ring-1 ring-black/5">
                {/* Soft edge feather overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(248, 255, 254, 0.6) 85%, rgba(240, 253, 250, 0.9) 100%)',
                  }}
                />
                
                {/* Inner padding for visual breathing room */}
                <div className="p-2 xl:p-3">
                  <div className="relative rounded-[18px] overflow-hidden">
                    <Image
                      src="/images/hero-right.png"
                      alt="PetPal AI analyzing dog teeth with laptop showing dental health scan, mobile app, and AI analysis panel"
                      width={600}
                      height={450}
                      className="w-full h-auto object-contain"
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      quality={90}
                    />
                  </div>
                </div>
              </div>
              
              {/* Subtle reflection/glow at the bottom */}
              <div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 opacity-30 blur-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(20, 184, 166, 0.3), transparent)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
