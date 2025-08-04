// biome-ignore-all lint/suspicious/noExplicitAny: use any for simpler tests
import { describe, expectTypeOf, test } from "vitest";
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

describe("Types - InferAcceptedArgs", () => {
	test("should infer accepted arguments correctly", () => {
		expectTypeOf<
			InferAcceptedArgs<[(a: "number") => number, (a: "string") => string]>
		>().toEqualTypeOf<["number"] | ["string"]>();

		expectTypeOf<
			InferAcceptedArgs<
				[(a1: "number", a2: number) => number, (a: "string") => string]
			>
		>().toEqualTypeOf<["number", number] | ["string"]>();

		expectTypeOf<
			InferAcceptedArgs<[(a: "number") => number, (a: "string") => string]>
		>().not.toEqualTypeOf<["number"] | ["symbol"]>();
	});
});

describe("Types - InferAcceptedReturnTypes", () => {
	test("should infer accepted return types correctly", () => {
		expectTypeOf<
			InferAcceptedReturnTypes<
				[(a: "number") => number, (a: "string") => string]
			>
		>().toEqualTypeOf<number | string>();

		expectTypeOf<
			InferAcceptedReturnTypes<
				[(a: "number") => number, (a: "string") => string]
			>
		>().not.toEqualTypeOf<number | symbol>();
	});
});

describe("Types - InferExpectedReturnType", () => {
	test("should infer expected return types for simple cases", () => {
		expectTypeOf<
			InferExpectedReturnType<
				[(a: "number") => number, (a: "string") => string],
				["number"]
			>
		>().toEqualTypeOf<number>();

		expectTypeOf<
			InferExpectedReturnType<
				[(a: "number") => number, (a: "string") => string],
				["string"]
			>
		>().toEqualTypeOf<string>();
	});

	test("should handle object-based matching", () => {
		expectTypeOf<
			InferExpectedReturnType<
				[
					(a: { test: "test"; test2: "test2" }) => string,
					(a: { test: "test" }) => number,
				],
				[{ test: "test" }]
			>
		>().toEqualTypeOf<number>();

		expectTypeOf<
			InferExpectedReturnType<
				[
					(a: { test: "test"; test2: "test2" }) => string,
					(a: { test: "test" }) => number,
				],
				[{ test: "test"; test2: "test2" }]
			>
		>().toEqualTypeOf<string>();

		expectTypeOf<
			InferExpectedReturnType<
				[
					(a: { type: "string"; value: number }) => string,
					(a: { type: "number"; value: number }) => number,
				],
				[{ type: "string"; value: number }]
			>
		>().toEqualTypeOf<string>();
	});

	test("should handle primitive type matching", () => {
		expectTypeOf<
			InferExpectedReturnType<
				[(a: string) => string, (a: number) => number],
				[string]
			>
		>().toEqualTypeOf<string>();

		expectTypeOf<
			InferExpectedReturnType<
				[(a: string) => string, (a: number) => number],
				[number]
			>
		>().toEqualTypeOf<number>();
	});
});

describe("Types - InferDeclarationConstraint", () => {
	test("should handle string literal constraints", () => {
		expectTypeOf<
			InferDeclarationConstraint<
				[(a: "number") => any, (a: "string") => string],
				(a: "number") => number
			>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferDeclarationConstraint<
				[(a: "number") => any, (a: "string") => any],
				(a: "nmb") => number
			>
		>().toEqualTypeOf<unknown>();
	});

	test("should handle object type constraints", () => {
		expectTypeOf<
			InferDeclarationConstraint<
				[(a: { test: "test"; test2: "test2" }) => any],
				(a: { test: "test" }) => any
			>
		>().toEqualTypeOf<unknown>();

		expectTypeOf<
			InferDeclarationConstraint<
				[(a: { test: "test" }) => any],
				(a: { test: "test"; test2: "test2" }) => any
			>
		>().toEqualTypeOf<never>();
	});

	test("should handle template literal constraints", () => {
		expectTypeOf<
			InferDeclarationConstraint<
				[(a: string) => any],
				(a: `https://${string}`) => URL
			>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferDeclarationConstraint<
				[(a: `https://${string}`) => any],
				(a: string) => string
			>
		>().toEqualTypeOf<never>();
	});

	test("should handle boolean type constraints", () => {
		expectTypeOf<
			InferDeclarationConstraint<[(a: boolean) => any], (a: true) => any>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferDeclarationConstraint<[(a: boolean) => any], (a: false) => any>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferDeclarationConstraint<[(a: true) => any], (a: boolean) => any>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferDeclarationConstraint<[(a: false) => any], (a: boolean) => any>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferDeclarationConstraint<[(a: false) => any], (a: true) => any>
		>().toEqualTypeOf<unknown>();
	});
});

