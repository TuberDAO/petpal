import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client with service role key
// ONLY use this in API routes, never in client components
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export interface WaitlistLead {
  email: string;
  phone?: string | null;
  country?: string | null;
  pet_type?: string | null;
  whatsapp_consent: boolean;
  whatsapp_consent_at?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
}

export async function insertWaitlistLead(lead: WaitlistLead) {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('waitlist_leads')
    .insert([{
      ...lead,
      status: 'pending',
    }])
    .select('id')
    .single();

  if (error) {
    // Check for duplicate email
    if (error.code === '23505') {
      return { success: false, duplicate: true };
    }
    throw error;
  }

  return { success: true, id: data?.id, duplicate: false };
}
