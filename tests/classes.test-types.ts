/**
 * This file is not a regular test file.
 * In order for those tests to be validated,
 * the file needs to compile without error.
 */
import { expectType, type TypeEqual } from "ts-expect";
import { Checked } from "../src/classes";

/**
 * Checked
 */
{
	const checked = new Checked<void>(undefined);
	const value = checked.get();
	expectType<void>(value);
	expectType<TypeEqual<void, typeof value>>(true);
}
{
	const checked = new Checked("string");
	const value = checked.get();
	expectType<string>(value);
	expectType<TypeEqual<string, typeof value>>(true);
	expectType<TypeEqual<"string", typeof value>>(false);
}
{
	const checked = new Checked("string" as const);
	const value = checked.get();
	expectType<"string">(value);
	expectType<TypeEqual<"string", typeof value>>(true);
}
{
	const checked = new Checked(new URL("https://adrgautier.co"));
	const value = checked.get();
	expectType<URL>(value);
	expectType<TypeEqual<URL, typeof value>>(true);
}
{
	expectType<TypeEqual<ReturnType<Checked<void>["get"]>, void>>(true);
	expectType<TypeEqual<ReturnType<Checked<string>["get"]>, string>>(true);
	expectType<TypeEqual<ReturnType<Checked<"string">["get"]>, "string">>(true);
	expectType<TypeEqual<ReturnType<Checked<URL>["get"]>, URL>>(true);
}
