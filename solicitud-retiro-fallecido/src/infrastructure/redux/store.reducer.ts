import { Action, Reducer } from "redux";

export interface DispatchAction extends Action<ActionType> {
	payload: Partial<State>;
}
export interface State {
	status: boolean;
}

const initState: any = {
	status: true,
};

export enum ActionType {
	Allowed = "allowed",
}

export const allowed = () => (dispatch: any) => {
	dispatch({
		type: ActionType.Allowed,
		payload: { status: true },
	});
};

export const storeReducer = (
	state = initState,
	action: DispatchAction,
): Reducer<State, DispatchAction> => {
	switch (action.type) {
		case ActionType.Allowed:
			return { ...state, status: action.payload.status };
		default:
			return state;
	}
};
