/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import { expectType, TypeEqual } from 'ts-expect';
import { AcceptedInputsArray, ConstrainInputsOverlapping, InferExpectedOutput } from '../src/index';

/**
 * AcceptedInputsArray
 */
expectType<
  TypeEqual<
    AcceptedInputsArray<[["number", number], ["string", string]]>,
    ["number", "string"]
  >
>(true);

expectType<
  TypeEqual<
    AcceptedInputsArray<[["number", number], ["string", string]]>,
    ["string", "number"]
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

/******/
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
 * ConstrainInputsOverlapping
 */
expectType<
  TypeEqual<
    ConstrainInputsOverlapping<
      [["number", number], ["string", string]],
      "number"
    >,
    never
  >
>(true);

expectType<
  TypeEqual<
    ConstrainInputsOverlapping<[["number", number], ["string", string]], "nmb">,
    unknown
  >
>(true);

expectType<
  TypeEqual<
    ConstrainInputsOverlapping<
      [[{ test: "test"; test2: "test2" }, number]],
      { test: "test" }
    >,
    unknown
  >
>(true);

expectType<
  TypeEqual<
    ConstrainInputsOverlapping<
      [[{ test: "test" }, number]],
      { test: "test"; test2: "test2" }
    >,
    never
  >
>(true);
