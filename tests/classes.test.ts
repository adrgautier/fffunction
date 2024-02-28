import { FFFArgument, FFFOutput } from '../src/classes';

describe('FFFArgument', () => {
  it('should instantiate using given string value', () => {
    // GIVEN
    const input = 'value';

    // WHEN
    const fffArgument = new FFFArgument(input);

    // THEN
    expect(fffArgument.input).toBe(input);
  });

  it('should instantiate using given object value', () => {
    // GIVEN
    const input = new URL('https://adrgautier.co');

    // WHEN
    const fffArgument = new FFFArgument(input);

    // THEN
    expect(fffArgument.input).toBe(input);
  });

  test('instance should provide the output method', () => {
    // GIVEN
    const input = 'value';

    // WHEN
    const fffArgument = new FFFArgument(input);

    // THEN
    expect(typeof fffArgument.output).toBe('function');
    expect(fffArgument.output('test') instanceof FFFOutput).toBe(true);
  });

  test('provided output method works for void', () => {
    // GIVEN
    const input = 'value';

    // WHEN
    const fffArgument = new FFFArgument<any, void>(input);
    const fffOutput = fffArgument.output();

    // THEN
    expect(fffOutput instanceof FFFOutput).toBe(true);
    expect(fffOutput.get()).toBe(undefined);
  });
});

describe('FFFOutput', () => {
  it('should instantiate using given string value', () => {
    // GIVEN
    const input = 'value';

    // WHEN
    const fffOutput = new FFFOutput(input);

    // THEN
    expect(fffOutput.get()).toBe(input);
  });

  it('should instantiate using given object value', () => {
    // GIVEN
    const input = new URL('https://adrgautier.co');

    // WHEN
    const fffOutput = new FFFOutput(input);

    // THEN
    expect(fffOutput.get()).toBe(input);
  });
});
