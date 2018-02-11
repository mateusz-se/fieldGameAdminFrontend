import { NotEmptyTeamPipe } from './not-empty-team.pipe';

describe('NotEmptyTeamPipe', () => {
  it('create an instance', () => {
    const pipe = new NotEmptyTeamPipe();
    expect(pipe).toBeTruthy();
  });
});
