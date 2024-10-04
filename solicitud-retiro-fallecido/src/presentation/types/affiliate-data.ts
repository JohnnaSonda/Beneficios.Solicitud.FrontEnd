import { IPrevision, ITipoPension } from "./prevision";
import { IDatosConsolidado } from "./cursar-simulacion";

export interface ISearchRut {
	cantAnosEducacion?: string;
	codBloqueo?: any;
	codComunaNacimiento?: string;
	codEntidadPrevisional?: string;
	codEntidadSalud?: string;
	codEstadoCivil?: string;
	codGeneroCliente?: string;
	codMotivoCambioSexo?: string;
	codMotivoEstadoCliente?: string;
	codNivelEducacion?: string;
	codOrigenAfiliacion?: string;
	codPaisNacimiento?: any;
	codPaisNacionalidad?: string;
	codProfesion?: string;
	codTipoAfiliacion?: string;
	codTipoAtencionPreferencial?: string;
	codTipoPension?: string;
	codTipoSegmentacion?: string;
	comunaNacimiento?: string;
	descBloqueo?: any;
	entidadPrevisional: number;
	entidadSalud?: any;
	estadoCivil?: string;
	fecBloqueo?: any;
	fecCambioIdentificacion?: any;
	fecInterdicto?: any;
	fecMotivoCambioSexo?: string;
	fecNacimiento: string;
	fecPension?: string;
	fecSuscripcion?: string;
	fecVerificacionRegcivil?: string;
	genero?: any;
	indAfiliacionTacita?: string;
	indCambioIdentificacion?: string;
	indExtranjero?: string;
	indInterdicto?: string;
	indVerificacionRegcivil?: string;
	lugarNacimiento?: string;
	motivoCambioSexo?: string;
	motivoEstadoCliente?: string;
	nivelEducacion?: string;
	nombreSocial?: any;
	nombres?: string;
	origenAfiliacion?: any;
	paisNacimiento?: string;
	paisNacionalidad?: string;
	primerApellido?: string;
	profesion?: any;
	rut?: string;
	segundoApellido?: string;
	sexo?: string;
	tipoAfiliacion?: string;
	tipoAtencionPreferencial?: any;
	tipoClienteAfc?: string;
	tipoEnvioCartola?: string;
	tipoPension?: string;
	tipoSegmentacion?: any;
	idPersona?: string;
}

export interface ITabAfiliado {
	rut?: any;
	nombres?: string;
	primerApellido?: string;
	segundoApellido?: string;
	entidadPrevisional?: number;
	fechaNacimiento: string;
	setTabDisabled: (prevState: any) => void;
	tipoPension?: string;
	fechaPension?: string;
	previsionOpciones: IPrevision[];
	nuevaPrevision: (value: any) => void;
	opcionesPension: ITipoPension[];
	updateConsolidadaData: (key: string, value: any) => void;
	setConsolidada: (value: any) => void;
	consolidada: IDatosConsolidado;
	nextTab: (
		tab: string,
		validate: "benefits" | "updateData" | "summary",
		setError?: (value: any) => void,
	) => void;
}

export interface IDataConsulting {
	idPersona: string;
	fecSolicitud: string;
	descTipoSolicitud: string;
	estadoSolicitud: string;
}
