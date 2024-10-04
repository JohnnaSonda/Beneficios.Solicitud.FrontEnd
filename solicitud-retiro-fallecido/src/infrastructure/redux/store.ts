import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeEnhancers } from "../configuration/global";
import { storeReducer } from "./store.reducer";
import { appReducer } from "sonda.core.controls/store";

const rootReducer = combineReducers({ storeReducer, appReducer });

export default function generateStore() {
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
	const apiCall = {};
	return { store, apiCall };
}

// eslint-disable-next-line no-undef
export type typeStore = ReturnType<typeof generateStore>;
