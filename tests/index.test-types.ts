// biome-ignore-all lint/suspicious/noExplicitAny: use any for simpler tests
/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import { expectType, type TypeEqual } from "ts-expect";
import { fffunction } from "../src";

/**
 * fffunction
 */

fffunction
	.f<(a: string) => { test2: "test2" }>()
	.f<(b: number) => { test: "test" }>()
	.f(function implementation([check]) {
		return check({ test: "test", test2: "test2" });
	});

fffunction
	.f<(a: string) => string>()
	// @ts-expect-error
	.f<(b: string) => number>();

fffunction
	.f<(a: `https://${string}`) => URL>()
	// @ts-expect-error
	.f<(b: string) => string>();

fffunction
	.f<(a: "string") => string>()
	.f<(a: "void") => void>()
	.f(([check, arg]) => {
		if (arg === "string") {
			return check("test");
		}
		return check();
	});

const overload = fffunction
	.f<(a: "string") => string>()
	.f<(b: "number") => number>()
	.f<"overload">((() => {}) as any);

expectType<((i: "string") => string) & ((i: "number") => number)>(overload);

expectType<
	TypeEqual<
		typeof overload,
		((i: "string") => string) & ((i: "number") => number)
	>
>(true);

const conditional = fffunction
	.f<(a: "string") => string>()
	.f<(b: "number") => number>()
	.f((() => {}) as any);

expectType<((i: "string") => string) & ((i: "number") => number)>(conditional);

expectType<
	TypeEqual<
		typeof conditional,
		((i: "string") => string) & ((i: "number") => number)
	>
>(false);
