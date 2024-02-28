import type { FFFArgument, FFFOutput } from './classes';

type Literal = string | number | boolean;

/**
 * FFFTuple
 *
 * @description Describes a single signature of a polymorphic function.
 */
export type FFFTuple<
  TInput extends unknown = unknown,
  TOutput extends unknown = unknown,
> = [TInput, TOutput];

/**
 * InferAcceptedInputs
 *
 * @description Infers accepted inputs from all signatures.
 */
export type InferAcceptedInputs<TTuples extends unknown[]> =
  TTuples extends FFFTuple[] ? TTuples[number][0] : never;

/**
 * InferAcceptedOutputs
 *
 * @description Infers possible outputs from all signatures.
 */
export type InferAcceptedOutputs<TTuples extends unknown[]> =
  TTuples extends FFFTuple[] ? TTuples[number][1] : never;

/**
 * InferExpectedOutput
 *
 * @description Infers the expected output according to the input type.
 */
export type InferExpectedOutput<
  TTuples extends unknown[],
  TInput extends InferAcceptedInputs<TTuples>,
> = TTuples extends [...infer TTuplesRest, [unknown, infer TPossibleOutput]]
  ? TInput extends InferAcceptedInputs<TTuplesRest>
    ? InferExpectedOutput<TTuplesRest, TInput>
    : TPossibleOutput
  : never;

/**
 * InferDeclarationConstraint
 *
 * @description Infers the "constraint" type to be extended by the output.
 * Depending on declaration order, the overlapping can be unauthorized.
 * A specific order must be respected in order for InferExpectedOutput to work.
 */
export type InferDeclarationConstraint<
  TTuples extends unknown[],
  TInput extends unknown,
  TInputCopy = TInput, // somehow boolean becomes false, use a copy to bypass this issue
> =
  TInput extends InferAcceptedInputs<TTuples>
    ? never
    : TInput extends Literal
      ? InferLiteralDeclarationConstraint<TTuples, TInputCopy>
      : unknown;

/**
 * InferLiteralDeclarationConstraint
 *
 * @description Infers the "constraint" type to be extended by the output.
 * This constraint prevents Literals overlap.
 */
export type InferLiteralDeclarationConstraint<
  TTuples extends unknown[],
  TNewInput,
> = TTuples extends [[infer TDeclaredInput, unknown], ...infer TTuplesRest]
  ? Exclude<TDeclaredInput, TNewInput> extends never
    ? never
    : InferLiteralDeclarationConstraint<TTuplesRest, TNewInput>
  : unknown;

/**
 * InferConditionalReturnFunction
 *
 * @description Infers the final signature of the polymorphic function.
 * This signature rely on a conditional return.
 * This signature is returned in "default" mode.
 */
export type InferConditionalReturnFunction<TTuples extends FFFTuple[]> = <
  TInput extends InferAcceptedInputs<TTuples>,
>(
  input: TInput
) => InferExpectedOutput<TTuples, TInput>;

/**
 * InferFunctionOverload
 *
 * @description Infers the final signature of the polymorphic function.
 * This signature rely on function overloading.
 * This signature is returned in "ad hoc" mode.
 */
export type InferFunctionOverload<
  TTuples extends unknown[],
  TFunctionOverload = unknown,
> = TTuples extends [[infer TInput, infer TOutput], ...infer TTuplesRest]
  ? InferFunctionOverload<
      TTuplesRest,
      TFunctionOverload & ((input: TInput) => TOutput)
    >
  : TFunctionOverload;

/**
 * InferImplementationArgument
 *
 * @description Infers the type of the argument given to the implementation function.
 */
export type InferImplementationArgument<
  TTuples extends FFFTuple[],
  TInput = InferAcceptedInputs<TTuples>,
> =
  TInput extends InferAcceptedInputs<TTuples>
    ? FFFArgument<TInput, InferExpectedOutput<TTuples, TInput>>
    : never;

/**
 * InferImplementation
 *
 * @description Infers the type of the implementation function.
 */
export type InferImplementation<TTuples extends FFFTuple[]> = (
  arg: InferImplementationArgument<TTuples>
) => FFFOutput<InferAcceptedOutputs<TTuples>>;
