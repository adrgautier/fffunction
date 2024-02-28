/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import { expectType, TypeEqual } from 'ts-expect';
import { FFFArgument, FFFOutput } from '../src/classes';

/**
 * FFFArgument
 */
{
  const fffArgument = new FFFArgument<any, void>(undefined);
  const fffOutput = fffArgument.output();
  expectType<FFFOutput<void>>(fffOutput);
  expectType<TypeEqual<FFFOutput<void>, typeof fffOutput>>(true);
}
{
  const fffArgument = new FFFArgument<any, string>(undefined);
  const fffOutput = fffArgument.output('anystring');
  expectType<FFFOutput<string>>(fffOutput);
  expectType<TypeEqual<FFFOutput<string>, typeof fffOutput>>(true);
}
{
  const fffArgument = new FFFArgument<any, 'string'>(undefined);
  // @ts-expect-error
  fffArgument.output('wrongstring');
  const fffOutput = fffArgument.output('string');
  expectType<TypeEqual<FFFOutput<string>, typeof fffOutput>>(false);
  expectType<TypeEqual<FFFOutput<'string'>, typeof fffOutput>>(true);
}
{
  const fffArgument = new FFFArgument<any, URL>(undefined);
  // @ts-expect-error
  fffArgument.output(new URLSearchParams());
  const fffOutput = fffArgument.output(new URL('https://adrgautier.co'));
  expectType<TypeEqual<FFFOutput<URL>, typeof fffOutput>>(true);
}
{
  expectType<TypeEqual<FFFArgument<string, any>['input'], string>>(true);
  expectType<TypeEqual<FFFArgument<'string', any>['input'], 'string'>>(true);
  expectType<TypeEqual<FFFArgument<URL, any>['input'], URL>>(true);
}
{
  expectType<
    TypeEqual<Parameters<FFFArgument<any, string>['output']>, [string]>
  >(true);
  expectType<
    TypeEqual<Parameters<FFFArgument<any, 'string'>['output']>, ['string']>
  >(true);
  expectType<TypeEqual<Parameters<FFFArgument<any, URL>['output']>, [URL]>>(
    true
  );
}
{
  expectType<
    TypeEqual<ReturnType<FFFArgument<any, string>['output']>, FFFOutput<string>>
  >(true);
  expectType<
    TypeEqual<
      ReturnType<FFFArgument<any, 'string'>['output']>,
      FFFOutput<'string'>
    >
  >(true);
  expectType<
    TypeEqual<ReturnType<FFFArgument<any, URL>['output']>, FFFOutput<URL>>
  >(true);
}

/**
 * FFFOutput
 */
{
  const fffOutput = new FFFOutput<void>(undefined);
  const value = fffOutput.get();
  expectType<void>(value);
  expectType<TypeEqual<void, typeof value>>(true);
}
{
  const fffOutput = new FFFOutput('string');
  const value = fffOutput.get();
  expectType<string>(value);
  expectType<TypeEqual<string, typeof value>>(true);
  expectType<TypeEqual<'string', typeof value>>(false);
}
{
  const fffOutput = new FFFOutput('string' as const);
  const value = fffOutput.get();
  expectType<'string'>(value);
  expectType<TypeEqual<'string', typeof value>>(true);
}
{
  const fffOutput = new FFFOutput(new URL('https://adrgautier.co'));
  const value = fffOutput.get();
  expectType<URL>(value);
  expectType<TypeEqual<URL, typeof value>>(true);
}
{
  expectType<TypeEqual<ReturnType<FFFOutput<void>['get']>, void>>(true);
  expectType<TypeEqual<ReturnType<FFFOutput<string>['get']>, string>>(true);
  expectType<TypeEqual<ReturnType<FFFOutput<'string'>['get']>, 'string'>>(true);
  expectType<TypeEqual<ReturnType<FFFOutput<URL>['get']>, URL>>(true);
}
