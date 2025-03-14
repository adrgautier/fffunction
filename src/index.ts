import { tupleFactory } from './tupleFactory';
import {
  AnySignature,
  InferConditionalReturnFunction,
  InferDeclarationConstraint,
  InferFunctionOverload,
  InferImplementation,
} from './types';

type FFFunction<TSignatures extends AnySignature[] = []> = {
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
};

export const fffunction: FFFunction<[]> = {
  f(implementation?: any) {
    if (!implementation) {
      return this as any;
    }
    return (...args: any[]) => {
      return implementation(tupleFactory(...args)).get();
    };
  }
}

