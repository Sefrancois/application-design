export interface Usecase<T> {
	run(...args: Array<unknown>): T;
}
