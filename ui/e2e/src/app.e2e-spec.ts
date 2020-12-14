import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('ng2angle App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Angle in h1 tag', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Angle');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
