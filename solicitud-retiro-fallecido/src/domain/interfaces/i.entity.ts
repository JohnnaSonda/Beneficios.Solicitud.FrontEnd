export abstract class IEntity<T> {
	protected props: T;
	constructor(props: T) {
		this.props = props;
	}
}
