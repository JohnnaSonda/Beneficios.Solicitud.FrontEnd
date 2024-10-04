// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";

interface IRut {
	idPersona: string;
	idPersonaDv: string;
}

export const ConsultarCuentaBancaria = async ({ idPersona, idPersonaDv }: IRut) => {
	const queryParam = `?idAfiliado=${idPersona}&idAfiliadoDv=${idPersonaDv}`;
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.apiCuentaBancariaAfiliado +
		appConf.Consultar +
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
