import { match, P } from "ts-pattern";
import { fffunction } from "../src/index";

describe("fffunction", () => {
	it("should return the correct value according to the input (literal)", () => {
		// Given
		const random = fffunction
			.f<(a: "string") => string>()
			.f<(b: "number") => number>()
			.f(([check, u]) => {
				const randomNumber = Math.random();
				if (u === "number") {
					return check(randomNumber);
				}
				return check(String(randomNumber));
			});

		// Then
		expect(typeof random("number")).toBe("number");
		expect(typeof random("string")).toBe("string");
	});

	it("should return the correct value according to the input (type of)", () => {
		// Given
		const format = fffunction
			.f<(a: string) => string>()
			.f<(b: number) => number>()
			.f<(c: symbol) => symbol>()
			.f((u) =>
				match(u)
					.with([P._, P.string], ([check]) => check("one"))
					.with([P._, P.number], ([check]) => check(1))
					.with([P._, P.symbol], ([check]) => check(Symbol()))
					.exhaustive(),
			);

		// Then
		expect(typeof format(1000)).toBe("number");
		expect(typeof format("1000")).toBe("string");
		expect(typeof format(Symbol())).toBe("symbol");
	});

	it("should return the correct value according to the input (object)", () => {
		// Given
		const discriminate = fffunction
			.f<(a: { id: number; name: string }) => "profile">()
			.f<(b: { id: number }) => "item">()
			.f((u) =>
				match(u)
					.with([P._, { name: P.string }], ([check]) => check("profile"))
					.otherwise(([check]) => check("item")),
			);

		// Then
		expect(discriminate({ id: 1 })).toBe("item");
		expect(discriminate({ id: 2, name: "test" })).toBe("profile");
	});

	it("should work with void return", () => {
		const poly = fffunction
			.f<(a: "string") => string>()
			.f<(b: "void") => void>()
			.f(([check, u]) => {
				if (u === "string") {
					return check("test");
				}
				return check();
			});
		expect(typeof poly("void")).toBe("undefined");
		expect(typeof poly("string")).toBe("string");
	});
});
