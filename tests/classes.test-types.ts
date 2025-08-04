import { describe, expectTypeOf, test } from "vitest";
import { Checked } from "../src/classes";

describe("Checked - Type Tests", () => {
	test("void type handling", () => {
		const checked = new Checked<void>(undefined);
		const value = checked.get();
		expectTypeOf(value).toExtend<void>();
		expectTypeOf(value).toEqualTypeOf<void>();
	});

	test("string type handling", () => {
		const checked = new Checked("string");
		const value = checked.get();
		expectTypeOf(value).toExtend<string>();
		expectTypeOf(value).toEqualTypeOf<string>();
		expectTypeOf(value).not.toEqualTypeOf<"string">();
	});

	test("string literal type handling", () => {
		const checked = new Checked("string" as const);
		const value = checked.get();
		expectTypeOf(value).toExtend<"string">();
		expectTypeOf(value).toEqualTypeOf<"string">();
	});

	test("URL type handling", () => {
		const checked = new Checked(new URL("https://adrgautier.co"));
		const value = checked.get();
		expectTypeOf(value).toExtend<URL>();
		expectTypeOf(value).toEqualTypeOf<URL>();
	});

	test("return type validation", () => {
		expectTypeOf<Checked<void>>()
			.toHaveProperty("get")
			.returns.toEqualTypeOf<void>();
		expectTypeOf<Checked<string>>()
			.toHaveProperty("get")
			.returns.toEqualTypeOf<string>();
		expectTypeOf<Checked<"string">>()
			.toHaveProperty("get")
			.returns.toEqualTypeOf<"string">();
		expectTypeOf<Checked<URL>>()
			.toHaveProperty("get")
			.returns.toEqualTypeOf<URL>();
	});
});
