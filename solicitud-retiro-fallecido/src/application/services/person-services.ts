// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";
import {
	IEditContactPhone,
	IEditContactMail,
	ICrearDirContacto,
	ICrearEmail,
	ICrearTelefono,
} from "../../presentation/types/contactos";

export const AffiliateSearch = async (affiliateId: string, affiliateDv: string) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiPersona + appConf.Persona.ConsultarAntecedentes;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: { idPersona: affiliateId, idPersonaDv: affiliateDv },
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

export const PhonesSearch = async (affiliateId: string, affiliateDv: string) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiPersona + appConf.Persona.ConsultarTelefono;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: { idPersona: affiliateId, idPersonaDv: affiliateDv },
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

export const MailsSearch = async (affiliateId: string, affiliateDv: string) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiPersona + appConf.Persona.ConsultarMail;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: { idPersona: affiliateId, idPersonaDv: affiliateDv },
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

export const UpdatePersonMail = async (body: IEditContactMail) => {
	const queryString = `?idPersona=${body.idPersona}&idPersonaDv=${body.idPersonaDv}&seqEmail=${body.seqEmail}&tipoEmail=${body.tipoEmail}&direccionEmail=${body.direccionEmail}&indPreferenteEmail=${body.indPreferenteEmail}&indUsoCartola=${body.indUsoCartola}&usu=${body.usu}&fun=${body.fun}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiPersona +
		appConf.Persona.ModificarMail +
		queryString;

	return await axios
		.post(apiUrl, body, { headers: appConf.configAxios.headers })
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

export const UpdatePersonPhone = async (body: IEditContactPhone) => {
	const queryString = `?idPersona=${body.idPersona}&idPersonaDv=${body.idPersonaDv}&seqTelefono=${body.seqTelefono}&tipoTelefono=${body.tipoTelefono}&numTelefono=${body.numTelefono}&indPreferenteTel=${body.indPreferenteTel}&usu=${body.usu}&fun=${body.fun}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiPersona +
		appConf.Persona.ModificarTelefono +
		queryString;

	return await axios
		.post(apiUrl, body, { headers: appConf.configAxios.headers })
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

export const CrearDirElectronica = async (body: ICrearDirContacto) => {
	const mainQuery = `?idPersona=${body.idPersona}&idPersonaDv=${body.idPersonaDv}&usu=${body.usu}&fun=${body.fun}`;
	const phoneQuery =
		body.tipoCrear === "phone"
			? `&tipoTelefono=${body.tipoTelefono}&numTelefono=${body.numTelefono}&indPreferenteTel=${body.indPreferenteTel}`
			: "";
	const mailQuery =
		body.tipoCrear === "mail"
			? `&tipoEmail=${body.tipoEmail}&direccionEmail=${body.direccionEmail}&indPreferenteEmail=${body.indPreferenteEmail}&indUsoCartola=${body.indUsoCartola}`
			: "";
	// const queryString = ``;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiPersona +
		appConf.Persona.CrearDirElectronica +
		mainQuery +
		phoneQuery +
		mailQuery;

	return await axios
		.post(apiUrl, body, { headers: appConf.configAxios.headers })
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

export const ModalAffiliateSearch = async (affiliateId: string, affiliateDv: string) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiPersona + appConf.Persona.ConsultarAntecedentes;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: {
				idPersona: affiliateId,
				idPersonaDv: affiliateDv,
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

export const CrearEmail = async (body: ICrearEmail) => {
	const queryString = `?idPersona=${body.idPersona}&idPersonaDv=${body.idPersonaDv}&usu=${body.usu}&fun=${body.fun}&tipoEmail=${body.tipoEmail}&direccionEmail=${body.direccionEmail}&indPreferenteEmail=${body.indPreferenteEmail}&indUsoCartola=${body.indUsoCartola}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiPersona +
		appConf.Persona.CrearEmail +
		queryString;

	return await axios
		.post(apiUrl, body, { headers: appConf.configAxios.headers })
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

export const CrearTelefono = async (body: ICrearTelefono) => {
	const queryString = `?idPersona=${body.idPersona}&idPersonaDv=${body.idPersonaDv}&usu=${body.usu}&fun=${body.fun}&tipoTelefono=${body.tipoTelefono}&numTelefono=${body.numTelefono}&indPreferenteTel=${body.indPreferenteTel}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiPersona +
		appConf.Persona.CrearTelefono +
		queryString;

	return await axios
		.post(apiUrl, body, { headers: appConf.configAxios.headers })
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
