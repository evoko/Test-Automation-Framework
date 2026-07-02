import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Vercel's "Authentication Required" visitor-password gate.
 * Only appears on stage/preview deployments, never on prod — so
 * every caller checks isShowing() first instead of assuming it's there.
 */
export class VercelGatePage extends BasePage {
  protected path = '/';

  constructor(page: Page) {
    super(page);
  }

  get passwordInput() {
    return this.page.getByPlaceholder('Visitor password');
  }

  get unlockButton() {
    return this.page.getByRole('button', { name: 'Unlock' });
  }

  async isShowing(): Promise<boolean> {
    return this.passwordInput.isVisible({ timeout: 3000 }).catch(() => false);
  }

  async unlock(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.unlockButton.click();
  }
}