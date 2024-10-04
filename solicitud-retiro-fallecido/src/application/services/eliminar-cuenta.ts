// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";
import { IEliminarCuenta } from "../../presentation/types/cuenta-bancaria";

export const EliminarCuentaBancaria = async (datos: IEliminarCuenta) => {
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.apiCuentaBancariaAfiliado +
		appConf.ModificarEstado;
	return await axios
		.post(apiUrl, datos, appConf.configAxios)
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
