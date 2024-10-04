import React, { useState } from "react";
import { TableTotal } from "../../components";
import {
	DataTable,
	DataTableColumnProps,
	Divider,
	Button,
	H3,
	H4,
	H5,
	Card,
	Row,
	Col,
	SummaryTable,
	Modal,
} from "sonda.core.controls";
import { IDatosConsolidado } from "../../types/cursar-simulacion";
import { IPrevision, ITipoPension } from "../../types/prevision";
import { IModalidadPago } from "../../types/modalidad-pago";
import { convertToMoneyFormat } from "../../utils/index";
import { CrearSimulacion } from "../../../application/services/solicitud-pensionado-service";
import GetUsers from "../../hooks/getUsers";

const RequestSummary = ({
	consolidado,
	previsionOpciones,
	opcionesPension,
	modalidadPago,
}: {
	consolidado: IDatosConsolidado;
	previsionOpciones: IPrevision[];
	opcionesPension: ITipoPension[];
	modalidadPago: IModalidadPago[];
}) => {
	const [modalSuccess, setModalSuccess] = useState<boolean>(false);
	const [modalError, setModalError] = useState<boolean>(false);
	const [disableCancel, setDisableCancel] = useState<boolean>(false);
	const [numSolicitud, setNumSolicitud] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	const thirdTableColumns: DataTableColumnProps[] = [
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
			render: (value) => `$ ${convertToMoneyFormat(value || 0)}`,
		},
	];

	const modalidadPagoColumns =
		consolidado.modalidadPago === "DEP"
			? [
					{
						align: "center",
						dataIndex: "paymentType",
						key: "paymentType",
						title: "Tipo de Modalidad",
					},
					{
						align: "center",
						dataIndex: "bankName",
						key: "bankName",
						title: "Banco",
					},
					{
						align: "center",
						dataIndex: "accountType",
						key: "accountType",
						title: "Tipo de Cuenta",
					},
					{
						align: "center",
						dataIndex: "accountNumber",
						key: "accountNumber",
						title: "Nro. Cuenta",
					},
			  ]
			: [
					{
						align: "center",
						dataIndex: "paymentType",
						key: "paymentType",
						title: "Tipo de Modalidad",
					},
			  ];

	const handleSimmularSolicitud = async () => {
		setLoading(true);
		const usu = await GetUsers();

		const resultadoSolicitud = await CrearSimulacion({
			codInsFinanciera: consolidado.entidadPrevisionalPension?.toString() || "",
			idFuncion: "BENSIMULACIONPE",
			idPersona: consolidado.rut,
			idPersonaDv: consolidado.rutDv,
			idReceptorPago: consolidado.rut,
			idReceptorPagoDv: consolidado.rutDv,
			idSolicitante: consolidado.rut,
			idSolicitanteDv: consolidado.rutDv,
			idUsuario: usu,
			indActBeneficiarios: consolidado.indActBeneficiarios || "N",
			nombreSolicitante: consolidado.nombres,
			numMandatario: "0",
			numPoder: "0",
			numSolicitud: consolidado.numSolicitud?.toString() || "",
			tipoModalidadPago: consolidado.modalidadPago || "",
			tipoReceptor: "A",
			numCuentaBanco: consolidado.cuentaBancaria?.numCuentaBanco,
			tipoCuentaBanco: consolidado.cuentaBancaria?.tipoCuentaBanco,
		});

		if (resultadoSolicitud.header !== "AU00") {
			setLoading(false);
			setModalError(true);
			return;
		}

		setLoading(false);
		setDisableCancel(true);
		setModalError(false);
		setNumSolicitud(resultadoSolicitud.numSolicitud);
		setModalSuccess(true);
	};

	return (
		<>
			<Modal
				visible={modalError}
				showModal={setModalError}
				footer={
					<div className="flex gap-4">
						<Button
							id=""
							variant="primary"
							buttonType="Actualizar"
							label="Reintentar"
							onClick={() => handleSimmularSolicitud()}
						/>
						<Button
							id=""
							variant="secondary"
							buttonType="Volver"
							label="Volver"
							onClick={() => setModalError(false)}
						/>
					</div>
				}
			>
				<H4>
					Se generó la simulación correctamente bajo el número de solicitud {numSolicitud}, se
					genera comprobante.
				</H4>
			</Modal>
			<Modal
				visible={modalSuccess}
				showModal={(value) => setModalSuccess(value)}
				footer={
					<div className="flex gap-4">
						<Button
							id=""
							variant="secondary"
							buttonType="Volver"
							label="Volver"
							onClick={() => setModalSuccess(false)}
						/>
					</div>
				}
			>
				<H4>
					Se generó la simulación correctamente bajo el número de solicitud {numSolicitud}, se
					genera comprobante.
				</H4>
			</Modal>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<H3>Resumen solicitud</H3>
				</Col>
				<Col span={6}>
					<Card className="py-2 px-4 gap-0 h-17">
						<div className="flex justify-between gap-4 w-full">
							<div>
								<H5 className="flex font-normal">Tipo Pensión</H5>
								<H4 className="leading-4">
									{
										opcionesPension.find((f) => f.tipoPension === consolidado.tipoPension)
											?.descripcion
									}
								</H4>
							</div>
						</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card className="py-2 px-4 gap-0 h-17">
						<div className="flex justify-between gap-4 w-full">
							<div>
								<H5 className="flex font-normal">Fecha Pensión</H5>
								<H4 className="leading-4">{consolidado.fechaPension}</H4>
							</div>
						</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card className="py-2 px-4 gap-0 h-17">
						<div className="flex justify-between gap-4 w-full">
							<div>
								<H5 className="flex font-normal">Entidad Previsional</H5>
								<H4 className="leading-4">
									{
										previsionOpciones.find(
											(f) => f.codInstPrevision === consolidado.entidadPrevisionalPension,
										)?.descripcion
									}
								</H4>
							</div>
						</div>
					</Card>
				</Col>
				<Col span={6}>
					<Card className="py-2 px-4 gap-0 h-17">
						<div className="flex justify-between gap-4 w-full">
							<div>
								<H5 className="flex font-normal">Saldo Disponible</H5>
								<H4 className="leading-4">
									$ {convertToMoneyFormat(consolidado.valMlTotalGiro || 0)}
								</H4>
							</div>
						</div>
					</Card>
				</Col>

				<Col span={24}>
					<DataTable
						title="Cuadro de Pago"
						columns={thirdTableColumns}
						dataSource={consolidado.cuadroPago || []}
						pagination={false}
						persistGrid={false}
					/>
					<div className="flex justify-end w-full">
						<TableTotal
							label="Monto Final"
							value={convertToMoneyFormat(consolidado.valMlTotalGiro || 0)}
						/>
					</div>
				</Col>

				<Col span={24}>
					<SummaryTable
						title="Modalidad de pago"
						columns={modalidadPagoColumns}
						dataSource={[
							{
								bankName: consolidado.cuentaBancaria?.codInstFinancieraDescripcion,
								paymentType: modalidadPago.find(
									(f) => f.tipoModalidad === consolidado.modalidadPago,
								)?.descripcion,
								accountType: consolidado.cuentaBancaria?.tipoCuentaBancoDescripcion,
								accountNumber: consolidado.cuentaBancaria?.numCuentaBanco,
							},
						]}
					/>
				</Col>

				<Divider />
				<Col span={24}>
					<div className="flex flex-row gap-4 justify-end mt-4 full-width ant-spin-nested-loading--full-width">
						<Button
							variant="secondary"
							buttonType="Generar"
							id=""
							label="Generar Comprobante"
							onClick={() => handleSimmularSolicitud()}
							loading={loading}
						/>
						<Button
							buttonType="Cancelar"
							id="Cancelar"
							label="Cancelar Simulación"
							style={{ border: "none", backgroundColor: "red" }}
							disabled={disableCancel}
						/>
						<Button buttonType="Continuar" id="Despachar" label="Ir a Cursar Solicitud" disabled />
					</div>
				</Col>
			</Row>
		</>
	);
};

export { RequestSummary };
