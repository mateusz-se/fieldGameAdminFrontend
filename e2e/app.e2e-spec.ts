import { GroupProjectAngularPage } from './app.po';

describe('group-project-angular App', () => {
  let page: GroupProjectAngularPage;

  beforeEach(() => {
    page = new GroupProjectAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
