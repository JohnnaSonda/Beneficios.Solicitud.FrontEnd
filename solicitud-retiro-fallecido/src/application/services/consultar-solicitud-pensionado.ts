// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";
import { IPensionerSimulation } from "../../presentation/types/api-types";

export const ConsultarSolicitudPensionado = async (params: IPensionerSimulation) => {
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiSolicitudPensionado +
		appConf.SolicitudPensionado.ConsultarSolicitud;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: {
				...params,
			},
		})
		.then((response) => {
			if (response.status === 200) {
				return response.data.result.value;
			}
		})
		.catch((error) => {
			try {
				console.log(error);

				return error.response.status;
			} catch (error) {
				return 500;
			}
		});
};
