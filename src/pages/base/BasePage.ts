import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected abstract path: string;

  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.waitForLoad();
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isLoaded(indicator: Locator): Promise<void> {
    await expect(indicator).toBeVisible();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}