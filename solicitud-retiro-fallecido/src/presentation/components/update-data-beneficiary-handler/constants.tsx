import { TypeModal } from "../../types/update-data";
import { IBeneficiarioCreateApi } from "../../types/beneficiarios";
import React, { Dispatch, SetStateAction } from "react";
import { DataTableColumnProps, Icon } from "sonda.core.controls";
import { convertToMoneyFormat } from "../../utils/index";

export const getBeneficiaryColumns = (
	setSelectedBeneficiary: Dispatch<SetStateAction<IBeneficiarioCreateApi | undefined>>,
	setIsModalVisible: Dispatch<SetStateAction<boolean>>,
	setModalType: Dispatch<SetStateAction<TypeModal>>,
	setIsDeleteModalVisible: Dispatch<SetStateAction<boolean>>,
): DataTableColumnProps[] => [
	{
		dataIndex: "update",
		title: "Editar",
		align: "center",
		dataType: "string",
		width: 50,
		render: (_value, record) => (
			<Icon
				onClick={() => {
					setSelectedBeneficiary(record);
					setModalType("edit-beneficiary");
					setIsModalVisible(true);
				}}
				icon={["fas", "edit"]}
			/>
		),
	},
	{
		dataIndex: "availabilityTable",
		title: "Eliminar",
		align: "center",
		dataType: "string",
		width: 50,
		render: (_value: boolean, record) => (
			<Icon
				icon={["fas", "trash"]}
				className="error-icon"
				onClick={() => {
					setSelectedBeneficiary(record);
					setIsDeleteModalVisible(true);
				}}
			/>
		),
	},

	{
		title: "Nombre",
		align: "center",
		dataType: "string",
		dataIndex: "nombres",
	},
	{
		title: "Rut",
		align: "center",
		dataType: "string",
		dataIndex: "rut",
		render: (_value, record) => {
			return convertToMoneyFormat(parseInt(record.idBeneficiario)) + "-" + record.idBeneficiarioDv;
		},
	},
	{
		title: "Relación",
		align: "center",
		dataType: "string",
		dataIndex: "codParentesco",
	},
	{
		title: "Porcentaje",
		align: "center",
		dataType: "string",
		dataIndex: "porcentajeBeneficio",
		render: (value) => `${value} %`,
	},
];
