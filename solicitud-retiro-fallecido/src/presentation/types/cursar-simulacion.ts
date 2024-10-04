import { ICuentaBancaria } from "./cuenta-bancaria";
import { IPhoneContact, IMailContact } from "./contactos";

export interface IDatosConsolidado {
	rut: string;
	rutDv: string;
	nombres: string;
	primerApellido: string;
	segundoApellido: string;
	fechaNacimiento: string;
	edad: string;
	tipoPension?: string;
	fechaPension?: string;
	entidadPrevisionalPension?: number;
	numSolicitud?: number;
	valMlTotalGiro?: number;
	cuadroPago?: ICuadroPago[];
	requisitos?: any[];
	modalidadPago?: string;
	cuentaBancaria?: ICuentaBancaria;
	telefonoContacto?: IPhoneContact;
	mailContacto?: IMailContact;
	indActBeneficiarios?: string;
	fechaError?: boolean;
}

export interface ICuadroPago {
	fecPagoOriginal: string;
	numGiro: number;
	tasaGiro: number;
	valMlAporteFcs: number;
	valMlCuenta: number;
	valMlGiro: number;
}

export interface ISimularSolicitud {
	numSolicitud?: string;
	idPersona: string;
	idPersonaDv: string;
	codAgencia: string;
	codEntidadPrevisional?: string;
	tipoPension?: string;
	fecPension?: string;
	idUsuario: string;
	idFuncion: string;
}

export interface ICrearSolicitud {
	numSolicitud: string;
	idSolicitante: string;
	idSolicitanteDv: string;
	nombreSolicitante: string;
	idPersona: string;
	idPersonaDv: string;
	numPoder: string;
	numMandatario: string;
	tipoReceptor: string;
	idReceptorPago: string;
	idReceptorPagoDv: string;
	tipoModalidadPago: string;
	codInsFinanciera: string;
	tipoCuentaBanco?: string;
	numCuentaBanco?: string;
	indActBeneficiarios: string;
	idUsuario: string;
	idFuncion: string;
}
