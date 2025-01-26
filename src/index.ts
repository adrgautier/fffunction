import { tupleFactory } from './tupleFactory';
import {
  AnySignature,
  InferAcceptedArgs,
  InferConditionalReturnFunction,
  InferDeclarationConstraint,
  InferFunctionOverload,
  InferImplementation,
} from './types';

class FFFunction<TSignatures extends AnySignature[] = []> {
  /**
   * Add new signature declaration.
   * @example
   * fffunction
   *    .f<(a: 'string') => string>()
   *    .f<(b: 'number') => number>()
   */
  f<
    TSignature extends (
      ...args: any
    ) => InferDeclarationConstraint<TSignatures, TSignature>,
  >(): FFFunction<[...TSignatures, TSignature]>;

  /**
   * Implement function.
   * @example
   * .f(([_check, arg]) => {
   *     if (arg === 'string') {
   *       return _check(uuidv4());
   *     }
   *     return _check(Math.random());
   *   });
   */
  f<TMode extends 'overload' | 'condition' = 'condition'>(
    implementation: InferImplementation<TSignatures>
  ): TMode extends 'overload'
    ? InferFunctionOverload<TSignatures>
    : InferConditionalReturnFunction<TSignatures>;

  f(implementation?: InferImplementation<TSignatures>) {
    if (!implementation) {
      return new FFFunction() as any;
    }
    return (...args: InferAcceptedArgs<TSignatures>) => {
      return implementation(tupleFactory<TSignatures>(...args)).get();
    };
  }
}

export const fffunction = new FFFunction();
