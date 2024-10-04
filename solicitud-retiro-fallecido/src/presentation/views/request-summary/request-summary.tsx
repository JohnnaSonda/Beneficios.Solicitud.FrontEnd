import React, { useState } from "react";
import { TableTotal } from "../../components";
import {
	DataTable,
	DataTableColumnProps,
	Button,
	H3,
	H4,
	H5,
	Card,
	Row,
	Col,
	SummaryTable,
	Modal,
	GroupCheckboxField,
	Paragraph,
	UploadField,
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
	const [disableCancel, setDisableCancel] = useState<boolean>(true);
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
	
	const columnsAffiliate: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "rut",
			dataType: "string",
			title: "Rut",
		},
		{
			align: "center",
			dataIndex: "names",
			dataType: "string",
			title: "Nombres",
		},
		{
			align: "center",
			dataIndex: "lastName",
			dataType: "string",
			title: "Apellido Paterno",
		},
		{
			align: "center",
			dataIndex: "mothetLastName",
			dataType: "string",
			title: "Apellido Materno",
		},
		{
			align: "center",
			dataIndex: "birthDate",
			dataType: "date",
			customFormat: "DD/MM/YYYY",
			title: "Fecha de nacimiento",
		},
		{
			align: "center",
			dataIndex: "deathDate",
			dataType: "date",
			customFormat: "DD/MM/YYYY",
			title: "Fecha defunción",
		},
	];

	const dataAffiliate: any[] = [
		{
			rut: "12.345.567-8",
			names: "Elizabeth Antonia",
			lastName: "King",
			mothetLastName: "Dalton",
			birthDate: new Date(),
			deathDate: new Date(),
		},
	];

	const columnsBeneficiary: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "rut",
			dataType: "string",
			title: "Rut beneficiario",
		},
		{
			align: "center",
			dataIndex: "names",
			dataType: "string",
			title: "Nombres",
		},
		{
			align: "center",
			dataIndex: "lastName",
			dataType: "string",
			title: "Apellido Paterno",
		},
		{
			align: "center",
			dataIndex: "mothetLastName",
			dataType: "string",
			title: "Apellido Materno",
		},
		{
			align: "center",
			dataIndex: "relationship",
			dataType: "string",
			title: "Relación afiliado",
		},
		{
			align: "center",
			dataIndex: "relationship",
			dataType: "string",
			title: "Tipo de relación",
		},
	];

	const dataBeneficiary: any[] = [
		{
			rut: "12.345.567-8",
			names: "Steven",
			lastName: "Faust",
			mothetLastName: "Johnson",
			relationship: "Hijo",
			relationshipType: "Beneficiario declarado en vida",
		},
	];

	const columnsApplicant: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "rut",
			dataType: "string",
			title: "Rut solicitante",
		},
		{
			align: "center",
			dataIndex: "names",
			dataType: "string",
			title: "Nombres",
		},
		{
			align: "center",
			dataIndex: "lastName",
			dataType: "string",
			title: "Apellido Paterno",
		},
		{
			align: "center",
			dataIndex: "mothetLastName",
			dataType: "string",
			title: "Apellido Materno",
		},
	];

	const dataApplicant: any[] = [
		{
			rut: "12.345.567-8",
			names: "Steven",
			lastName: "Faust",
			mothetLastName: "Johnson",
		},
	];

	const columnsApplicantHome: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "street",
			dataType: "string",
			title: "Domicilio",
		},
		{
			align: "center",
			dataIndex: "streetNumber",
			dataType: "string",
			title: "Numero",
		},
		{
			align: "center",
			dataIndex: "type",
			dataType: "string",
			title: "Depto/Block/Pobl/Villa",
		},
		{
			align: "center",
			dataIndex: "region",
			dataType: "string",
			title: "Región",
		},
		{
			align: "center",
			dataIndex: "city",
			dataType: "string",
			title: "Ciudad",
		},
		{
			align: "center",
			dataIndex: "commune",
			dataType: "string",
			title: "Comuna",
		},
	];

	const dataApplicantHome: any[] = [
		{
			street: "Teatinos",
			streetNumber: "123",
			type: "Depto 720",
			region: "RM",
			city: "Santiago",
			commune: "Santiago",
		},
	];

	const columnsApplicantContact: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "phone",
			dataType: "string",
			title: "Teléfono",
		},
		{
			align: "center",
			dataIndex: "email",
			dataType: "string",
			title: "Email",
		},
		{
			align: "center",
			dataIndex: "cellPhone",
			dataType: "string",
			title: "Celular",
		},
	];

	const dataApplicantContact: any[] = [
		{
			phone: "988776655",
			email: "sonda@sonda.com",
			cellPhone: "+569 1234 5678",
		},
	];

	const columnsCalculateBenefits: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "origin",
			dataType: "string",
			title: "Origen",
		},
		{
			align: "center",
			dataIndex: "turnNumber",
			dataType: "string",
			title: "N° Giro",
		},
		{
			align: "center",
			dataIndex: "toPerceive",
			dataType: "string",
			title: "A percibir",
		},
	];

	const dataCalculateBenefits: any[] = [
		{
			origin: "Solicitud de retiro de fondos por fallecimiento",
			turnNumber: "1",
			toPerceive: "$ 3.000.000",
		},
		{
			origin: "Solicitud de remuneración",
			turnNumber: "1",
			toPerceive: "$ 328.000",
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
						<Card>
							<H4>Documentación recepcionada</H4>
							<GroupCheckboxField
								className="request-summary__checkbox"
								defaultValue={["Certificado defunción"]}
								onChange={function noRefCheck() {}}
								options={{
									data: [
										{
											id: "",
											name: "Certificado defunción",
										},
									],
									disabledOptions: ["Certificado defunción"],
									textField: "name",
									valueField: "id",
								}}
							/>
						</Card>
					</Col>

				<Col span={24}>
				<Card>
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
					</Card>
				</Col>

				<Col span={24}>
				<Card>
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
					</Card>
				</Col>

				<Col span={24}>
				<Card>
				<div>
					<DataTable
						title="Antecedentes afiliado"
						columns={columnsAffiliate}
						dataSource={dataAffiliate}
						pagination={false}
					/>
					<DataTable
						title="Antecedentes beneficiarios"
						columns={columnsBeneficiary}
						dataSource={dataBeneficiary}
						pagination={false}
					/>
				</div>
				<div className="request-summary__applicant">
					<H3>Antecedentes solicitante</H3>
					<H4>Información personal</H4>
					<div className="request-summary__table--header">
						<DataTable columns={columnsApplicant} dataSource={dataApplicant} pagination={false} />
					</div>
					<br />
					<Row gutter={[16, 24]}>
						<Col span={24}>
							<H4>Dirección</H4>
							<div className="request-summary__table--header">
								<DataTable
									columns={columnsApplicantHome}
									dataSource={dataApplicantHome}
									pagination={false}
								/>
							</div>
						</Col>
						<Col span={24}>
							<H4>Contacto</H4>
							<div className="request-summary__table--header">
								<DataTable
									columns={columnsApplicantContact}
									dataSource={dataApplicantContact}
									pagination={false}
								/>
							</div>
						</Col>
					</Row>
				</div>
				<div>
				<DataTable
						className="request-summary__table-calculate"
						title="Cálculo de prestaciones"
						columns={columnsCalculateBenefits}
						dataSource={dataCalculateBenefits}
						pagination={false}
					/>
					{/* <TableTotal amount={10000} /> */}
					<div className="request-summary__paragraph">
						<Paragraph>
							Nota, Valores estimados, que pueden ser afectados con la variación del valor cuota a
							al fecha efectiva del pago.
						</Paragraph>
					</div>
					<UploadField
						buttonLabel="Seleccionar"
						id="upload-input"
						label="Seleccionar comprobante firmado"
						name="upload-input-1"
					/>
				</div>
				</Card>
				</Col>
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
