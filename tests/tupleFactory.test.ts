import { Checked } from '../src/classes';
import { tupleFactory } from '../src/tupleFactory';

describe('tupleFactory', () => {
  it('should create using given string value', () => {
    // GIVEN
    const arg = 'value';

    // WHEN
    const tuple = tupleFactory(arg);

    // THEN
    expect(tuple[1]).toBe(arg);
  });

  it('should create using given object value', () => {
    // GIVEN
    const arg = new URL('https://adrgautier.co');

    // WHEN
    const tuple = tupleFactory(arg);

    // THEN
    expect(tuple[1]).toBe(arg);
  });

  it('should create using multiple args', () => {
    // GIVEN
    const args = ['abc', 123];

    // WHEN
    const tuple = tupleFactory(...args);

    // THEN
    expect(tuple[1]).toBe(args[0]);
    expect(tuple[2]).toBe(args[1]);
  });

  test('tuple should provide the check method', () => {
    // GIVEN
    const arg = 'value';

    // WHEN
    const tuple = tupleFactory<[(i: any) => string]>(arg);

    // THEN
    expect(typeof tuple[0]).toBe('function');
    expect(tuple[0]('test') instanceof Checked).toBe(true);
  });

  test('provided check method works for void', () => {
    // GIVEN
    const arg = 'value';

    // WHEN
    const tuple = tupleFactory<[(i: any) => void]>(arg);
    const checked = tuple[0]();

    // THEN
    expect(checked instanceof Checked).toBe(true);
    expect(checked.get()).toBe(undefined);
  });
});
