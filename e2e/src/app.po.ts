import { browser, by, element } from 'protractor';
import {TalkSubmissionPage} from './talk-submission.page';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('[data-test=title]')).getText() as Promise<string>;
  }

  navigateToTalkSubmission(): TalkSubmissionPage {
    element(by.css('[data-test=talk-submission]')).click();
    return new TalkSubmissionPage();
  }
}
