// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";

export const ConsultaDatosParametrica = async (nombreTabla: string) => {
	const queryParam = `?nombreTabla=${nombreTabla}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiParametros +
		appConf.ConsultaDatosParametrica +
		queryParam;
	return await axios
		.get(apiUrl, appConf.configAxios)
		.then((response) => {
			if (response.status === 200) {
				return response.data.result.value;
			}
		})
		.catch((error) => {
			try {
				return error.response.status;
			} catch (error) {
				return 500;
			}
		});
};
