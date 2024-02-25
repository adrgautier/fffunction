import type { FFFArgument, FFFOutput } from "./classes";

export type FFFTuple<
  TInput extends unknown = unknown,
  TOutput extends unknown = unknown
> = [TInput, TOutput];

export type InferAcceptedInputs<TTuples extends unknown[]> = TTuples extends FFFTuple[]
  ? TTuples[number][0]
  : never;

export type InferAcceptedOutputs<TTuples extends unknown[]> = TTuples extends FFFTuple[]
? TTuples[number][1]
: never;

export type InferExpectedOutput<
  TTuples extends unknown[],
  TInput extends InferAcceptedInputs<TTuples>
> = TTuples extends [[unknown, infer TPossibleOutput], ...infer TTuplesRest]
  ? TInput extends InferAcceptedInputs<TTuplesRest>
    ? InferExpectedOutput<TTuplesRest, TInput>
    : TPossibleOutput
  : never;

/**
 * Depending on declaration order, the overlapping can be unauthorized.
 * A specific order must be respected in order for InferExpectedOutput to work.
 */
export type InferDeclarationConstraint<
  TTuples extends FFFTuple[],
  TInput
> = TInput extends InferAcceptedInputs<TTuples> ? never : unknown;

export type InferConditionalReturnFunction<TTuples extends FFFTuple[]> = 
<TInput extends InferAcceptedInputs<TTuples>>(input: TInput) => InferExpectedOutput<TTuples, TInput>;


export type InferImplementationArgument<TTuples extends FFFTuple[], TInput = InferAcceptedInputs<TTuples>> = 
    TInput extends InferAcceptedInputs<TTuples> ? FFFArgument<TInput, InferExpectedOutput<TTuples, TInput>> : never;



export type InferImplementation<TTuples extends FFFTuple[]> = (
    arg: InferImplementationArgument<TTuples>
  ) => FFFOutput<InferAcceptedOutputs<TTuples>>;


  export type InferFunctionOverload<TTuples extends unknown[], TFunctionOverload = unknown> =
    TTuples extends [[infer TInput, infer TOutput], ...infer TTuplesRest] ? 
        InferFunctionOverload<TTuplesRest, TFunctionOverload & ((input: TInput) => TOutput)> : 
    TFunctionOverload;
