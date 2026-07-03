import { test as setup } from '@playwright/test';
import { VercelGatePage } from '../src/pages/auth/VercelGatePage';
import { WelcomePage } from '../src/pages/auth/WelcomePage';
import { LoginPage } from '../src/pages/auth/LoginPage';
import { generateTotpCode } from '../src/utils/totp';
import { env } from '../src/config/env.config';

const authFile = 'playwright/.auth/user.json';

/**
 * Full chain: Vercel gate -> welcome screen -> email -> password -> 2FA.
 * Runs once; every other test reuses the saved session via storageState
 * (see playwright.config.ts projects). Don't repeat this flow inside
 * individual specs.
 */
setup('authenticate', async ({ page }) => {
  await page.goto('/');

  // Step 1: Vercel deployment-protection gate (stage/preview only)
  const gate = new VercelGatePage(page);
  if (await gate.isShowing()) {
    await gate.unlock(env.vercelBypassPassword);
  }

  // Step 2: Biamp Workplace welcome screen
  const welcome = new WelcomePage(page);
  await welcome.clickSignIn();

  // Step 3: email + password on the IAM subdomain
  const loginPage = new LoginPage(page);
  await loginPage.enterEmail(env.user.email);
  await loginPage.enterPassword(env.user.password);

  // Step 4: 2FA — generate a fresh code right before using it
  const code = await generateTotpCode();
  await loginPage.enterTotpCode(code);

  // Confirm we actually landed back in the app before saving state
  await page.waitForURL(/workplace\.biamp\.app/, { timeout: 15_000 });
  await page.context().storageState({ path: authFile });
});