describe("Types - InferLiteralDeclarationConstraint", () => {
	test("should handle single literal constraints", () => {
		expectTypeOf<
			InferLiteralDeclarationConstraint<[(a: false) => any], [boolean]>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferLiteralDeclarationConstraint<[(a: "string") => any], [string]>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferLiteralDeclarationConstraint<[(a: 1) => any], [number]>
		>().toEqualTypeOf<never>();
	});

	test("should handle multiple parameter constraints", () => {
		expectTypeOf<
			InferLiteralDeclarationConstraint<
				[(a0: 1, a1: "one") => any],
				[number, string]
			>
		>().toEqualTypeOf<never>();

		expectTypeOf<
			InferLiteralDeclarationConstraint<
				[(a0: 1, a1: "one") => any],
				[string, number]
			>
		>().not.toEqualTypeOf<never>();

		expectTypeOf<
			InferLiteralDeclarationConstraint<
				[(a0: 1, a1: "one") => any],
				[number, string, boolean]
			>
		>().not.toEqualTypeOf<never>();
	});
});

describe("Types - InferConditionalReturnFunction", () => {
	test("should infer conditional return function correctly", () => {
		expectTypeOf<
			InferConditionalReturnFunction<
				[(a: "number") => number, (a: "string") => string]
			>
		>().toExtend<(a: "number" | "string") => number | string>();

		expectTypeOf<
			InferConditionalReturnFunction<
				[(a: "number") => number, (a: "string") => string]
			>
		>().returns.toEqualTypeOf<number | string>();
	});
});

describe("Types - InferFunctionOverload", () => {
	test("should infer function overload correctly", () => {
		expectTypeOf<
			InferFunctionOverload<[(a: "number") => number, (a: "string") => string]>
		>().toEqualTypeOf<((a: "number") => number) & ((a: "string") => string)>();
	});
});

describe("Types - InferImplementationTuple", () => {
	test("should infer implementation tuple for simple types", () => {
		expectTypeOf<
			InferImplementationTuple<
				[(a: "number") => number, (a: "string") => string]
			>
		>().toEqualTypeOf<
			| [(i: number) => Checked<number>, "number"]
			| [(i: string) => Checked<string>, "string"]
		>();
	});

	test("should infer implementation tuple for object types", () => {
		expectTypeOf<
			InferImplementationTuple<
				[
					(a: { id: number; name: string }) => "profile",
					(a: { id: number }) => "item",
				]
			>
		>().toEqualTypeOf<
			| [(i: "profile") => Checked<"profile">, { id: number; name: string }]
			| [(i: "item") => Checked<"item">, { id: number }]
		>();
	});
});

describe("Types - InferImplementation", () => {
	test("should infer implementation function correctly", () => {
		expectTypeOf<
			InferImplementation<
				[
					(a: { id: number; name: string }) => "profile",
					(a: { id: number }) => "item",
				]
			>
		>().toEqualTypeOf<
			(
				a:
					| [(i: "profile") => Checked<"profile">, { id: number; name: string }]
					| [(i: "item") => Checked<"item">, { id: number }],
			) => Checked<"profile" | "item">
		>();
	});
});
