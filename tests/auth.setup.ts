import { test as setup } from '@playwright/test';
import { VercelGatePage } from '../src/pages/auth/VercelGatePage';
import { WelcomePage } from '../src/pages/auth/WelcomePage';
import { LoginPage } from '../src/pages/auth/LoginPage';
import { env } from '../src/config/env.config';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/');

  const gate = new VercelGatePage(page);
  if (await gate.isShowing()) {
    await gate.unlock(env.vercelBypassPassword);
  }

  const welcome = new WelcomePage(page);
  await welcome.clickSignIn();

  const loginPage = new LoginPage(page);
  await loginPage.enterEmail(env.user.email);
  await loginPage.enterPassword(env.user.password);

  await page.waitForURL(/workplace\.biamp\.app/, { timeout: 15_000 });
  await page.context().storageState({ path: authFile });
});