export interface IConsultarSaldo {
	idPersona: string;
	idPersonaDv: string;
	idUsuario: string;
	idFuncion: string;
}

export interface ISaldos {
	fechaCuota: string;
	montoSaldoCuotas: number;
	montoSaldoPesos: number;
	tipoProducto: string;
	valorCuota: number;
}
