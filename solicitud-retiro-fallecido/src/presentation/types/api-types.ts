export interface IProps {
	numReclamo?: number;
	idAfiliado?: number;
	idAfiliadoDv?: string;
	nombres?: string;
	primerApellido?: string;
	idEmpleador?: number;
	idEmpleadorDv?: string;
	razonSocial?: string;
	idReclamante?: number;
	idReclamanteDv?: string;
	nombreReclamante?: string;
	primerApellidoReclamante?: string;
	segundoApellidoReclamante?: string;
	fecInicio?: string;
	fecTermino?: string;
	codEstadoReclamo?: string;
	responsable?: string;
}

export interface IPensionerSimulation {
	idAfiliado?: string;
	idAfiliadoDv?: string;
	idEmpleador?: number;
	idEmpleadorDv?: string;
	tipoSolicitud?: string;
	numSolicitud?: number;
	estadoSolicitud?: string;
	indSimulacion?: string;
}
