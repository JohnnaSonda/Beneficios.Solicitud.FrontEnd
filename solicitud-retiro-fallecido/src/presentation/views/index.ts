import { RequestSummary } from "./request-summary/request-summary";
import { BenefitsView } from "./benefits/benefits";
import { UpdateDataView } from "./update-data/update-data";
import { AffiliateData } from "./affiliate-data/affiliate-data";

export { RequestSummary, BenefitsView, UpdateDataView, AffiliateData };

export const rutFormatter = (wholeRut: string): { rutWithoutDv: string; rutDv: string } => {
	const rutWithoutZeros = wholeRut.replace(/^0+/, "");
	const rutDv = rutWithoutZeros.slice(-1);
	const rutWithoutDv = rutWithoutZeros.slice(0, -1);

	return {
		rutWithoutDv,
		rutDv,
	};
};
