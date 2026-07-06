import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Lives on stage.iam.workplace.biamp.app — a different subdomain than
 * the main app, so this page is reached via navigation from
 * WelcomePage, not via its own goto().
 *
 * Three sequential steps, confirmed against screenshots up to the
 * email step. Password/2FA selectors below are best-guess placeholders
 * — run `npx playwright codegen https://stage.workplace.biamp.app`,
 * click through to those screens, and update the two TODOs.
 */
export class LoginPage extends BasePage {
  protected path = '/ui/login/login';

  constructor(page: Page) {
    super(page);
  }

  // --- Step 1: email (confirmed from screenshot) ---
  get emailInput() {
    return this.page.getByPlaceholder('username@domain');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get nextButton() {
    return this.page.getByRole('button', { name: 'Next' });
  }

  // --- Step 2: password (TODO — confirm selector via codegen) ---
  get passwordInput() {
    return this.page.getByLabel(/password/i);
  }

  // --- Step 3: 2FA code (TODO — confirm selector via codegen) ---
  get totpInput() {
    return this.page.getByLabel(/verification code|authentication code/i);
  }

  get verifyButton() {
    return this.page.getByRole('button', { name: /verify|submit|continue/i });
  }

  get errorMessage() {
    return this.page.getByRole('alert');
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.loginButton.click();
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.nextButton.click();
  }

  async enterTotpCode(code: string): Promise<void> {
    await this.totpInput.fill(code);
    await this.verifyButton.click();
  }
}