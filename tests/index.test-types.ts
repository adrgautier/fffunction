// biome-ignore-all lint/suspicious/noExplicitAny: use any for simpler tests
import { describe, expectTypeOf, test } from "vitest";
import { fffunction } from "../src";

describe("fffunction - Type Tests", () => {
	test("should handle basic function composition", () => {
		const result = fffunction
			.f<(a: string) => { test2: "test2" }>()
			.f<(b: number) => { test: "test" }>()
			.f(function implementation([check]) {
				return check({ test: "test", test2: "test2" });
			});

		expectTypeOf(result).toBeFunction();
	});

	test("should reject incompatible function signatures", () => {
		fffunction
			.f<(a: string) => string>()
			// @ts-expect-error
			.f<(b: string) => number>();

		fffunction
			.f<(a: `https://${string}`) => URL>()
			// @ts-expect-error
			.f<(b: string) => string>();
	});

	test("should handle void returns correctly", () => {
		const result = fffunction
			.f<(a: "string") => string>()
			.f<(a: "void") => void>()
			.f(([check, arg]) => {
				if (arg === "string") {
					return check("test");
				}
				return check();
			});

		expectTypeOf(result).toBeFunction();
	});

	test("should create proper function overload", () => {
		const overload = fffunction
			.f<(a: "string") => string>()
			.f<(b: "number") => number>()
			.f<"overload">((() => {}) as any);

		expectTypeOf(overload).toExtend<
			((i: "string") => string) & ((i: "number") => number)
		>();
		expectTypeOf(overload).toEqualTypeOf<
			((i: "string") => string) & ((i: "number") => number)
		>();
	});

	test("should differentiate conditional return vs function overload", () => {
		const conditional = fffunction
			.f<(a: "string") => string>()
			.f<(b: "number") => number>()
			.f((() => {}) as any);

		// The conditional return type extends the function overload but is not exactly equal to it
		expectTypeOf(conditional).toExtend<
			((i: "string") => string) & ((i: "number") => number)
		>();
		expectTypeOf(conditional).not.toEqualTypeOf<
			((i: "string") => string) & ((i: "number") => number)
		>();
	});
});
