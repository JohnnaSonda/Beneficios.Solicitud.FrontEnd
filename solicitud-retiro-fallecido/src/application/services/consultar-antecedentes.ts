// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";

interface IRut {
	idPersona: string;
	idPersonaDv: string;
	tipoSolicitud: string;
	usu: string;
}

export const ConsultarAntecedentes = async ({
	idPersona,
	idPersonaDv,
	tipoSolicitud,
	usu,
}: IRut) => {
	const queryParam = `?idPersona=${idPersona}&idPersonaDv=${idPersonaDv}&tipoSolicitud=${tipoSolicitud}&usu=${usu}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiPersona +
		appConf.ConsultarAntecedentes +
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
