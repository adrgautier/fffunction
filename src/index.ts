import { FFFArgument } from "./classes";
import { FFFTuple, InferConditionalReturnFunction, InferDeclarationConstraint, InferFunctionOverload, InferImplementation } from "./types";

class FFFunction <TTuples extends FFFTuple[] = []> {
  /**
   * Add new overload declaration.
   */
  f<
    TInput,
    TOutput extends InferDeclarationConstraint<TTuples, TInput>
  >(): FFFunction<
      TTuples extends [] ? [[TInput, TOutput]] : [...TTuples, [TInput, TOutput]]>;

  /**
   * Implement function.
   * @param implementation 
   */
  f<T extends false>(
    implementation: InferImplementation<TTuples>
  ): InferConditionalReturnFunction<TTuples>;

  /**
   * Implement function.
   * @param implementation 
   */
   f<T extends true>(
    implementation: InferImplementation<TTuples>
  ): InferFunctionOverload<TTuples>;

   f(
    implementation?: InferImplementation<any>
  ) {
    if (!implementation) {
      return new FFFunction as any;
    }
    return (input: unknown) => {
      return implementation(new FFFArgument(input)).get();
    };
  }
};

/**
 * FFFunction
 */
export const fffunction = new FFFunction();
