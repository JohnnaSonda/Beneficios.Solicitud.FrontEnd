export interface IPrevision {
	codInstPrevision: number;
	descripcion: string;
	estadoReg: string;
	fecEstadoReg: string;
	fecIngReg: string;
	fecUltModifReg: string;
	idFuncionIngReg: string;
	idFuncionUltModifReg: string;
	idUsuarioIngReg: string;
	idUsuarioUltModifReg: string;
}

export interface ITipoPension {
	idAdm: number;
	tipoPension: string;
	descripcion: string;
	codSuper: number;
	indPensionado: string;
	estadoReg: string;
	fecEstadoReg: string;
	fecIngReg: string;
	idUsuarioIngReg: string;
	idFuncionIngReg: string;
	fecUltModifReg: string;
	idUsuarioUltModifReg: string;
	idFuncionUltModifReg: string;
}
