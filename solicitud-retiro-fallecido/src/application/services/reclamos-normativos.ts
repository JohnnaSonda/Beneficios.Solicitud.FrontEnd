// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";
import { IProps } from "../../presentation/types/api-types";

export const SearchClaim = async (params: IProps) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiReclamosNormativos + appConf.Consultar;

	try {
		const response = await axios.get(apiUrl, {
			params: {
				...params,
			},
			...appConf.configAxios,
		});
		if (response.status === 200) {
			return response.data.result.value;
		}
	} catch (error) {
		return 500;
	}
};
