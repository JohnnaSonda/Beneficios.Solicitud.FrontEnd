export interface ICuentaBancaria {
	seqCuentaBancaria: string;
	codInstFinanciera: string;
	codInstFinancieraDescripcion: string;
	estadoReg: string;
	estadoValidacion: string;
	fecEstadoReg: string;
	fecEstadoValidacion: string;
	fecIngReg: string;
	fecUltModifReg: string;
	idFuncionIngReg: string;
	idFuncionUltModifReg: string;
	idUsuarioIngReg: string;
	idUsuarioUltModifReg: string;
	indCtaMachDigital: string;
	indCuentaBipersonal: string;
	indPreferente: string;
	numCuentaBanco: string;
	tipoCuentaBanco: string;
	tipoCuentaBancoDescripcion: string;
}

export interface ICuentaBancariaApi {
	descripcion: string;
	estadoReg: string;
	fecEstadoReg: string;
	fecIngReg: string;
	fecUltModifReg: string;
	idAdm: number;
	idFuncionIngReg: string;
	idFuncionUltModifReg: string;
	idUsuarioIngReg: string;
	idUsuarioUltModifReg: string;
	tipoCuentaBanco: string;
}

export interface ICrearCuenta {
	codInstFinanciera: string;
	tipoCuentaBanco: string;
	numCuentaBanco: string;
	indPreferente: string;
	idAfiliado: number;
	idAfiliadoDv: string;
	usu?: string;
	fun?: string;
}

export interface IEditarCuenta extends ICrearCuenta {
	seqCuentaBancaria: string;
	codInstFinancieraDescripcion?: string;
	tipoCuentaBancoDescripcion?: string;
	usu: string;
	fun: string;
}

export interface IEliminarCuenta {
	seqCuentaBancaria: number;
	estadoReg: string;
	idAfiliado: number;
	idAfiliadoDv: string;
	usu: string;
	fun: string;
}
