const tokenStr = sessionStorage.getItem("token") || "";
// const version = (window as any).versionApi;

// eslint-disable-next-line
export const appConf = {
	versionSoftware: (window as any).versionSoftware,
	// *************** config para desarrollo*********************
	host: (window as any).host,
	port: (window as any).port,
	portService: (window as any).portService,
	portLogin: (window as any).portLogin,

	configAxios: {
		headers: {
			Authorization: `Bearer ${tokenStr}`,
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	},
	configAxiosNoBearer: {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	},
	configAxiosCSV: {
		headers: {
			Authorization: `Bearer ${tokenStr}`,
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		responseType: "blob",
	},

	//API Raiz
	ApiPersona: (window as any).ApiPersona,
	ApiParametros: (window as any).ApiParametros,
	ApiBeneficiarios: (window as any).ApiBeneficiarios,
	apiCuentaBancariaAfiliado: (window as any).apiCuentaBancariaAfiliado,
	ApiReclamosNormativos: (window as any).ApiReclamosNormativos,
	ApiSolicitudCesantia: (window as any).ApiSolicitudCesantia,
	ApiSolicitudPensionado: (window as any).ApiSolicitudPensionado,

	//API´S JWT
	ConsultarAntecedentes: "ConsultarAntecedentesValidaciones",
	ConsultaDatosParametrica: "ConsultaDatosParametrica",
	Consultar: "Consultar",
	Crear: "Crear",
	Modificar: "Modificar",
	ModificarEstado: "ModificarEstado",
	ConsultarDetalleSaldo: "ConsultarDetalleSaldo",
	ConsultarSolicitud: "ConsultarSolicitud",
	Beneficiarios: {
		Consultar: "Consultar",
		Crear: "Crear",
		Modificar: "Modificar",
		ModificarEstado: "ModificarEstado",
	},
	Persona: {
		ConsultarAntecedentes: "ConsultarAntecedentes",
		ConsultarMail: "ConsultarMail",
		ConsultarTelefono: "ConsultarTelefono",
		ModificarTelefono: "ModificarTelefono",
		ModificarMail: "ModificarMail",
		CrearDirElectronica: "CrearDirElectronica",
		CrearTelefono: "CrearTelefono",
		CrearEmail: "CrearEmail",
	},
	SolicitudCesantia: {
		ConsultarSolicitud: "ConsultarSolicitud",
	},
	SolicitudPensionado: {
		ConsultarSaldo: "ConsultarSaldo",
		ConsultarSolicitud: "ConsultarSolicitud",
		CrearSolicitud: "CrearSolicitud",
		SimularSolicitud: "SimularSolicitud",
	},
};
