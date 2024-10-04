export interface IBeneficiarios {
	codMotivoEstadoBeneficiario: string;
	codParentesco: string;
	estadoCivil: string;
	estadoReg: string;
	fecEstadoReg: string;
	fecIngReg: string;
	fecNacimiento: string;
	fecUltModifReg: string;
	idBeneficiario: string;
	idFuncionIngReg: string;
	idFuncionUltModifReg: string;
	idTutor: string;
	idUsuarioIngReg: string;
	idUsuarioUltModifReg: string;
	nombresBeneficiario: string;
	nombresTutor: string;
	porcentajeBeneficio: number;
	primerApellidoBeneficiario: string;
	primerApellidoTutor: string;
	segundoApellidoBeneficiario: string;
	segundoApellidoTutor: string;
	sexo: string;
	tipoBeneficiario: string;
}

export interface IBeneficiarioCreateApi {
	idBeneficiario: number;
	idBeneficiarioDv: string;
	primerApellido: string;
	segundoApellido: string;
	nombres: string;
	fecNacimiento: string;
	sexo: string;
	estadoCivil: string;
	tipoBeneficiario: string;
	codParentesco: string;
	porcentajeBeneficio: number;
	idAfiliado: number;
	idAfiliadoDv: string;
	idUsuarioIngReg: string;
	idFuncionIngReg: string;
}

export interface ITraerBeneficiarios {
	codMotivoEstadoBeneficiario: string;
	codParentesco: string;
	estadoCivil: string;
	estadoReg: string;
	fecEstadoReg: string;
	fecIngReg: string;
	fecNacimiento: string;
	fecUltModifReg: string;
	idBeneficiario: string;
	idFuncionIngReg: string;
	idFuncionUltModifReg: string;
	idTutor: string;
	idUsuarioIngReg: string;
	idUsuarioUltModifReg: string;
	nombresBeneficiario: string;
	nombresTutor?: string;
	porcentajeBeneficio: number;
	primerApellidoBeneficiario: string;
	primerApellidoTutor?: string;
	segundoApellidoBeneficiario: string;
	segundoApellidoTutor?: string;
	sexo: string;
	tipoBeneficiario: string;
}

export interface IModificarBeneficiario {
	idBeneficiario?: number;
	idBeneficiarioDv?: string;
	tipoBeneficiario?: string;
	codParentesco?: string;
	porcentajeBeneficio?: number;
	idAfiliado: number;
	idAfiliadoDv: string;
	idUsuarioUltModifReg?: string;
	idFuncionUltModifReg?: string;
	primerApellido?: string;
	segundoApellido?: string;
	nombres?: string;
	fecNacimiento?: string;
	sexo?: string;
	estadoCivil?: string;
}
