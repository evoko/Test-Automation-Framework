import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * The "Biamp Workplace / Sign in or Register" landing screen.
 */
export class WelcomePage extends BasePage {
  protected path = '/';

  constructor(page: Page) {
    super(page);
  }

  get signInButton() {
    return this.page.getByRole('button', { name: 'Sign in or Register' });
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }
}