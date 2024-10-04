// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";
import { IEditarCuenta } from "../../presentation/types/cuenta-bancaria";

export const ModificarCuentaBancaria = async (datos: IEditarCuenta) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.apiCuentaBancariaAfiliado + appConf.Modificar;
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
