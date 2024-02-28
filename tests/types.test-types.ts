/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import { expectType, TypeEqual, TypeOf } from 'ts-expect';
import {
  FFFTuple,
  InferAcceptedInputs,
  InferAcceptedOutputs,
  InferConditionalReturnFunction,
  InferDeclarationConstraint,
  InferExpectedOutput,
  InferFunctionOverload,
  InferImplementation,
  InferImplementationArgument,
  InferLiteralDeclarationConstraint,
} from '../src/types';
import { FFFArgument, FFFOutput } from '../src/classes';

/**
 * FFFTuple
 */

expectType<TypeEqual<FFFTuple<'number', number>, ['number', number]>>(true);

expectType<TypeEqual<FFFTuple<'string', string>, ['string', string]>>(true);

expectType<TypeEqual<FFFTuple<URL, void>, [URL, void]>>(true);

/**
 * InferAcceptedInputs
 */

expectType<
  TypeEqual<
    InferAcceptedInputs<[['number', number], ['string', string]]>,
    'number' | 'string'
  >
>(true);

expectType<
  TypeEqual<
    InferAcceptedInputs<[['number', number], ['string', string]]>,
    'number' | 'symbol'
  >
>(false);

/**
 * InferAcceptedOutputs
 */

expectType<
  TypeEqual<
    InferAcceptedOutputs<[['number', number], ['string', string]]>,
    number | string
  >
>(true);

expectType<
  TypeEqual<
    InferAcceptedOutputs<[['number', number], ['string', string]]>,
    number | symbol
  >
>(false);

/**
 * InferExpectedOutput
 */

expectType<
  TypeEqual<
    InferExpectedOutput<[['number', number], ['string', string]], 'number'>,
    number
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<[['number', number], ['string', string]], 'string'>,
    string
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<
      [[{ test: 'test'; test2: 'test2' }, string], [{ test: 'test' }, number]],
      { test: 'test' }
    >,
    number
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<
      [[{ test: 'test'; test2: 'test2' }, string], [{ test: 'test' }, number]],
      { test: 'test'; test2: 'test2' }
    >,
    string
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<
      [
        [{ type: 'string'; value: number }, string],
        [{ type: 'number'; value: number }, number],
      ],
      { type: 'string'; value: number }
    >,
    string
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<[[string, string], [number, number]], string>,
    string
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<[[string, string], [number, number]], number>,
    number
  >
>(true);

/**
 * InferDeclarationConstraint
 */

expectType<
  TypeEqual<
    InferDeclarationConstraint<[['number', any], ['string', string]], 'number'>,
    never
  >
>(true);

expectType<
  TypeEqual<
    InferDeclarationConstraint<[['number', any], ['string', any]], 'nmb'>,
    unknown
  >
>(true);

expectType<
  TypeEqual<
    InferDeclarationConstraint<
      [[{ test: 'test'; test2: 'test2' }, any]],
      { test: 'test' }
    >,
    unknown
  >
>(true);

expectType<
  TypeEqual<
    InferDeclarationConstraint<
      [[{ test: 'test' }, any]],
      { test: 'test'; test2: 'test2' }
    >,
    never
  >
>(true);

expectType<
  TypeEqual<
    InferDeclarationConstraint<[[string, any]], `https://${string}`>,
    never
  >
>(true);

expectType<
  TypeEqual<
    InferDeclarationConstraint<[[`https://${string}`, any]], string>,
    never
  >
>(true);

expectType<
  TypeEqual<InferDeclarationConstraint<[[boolean, any]], true>, never>
>(true);

expectType<
  TypeEqual<InferDeclarationConstraint<[[boolean, any]], false>, never>
>(true);

expectType<
  TypeEqual<InferDeclarationConstraint<[[true, any]], boolean>, never>
>(true);

expectType<
  TypeEqual<InferDeclarationConstraint<[[false, any]], boolean>, never>
>(true);

expectType<
  TypeEqual<InferDeclarationConstraint<[[false, any]], true>, unknown>
>(true);

/**
 * InferLiteralDeclarationConstraint
 */

expectType<
  TypeEqual<InferLiteralDeclarationConstraint<[[false, any]], boolean>, never>
>(true);

expectType<
  TypeEqual<InferLiteralDeclarationConstraint<[['string', any]], string>, never>
>(true);

expectType<
  TypeEqual<InferLiteralDeclarationConstraint<[[1, any]], number>, never>
>(true);

/**
 * InferConditionalReturnFunction
 */

expectType<
  TypeOf<
    (i: 'number' | 'string') => number | string,
    InferConditionalReturnFunction<[['number', number], ['string', string]]>
  >
>(true);

expectType<
  TypeEqual<
    ReturnType<
      InferConditionalReturnFunction<[['number', number], ['string', string]]>
    >,
    number | string
  >
>(true);

/**
 * InferFunctionOverload
 */

expectType<
  TypeEqual<
    InferFunctionOverload<[['number', number], ['string', string]]>,
    ((i: 'number') => number) & ((i: 'string') => string)
  >
>(true);

/**
 * InferImplementationArgument
 */

expectType<
  TypeEqual<
    InferImplementationArgument<[['number', number], ['string', string]]>,
    FFFArgument<'number', number> | FFFArgument<'string', string>
  >
>(true);

expectType<
  TypeEqual<
    InferImplementationArgument<
      [[{ id: number; name: string }, 'profile'], [{ id: number }, 'item']]
    >,
    | FFFArgument<{ id: number; name: string }, 'profile'>
    | FFFArgument<{ id: number }, 'item'>
  >
>(true);

/**
 * InferImplementation
 */

expectType<
  TypeEqual<
    InferImplementation<
      [[{ id: number; name: string }, 'profile'], [{ id: number }, 'item']]
    >,
    (
      a:
        | FFFArgument<{ id: number; name: string }, 'profile'>
        | FFFArgument<{ id: number }, 'item'>
    ) => FFFOutput<'profile' | 'item'>
  >
>(true);
