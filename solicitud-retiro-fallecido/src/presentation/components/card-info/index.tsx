import React from "react";
import { Card, H4 } from "sonda.core.controls";

interface ICardInfo {
	label: string;
	value: string;
}

const CardInfo = ({ label, value }: ICardInfo) => {
	return (
		<Card className="py-2 px-4 gap-0">
			<div className="flex flex-column">
				<H4 className="leading-4 flex font-normal">{label}</H4>
				<span className="leading-20 font-bold">{value}</span>
			</div>
		</Card>
	);
};

export { CardInfo };
