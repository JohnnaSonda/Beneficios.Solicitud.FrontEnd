import React, { useEffect } from "react";
import { H3, Paragraph } from "sonda.core.controls/typography";
import {
	Col,
	Row,
	SummaryTable,
	SummaryTableColumnProps,
	DataTable,
	DataTableColumnProps,
	Button,
	Icon,
} from "sonda.core.controls";
import GetUser from "../../hooks/getUsers";
import { TableTotal } from "../../components";
import { ISaldos } from "../../types/solicitud-pensionado";
import { IDatosConsolidado } from "../../types/cursar-simulacion";
import { SimularSolicitud } from "../../../application/services/solicitud-pensionado-service";
import { convertToMoneyFormat } from "../../utils/index";
import moment from "moment-timezone";

const BenefitsView = ({
	saldos,
	setConsolidado,
	consolidado,
	nextTab,
	setTabDisabled,
}: {
	saldos: ISaldos[];
	setConsolidado: (value: any) => void;
	consolidado: IDatosConsolidado;
	nextTab: (
		tab: string,
		validate: "benefits" | "updateData" | "summary",
		setError?: (value: any) => void,
	) => void;
	setTabDisabled: (prevState: any) => void;
}) => {
	const columnsAffiliateBalance: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "tipoProducto",
			title: "Tipo de Producto",
		},
		{
			align: "center",
			dataIndex: "montoSaldoPesos",
			title: "Monto Saldo en Pesos",
			render: (value) => `$ ${Intl.NumberFormat("es-ES").format(value)}`,
		},
		{
			align: "center",
			dataIndex: "fechaCuota",
			title: "Fecha Cuota",
			render: (value) => {
				const splitDate = value.split(" ");
				const ddmmyySplited = splitDate[0].split("/");
				const formatedDate = `${ddmmyySplited[1]}/${ddmmyySplited[0]}/${ddmmyySplited[2]}`;

				return moment(formatedDate).format("DD/MM/YYYY");
			},
		},
		{
			align: "center",
			dataIndex: "valorCuota",
			title: "Valor Cuota",
		},
		{
			align: "center",
			dataIndex: "montoSaldoCuotas",
			title: "Monto Saldo en Cuotas",
		},
	];

	const columnsBenefits: SummaryTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "numGiro",
			title: "Nro. Giro",
		},
		{
			align: "center",
			dataIndex: "fecPagoOriginal",
			title: "Fecha Pago Giro",
		},
		{
			align: "center",
			dataIndex: "valMlGiro",
			title: "A Percibir",
			render: (value) => `$ ${convertToMoneyFormat(parseInt(value) || 0)}`,
		},
	];

	const columnsRejectionFcs: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "indRequisito",
			width: 70,
			title: "Estado",
			render: (value) => {
				if (value === "S")
					return (
						<Icon className="check-circle" icon={["fas", "check-circle"]} onClick={() => {}} />
					);
				return (
					<Icon className="icon-exclamation" icon={["fas", "xmark-circle"]} onClick={() => {}} />
				);
			},
		},
		{
			align: "center",
			dataIndex: "descRequisito",
			title: "Requisito",
		},
		{
			align: "center",
			width: 200,
			dataIndex: "cantReal",
			title: "Tiene",
		},
		{
			align: "center",
			width: 200,
			dataIndex: "cantRequisito",
			title: "Necesita",
		},
	];

	const handleSimularSolicitud = async () => {
		const usu = await GetUser();
		const simulacion = await SimularSolicitud({
			codAgencia: "0",
			codEntidadPrevisional: consolidado.entidadPrevisionalPension?.toString(),
			fecPension: consolidado.fechaPension,
			idFuncion: "BENSIMULACIONPE",
			idPersona: consolidado.rut,
			idPersonaDv: consolidado.rutDv,
			idUsuario: usu,
			numSolicitud: consolidado.numSolicitud?.toString(),
			tipoPension: consolidado.tipoPension,
		});

		setConsolidado({
			...consolidado,
			requisitos: simulacion.requisitos,
			cuadroPago: simulacion.cuadroPago,
			valMlTotalGiro: simulacion.valMlTotalGiro,
		});
		setTabDisabled((prevState: any) => ({ ...prevState, [2]: false }));
	};

	useEffect(() => {
		if (
			consolidado?.fechaPension &&
			consolidado?.tipoPension &&
			consolidado?.entidadPrevisionalPension &&
			!consolidado?.fechaError
		) {
			handleSimularSolicitud();
		}
	}, [
		consolidado?.fechaPension,
		consolidado?.tipoPension,
		consolidado?.entidadPrevisionalPension,
		consolidado?.fechaError,
	]);

	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<H3>Saldos Afiliado</H3>
				</Col>
				<Col span={12} className="mt-4 flex justify-end">
					<Button
						id=""
						buttonType="Siguiente"
						label="Siguiente"
						onClick={() => nextTab("2", "updateData")}
					/>
				</Col>
				<Col span={24} className="min-h-full">
					<DataTable
						title=""
						columns={columnsAffiliateBalance}
						dataSource={saldos}
						pagination={false}
						persistGrid={false}
					/>
				</Col>

				<Col span={24} className="min-h-full">
					<SummaryTable
						title="Cuadro de Pago"
						columns={columnsBenefits}
						dataSource={consolidado.cuadroPago || []}
					/>
					<div className="flex justify-end w-full">
						<TableTotal
							label="Monto Final"
							value={convertToMoneyFormat(consolidado.valMlTotalGiro || 0)}
						/>
					</div>
					<Paragraph className="text-center flex justify-center mt-4">
						Nota: Valores estimados, que pueden ser afectados con la variación del valor cuota a la
						fecha afectiva del pago.
					</Paragraph>
				</Col>
			</Row>

			<div>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<DataTable
							className="text-balance"
							title="Cumplimiento de Requisitos"
							columns={columnsRejectionFcs}
							dataSource={consolidado.requisitos || []}
							persistGrid={false}
						/>
					</Col>
				</Row>
			</div>

			{/* <Row gutter={[16, 16]}>
				<Col span={24} className="mt-4 flex justify-end">
					<Button
						id=""
						buttonType="Siguiente"
						label="Siguiente"
						onClick={() => nextTab("2", "updateData")}
					/>
				</Col>
			</Row> */}
		</>
	);
};

export { BenefitsView };
