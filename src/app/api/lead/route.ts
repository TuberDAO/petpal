import { NextRequest, NextResponse } from 'next/server';
import { validateLead } from '@/lib/validators';
import { insertWaitlistLead } from '@/lib/supabaseServer';
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request.headers);
    const rateLimitResult = await rateLimit(clientId, {
      interval: 60000, // 1 minute
      limit: 5, // 5 requests per minute
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validateLead(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          }))
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check honeypot - if filled, it's likely a bot
    // Return success to avoid bot learning, but don't actually store
    if (data.website && data.website.length > 0) {
      // Log nothing about this to avoid exposing our honeypot detection
      return NextResponse.json(
        { success: true, message: "You're on the list! We'll be in touch soon." },
        { status: 200 }
      );
    }

    // Prepare lead data (exclude honeypot field)
    const leadData = {
      email: data.email,
      phone: data.phone || null,
      country: data.country || null,
      pet_type: data.pet_type || null,
      whatsapp_consent: data.whatsapp_consent,
      whatsapp_consent_at: data.whatsapp_consent ? new Date().toISOString() : null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_content: data.utm_content || null,
      utm_term: data.utm_term || null,
      gclid: data.gclid || null,
      fbclid: data.fbclid || null,
    };

    // Insert into database
    const result = await insertWaitlistLead(leadData);

    if (result.duplicate) {
      return NextResponse.json(
        { 
          success: true, 
          duplicate: true,
          message: "You're already on the list! We'll be in touch soon." 
        },
        { status: 200 }
      );
    }

    if (!result.success) {
      // Log server-side only, don't expose internal errors
      console.error('Failed to insert lead');
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "You're on the list! We'll be in touch soon." 
      },
      { status: 201 }
    );

  } catch (error) {
    // Log error server-side only (without sensitive data)
    console.error('API Error:', error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// Reject other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
