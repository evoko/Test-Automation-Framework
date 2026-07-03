import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { VercelGatePage } from '../pages/auth/VercelGatePage';
import { WelcomePage } from '../pages/auth/WelcomePage';

/**
 * Add one line here per new Page Object. Every spec file imports
 * `test`/`expect` from this file (not from '@playwright/test' directly)
 * so all page objects are available without manual `new Page(page)`
 * boilerplate in every single test.
 */
type Fixtures = {
  loginPage: LoginPage;
  vercelGatePage: VercelGatePage;
  welcomePage: WelcomePage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  vercelGatePage: async ({ page }, use) => {
    await use(new VercelGatePage(page));
  },
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  }
});

export { expect } from '@playwright/test';