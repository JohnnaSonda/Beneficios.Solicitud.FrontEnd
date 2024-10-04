// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";
import { ICrearCuenta } from "../../presentation/types/cuenta-bancaria";

export const CrearCuentaBancaria = async (datos: ICrearCuenta) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.apiCuentaBancariaAfiliado + appConf.Crear;
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
