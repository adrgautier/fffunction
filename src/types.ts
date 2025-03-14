import type { Checked } from "./classes";

type Literal = string | number | boolean;

/**
 * AnySignature
 */
// biome-ignore lint/suspicious/noExplicitAny: intended for inference logic
export type AnySignature = (...args: any) => any;

/**
 * ToNonGeneric
 *
 * @description Convert a generic signature to a non-generic one.
 */
type ToNonGeneric<T extends AnySignature> = (
	...args: Parameters<T>
) => ReturnType<T>;

/**
 * IsGeneric
 *
 * @description Check if a signature is generic.
 */
type IsGeneric<T extends AnySignature> = T | ToNonGeneric<T> extends T &
	ToNonGeneric<T>
	? false
	: true;

/**
 * InferAcceptedArgs
 *
 * @description Infers accepted arguments from all signatures.
 */
export type InferAcceptedArgs<TSignatures extends AnySignature[]> =
	TSignatures extends AnySignature[] ? Parameters<TSignatures[number]> : never;

/**
 * InferAcceptedReturnTypes
 *
 * @description Infers possible return types from all signatures.
 */
export type InferAcceptedReturnTypes<TSignatures extends AnySignature[]> =
	TSignatures extends (infer TSignature extends AnySignature)[]
		? ReturnType<TSignature>
		: never;

/**
 * InferMatchingSignature
 *
 * @description Infers the signature matching the arguments type.
 */
export type InferMatchingSignature<
	TSignatures extends AnySignature[],
	TArgs extends InferAcceptedArgs<TSignatures>,
> = TSignatures extends [
	...infer TSignaturesRest extends AnySignature[],
	infer TSignature extends AnySignature,
]
	? TArgs extends InferAcceptedArgs<TSignaturesRest>
		? InferMatchingSignature<TSignaturesRest, TArgs>
		: TSignature
	: never;

/**
 * InferExpectedReturnType
 *
 * @description Infers the expected return type according to the arguments type.
 */
export type InferExpectedReturnType<
	TSignatures extends AnySignature[],
	TArgs extends InferAcceptedArgs<TSignatures>,
> = ReturnType<InferMatchingSignature<TSignatures, TArgs>>;

/**
 * InferDeclarationConstraint
 *
 * @description Infers the "constraint" type to be extended by the return type.
 * Depending on declaration order, the overlapping can be unauthorized.
 * A specific order must be respected in order for InferExpectedReturnType to work.
 */
export type InferDeclarationConstraint<
	TSignatures extends AnySignature[],
	TNewSignature extends AnySignature,
	TNewArgs = Parameters<TNewSignature>, // somehow boolean becomes false, use a copy to bypass this issue
> = IsGeneric<TNewSignature> extends true
	? never
	: TNewArgs extends InferAcceptedArgs<TSignatures>
		? never
		: TNewArgs extends Literal[]
			? InferLiteralDeclarationConstraint<TSignatures, TNewArgs>
			: unknown;

/**
 * InferLiteralDeclarationConstraint
 *
 * @description Infers the "constraint" type to be extended by the return type.
 * This constraint prevents Literals overlap.
 */
export type InferLiteralDeclarationConstraint<
	TSignatures extends AnySignature[],
	TNewArgs extends Literal[],
> = TSignatures extends [
	infer TSignature extends AnySignature,
	...infer TSignaturesRest extends AnySignature[],
]
	? Exclude<Parameters<TSignature>, TNewArgs> extends never
		? never
		: InferLiteralDeclarationConstraint<TSignaturesRest, TNewArgs>
	: unknown;

/**
 * InferConditionalReturnFunction
 *
 * @description Infers the final signature of the polymorphic function.
 * This signature rely on a conditional return.
 * This signature is returned in "default" mode.
 */
export type InferConditionalReturnFunction<TSignatures extends AnySignature[]> =
	<TArgs extends InferAcceptedArgs<TSignatures>>(
		...args: TArgs
	) => InferExpectedReturnType<TSignatures, TArgs>;

/**
 * InferConditionalSignature
 */
export type InferNew<TSignatures extends AnySignature[]> = <
	TArg extends InferAcceptedArgs<TSignatures>[0],
>(
	arg: TArg,
) => InferAcceptedArgs<TSignatures> extends [any]
	? InferNewCycle<TSignatures, TArg>
	: never;

export type InferNewCycle<
	TSignatures extends AnySignature[],
	TArg extends any,
> = TSignatures extends [
	infer TSignature extends AnySignature,
	...infer TSignaturesRest extends AnySignature[],
]
	? TArg extends Parameters<TSignature>[0]
		? ReturnType<TSignature>
		: InferNewCycle<TSignaturesRest, TArg>
	: never;

/**
 * InferFunctionOverload
 *
 * @description Infers the final signature of the polymorphic function.
 * This signature rely on function overloading.
 * This signature is returned in "ad hoc" mode.
 */
export type InferFunctionOverload<
	TSignatures extends AnySignature[],
	TFunctionOverload = unknown,
> = TSignatures extends [
	infer TSignature extends AnySignature,
	...infer TSignaturesRest extends AnySignature[],
]
	? InferFunctionOverload<TSignaturesRest, TFunctionOverload & TSignature>
	: TFunctionOverload;

/**
 * InferImplementationArgument
 *
 * @description Infers the type of the argument given to the implementation function.
 */
export type InferImplementationTuple<
	TSignatures extends AnySignature[],
	TArgs = InferAcceptedArgs<TSignatures>,
> = TArgs extends InferAcceptedArgs<TSignatures>
	? [
			(
				i: InferExpectedReturnType<TSignatures, TArgs>,
			) => Checked<InferExpectedReturnType<TSignatures, TArgs>>,
			...TArgs,
		]
	: never;

/**
 * InferImplementation
 *
 * @description Infers the type of the implementation function.
 */
export type InferImplementation<TSignatures extends AnySignature[]> = (
	tuple: InferImplementationTuple<TSignatures>,
) => Checked<InferAcceptedReturnTypes<TSignatures>>;
