// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";

export const ConsultSimulation = async (idAfiliado: number, idAfiliadoDv: string) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiSolicitudCesantia + appConf.ConsultarSolicitud;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: {
				idAfiliado: idAfiliado,
				idAfiliadoDv: idAfiliadoDv,
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
