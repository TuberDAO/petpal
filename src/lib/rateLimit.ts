// Rate limiting scaffold
// Currently uses in-memory storage for development
// Can be easily upgraded to Upstash Redis for production

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Max requests per interval
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (replace with Upstash Redis for production)
const store = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL = 60000; // 1 minute
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  
  lastCleanup = now;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limit by identifier (e.g., IP address)
 * 
 * @param identifier - Unique identifier for the client (usually IP)
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status
 * 
 * To upgrade to Upstash Redis:
 * 1. Install @upstash/ratelimit and @upstash/redis
 * 2. Replace the in-memory store logic with:
 *    ```
 *    import { Ratelimit } from "@upstash/ratelimit";
 *    import { Redis } from "@upstash/redis";
 *    
 *    const ratelimit = new Ratelimit({
 *      redis: Redis.fromEnv(),
 *      limiter: Ratelimit.slidingWindow(config.limit, `${config.interval}ms`),
 *    });
 *    
 *    const result = await ratelimit.limit(identifier);
 *    ```
 */
export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60000, limit: 5 }
): Promise<RateLimitResult> {
  cleanup();
  
  const now = Date.now();
  const key = `rate_limit:${identifier}`;
  
  let entry = store.get(key);
  
  // Initialize or reset if expired
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 0,
      resetAt: now + config.interval,
    };
  }
  
  // Increment count
  entry.count++;
  store.set(key, entry);
  
  const remaining = Math.max(0, config.limit - entry.count);
  const success = entry.count <= config.limit;
  
  return {
    success,
    limit: config.limit,
    remaining,
    reset: entry.resetAt,
  };
}

/**
 * Get client identifier from request headers
 * Handles common proxy headers
 */
export function getClientIdentifier(headers: Headers): string {
  // Check common proxy headers
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP if there are multiple
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Vercel-specific header
  const vercelForwardedFor = headers.get('x-vercel-forwarded-for');
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(',')[0].trim();
  }
  
  // Fallback
  return 'unknown';
}
