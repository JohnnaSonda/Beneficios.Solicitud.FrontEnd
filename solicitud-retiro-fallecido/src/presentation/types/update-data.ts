export interface IUpdateData {
	type: string;
}

export type TypeModal =
	| "account"
	| "new-account"
	| "edit-account"
	| "edit-contact"
	| "beneficiary"
	| "new-beneficiary"
	| "edit-beneficiary";

export interface Beneficiary {
	names: string;
	lastName: string;
	motherLastName: string;
	rut: string;
	rutDv: string;
	relationship: string;
	percentage: string;
	birthDate: Date;
	availability?: string;
	availabilityTable?: boolean;
	tutor?: string;
	beneficiaryType?: string;
}

export interface BeneficiaryDTO {
	nombresBeneficiario: string;
	primerApellidoBeneficiario: string;
	segundoApellidoBeneficiario: string;
	idBeneficiario: string;
	codParentesco: string;
	porcentajeBeneficio: string;
	fecNacimiento: Date;
	idTutor: string;
	estadoReg: string;
	tipoBeneficiario: string;
}
