import { P, match } from 'ts-pattern';
import { fffunction } from '../src/index';

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
    .f<symbol, symbol>()
    .f<true>((a) => (
      match(a)
        .with({input: P.string}, ({ output }) => output("one"))
        .with({input: P.number}, ({ output }) => output(1))
        .with({input: P.symbol}, ({ output }) => output(Symbol()))
        .exhaustive()
    ));

    // Then  
    expect(typeof format(1000)).toBe('number');
    expect(typeof format('1000')).toBe('string');
    expect(typeof format(Symbol())).toBe('symbol');
  });
});
