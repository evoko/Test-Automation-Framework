import { generate } from 'otplib';
import { env } from '../config/env.config';

/**
 * Generates a live 6-digit TOTP code from the same secret your
 * Authenticator app uses. Codes rotate every 30s, so always call
 * this right before you need to type it in — don't generate early
 * and reuse. otplib v13 is async-first, hence the Promise return.
 */
export async function generateTotpCode(): Promise<string> {
  return generate({ secret: env.totpSecret });
}