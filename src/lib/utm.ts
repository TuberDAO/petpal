// UTM and click ID parameter parser

export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
}

/**
 * Parse UTM and click ID parameters from URL search params
 */
export function parseUtmParams(searchParams: URLSearchParams): UtmParams {
  return {
    utm_source: searchParams.get('utm_source'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
    utm_content: searchParams.get('utm_content'),
    utm_term: searchParams.get('utm_term'),
    gclid: searchParams.get('gclid'),
    fbclid: searchParams.get('fbclid'),
  };
}

/**
 * Parse UTM params from URL string
 */
export function parseUtmFromUrl(url: string): UtmParams {
  try {
    const urlObj = new URL(url);
    return parseUtmParams(urlObj.searchParams);
  } catch {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      gclid: null,
      fbclid: null,
    };
  }
}

/**
 * Client-side hook helper to get UTM params from window.location
 * Call this in a useEffect or client component
 */
export function getUtmParamsFromWindow(): UtmParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      gclid: null,
      fbclid: null,
    };
  }
  
  return parseUtmParams(new URLSearchParams(window.location.search));
}

/**
 * Store UTM params in sessionStorage for persistence during session
 */
export function storeUtmParams(params: UtmParams): void {
  if (typeof window === 'undefined') return;
  
  // Only store non-null values
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== null)
  );
  
  if (Object.keys(filtered).length > 0) {
    sessionStorage.setItem('petpal_utm', JSON.stringify(filtered));
  }
}

/**
 * Retrieve stored UTM params from sessionStorage
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      gclid: null,
      fbclid: null,
    };
  }
  
  try {
    const stored = sessionStorage.getItem('petpal_utm');
    if (!stored) {
      return {
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_content: null,
        utm_term: null,
        gclid: null,
        fbclid: null,
      };
    }
    
    const parsed = JSON.parse(stored);
    return {
      utm_source: parsed.utm_source || null,
      utm_medium: parsed.utm_medium || null,
      utm_campaign: parsed.utm_campaign || null,
      utm_content: parsed.utm_content || null,
      utm_term: parsed.utm_term || null,
      gclid: parsed.gclid || null,
      fbclid: parsed.fbclid || null,
    };
  } catch {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      gclid: null,
      fbclid: null,
    };
  }
}
