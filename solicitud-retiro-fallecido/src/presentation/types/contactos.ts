export interface IEditContactPhone {
	idPersona: number;
	idPersonaDv: string;
	seqTelefono: number;
	tipoTelefono: string;
	numTelefono: number;
	indPreferenteTel: string;
	usu: string;
	fun: string;
}

export interface IEditContactMail {
	idPersona: number;
	idPersonaDv: string;
	seqEmail: number;
	tipoEmail: string;
	direccionEmail: number;
	indPreferenteEmail: string;
	indUsoCartola: string;
	usu: string;
	fun: string;
}

export interface IPhoneContact {
	estadoContactabilidadTel: string;
	estadoReg: string;
	fecEstadoContactabilidadTel: string;
	fecEstadoReg: string;
	fecIngReg: string;
	fecUltModifReg: string;
	idFuncionIngReg?: string;
	idFuncionUltModifReg: string;
	idUsuarioIngReg: string;
	idUsuarioUltModifReg: string;
	indPreferenteTel: string;
	numCliente: number;
	numTelefono: number;
	seqTelefono: number;
	telefono: number;
	tipoTelefono: string;
}

export interface IMailContact {
	direccionEmail: string;
	estadoContactabilidadMail: string;
	estadoReg: string;
	fecEstadoContactabilidadMail: string;
	fecEstadoReg: string;
	fecIngReg: string;
	fecUltModifReg: string;
	idFuncionIngReg?: string;
	idFuncionUltModifReg: string;
	idUsuarioIngReg: string;
	idUsuarioUltModifReg: string;
	indPreferenteMail: string;
	indUsoCartolaMail: string;
	numCliente: number;
	seqEmail: number;
	tipoEmail: string;
}

export interface ICrearDirContacto {
	idPersona: string;
	idPersonaDv: string;
	tipoTelefono?: string;
	numTelefono?: string;
	indPreferenteTel?: string;
	tipoEmail?: string;
	direccionEmail?: string;
	indPreferenteEmail?: string;
	indUsoCartola?: string;
	tipoRrss?: string;
	usuarioContactoRRSS?: string;
	indPreferenteRrss?: string;
	usu: string;
	fun: string;
	tipoCrear: "mail" | "phone";
}

export interface ICrearTelefono {
	idPersona: string;
	idPersonaDv: string;
	tipoTelefono: string;
	numTelefono: string;
	indPreferenteTel: string;
	usu: string;
	fun: string;
}

export interface ICrearEmail {
	idPersona: string;
	idPersonaDv: string;
	tipoEmail: string;
	direccionEmail: string;
	indPreferenteEmail: string;
	indUsoCartola: string;
	usu: string;
	fun: string;
}

export interface ITipoTelefono {
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
	tipoTelefono: string;
}

export interface ITipoMail {
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
	tipoEmail: string;
}
