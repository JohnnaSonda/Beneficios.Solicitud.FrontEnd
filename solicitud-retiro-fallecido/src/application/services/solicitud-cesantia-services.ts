import axios from "axios";
import { appConf } from "./api-config";
import { IConsultarSolicitud } from "../../presentation/types/solicitud-cesantia";

export const ConsultarSolicitud = async ({
	idAfiliado,
	idAfiliadoDv,
	estadoSolicitud,
	idEmpleador,
	idEmpleadorDv,
	indSimulacion,
	numSolicitud,
	tipoSolicitud,
}: IConsultarSolicitud) => {
	let queryParams = "?";
	if (idAfiliado) {
		queryParams = queryParams + `idAfiliado=${idAfiliado}&`;
	}
	if (idAfiliadoDv) {
		queryParams = queryParams + `idAfiliadoDv=${idAfiliadoDv}&`;
	}
	if (estadoSolicitud) {
		queryParams = queryParams + `estadoSolicitud=${estadoSolicitud}&`;
	}
	if (idEmpleador) {
		queryParams = queryParams + `idEmpleador=${idEmpleador}&`;
	}
	if (idEmpleadorDv) {
		queryParams = queryParams + `idEmpleadorDv=${idEmpleadorDv}&`;
	}
	if (indSimulacion) {
		queryParams = queryParams + `indSimulacion=${indSimulacion}&`;
	}
	if (numSolicitud) {
		queryParams = queryParams + `numSolicitud=${numSolicitud}&`;
	}
	if (tipoSolicitud) {
		queryParams = queryParams + `tipoSolicitud=${tipoSolicitud}&`;
	}
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiSolicitudCesantia +
		appConf.SolicitudCesantia.ConsultarSolicitud +
		queryParams;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
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
