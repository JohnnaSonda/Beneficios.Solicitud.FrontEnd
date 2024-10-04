import React from "react";

interface ITableTotal {
	label?: string;
	value: string | number;
	disabled?: boolean;
	selected?: boolean;
}

const TableTotal = ({ label = "Monto Final", value, disabled = false, selected }: ITableTotal) => {
	return (
		<div
			className={`flex justify-end text-nowrap full-width ${disabled && "table-total--disabled"}`}
		>
			<div
				className={`${
					selected && "table-total--border"
				} p-2 flex justify-center border-solid border-1 rounded-xl border-gray rounded-e-none`}
			>
				<span>{label}</span>
			</div>
			<div
				className={`${
					selected && "table-total--border"
				} p-2 flex justify-center border-solid border-1 rounded-xl border-gray rounded-l-none border-l-0`}
			>
				<span>$ {value}</span>
			</div>
		</div>
	);
};

export { TableTotal };
