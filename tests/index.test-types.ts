/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import { expectType, TypeEqual } from 'ts-expect';
import { fffunction } from '../src';

/**
 * fffunction
 */

fffunction
  .f<string, { test2: 'test2' }>()
  .f<number, { test: 'test' }>()
  .f(function implementation({ input, output }) {
    return output({ test: 'test', test2: 'test2' });
  });

fffunction
  .f<string, string>()
  // @ts-expect-error
  .f<string, number>();

fffunction
  .f<`https://${string}`, URL>()
  // @ts-expect-error
  .f<string, string>();

fffunction
  .f<'string', string>()
  .f<'void', void>()
  .f(({ input, output }) => {
    if (input === 'string') {
      return output('test');
    }
    return output();
  });

const overload = fffunction
  .f<'string', string>()
  .f<'number', number>()
  .f<true>((() => {}) as any);

expectType<((i: 'string') => string) & ((i: 'number') => number)>(overload);

expectType<
  TypeEqual<
    typeof overload,
    ((i: 'string') => string) & ((i: 'number') => number)
  >
>(true);

const conditional = fffunction
  .f<'string', string>()
  .f<'number', number>()
  .f((() => {}) as any);

expectType<((i: 'string') => string) & ((i: 'number') => number)>(conditional);

expectType<
  TypeEqual<
    typeof conditional,
    ((i: 'string') => string) & ((i: 'number') => number)
  >
>(false);
