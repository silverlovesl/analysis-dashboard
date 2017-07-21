import { AnalysisDashboardPage } from './app.po';

describe('analysis-dashboard App', () => {
  let page: AnalysisDashboardPage;

  beforeEach(() => {
    page = new AnalysisDashboardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
