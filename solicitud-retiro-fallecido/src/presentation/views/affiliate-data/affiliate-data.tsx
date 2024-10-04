import React, { useEffect, useState } from "react";
import {
	ButtonProps,
	Col,
	H3,
	Row,
	RutField,
	TextField,
	DatePickerField,
	ComboBoxField,
	Divider,
	DataTableColumnProps,
	DataTable,
	SpinLoader,
	Button,
	H2,
	HeaderControls,
	CheckboxField,
	UploadField,
	GroupRadioButtonField,
} from "sonda.core.controls";
import { IDataConsulting, ITabAfiliado } from "../../types/affiliate-data";
import moment from "moment-timezone";
import { ConsultarSolicitudPensionado } from "../../../application/services/consultar-solicitud-pensionado";
//import { NotificationInputError } from "../../components/index";
import { convertToMoneyFormat } from "../../utils/index";
import { InputsControls } from "sonda.core.controls/lib/components/layout/Sections/availableInputs";

const AffiliateData = ({
	rut,
	nombres,
	primerApellido,
	segundoApellido,
	//entidadPrevisional,
	fechaNacimiento,
	//tipoPension,
	//fechaPension,
	//previsionOpciones,
	//opcionesPension,
	//nuevaPrevision,
	//updateConsolidadaData,
	//setTabDisabled,
	//consolidada,
	//setConsolidada,
	nextTab,
}: ITabAfiliado) => {
	const [tableReject, setTableReject] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	// const [verifyData, setVerifyData] = useState({
	// 	datePension: false,
	// 	typePension: false,
	// 	pensionInstitutionDato: false,
	// });
	// const [errorInput, setErrorInput] = useState({
	// 	pensionDateInput: false,
	// 	prevNac: false,
	// 	typeOfPension: false,
	// 	pensionInstitution: false,
	// });
	const [dataConsulting, setDataConsulting] = useState<Array<IDataConsulting>>([]);
	const fechaPartes = fechaNacimiento?.split("/");
	const fechaParsed = `${fechaPartes[1]}/${fechaPartes[0]}/${fechaPartes[2]}`;
	const edadUsuario = moment().diff(fechaParsed, "years", false);
	//const pensionDateSplit = fechaPension ? fechaPension?.split("/") : [];
	//const pensionDate = `${pensionDateSplit[1]}/${pensionDateSplit[0]}/${pensionDateSplit[2]}`;

	const handleRejectedApplications = async () => {
		setLoading(true);
		const rutSplitted = rut.split("-");
		const result = await ConsultarSolicitudPensionado({
			idAfiliado: rutSplitted[0],
			idAfiliadoDv: rutSplitted[1],
		});
		if (result?.header === "AU00" && result?.consultarSolicitud?.length >= 1) {
			const rejectedApplications = result?.consultarSolicitud?.filter(
				(item: any) => item.estadoSolicitud === "RECH",
			);

			if (rejectedApplications.length > 0) {
				setLoading(false);
				setDataConsulting(rejectedApplications);
				setTableReject(true);
			} else {
				setLoading(false);
				setTableReject(false);
			}
		} else {
			setLoading(false);
		}
	};

	// const handleDatePensionChange = (date: any, dateString: any) => {
	// 	setErrorInput({
	// 		pensionDateInput: false,
	// 		typeOfPension: false,
	// 		pensionInstitution: false,
	// 		prevNac: false,
	// 	});
	// 	const selectedDate = moment(date);
	// 	const today = moment();

	// 	const birthDate = moment(fechaParsed);

	// 	if (selectedDate.isBefore(birthDate, "day")) {
	// 		updateConsolidadaData("fechaError", true);
	// 		setConsolidada({ ...consolidada, fechaError: true, fechaPension: dateString });
	// 		setErrorInput({
	// 			...errorInput,
	// 			prevNac: true,
	// 		});
	// 		return;
	// 	}

	// 	if (selectedDate.isAfter(today, "day")) {
	// 		updateConsolidadaData("fechaError", true);
	// 		setConsolidada({ ...consolidada, fechaError: true, fechaPension: dateString });
	// 		setErrorInput({
	// 			...errorInput,
	// 			pensionDateInput: true,
	// 		});
	// 		return;
	// 	}

	// 	setConsolidada({ ...consolidada, fechaError: false, fechaPension: dateString });
	// 	setVerifyData({
	// 		...verifyData,
	// 		datePension: true,
	// 	});
	// };

	// const handleTipoPensionChange = (value: any) => {
	// 	setVerifyData({
	// 		...verifyData,
	// 		typePension: !value,
	// 	});
	// };

	// const handleEntidadPrevisionalChange = (value: any) => {
	// 	const previsionFounded = previsionOpciones.find((f) => f.codInstPrevision === value);
	// 	nuevaPrevision(previsionFounded);
	// 	setVerifyData({
	// 		...verifyData,
	// 		pensionInstitutionDato: !!value,
	// 	});
	// };

	const rejectionsColumns: DataTableColumnProps[] = [
		{
			title: "Numero de solicitud",
			dataType: "string",
			dataIndex: "numSolicitud",
			align: "center",
		},
		{
			title: "Tipo Solicitud",
			dataType: "string",
			dataIndex: "descTipoSolicitud",
			align: "center",
		},
		{
			title: "Fecha Solicitud",
			dataType: "date",
			dataIndex: "fecSolicitud",
			align: "center",
		},
		{
			title: "Rut Empleador",
			dataType: "string",
			dataIndex: "idEmpleador",
			align: "center",
			render: (value) => {
				const rut = value.slice(0, -1);
				const rutDv = value.slice(-1);
				return `${convertToMoneyFormat(rut)}-${rutDv}`;
			},
		},
		{
			title: "Razón Social",
			dataType: "string",
			dataIndex: "razonSocial",
			align: "center",
		},
		{
			title: "Causal Cese",
			dataType: "string",
			dataIndex: "descCodCausalCese",
			align: "center",
		},
		{
			title: "Fecha Cese",
			dataType: "date",
			dataIndex: "fecFinContrato",
			align: "center",
		},
	];

	// const columnsManualEntry: DataTableColumnProps[] = [
	// 	{
	// 		align: "center",
	// 		dataIndex: "beneficiaryType",
	// 		dataType: "string",
	// 		title: "Tipo de beneficiario",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "rut",
	// 		dataType: "string",
	// 		title: "Rut",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "names",
	// 		dataType: "string",
	// 		title: "Nombres",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "lastName",
	// 		dataType: "string",
	// 		title: "Apellido Paterno",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "motherLastName",
	// 		dataType: "string",
	// 		title: "Apellido Materno",
	// 	},
	// 	{
	// 		align: "center",
	// 		customFormat: "DD/MM/YYYY",
	// 		dataIndex: "birthDate",
	// 		dataType: "date",
	// 		title: "Fecha de nacimiento",
	// 	},
	// ];

	// const dataManualEntry: any[] = [
	// 	{
	// 		rut: "201665272",
	// 		beneficiaryType: "Prelación",
	// 		names: "Steven",
	// 		lastName: "Faust",
	// 		motherLastName: "Jonhson",
	// 		birthDate: new Date(),
	// 	},
	// ];
	
	// const columnsBeneficiary: DataTableColumnProps[] = [
	// 	{
	// 		align: "center",
	// 		dataIndex: "beneficiaryType",
	// 		dataType: "string",
	// 		title: "Tipo de beneficiario",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "rut",
	// 		dataType: "string",
	// 		title: "Rut",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "names",
	// 		dataType: "string",
	// 		title: "Nombres",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "lastName",
	// 		dataType: "string",
	// 		title: "Apellido Paterno",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "motherLastName",
	// 		dataType: "string",
	// 		title: "Apellido Materno",
	// 	},
	// 	{
	// 		align: "center",
	// 		customFormat: "DD/MM/YYYY",
	// 		dataIndex: "birthDate",
	// 		dataType: "date",
	// 		title: "Fecha de nacimiento",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "percentage",
	// 		dataType: "number",
	// 		title: "Porcentaje",
	// 	},
	// 	{
	// 		align: "center",
	// 		dataIndex: "collection",
	// 		dataType: "string",
	// 		title: "Cobro",
	// 	},
	// ];

	// const dataBeneficiary: any[] = [
	// 	{
	// 		rut: "201665272",
	// 		beneficiaryType: "Declarado en vida",
	// 		names: "Steven",
	// 		lastName: "Faust",
	// 		motherLastName: "Jonhson",
	// 		birthDate: new Date(),
	// 		percentage: 100,
	// 		collection: "No",
	// 	},
	// ];

	const columnsMandate: DataTableColumnProps[] = [
		{
			align: "center",
			dataIndex: "rut",
			dataType: "string",
			title: "Rut",
		},
		{
			align: "center",
			dataIndex: "fullName",
			dataType: "string",
			title: "Nombres",
		},
		{
			align: "center",
			dataIndex: "email",
			dataType: "string",
			title: "Correo",
		},
		{
			align: "center",
			dataIndex: "state",
			dataType: "string",
			title: "Estado",
		},
	];

	const dataMandate: any[] = [
		{
			rut: "12.345.678-9",
			fullName: "Kayla Ambar Rindlisbacher Hudson",
			email: "kayla.a@gmail.com",
			state: "Vigente",
		},
	];

	const inputsDateDeath: InputsControls[] = [
		[
			{
				inputType: "datepickerfield",
				name: "dateDeath",
				defaultValue: "",
				label: "Fecha de defunción",
				placeholder: "DD/MM/AAAA",
			},
		],
	];

	const buttonDateDeath: ButtonProps[] = [
		{
			label: "Validar fecha",
			onClick: () => console.log("buscando"),
			id: "",
		},
	];

	useEffect(() => {
		handleRejectedApplications();
	}, []);

	// useEffect(() => {
	// 	if (fechaPension) {
	// 		setVerifyData((prevState) => ({
	// 			...prevState,
	// 			datePension: true,
	// 		}));
	// 	}
	// }, [fechaPension]);

	// useEffect(() => {
	// 	if (verifyData.datePension && verifyData.pensionInstitutionDato && verifyData.typePension) {
	// 		setTabDisabled((prevState: any) => ({
	// 			...prevState,
	// 			[1]: { ...prevState[1], disabled: false },
	// 		}));
	// 	}
	// }, [verifyData]);

	function handleChangeTable(_arg0: number) {
		throw new Error("Function not implemented.");
	}

	return (
		<SpinLoader size="normal" spinning={loading}>
			<Row gutter={[16, 16]}>
				<Col span={12}>
					<H3>Antecedentes Afiliado</H3>
				</Col>
				<Col span={12} className="mt-4 flex justify-end">
					<Button
						id=""
						buttonType="Siguiente"
						label="Siguiente"
						onClick={() => nextTab("2", "benefits")}
					/>
				</Col>
				<Col span={6}>
					<RutField label="Rut" disabled value={rut} />
				</Col>
				<Col span={6}>
					<TextField label="Nombres" disabled value={nombres} />
				</Col>
				<Col span={6}>
					<TextField label="Primer Apellido" disabled value={primerApellido} />
				</Col>
				<Col span={6}>
					<TextField label="Segundo Apellido" disabled value={segundoApellido} />
				</Col>
				<Col span={6}>
					<DatePickerField
						disabled
						value={fechaParsed}
						label="Fecha de Nacimiento"
						format="DDMMAAAA"
					/>
				</Col>
				<Col span={6}>
					<TextField disabled value={edadUsuario.toString()} label="Edad" />
				</Col>
			</Row>
			<br></br>
			{/* <Divider />
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<H3>Antecedentes de Pensión</H3>
				</Col>
				<Col span={8}>
					<ComboBoxField
						label="Tipo de Pensión"
						value={tipoPension}
						placeholder="Seleccione"
						variant={errorInput.typeOfPension ? "error" : "normal"}
						options={{
							data: opcionesPension,
							textField: "descripcion",
							valueField: "tipoPension",
						}}
						onChange={(value) => {
							handleTipoPensionChange(value);
							updateConsolidadaData("tipoPension", value);
						}}
					/>
					{errorInput.typeOfPension && (
						<NotificationInputError message="El Tipo de Pension es Obligatorio" />
					)}
				</Col>
				<Col span={8}>
					<DatePickerField
						value={pensionDate}
						label="Fecha de Pensión"
						format="DDMMAAAA"
						onChange={(date, dateString) => {
							if (dateString.includes(" ")) return;
							handleDatePensionChange(date, dateString);
						}}
						placeholder="Fecha de pensión"
						variant={
							errorInput.pensionDateInput ? "error" : errorInput.prevNac ? "error" : "normal"
						}
					/>
					{errorInput.pensionDateInput && (
						<NotificationInputError message="La fecha de Pensión no puede ser mayor a la fecha de Solicitud" />
					)}
					{errorInput.prevNac && (
						<NotificationInputError message="La fecha de Pensión no puede ser antes de la fecha de nacimiento" />
					)}
				</Col>
				<Col span={8}>
					<ComboBoxField
						value={entidadPrevisional}
						label="Entidad Previsional Pensión"
						placeholder="Seleccione"
						options={{
							data: previsionOpciones,
							textField: "descripcion",
							valueField: "codInstPrevision",
						}}
						onChange={(value) => {
							handleEntidadPrevisionalChange(value);
							updateConsolidadaData("entidadPrevisionalPension", value);
						}}
						variant={errorInput.pensionInstitution ? "error" : "normal"}
					/>
					{errorInput.pensionInstitution && (
						<NotificationInputError message="La Entidad Previsional es Obligatoria" />
					)}
				</Col>
			</Row> */}
			{tableReject && (
				<>
					<Divider />
					<DataTable
						persistGrid={false}
						columns={rejectionsColumns}
						dataSource={dataConsulting}
						pagination={{ pageSize: 4 }}
						title="Solicitudes Rechazadas"
					/>
				</>
			)}
			{/* <Row gutter={[16, 16]}>
				<Col span={24} className="mt-4 flex justify-end">
					<Button
						id=""
						buttonType="Siguiente"
						label="Siguiente"
						onClick={() => nextTab("1", "benefits", setErrorInput)}
					/>
				</Col>
			</Row> */}
			<Divider />
			<div>
				<H2>Validar fecha de defunción</H2>
				<HeaderControls inputs={inputsDateDeath} buttonControls={buttonDateDeath} />
			</div>
			<br />

			<Divider />
					<H2>Documentación recibida</H2>
					<div className="affiliate-data__documentation-received">
						<Row gutter={[16, 24]}>
							<Col span={6}>
								<CheckboxField label="Acuerdo unión civil" onChange={function noRefCheck() {}} />
								<CheckboxField
									label="Certificado nacimiento trabajador"
									onChange={function noRefCheck() {}}
								/>
							</Col>
							<Col span={6}>
								<CheckboxField label="Posesión efectiva" onChange={function noRefCheck() {}} />
								<CheckboxField
									label="Certificado de matrimonio"
									onChange={function noRefCheck() {}}
								/>
							</Col>
							<Col span={6}>
								<CheckboxField
									label="Certificado nacimiento hijo"
									onChange={function noRefCheck() {}}
								/>
								<CheckboxField label="Escritura publica" onChange={function noRefCheck() {}} />
							</Col>
							<Col span={6}>
								<CheckboxField label="Posesión efectiva" onChange={function noRefCheck() {}} />
								<CheckboxField label="Tutoría legal" onChange={function noRefCheck() {}} />
							</Col>
							<Col>
								<UploadField
									label="Seleccione documento"
									buttonLabel="Subir archivo"
									id="upload-input"
									maxCount={1}
									name="upload-input-1"
									position="bottom"
								/>
							</Col>
						</Row>
						<Button buttonType="Actualizar" id="Actualizar" label="Actualizar" />
					</div>
				 <br></br>
				<Divider />
					{/*<H2>Beneficiarios</H2>
					<DataTable
						title="Ingreso manual"
						columns={columnsManualEntry}
						dataSource={dataManualEntry}
						pagination={false}
					/>
					<DataTable
						checkedField="rut"
						columns={columnsBeneficiary}
						dataSource={dataBeneficiary}
						onChangeRowSelection={function noRefCheck(i) {
							handleChangeTable(+i);
						}}
						rowSelection="radio"
						title="Beneficiario solicitante"
						pagination={false}
					/>
					<Divider />				 */}

					<H2>Solicitante</H2>
					<div className="affiliate-data__checkbox">
						<GroupRadioButtonField
							defaultValue="Apple"
							label="Tipo solicitante"
							onChange={function noRefCheck() {}}
							options={{
								data: [
									{
										id: "beneficiary",
										name: "Beneficiario",
									},
									{
										id: "prelation",
										name: "Prelación",
									},
									{
										id: "heir",
										name: "Heredero",
									},
								],
								disabledOptions: ["Orange"],
								textField: "name",
								valueField: "id",
							}}
						/>
					</div>
					<br></br>
					<Row gutter={[16, 24]}>
						<Col span={6}>
							<TextField
								label="Rut trabajador"
								onBlur={function noRefCheck() {}}
								onChange={function noRefCheck() {}}
								onFocus={function noRefCheck() {}}
								placeholder="Ingresa el texto aqui"
								type="text"
							/>
						</Col>
						<Col span={6}>
							<TextField
								label="Nombres"
								onBlur={function noRefCheck() {}}
								onChange={function noRefCheck() {}}
								onFocus={function noRefCheck() {}}
								placeholder="Ingresa el texto aqui"
								type="text"
							/>
						</Col>
						<Col span={6}>
							<TextField
								label="Apellido Paterno"
								onBlur={function noRefCheck() {}}
								onChange={function noRefCheck() {}}
								onFocus={function noRefCheck() {}}
								placeholder="Ingresa el texto aqui"
								type="text"
							/>
						</Col>
						<Col span={6}>
							<TextField
								label="Apellido Materno"
								onBlur={function noRefCheck() {}}
								onChange={function noRefCheck() {}}
								onFocus={function noRefCheck() {}}
								placeholder="Ingresa el texto aqui"
								type="text"
							/>
						</Col>
					</Row>

					<Row gutter={[16, 24]}>
						<Col span={12}>
							<TextField
								label="Calle"
								onBlur={function noRefCheck() {}}
								onChange={function noRefCheck() {}}
								onFocus={function noRefCheck() {}}
								placeholder="Ingresa el texto aqui"
								type="text"
							/>
						</Col>
						<Col span={6}>
							<TextField
								label="Número"
								onBlur={function noRefCheck() {}}
								onChange={function noRefCheck() {}}
								onFocus={function noRefCheck() {}}
								placeholder="Ingresa el texto aqui"
								type="text"
							/>
						</Col>
						<Col span={6}>
							<TextField
								label="Depto/Block/Pobl/Villa"
								onBlur={function noRefCheck() {}}
								onChange={function noRefCheck() {}}
								onFocus={function noRefCheck() {}}
								placeholder="Ingresa el texto aqui"
								type="text"
							/>
						</Col>
					</Row>

					<div>
						<Row gutter={[16, 24]}>
							<Col span={6}>
								<ComboBoxField
									defaultValue="RM"
									label="Región"
									onChange={function noRefCheck() {}}
									options={{
										data: [
											{
												id: "RM",
												name: "RM",
											},
										],
										textField: "name",
										valueField: "id",
									}}
								/>
							</Col>
							<Col span={6}>
								<TextField
									label="Ciudad"
									onBlur={function noRefCheck() {}}
									onChange={function noRefCheck() {}}
									onFocus={function noRefCheck() {}}
									placeholder="Ingresa el texto aqui"
									type="text"
								/>
							</Col>
							<Col span={6}>
								<ComboBoxField
									defaultValue="SANTIAGO"
									label="Comuna de nacimiento"
									onChange={function noRefCheck() {}}
									options={{
										data: [
											{
												id: "McLaren",
												name: "McLaren",
											},
											{
												id: "Ferrari",
												name: "Ferrari",
											},
											{
												id: "Mercedes",
												name: "Mercedes",
											},
											{
												id: "Red Bull",
												name: "Red Bull",
											},
											{
												id: "Renault",
												name: "Renault",
											},
										],
										disabledOptions: ["Renault"],
										textField: "name",
										valueField: "id",
									}}
									placeholder="Seleccionar tu marca de auto"
								/>
							</Col>
							<Col>
								<div className="affiliate-data__checkbox">
									<GroupRadioButtonField
										defaultValue="Apple"
										label="Mandatario"
										onChange={function noRefCheck() {}}
										options={{
											data: [
												{
													id: "si",
													name: "Si",
												},
												{
													id: "no",
													name: "No",
												},
											],
											disabledOptions: ["Orange"],
											textField: "name",
											valueField: "id",
										}}
									/>
								</div>
							</Col>
						</Row>
					</div>
					<Button buttonType="Actualizar" id="Actualizar" label="Actualizar" />
				
				<br></br>

				<Divider />
					<H2>Mandato</H2>
					<DataTable
						checkedField="rut"
						columns={columnsMandate}
						dataSource={dataMandate}
						onChangeRowSelection={function noRefCheck(i) {
							handleChangeTable(+i);
						}}
						rowSelection="radio"
						title="Antecedentes Mandatario"
						pagination={false}
					/>
					<Button buttonType="Despachar" id="mandatory" label="Ir a mandatos" />
				
		</SpinLoader>
	);
};

export { AffiliateData };
