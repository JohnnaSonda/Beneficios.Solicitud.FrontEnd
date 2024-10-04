import axios from "axios";
import { appConf } from "./api-config";

export const ConsultarMandatarios = async (
	idAfiliado: string,
	idAfiliadoDv: string,
	numPoder: string,
) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiPoderes + appConf.Poderes.ConsultarMandatarios;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: { idAfiliado, idAfiliadoDv, numPoder },
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

export const ConsultarMandato = async (
	idAfiliado: string,
	idAfiliadoDv: string,
	tipoPoder: "PPE",
) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiPoderes + appConf.Poderes.ConsultarMandato;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: { idAfiliado, idAfiliadoDv, tipoPoder },
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

export const ConsultarFacultades = async (
	numPoder: string,
	idAfiliado: string,
	idAfiliadoDv: string,
) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiPoderes + appConf.Poderes.ConsultarFacultades;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: { idAfiliado, idAfiliadoDv, numPoder },
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
