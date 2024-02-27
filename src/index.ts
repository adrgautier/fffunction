import { FFFArgument } from './classes';
import {
  FFFTuple,
  InferConditionalReturnFunction,
  InferDeclarationConstraint,
  InferFunctionOverload,
  InferImplementation,
} from './types';

class FFFunction<TTuples extends FFFTuple[] = []> {
  /**
   * Add new overload declaration.
   */
  f<
    TInput,
    TOutput extends InferDeclarationConstraint<TTuples, TInput>,
  >(): FFFunction<[...TTuples, [TInput, TOutput]]>;

  /**
   * Implement function.
   * @param implementation
   */
  f<TAdHoc extends boolean = false>(
    implementation: InferImplementation<TTuples>
  ): TAdHoc extends true
    ? InferFunctionOverload<TTuples>
    : InferConditionalReturnFunction<TTuples>;

  f(implementation?: InferImplementation<any>) {
    if (!implementation) {
      return new FFFunction() as any;
    }
    return (input: unknown) => {
      return implementation(new FFFArgument(input)).get();
    };
  }
}

export const fffunction = new FFFunction();
