import axios from "axios";
import { appConf } from "./api-config";
import { IConsultarSaldo } from "../../presentation/types/solicitud-pensionado";
import { IConsultarSolicitud } from "../../presentation/types/solicitud-cesantia";
import { ISimularSolicitud, ICrearSolicitud } from "../../presentation/types/cursar-simulacion";

export const ConsultarSaldo = async ({
	idFuncion,
	idPersona,
	idPersonaDv,
	idUsuario,
}: IConsultarSaldo) => {
	const query = `?idPersona=${idPersona}&idPersonaDv=${idPersonaDv}&idUsuario=${idUsuario}&idFuncion=${idFuncion}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiSolicitudPensionado +
		appConf.SolicitudPensionado.ConsultarSaldo +
		query;

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
		appConf.ApiSolicitudPensionado +
		appConf.SolicitudPensionado.ConsultarSolicitud +
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

export const SimularSolicitud = async ({
	codAgencia,
	codEntidadPrevisional,
	fecPension,
	idFuncion,
	idPersona,
	idPersonaDv,
	idUsuario,
	numSolicitud,
	tipoPension,
}: ISimularSolicitud) => {
	const queryParams = `?numSolicitud=${numSolicitud}&idPersona=${idPersona}&idPersonaDv=${idPersonaDv}&codAgencia=${codAgencia}&codEntidadPrevisional=${codEntidadPrevisional}&tipoPension=${tipoPension}&fecPension=${fecPension}&idUsuario=${idUsuario}&idFuncion=${idFuncion}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiSolicitudPensionado +
		appConf.SolicitudPensionado.SimularSolicitud +
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

export const CrearSimulacion = async ({
	codInsFinanciera,
	idFuncion,
	idPersona,
	idPersonaDv,
	idReceptorPago,
	idReceptorPagoDv,
	idSolicitante,
	idSolicitanteDv,
	idUsuario,
	indActBeneficiarios,
	nombreSolicitante,
	numMandatario,
	numPoder,
	numSolicitud,
	tipoModalidadPago,
	tipoReceptor,
	numCuentaBanco,
	tipoCuentaBanco,
}: ICrearSolicitud) => {
	let queryParams = `?codInsFinanciera=${codInsFinanciera}&idFuncion=${idFuncion}&idPersona=${idPersona}&idPersonaDv=${idPersonaDv}&idReceptorPago=${idReceptorPago}&idReceptorPagoDv=${idReceptorPagoDv}&idSolicitante=${idSolicitante}&idSolicitanteDv=${idSolicitanteDv}&idUsuario=${idUsuario}&indActBeneficiarios=${indActBeneficiarios}&nombreSolicitante=${nombreSolicitante}&numMandatario=${numMandatario}&numPoder=${numPoder}&numSolicitud=${numSolicitud}&tipoModalidadPago=${tipoModalidadPago}&tipoReceptor=${tipoReceptor}`;

	if (numCuentaBanco) queryParams = queryParams + `&numCuentaBanco=${numCuentaBanco}`;
	if (tipoCuentaBanco) queryParams = queryParams + `&tipoCuentaBanco=${tipoCuentaBanco}`;

	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiSolicitudPensionado +
		appConf.SolicitudPensionado.CrearSolicitud +
		queryParams;

	return await axios
		.post(
			apiUrl,
			{},
			{
				headers: appConf.configAxios.headers,
			},
		)
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
