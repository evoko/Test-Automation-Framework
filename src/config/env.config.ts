export const env = {
  baseUrl: required('BASE_URL'),
  apiBaseUrl: process.env.API_BASE_URL || required('BASE_URL') + '/api',
  user: {
    email: required('TEST_USER_EMAIL'),
    password: required('TEST_USER_PASSWORD'),
  },
  
  vercelBypassPassword: process.env.VERCEL_BYPASS_PASSWORD || '',
  // Base32 secret behind the Authenticator app — used to generate live TOTP
  // codes instead of relying on a phone. Get it from your MFA setup screen
  // under "can't scan the QR code? enter this key manually".
  totpSecret: required('TOTP_SECRET'),
  isCI: !!process.env.CI,
  environment: process.env.TEST_ENV || 'stage',
};

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable "${key}". Check your .env.${process.env.TEST_ENV || 'stage'} file.`
    );
  }
  return value;
}