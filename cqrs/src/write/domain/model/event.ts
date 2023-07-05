export abstract class Event<T> {
	public readonly firedAt: Date;
	public readonly content: T;

	protected constructor(firedAt: Date, content: T) {
		this.firedAt = firedAt;
		this.content = content;
	}
}
