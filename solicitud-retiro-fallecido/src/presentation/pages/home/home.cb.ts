import { typeStore } from "../../../infrastructure/redux/store";

export interface IProps {
	store?: typeStore;
	globalEventDistributor?: any[];
}

export const useHome = (_props: IProps) => {
	return {};
};
