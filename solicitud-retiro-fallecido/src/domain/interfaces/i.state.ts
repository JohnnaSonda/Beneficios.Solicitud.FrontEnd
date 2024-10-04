import { IMessage, typeCancelTokenSource } from "sonda.core.services";

export interface IState<T> {
	data: T[] | any[];
	loading: boolean;
	error: boolean;
	message: IMessage[];
	errorMessage: IMessage[];
	cancelToken: typeCancelTokenSource | undefined;
	status: string | undefined;
}

export const initialState = {
	data: [],
	loading: false,
	error: false,
	message: [],
	errorMessage: [],
	cancelToken: undefined,
	status: undefined,
};
