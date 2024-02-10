export type MorphTuple<
  TInput extends unknown = unknown,
  TOutput extends unknown = unknown
> = [TInput, TOutput];

export type AcceptedInputsArray<T extends unknown[]> = T extends MorphTuple[]
  ? {
      [K in keyof T]: T[K][0];
    }
  : never;

export type AcceptedOutputsArray<T extends unknown[]> = T extends MorphTuple[]
  ? {
      [K in keyof T]: T[K][1];
    }
  : never;

export type InferAcceptedInputs<T extends unknown[]> = T extends MorphTuple[]
  ? AcceptedInputsArray<T>[number]
  : never;

export type InferAcceptedOutputs<T extends unknown[]> = T extends MorphTuple[]
  ? AcceptedOutputsArray<T>[number]
  : never;

export type InferExpectedOutput<
  T extends unknown[],
  TInput extends InferAcceptedInputs<T>
> = T extends [[unknown, infer TPossibleOutput], ...infer TRest]
  ? TInput extends InferAcceptedInputs<TRest>
    ? InferExpectedOutput<TRest, TInput>
    : TPossibleOutput
  : never;

export type ConstrainInputsOverlapping<
  T extends MorphTuple[],
  TInput
> = TInput extends InferAcceptedInputs<T> ? never : unknown;

const _f = <T extends MorphTuple[] = never[]>() => {
  type AcceptedInputs = InferAcceptedInputs<T>;
  type AcceptedOutputs = InferAcceptedOutputs<T>;
  type ExpectedOutput<TInput extends AcceptedInputs> = InferExpectedOutput<
    T,
    TInput
  >;

  type TArg<TInput extends AcceptedInputs> = {
    input: TInput;
    output: (output: ExpectedOutput<TInput>) => ExpectedOutput<TInput>;
  };

  type TArgs<TInput extends AcceptedInputs = AcceptedInputs> =
    TInput extends AcceptedInputs ? TArg<TInput> : never;

  type TFunction = (
    arg: TArgs
  ) => AcceptedOutputs;

  function f<
    TInput,
    TOutput extends ConstrainInputsOverlapping<T, TInput>
  >(): ReturnType<
    typeof _f<
      T extends never[] ? [[TInput, TOutput]] : [...T, [TInput, TOutput]]
    >
  >;

  function f(
    fn: TFunction
  ): <TInput extends AcceptedInputs>(input: TInput) => ExpectedOutput<TInput>;

  function f<TInput, TOutput extends ConstrainInputsOverlapping<T, TInput>>(
    fn?: TFunction
  ) {
    if (!fn) {
      return _f<
        T extends never[] ? [[TInput, TOutput]] : [...T, [TInput, TOutput]]
      >();
    }
    return <TInput extends AcceptedInputs>(input: TInput) => {
      const arg: TArg<TInput> = {
        input,
        output: (output) => output,
      };
      return fn(arg as TArgs) as ExpectedOutput<TInput>;
    };
  }

  return { f };
};

const fffunction = Object.assign({}, _f());

export default fffunction;
