import { IServiceResult, responseIsValid } from "sonda.core.services";
import { IState } from "./../../domain/interfaces";
import { ToastDialog } from "sonda.core.shared.components";

export const responseService = (response: IServiceResult): IState<any> => {
	if (responseIsValid(response)) {
		ToastDialog(response.messages);
		return {
			data: response.result,
			loading: false,
			error: false,
			message: response.messages,
			errorMessage: [],
			cancelToken: undefined,
			status: undefined,
		};
	} else {
		ToastDialog(response.errors);
		return {
			data: [],
			loading: false,
			error: true,
			message: response.messages,
			errorMessage: response.errors,
			cancelToken: undefined,
			status: undefined,
		};
	}
};
