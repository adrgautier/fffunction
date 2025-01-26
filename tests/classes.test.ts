import { Checked } from '../src/classes';

describe('Checked', () => {
  it('should instantiate using given string value', () => {
    // GIVEN
    const input = 'value';

    // WHEN
    const checked = new Checked(input);

    // THEN
    expect(checked.get()).toBe(input);
  });

  it('should instantiate using given object value', () => {
    // GIVEN
    const input = new URL('https://adrgautier.co');

    // WHEN
    const checked = new Checked(input);

    // THEN
    expect(checked.get()).toBe(input);
  });
});
