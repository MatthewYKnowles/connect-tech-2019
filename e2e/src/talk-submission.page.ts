import {by, element} from 'protractor';

export class TalkSubmissionPage {
  setName(name: string): void {
    element(by.css('[data-test=name]')).sendKeys(name);
  }

  setEmail(email: string): void {
    element(by.css('[data-test=email]')).sendKeys(email);
  }

  setTitle(title: string): void {
    element(by.css('[data-test=submission-title]')).sendKeys(title);
  }

  submitTalk(): void {
    element(by.css('[data-test=submit]')).click();
  }

  getSuccessMessage(): Promise<string> {
      return element(by.css('[data-test=success-message]')).getText() as Promise<string>;
  }
}
