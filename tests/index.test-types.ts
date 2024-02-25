/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import { expectType, TypeEqual } from 'ts-expect';
import { InferDeclarationConstraint, InferExpectedOutput, InferAcceptedInputs, InferImplementationArgument, InferFunctionOverload } from '../src/types';
import type { FFFArgument } from '../src/classes';

/**
 * InferImplementationArgument
 */
expectType<
  TypeEqual<
    InferImplementationArgument<[["number", number], ["string", string]]>,
    FFFArgument<"number", number> | FFFArgument<"string", string>
>>(true);


/**
 * InferFunctionOverload
 */
expectType<
  TypeEqual<
  InferFunctionOverload<[["number", number], ["string", string]]>,
    ((i: "number") => number) & ((i: "string") => string)
  >
>(true);


/**
 * InferAcceptedInputs
 */
expectType<
  TypeEqual<
  InferAcceptedInputs<[["number", number], ["string", string]]>,
    "number" | "string"
  >
>(true);

expectType<
  TypeEqual<
  InferAcceptedInputs<[["number", number], ["string", string]]>,
    "number" | "symbol"
  >
>(false);

/**
 * InferExpectedOutput
 */

expectType<
  TypeEqual<
    InferExpectedOutput<[["number", number], ["string", string]], "number">,
    number
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<[["number", number], ["string", string]], "string">,
    string
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<
      [[{ test: "test"; test2: "test2" }, string], [{ test: "test" }, number]],
      { test: "test" }
    >,
    number
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<
      [[{ type: "string"; value: number }, string], [{ type: "number"; value: number }, number]],
      { type: "string"; value: number }
    >,
    string
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<
      [[string, string], [number, number]],
      string
    >,
    string
  >
>(true);

expectType<
  TypeEqual<
    InferExpectedOutput<
      [[string, string], [number, number]],
      number
    >,
    number
  >
>(true);

/**
 * InferDeclarationConstraint
 */
expectType<
  TypeEqual<
  InferDeclarationConstraint<
      [["number", number], ["string", string]],
      "number"
    >,
    never
  >
>(true);

expectType<
  TypeEqual<
  InferDeclarationConstraint<[["number", number], ["string", string]], "nmb">,
    unknown
  >
>(true);

expectType<
  TypeEqual<
  InferDeclarationConstraint<
      [[{ test: "test"; test2: "test2" }, number]],
      { test: "test" }
    >,
    unknown
  >
>(true);

expectType<
  TypeEqual<
  InferDeclarationConstraint<
      [[{ test: "test" }, number]],
      { test: "test"; test2: "test2" }
    >,
    never
  >
>(true);
