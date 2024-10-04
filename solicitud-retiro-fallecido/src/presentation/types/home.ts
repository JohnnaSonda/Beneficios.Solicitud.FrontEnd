interface IClaim {
	numeroReclamo: number;
	motivoReclamo: string;
}

export interface IDataClaim {
	reclamos: IClaim[];
	estadoReg: string;
}
