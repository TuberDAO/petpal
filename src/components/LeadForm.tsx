'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getUtmParamsFromWindow, storeUtmParams, getStoredUtmParams, UtmParams } from '@/lib/utm';

interface LeadFormProps {
  variant?: 'hero' | 'compact' | 'full';
  showTabs?: boolean;
}

type FormTab = 'email' | 'whatsapp';

interface FormState {
  email: string;
  phone: string;
  country: string;
  petType: string;
  whatsappConsent: boolean;
  website: string; // honeypot
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  duplicate?: boolean;
}

export default function LeadForm({ variant = 'hero', showTabs = true }: LeadFormProps) {
  const [activeTab, setActiveTab] = useState<FormTab>('email');
  const [utmParams, setUtmParams] = useState<UtmParams | null>(null);
  const [formState, setFormState] = useState<FormState>({
    email: '',
    phone: '',
    country: '',
    petType: '',
    whatsappConsent: false,
    website: '', // honeypot
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });

  // Capture UTM params on mount
  useEffect(() => {
    const params = getUtmParamsFromWindow();
    const hasParams = Object.values(params).some(v => v !== null);
    
    if (hasParams) {
      storeUtmParams(params);
      setUtmParams(params);
    } else {
      // Try to get stored params from session
      const stored = getStoredUtmParams();
      setUtmParams(stored);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formState.email) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    setStatus({ type: 'loading', message: '' });

    try {
      const payload = {
        email: formState.email,
        phone: formState.phone || null,
        country: formState.country || null,
        pet_type: formState.petType || null,
        whatsapp_consent: formState.whatsappConsent,
        website: formState.website, // honeypot
        ...(utmParams || {}),
      };

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setStatus({ type: 'error', message: 'Too many attempts. Please try again in a minute.' });
        } else if (data.details) {
          setStatus({ type: 'error', message: data.details[0]?.message || 'Please check your input.' });
        } else {
          setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
        }
        return;
      }

      setStatus({ 
        type: 'success', 
        message: data.message,
        duplicate: data.duplicate,
      });
      
      // Reset form on success
      setFormState({
        email: '',
        phone: '',
        country: '',
        petType: '',
        whatsappConsent: false,
        website: '',
      });
    } catch {
      setStatus({ type: 'error', message: 'Connection failed. Please try again.' });
    }
  };

  if (status.type === 'success') {
    return (
      <div className={`bg-teal-50 border border-teal-200 rounded-lg p-3 text-center ${variant === 'compact' ? 'py-2' : ''}`}>
        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-1.5">
          <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
          {status.duplicate ? "You're already on the list!" : "You're in!"}
        </h3>
        <p className="text-gray-600 text-xs">{status.message}</p>
      </div>
    );
  }

  const isCompact = variant === 'compact';
  const isHero = variant === 'hero';
  const isFull = variant === 'full';

  return (
    <form onSubmit={handleSubmit} className={isHero ? 'space-y-2' : 'space-y-4'}>
      {/* Tabs - only show if showTabs is true */}
      {showTabs && (
        <div className={`flex bg-gray-100 rounded-md p-0.5 ${isHero ? 'mb-2' : 'mb-4'}`}>
          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded text-xs font-medium transition-all ${
              activeTab === 'email' ? 'tab-active text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded text-xs font-medium transition-all ${
              activeTab === 'whatsapp' ? 'tab-active text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
        </div>
      )}

      {/* Email field - always required */}
      <div>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
          maxLength={254}
          className={`input-field ${isHero ? 'py-2 text-sm' : ''}`}
        />
      </div>

      {/* Phone field - show in WhatsApp tab or full variant */}
      {(activeTab === 'whatsapp' || isFull) && (
        <div>
          <input
            type="tel"
            name="phone"
            value={formState.phone}
            onChange={handleInputChange}
            placeholder="WhatsApp number (optional)"
            maxLength={20}
            className={`input-field ${isHero ? 'py-2 text-sm' : ''}`}
          />
        </div>
      )}

      {/* Additional fields for full variant */}
      {isFull && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="country"
              value={formState.country}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Country (optional)</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="ES">Spain</option>
              <option value="IT">Italy</option>
              <option value="NL">Netherlands</option>
              <option value="OTHER">Other</option>
            </select>
            
            <select
              name="petType"
              value={formState.petType}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Pet type (optional)</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
          </div>
        </>
      )}

      {/* WhatsApp consent checkbox - show in WhatsApp tab */}
      {(activeTab === 'whatsapp' || isFull) && (
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="whatsappConsent"
            checked={formState.whatsappConsent}
            onChange={handleInputChange}
            className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="text-xs text-gray-600 leading-tight">
            I agree to be contacted on WhatsApp about early access and updates.
          </span>
        </label>
      )}

      {/* Honeypot field - hidden from real users */}
      <input
        type="text"
        name="website"
        value={formState.website}
        onChange={handleInputChange}
        tabIndex={-1}
        autoComplete="off"
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          opacity: 0, 
          height: 0, 
          width: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Error message */}
      {status.type === 'error' && (
        <div className="bg-red-50 text-red-600 text-xs py-1.5 px-2 rounded">
          {status.message}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status.type === 'loading'}
        className={`w-full btn-primary ${isCompact || isHero ? 'py-2 text-sm' : 'py-3'}`}
      >
        {status.type === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Joining...
          </span>
        ) : (
          'Join the early access list'
        )}
      </button>

      {/* Microcopy - compact */}
      <p className={`${isHero ? 'text-[10px]' : 'text-xs'} text-gray-500 text-center leading-tight`}>
        <span className="text-teal-600 font-medium">First 500 get Premium free for 14 days.</span>
        {' '}No spam. Your details are never sold.
      </p>
    </form>
  );
}
