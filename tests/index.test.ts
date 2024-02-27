import { P, match } from 'ts-pattern';
import { fffunction } from '../src/index';

describe('fffunction', () => {
  it('should return the correct value according to the input', () => {
    // Given
    const random = fffunction
      .f<'number', number>()
      .f<'string', string>()
      .f(({ input, output }) => {
        const randomNumber = Math.random();
        if (input === 'number') {
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
      .f<true>(a =>
        match(a)
          .with({ input: P.string }, ({ output }) => output('one'))
          .with({ input: P.number }, ({ output }) => output(1))
          .with({ input: P.symbol }, ({ output }) => output(Symbol()))
          .exhaustive()
      );

    // Then
    expect(typeof format(1000)).toBe('number');
    expect(typeof format('1000')).toBe('string');
    expect(typeof format(Symbol())).toBe('symbol');
  });

  it('should return the correct value according to the input (3)', () => {
    // Given
    const discriminate = fffunction
      .f<{ id: number, name: string }, 'profile'>()
      .f<{ id: number }, 'item'>()
      .f((a) => 
        match(a)
          .with({ input: { name: P.string } }, ({ output }) => output('profile'))
          .otherwise(({ output }) => output('item'))
      );

    // Then
    expect(discriminate({id: 1})).toBe('item');
    expect(discriminate({id: 2, name: 'test'})).toBe('profile');
  });

  it('should work with void return', () => {
    const poly = fffunction
    .f<'string', string>()
    .f<'void', void>()
    .f(({input, output}) => {
      if(input === 'string') {
        return output('test')
      }
      return output();
    });
    expect(typeof poly('void')).toBe('undefined');
    expect(typeof poly('string')).toBe('string');
  })
});
