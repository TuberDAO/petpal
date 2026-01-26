import { z } from 'zod';

// Input length limits for security
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_COUNTRY_LENGTH = 100;
const MAX_UTM_LENGTH = 500;
const MAX_CLICK_ID_LENGTH = 500;

// Email validation with proper format checking
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(MAX_EMAIL_LENGTH, 'Email is too long')
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim();

// Phone validation (optional, basic format)
const phoneSchema = z
  .string()
  .max(MAX_PHONE_LENGTH, 'Phone number is too long')
  .regex(/^[\d\s\+\-\(\)]*$/, 'Invalid phone number format')
  .optional()
  .nullable()
  .transform((val) => val?.trim() || null);

// Country validation (optional)
const countrySchema = z
  .string()
  .max(MAX_COUNTRY_LENGTH, 'Country name is too long')
  .optional()
  .nullable()
  .transform((val) => val?.trim() || null);

// Pet type validation
const petTypeSchema = z
  .enum(['dog', 'cat', 'other'])
  .optional()
  .nullable();

// UTM parameter validation
const utmParamSchema = z
  .string()
  .max(MAX_UTM_LENGTH)
  .optional()
  .nullable()
  .transform((val) => val?.trim() || null);

// Click ID validation (gclid, fbclid)
const clickIdSchema = z
  .string()
  .max(MAX_CLICK_ID_LENGTH)
  .optional()
  .nullable()
  .transform((val) => val?.trim() || null);

// Honeypot field (should be empty for real users)
const honeypotSchema = z
  .string()
  .max(0, 'Invalid submission')
  .optional()
  .nullable();

// Main lead schema
export const leadSchema = z.object({
  email: emailSchema,
  phone: phoneSchema,
  country: countrySchema,
  pet_type: petTypeSchema,
  whatsapp_consent: z.boolean().default(false),
  
  // UTM parameters
  utm_source: utmParamSchema,
  utm_medium: utmParamSchema,
  utm_campaign: utmParamSchema,
  utm_content: utmParamSchema,
  utm_term: utmParamSchema,
  
  // Click IDs
  gclid: clickIdSchema,
  fbclid: clickIdSchema,
  
  // Honeypot - must be empty
  website: honeypotSchema,
});

export type LeadInput = z.infer<typeof leadSchema>;

export function validateLead(data: unknown) {
  return leadSchema.safeParse(data);
}
