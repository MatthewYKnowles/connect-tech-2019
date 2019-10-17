import {AppPage} from './app.po';
import {browser, logging} from 'protractor';
import {TalkSubmissionPage} from './talk-submission.page';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('connect-tech app is running!');
  });

  it('should submit a talk for Connect Tech 2020', () => {
    const talkSubmissionPage: TalkSubmissionPage = page.navigateToTalkSubmission();
    talkSubmissionPage.setName('Matthew Knowles');
    talkSubmissionPage.setEmail('matthewyknowles@gmail.com');
    talkSubmissionPage.setTitle('Test Drive an Angular App');
    talkSubmissionPage.submitTalk();
    expect(talkSubmissionPage.getSuccessMessage()).toEqual('Matthew, thanks for your submission on Test Drive an Angular App');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
