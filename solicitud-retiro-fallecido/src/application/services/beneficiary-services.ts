// eslint-disable-next-line
import axios from "axios";
import { appConf } from "./api-config";
import {
	IBeneficiarioCreateApi,
	IModificarBeneficiario,
} from "../../presentation/types/beneficiarios";

export const BeneficiarySearch = async (affiliateId: string, affiliateDv: string) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiBeneficiarios + appConf.Beneficiarios.Consultar;

	return await axios
		.get(apiUrl, {
			headers: appConf.configAxios.headers,
			params: { idAfiliado: affiliateId, idAfiliadoDv: affiliateDv },
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

export const UpdateBeneficiary = async (body?: IModificarBeneficiario[]) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiBeneficiarios + appConf.Beneficiarios.Modificar;

	return await axios
		.post(apiUrl, { inputBeneficiarioPUTs: body }, { headers: appConf.configAxios.headers })
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

export const UpdateBeneficiaryState = async (body: IModificarBeneficiario[]) => {
	const apiUrl =
		appConf.host +
		appConf.portService +
		appConf.ApiBeneficiarios +
		appConf.Beneficiarios.ModificarEstado;

	return await axios
		.post(apiUrl, { inputBeneficiarioPUTs: body }, { headers: appConf.configAxios.headers })
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

export const CreateBeneficiary = async (body: IBeneficiarioCreateApi[]) => {
	const apiUrl =
		appConf.host + appConf.portService + appConf.ApiBeneficiarios + appConf.Beneficiarios.Crear;

	return await axios
		.post(apiUrl, { inputBeneficiarioADDs: body }, { headers: appConf.configAxios.headers })
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
