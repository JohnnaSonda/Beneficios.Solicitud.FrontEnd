export const rutFormatter = (wholeRut: string): { rutWithoutDv: string; rutDv: string } => {
	const rutWithoutZeros = wholeRut.replace(/^0+/, "");
	const rutDv = rutWithoutZeros.slice(-1);
	const rutWithoutDv = rutWithoutZeros.slice(0, -1);

	return {
		rutWithoutDv,
		rutDv,
	};
};

export const convertToMoneyFormat = (numero: number) => {
	const result = Intl.NumberFormat("es-ES").format(numero);
	return result;
};
