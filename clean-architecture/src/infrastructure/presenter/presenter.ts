export interface Presenter<T> {
	present(...args: Array<unknown>): T;
}
