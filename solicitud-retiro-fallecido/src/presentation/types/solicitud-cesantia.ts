export interface IConsultarSolicitud {
	idAfiliado: string;
	idAfiliadoDv: string;
	idEmpleador?: string;
	idEmpleadorDv?: string;
	tipoSolicitud?: string;
	numSolicitud?: string;
	estadoSolicitud?: string;
	indSimulacion?: string;
}
