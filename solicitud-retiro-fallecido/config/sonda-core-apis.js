//**********Variables APICONFIG*******
window.versionApi = "v1";
window.host = "http://10.205.140.33";
window.port = ":85";
window.portService = ":85";
window.portLogin = ":82";
window.versionSoftware = "3.0.29";
//API Raiz
window.ApiPersona = "/apiPersona/api/" + window.versionApi + "/Persona/";
window.ApiParametros = "/apiParametros/api/" + window.versionApi + "/ConsultarParametros/";
window.ApiBeneficiarios = "/apiBeneficiarios/api/" + window.versionApi + "/Beneficiarios/";
window.apiCuentaBancariaAfiliado =
	"/apiCuentaBancariaAfiliado/api/" + window.versionApi + "/CuentaBancaria/";
window.ApiReclamosNormativos =
	"/apiReclamosNormativos/api/" + window.versionApi + "/ReclamosNormativos/";
window.ApiSolicitudCesantia =
	"/apiSolicitudCesantia/api/" + window.versionApi + "/SolicitudCesantia/";
window.ApiSolicitudPensionado =
	"/apiSolicitudPensionado/api/" + window.versionApi + "/SolicitudPensionado/";

window.SONDA_CORE_API_ROOT = "https://sondacoreapi-noti-dev.azurewebsites.net/";
window.SONDA_CORE_NOTIFICATIONS_SERVICES_VERSION = "v1";
window.SONDA_CORE_USUARIOS_SERVICES = window.SONDA_CORE_API_ROOT + "Sonda.Core.Usuarios.Api";
//window.SONDA_CORE_LOGIN_SERVICES = "http://10.165.202.31:82/apilogin6";
window.SONDA_CORE_LOGIN_SERVICES = "http://10.205.140.33:82/apilogin6";
window.SONDA_CORE_CONFIGURATION_PUBLIC =
	window.SONDA_CORE_API_ROOT + "Sonda.Api.Configuration/api/v1/ConfigurationManager/GetAppSettings";
window.SONDA_CORE_CONFIGURATION_PRIVATE =
	window.SONDA_CORE_API_ROOT +
	"Sonda.Api.Configuration/api/v1/ConfigurationManager/GetAllAppSettings";
window.SONDA_CORE_NOTIFICATIONS_SERVICES =
	window.SONDA_CORE_API_ROOT + "Sonda.Core.Notificaciones.Api";
window.SONDA_API_USUARIO_SERVICES = "http://10.165.202.31:82/apilogin6";
window.SONDA_CORE_USUARIOS_SERVICES_VERSION = "v2";
window.SONDA_CORE_CONFIGURATION_PUBLIC =
	"https://sondacoreapi-dev.azurewebsites.net/Sonda.Api.Configuration/api/v1/ConfigurationManager/GetAppSettings";
window.SONDA_CORE_EXAMPLE_SERVICES = "https://sondacoreapi-dev.azurewebsites.net/Web.API.Example";
window.SONDA_CORE_EXAMPLE_SERVICES_VERSION = "v2";
window.SONDA_CORE_LOGOTEXT = "App Referencia";
window.SONDA_CORE_LOGIN_SERVICES_VERSION = "v2";
window.SONDA_IDADM = 1;
window.SONDA_NET_URL = "https://sondacoreapi-dev.azurewebsites.net/SondaNetSampleApp/";
window.BASENAME = "/portal/";
window.SONDA_CORE_BACKGROUNDTASKS_HANGFIRE = "https://localhost:44352/hangfire";
window.SONDA_CORE_BACKGROUNDTASKS_API = "https://localhost:44352";
window.TOKEN_SECRET = "palabra-secreta";

// menu
window.SONDA_CORE_MODULES = [
	{
		name: "solicitud-beneficio-fallecido",
		hash: window.BASENAME + "solicitud-beneficio-fallecido",
		appURL: "@afp/solicitud-beneficio-fallecido",
		storeURL: "@afp/store-solicitud-beneficio-fallecido",
	},
];

window.SONDA_CORE_MENU = [
	{
		icon: ["fas", "bell"],
		path: "/solicitud-beneficio-fallecido",
		title: "solicitud-beneficio-fallecido",
	},
];
