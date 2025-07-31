// biome-ignore-all lint/suspicious/noExplicitAny: use any for simpler tests
/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import { expectType, type TypeEqual, type TypeOf } from "ts-expect";
import type { Checked } from "../src/classes";
import type {
	InferAcceptedArgs,
	InferAcceptedReturnTypes,
	InferConditionalReturnFunction,
	InferDeclarationConstraint,
	InferExpectedReturnType,
	InferFunctionOverload,
	InferImplementation,
	InferImplementationTuple,
	InferLiteralDeclarationConstraint,
} from "../src/types";

/**
 * InferAcceptedInputs
 */

expectType<
	TypeEqual<
		InferAcceptedArgs<[(a: "number") => number, (a: "string") => string]>,
		["number"] | ["string"]
	>
>(true);

expectType<
	TypeEqual<
		InferAcceptedArgs<
			[(a1: "number", a2: number) => number, (a: "string") => string]
		>,
		["number", number] | ["string"]
	>
>(true);

expectType<
	TypeEqual<
		InferAcceptedArgs<[(a: "number") => number, (a: "string") => string]>,
		["number"] | ["symbol"]
	>
>(false);

/**
 * InferAcceptedReturnTypes
 */

expectType<
	TypeEqual<
		InferAcceptedReturnTypes<
			[(a: "number") => number, (a: "string") => string]
		>,
		number | string
	>
>(true);

expectType<
	TypeEqual<
		InferAcceptedReturnTypes<
			[(a: "number") => number, (a: "string") => string]
		>,
		number | symbol
	>
>(false);

/**
 * InferExpectedReturnType
 */

expectType<
	TypeEqual<
		InferExpectedReturnType<
			[(a: "number") => number, (a: "string") => string],
			["number"]
		>,
		number
	>
>(true);

expectType<
	TypeEqual<
		InferExpectedReturnType<
			[(a: "number") => number, (a: "string") => string],
			["string"]
		>,
		string
	>
>(true);

expectType<
	TypeEqual<
		InferExpectedReturnType<
			[
				(a: { test: "test"; test2: "test2" }) => string,
				(a: { test: "test" }) => number,
			],
			[{ test: "test" }]
		>,
		number
	>
>(true);

expectType<
	TypeEqual<
		InferExpectedReturnType<
			[
				(a: { test: "test"; test2: "test2" }) => string,
				(a: { test: "test" }) => number,
			],
			[{ test: "test"; test2: "test2" }]
		>,
		string
	>
>(true);

expectType<
	TypeEqual<
		InferExpectedReturnType<
			[
				(a: { type: "string"; value: number }) => string,
				(a: { type: "number"; value: number }) => number,
			],
			[{ type: "string"; value: number }]
		>,
		string
	>
>(true);

expectType<
	TypeEqual<
		InferExpectedReturnType<
			[(a: string) => string, (a: number) => number],
			[string]
		>,
		string
	>
>(true);

expectType<
	TypeEqual<
		InferExpectedReturnType<
			[(a: string) => string, (a: number) => number],
			[number]
		>,
		number
	>
>(true);

/**
 * InferDeclarationConstraint
 */

expectType<
	TypeEqual<
		InferDeclarationConstraint<
			[(a: "number") => any, (a: "string") => string],
			(a: "number") => number
		>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<
			[(a: "number") => any, (a: "string") => any],
			(a: "nmb") => number
		>,
		unknown
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<
			[(a: { test: "test"; test2: "test2" }) => any],
			(a: { test: "test" }) => any
		>,
		unknown
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<
			[(a: { test: "test" }) => any],
			(a: { test: "test"; test2: "test2" }) => any
		>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<
			[(a: string) => any],
			(a: `https://${string}`) => URL
		>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<
			[(a: `https://${string}`) => any],
			(a: string) => string
		>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<[(a: boolean) => any], (a: true) => any>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<[(a: boolean) => any], (a: false) => any>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<[(a: true) => any], (a: boolean) => any>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<[(a: false) => any], (a: boolean) => any>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferDeclarationConstraint<[(a: false) => any], (a: true) => any>,
		unknown
	>
>(true);

/**
 * InferLiteralDeclarationConstraint
 */

expectType<
	TypeEqual<
		InferLiteralDeclarationConstraint<[(a: false) => any], [boolean]>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferLiteralDeclarationConstraint<[(a: "string") => any], [string]>,
		never
	>
>(true);

expectType<
	TypeEqual<InferLiteralDeclarationConstraint<[(a: 1) => any], [number]>, never>
>(true);

expectType<
	TypeEqual<
		InferLiteralDeclarationConstraint<
			[(a0: 1, a1: "one") => any],
			[number, string]
		>,
		never
	>
>(true);

expectType<
	TypeEqual<
		InferLiteralDeclarationConstraint<
			[(a0: 1, a1: "one") => any],
			[string, number]
		>,
		never
	>
>(false);

expectType<
	TypeEqual<
		InferLiteralDeclarationConstraint<
			[(a0: 1, a1: "one") => any],
			[number, string, boolean]
		>,
		never
	>
>(false);

/**
 * InferConditionalReturnFunction
 */

expectType<
	TypeOf<
		(a: "number" | "string") => number | string,
		InferConditionalReturnFunction<
			[(a: "number") => number, (a: "string") => string]
		>
	>
>(true);

expectType<
	TypeEqual<
		ReturnType<
			InferConditionalReturnFunction<
				[(a: "number") => number, (a: "string") => string]
			>
		>,
		number | string
	>
>(true);

/**
 * InferFunctionOverload
 */

expectType<
	TypeEqual<
		InferFunctionOverload<[(a: "number") => number, (a: "string") => string]>,
		((a: "number") => number) & ((a: "string") => string)
	>
>(true);

/**
 * InferImplementationTuple
 */

expectType<
	TypeEqual<
		InferImplementationTuple<
			[(a: "number") => number, (a: "string") => string]
		>,
		| [(i: number) => Checked<number>, "number"]
		| [(i: string) => Checked<string>, "string"]
	>
>(true);

expectType<
	TypeEqual<
		InferImplementationTuple<
			[
				(a: { id: number; name: string }) => "profile",
				(a: { id: number }) => "item",
			]
		>,
		| [
				(i: "profile") => Checked<"profile">,
				{
					id: number;
					name: string;
				},
		  ]
		| [
				(i: "item") => Checked<"item">,
				{
					id: number;
				},
		  ]
	>
>(true);

/**
 * InferImplementation
 */
expectType<
	TypeEqual<
		InferImplementation<
			[
				(a: { id: number; name: string }) => "profile",
				(a: { id: number }) => "item",
			]
		>,
		(
			a:
				| [(i: "profile") => Checked<"profile">, { id: number; name: string }]
				| [(i: "item") => Checked<"item">, { id: number }],
		) => Checked<"profile" | "item">
	>
>(true);
