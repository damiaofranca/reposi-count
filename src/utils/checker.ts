/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable eqeqeq */
export type SafeAny = any;

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: SafeAny): value is Function {
	return typeof value === "function";
}
