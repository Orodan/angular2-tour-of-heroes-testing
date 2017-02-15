import { Angular2TestingGuidePage } from './app.po';

describe('angular2-testing-guide App', function() {
  let page: Angular2TestingGuidePage;

  beforeEach(() => {
    page = new Angular2TestingGuidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
