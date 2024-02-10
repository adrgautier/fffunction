import fffunction from '../src/index';

describe('fffunction', () => {
  it('should return the correct value according to the input', () => {
    // Given
    const random = fffunction
    .f<"number", number>()
    .f<"string", string>()
    .f(({ input, output }) => {
      const randomNumber = Math.random();
      if (input === "number") {
        return output(randomNumber);
      }
      return output(String(randomNumber));
    });

    // Then
    expect(typeof random('number')).toBe('number');
    expect(typeof random('string')).toBe('string');
  });
  it('should return the correct value according to the input (2)', () => {
    // Given
    const format = fffunction
    .f<string, string>()
    .f<number, number>()
    .f(({ input, output}) => {
      if(typeof input === 'string') {
        return output(input);
      }
      return output(input);
    });

    // Then
    expect(typeof format(1000)).toBe('number');
    expect(typeof format('1000')).toBe('string');
  });
});
