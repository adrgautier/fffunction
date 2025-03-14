import { tupleFactory } from "./tupleFactory";
import type {
	AnySignature,
	InferConditionalReturnFunction,
	InferDeclarationConstraint,
	InferFunctionOverload,
	InferImplementation,
	InferNew,
} from "./types";

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
			// biome-ignore lint/suspicious/noExplicitAny: intended for inference logic
			...args: any
		) => InferDeclarationConstraint<TSignatures, TSignature>,
	>(): FFFunction<[...TSignatures, TSignature]>;

	/**
	 * Implement function.
	 * @example
	 * .f(([check, arg]) => {
	 *     if (arg === 'string') {
	 *       return check(uuidv4());
	 *     }
	 *     return check(Math.random());
	 *   });
	 */
	f<TMode extends "overload" | "condition" = "condition">(
		implementation: InferImplementation<TSignatures>,
	): TMode extends "overload"
		? InferFunctionOverload<TSignatures>
		: InferConditionalReturnFunction<TSignatures>;
} & InferNew<TSignatures>;

// @ts-expect-error
// biome-ignore-start lint/suspicious/noExplicitAny: type safety not needed for runtime logic
export const fffunction: FFFunction<[]> = {
	f(implementation?: any) {
		if (!implementation) {
			return this as any;
		}
		return (...args: any[]) => {
			return implementation(tupleFactory(...args)).get();
		};
	},
};
// biome-ignore-end lint/suspicious/noExplicitAny: type safety not needed for runtime logic
