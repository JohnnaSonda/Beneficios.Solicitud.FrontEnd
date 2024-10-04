export interface ITable {
	rut: string;
	businessName: string;
	typeContract: string;
	startDate: Date | null;
	terminationDate: Date | null;
	lastQuotedPeriod: Date;
	balance: number;
	presumedTerminationDate: Date;
	relationshipType: "Completa";
	file: string;
	participate: "Si" | "No";
}

export interface IForm
	extends Omit<
		ITable,
		| "balance"
		| "file"
		| "participate"
		| "relationshipType"
		| "lastQuotedPeriod"
		| "presumedTerminationDate"
	> {
	street: string;
	streetNumber: string;
	city: string;
	home?: string;
	commune: string;
	region: string;
	catastropheApplies?: boolean;
	contract: File | FileList[] | null;
	file: File | FileList[] | null;
}

export const defaultForm: IForm = {
	street: "",
	streetNumber: "",
	city: "",
	home: "",
	commune: "",
	region: "",
	catastropheApplies: false,
	businessName: "",
	rut: "",
	startDate: null,
	terminationDate: null,
	typeContract: "",
	contract: null,
	file: null,
};
