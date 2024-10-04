import { TypeModal } from "../../types/update-data";
import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import {
	Col,
	Row,
	H3,
	Button,
	DataTable,
	DataTableColumnProps,
	Modal,
	BodyControls,
	TextField,
	NumberField,
	ComboBoxField,
	Icon,
	ToastNotification,
	CheckboxField,
	Card,
	Divider,
} from "sonda.core.controls";
import GetUser from "../../hooks/getUsers";
import { BeneficiaryHandler } from "../../components/update-data-beneficiary-handler/BeneficiaryHandler";
import { CrearCuentaBancaria } from "../../../application/services/crear-cuenta";
import { ModificarCuentaBancaria } from "../../../application/services/modificar-cuenta-bancaria";
import { EliminarCuentaBancaria } from "../../../application/services/eliminar-cuenta";
import {
	PhonesSearch,
	MailsSearch,
	UpdatePersonPhone,
	UpdatePersonMail,
	CrearEmail,
	CrearTelefono,
} from "../../../application/services/person-services";
import {
	ICuentaBancaria,
	ICuentaBancariaApi,
	ICrearCuenta,
	IEditarCuenta,
	IEliminarCuenta,
} from "../../types/cuenta-bancaria";
import { IInstitucionFinanciera } from "../../types/institucion-financiera";
import {
	IPhoneContact,
	IMailContact,
	IEditContactPhone,
	IEditContactMail,
	ITipoMail,
	ITipoTelefono,
	ICrearEmail,
	ICrearTelefono,
} from "../../types/contactos";
import { IModalidadPago } from "../../types/modalidad-pago";
import { rutFormatter } from "../../utils/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let schemaCuentaBancaria = yup.object().shape({
	entidadBancaria: yup.string().required("Debe seleccionar una entidad bancaria."),
	tipoCuenta: yup.string().required("Debe seleccionar un tipo de cuenta."),
	cuentaBancaria: yup.number().required("Debe indicar número de cuenta."),
	indPreferente: yup.boolean().default(false),
});

let schemaTelContacto = yup.object().shape({
	numTelefono: yup
		.string()
		.required("Debe ingresar un teléfono contacto.")
		.min(9, "Debe ingresar mínimo 9 digitos.")
		.max(9, "Debe ingresar máximo 9 digitos."),
	tipoTelefono: yup.string().required("Debe seleccionar un tipo de teléfono."),
	indPreferenteTel: yup.boolean(),
});

let schemaCorreoContacto = yup.object().shape({
	direccionEmail: yup.string().required("Debe ingresar un correo contacto."),
	tipoEmail: yup.string().required("Debe seleccionar un tipo de correo."),
	indPreferenteEmail: yup.boolean(),
});

const UpdateDataView = ({
	setTabDisabled,
	cuentasBancarias,
	modalidadPago,
	tipoCuenta,
	entidadBancaria,
	rut,
	setRefreshCuentas,
	tipoMail,
	tipoTelefono,
	updateConsolidadaData,
	nextTab,
}: {
	setTabDisabled: any;
	cuentasBancarias: ICuentaBancaria[];
	modalidadPago: IModalidadPago[];
	tipoCuenta: ICuentaBancariaApi[];
	entidadBancaria: IInstitucionFinanciera[];
	rut: string;
	setRefreshCuentas: (value: boolean) => void;
	tipoMail: ITipoMail[];
	tipoTelefono: ITipoTelefono[];
	updateConsolidadaData: (key: string, value: string) => void;
	nextTab: (
		tab: string,
		validate: "benefits" | "updateData" | "summary",
		setError?: (value: any) => void,
	) => void;
}): ReactElement => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showBankModal, setShowBankModal] = useState<boolean>(false);
	const [showDeleteBankModal, setShowDeleteBankModal] = useState<boolean>(false);
	const [editBank, setEditBank] = useState<boolean>(false);
	const [resetModalValues, setResetModalValues] = useState<boolean>(false);
	const [typeModal, setTypeModal] = useState<TypeModal>("edit-beneficiary");
	const [porcentajeInput, setPorcentajeInput] = useState("");
	const [_error, setError] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("DEP");
	const [modalTitle, setModalTitle] = useState<string>("");
	const [editCuentaBancaria, setEditCuentaBancaria] = useState<IEditarCuenta>();
	const [phones, setPhones] = useState<IPhoneContact[]>([]);
	const [mails, setMails] = useState<IMailContact[]>([]);
	const [phoneModal, setPhoneModal] = useState<boolean>(false);
	const [editingPhone, setEditingPhone] = useState<boolean>(false);
	const [resetPhoneValue, setResetPhoneValue] = useState<boolean>(false);
	const [editPhone, setEditPhone] = useState<IPhoneContact>();
	const [phoneModalTitle, setPhoneModalTitle] = useState<string>("");
	const [mailModal, setMailModal] = useState<boolean>(false);
	const [editingMail, setEditingMail] = useState<boolean>(false);
	const [editMail, setEditMail] = useState<IMailContact>();
	const [mailModalTitle, setMailModalTitle] = useState<string>("");

	const [beneficiaryState, setBeneficiaryState] = useState<any>([
		{
			name: "Fredy Mauricio Inostroza Montenegro",
			rut: "16.687.294-4",
			relationship: "Hija",
			percentage: "45%",
			birthDate: new Date(),
			tutor: "NO",
			state: "Vigente",
		},
	]);

	const rutAffiliate = rutFormatter(rut);

	/**Manejador datos cuenta bancaria */
	const formCuentaBancaria = useForm({
		resolver: yupResolver(schemaCuentaBancaria),
	});

	/**Manejador datos teléfono contacto */
	const formTelefonoContacto = useForm({
		resolver: yupResolver(schemaTelContacto),
	});

	/**Manejador datos correo contacto */
	const formCorreoContacto = useForm({
		resolver: yupResolver(schemaCorreoContacto),
	});

	const bankAccountColumns: DataTableColumnProps[] = [
		{
			title: "Editar",
			align: "center",
			dataType: "string",
			dataIndex: "editar",
			render: (_value, record) => (
				<Icon
					icon={["fas", "edit"]}
					className="edit-icon"
					onClick={() => {
						setEditCuentaBancaria(record);
						formCuentaBancaria.setValue("entidadBancaria", parseInt(record.codInstFinanciera));
						formCuentaBancaria.setValue("tipoCuenta", record.tipoCuentaBanco);
						formCuentaBancaria.setValue("cuentaBancaria", parseInt(record.numCuentaBanco));
						formCuentaBancaria.setValue(
							"indPreferente",
							record.indPreferente === "S" ? true : false,
						);
						setShowBankModal(true);
						setEditBank(true);
					}}
				/>
			),
		},
		{
			title: "Eliminar",
			align: "center",
			dataType: "string",
			dataIndex: "delete",
			render: (_value, record) => (
				<Icon
					icon={["fas", "trash"]}
					className="error-icon"
					onClick={() => {
						setEditCuentaBancaria(record);
						setShowDeleteBankModal(true);
					}}
				/>
			),
		},
		{
			title: "Preferente",
			align: "center",
			dataType: "string",
			dataIndex: "indPreferente",
			render: (value) => (value === "S" ? "SÍ" : "NO"),
		},
		{
			title: "Entidad Bancaria",
			align: "center",
			dataType: "string",
			dataIndex: "codInstFinancieraDescripcion",
		},
		{
			title: "Tipo de Cuenta",
			align: "center",
			dataType: "string",
			dataIndex: "tipoCuentaBancoDescripcion",
		},
		{
			title: "Cuenta Bancaria",
			align: "center",
			dataType: "string",
			dataIndex: "numCuentaBanco",
		},
	];

	/**Columnas correos de contacto */
	const contactEmailColumns: DataTableColumnProps[] = [
		{
			title: "Editar",
			align: "center",
			dataType: "string",
			dataIndex: "editar",
			width: 70,
			render: (_value, record) => (
				<Icon
					icon={["fas", "edit"]}
					className="edit-icon"
					onClick={() => {
						setEditMail(record);
						formCorreoContacto.setValue("direccionEmail", record.direccionEmail);
						formCorreoContacto.setValue("tipoEmail", record.tipoEmail);
						formCorreoContacto.setValue(
							"indPreferenteEmail",
							record.indPreferenteMail === "S" ? true : false,
						);
						setMailModalTitle("Editar correo contacto");
						setMailModal(true);
						setEditingMail(true);
					}}
				/>
			),
		},
		{
			title: "Preferente",
			align: "center",
			dataType: "string",
			dataIndex: "indPreferenteMail",
			render: (value) => (value === "S" ? "SÍ" : "NO"),
		},
		{
			title: "Tipo Correo",
			align: "center",
			dataType: "string",
			dataIndex: "tipoEmail",
			render: (value) => tipoMail.find((f) => f.tipoEmail === value)?.descripcion || "",
		},
		{
			title: "Correo Electrónico",
			align: "center",
			dataType: "string",
			dataIndex: "direccionEmail",
		},
	];

	const contactTelColumns: DataTableColumnProps[] = [
		{
			title: "Editar",
			align: "center",
			dataType: "string",
			dataIndex: "editar",
			width: 70,
			render: (_value, record) => (
				<Icon
					icon={["fas", "edit"]}
					className="edit-icon"
					onClick={() => {
						setEditPhone(record);
						formTelefonoContacto.setValue("numTelefono", record.numTelefono);
						formTelefonoContacto.setValue("tipoTelefono", record.tipoTelefono);
						formTelefonoContacto.setValue(
							"indPreferenteTel",
							record.indPreferenteTel === "S" ? true : false,
						);
						setPhoneModalTitle("Editar teléfono contacto");
						setPhoneModal(true);
						setEditingPhone(true);
					}}
				/>
			),
		},
		{
			title: "Preferente",
			align: "center",
			dataType: "string",
			dataIndex: "indPreferenteTel",
			render: (value) => (value === "S" ? "SÍ" : "NO"),
		},
		{
			title: "Tipo teléfono",
			align: "center",
			dataType: "string",
			dataIndex: "tipoTelefono",
			render: (value) => tipoTelefono.find((f) => f.tipoTelefono === value)?.descripcion || "",
		},
		{
			title: "Teléfono",
			align: "center",
			dataType: "string",
			dataIndex: "numTelefono",
		},
	];

	const beneficiaryColumns: DataTableColumnProps[] = [
		{
			title: "Nombre",
			align: "center",
			dataType: "string",
			dataIndex: "name",
		},
		{
			title: "Rut Beneficiario",
			align: "center",
			dataType: "string",
			dataIndex: "rut",
		},
		{
			title: "Relación",
			align: "center",
			dataType: "string",
			dataIndex: "relationship",
		},
		{
			title: "Porcentaje",
			align: "center",
			dataType: "string",
			dataIndex: "percentage",
		},
		{
			title: "Fecha de Nacimiento",
			align: "center",
			dataType: "date",
			dataIndex: "birthDate",
		},
		{
			title: "Tutor",
			align: "center",
			dataType: "string",
			dataIndex: "tutor",
		},
		{
			title: "Estado",
			align: "center",
			dataType: "string",
			dataIndex: "state",
		},
		{
			title: "Porcentaje",
			align: "center",
			dataType: "string",
			dataIndex: "percentage",
		},
	];

	const titleModalMap = new Map<TypeModal, string>([
		["account", "Modificar Cuentas Bancarias"],
		["edit-account", "Editar Cuenta Bancaria"],
		["new-account", "Nueva Cuenta Bancaria"],
		["beneficiary", "Modificar Beneficiarios"],
		["edit-beneficiary", "Editar Beneficiario"],
		["new-beneficiary", "Nuevo Beneficiario"],
		["edit-contact", "Contacto"],
	]);

	const handleChangePorcentaje = (event: any) => {
		const nuevoPorcentaje = event.target.value;
		setPorcentajeInput(nuevoPorcentaje);
	};

	const agregarPorcentaje = () => {
		const nuevoPorcentaje = parseFloat(porcentajeInput);
		const porcentajeTotalActual = beneficiaryState.reduce(
			(acumulador: any, item: any) => acumulador + item.percentage,
			0,
		);

		if (
			nuevoPorcentaje <= 0 ||
			nuevoPorcentaje > 100 ||
			porcentajeTotalActual + nuevoPorcentaje > 100 ||
			isNaN(nuevoPorcentaje)
		) {
			setError("Porcentaje inválido");
		} else {
			const nuevoDato = {
				name: "Mauricio Fredy Montenegro Inostroza",
				rut: "12.345.678-9",
				relationship: "Hijo",
				percentage: nuevoPorcentaje,
			};
			setBeneficiaryState([...beneficiaryState, nuevoDato]);
			setPorcentajeInput("");
			setError("");
		}
	};

	/**Crear / Editar cuenta bancaria. */
	const handleCuentaBancaria = async (data: any) => {
		/**Se obtiene usuario. */
		const user = await GetUser();

		/**Se trabaja el rut para obtener el DV y rut sin DV */
		const rutParsed = rut?.split("").slice(-9, -1).join("");
		const rutParsedDv = rut?.split("").slice(-1).join("");

		if (editBank) {
			/**Json para modificar cuenta bancaria */
			const modificarCuentaBancaria: IEditarCuenta = {
				seqCuentaBancaria: editCuentaBancaria!.seqCuentaBancaria,
				codInstFinanciera: data.entidadBancaria,
				idAfiliado: parseInt(rutParsed),
				idAfiliadoDv: rutParsedDv,
				fun: "BENSIMULACIONPE",
				usu: user,
				indPreferente: data.indPreferente ? "S" : "N",
				numCuentaBanco: data.cuentaBancaria.toString(),
				tipoCuentaBanco: data.tipoCuenta,
			};

			const result = await ModificarCuentaBancaria(modificarCuentaBancaria);

			if (result.header !== "AU00") {
				ToastNotification({
					description: result?.message || "",
					duration: 10,
					key: "",
					message: "Error al modificar cuenta bancaria.",
					type: "error",
				});
			} else {
				ToastNotification({
					description: "La cuenta se ha modificado correctamente.",
					duration: 10,
					key: "",
					message: "Cuenta modificada correctamente.",
					type: "success",
				});
				setShowBankModal(false);
				setRefreshCuentas(true);
			}
		} else {
			/**Se arma json para crear cuenta. */
			const crearCuentaDatos: ICrearCuenta = {
				codInstFinanciera: data.entidadBancaria,
				idAfiliado: parseInt(rutParsed),
				idAfiliadoDv: rutParsedDv,
				fun: "BENSIMULACIONPE",
				usu: user,
				indPreferente: data.indPreferente ? "S" : "N",
				numCuentaBanco: data.cuentaBancaria.toString(),
				tipoCuentaBanco: data.tipoCuenta,
			};

			const result = await CrearCuentaBancaria(crearCuentaDatos);

			if (result.header !== "AU00") {
				ToastNotification({
					description: result?.message || "",
					duration: 10,
					key: "",
					message: "Error al crear cuenta bancaria.",
					type: "error",
				});
			} else {
				ToastNotification({
					description: "La cuenta se ha creado correctamente.",
					duration: 10,
					key: "",
					message: "Cuenta creada correctamente.",
					type: "success",
				});
				setShowBankModal(false);
				setRefreshCuentas(true);
			}
		}
	};

	/**Eliminar cuenta */
	const handleDeleteAccount = async () => {
		/**Se obtiene usuario. */
		const user = await GetUser();

		/**Se trabaja el rut para obtener el DV y rut sin DV */
		const rutParsed = rut?.split("").slice(-9, -1).join("");
		const rutParsedDv = rut?.split("").slice(-1).join("");

		const eliminarCuentaData: IEliminarCuenta = {
			estadoReg: "N",
			idAfiliado: parseInt(rutParsed),
			idAfiliadoDv: rutParsedDv,
			fun: "BENSIMULACIONPE",
			usu: user,
			seqCuentaBancaria: parseInt(editCuentaBancaria!.seqCuentaBancaria),
		};

		const result = await EliminarCuentaBancaria(eliminarCuentaData);

		if (result.header !== "AU00") {
			ToastNotification({
				description: result?.message || "",
				duration: 10,
				key: "",
				message: "Error al eliminar cuenta bancaria.",
				type: "error",
			});
		} else {
			ToastNotification({
				description: "La cuenta se ha eliminado correctamente.",
				duration: 10,
				key: "",
				message: "Cuenta eliminada correctamente.",
				type: "success",
			});
			setShowDeleteBankModal(false);
			setRefreshCuentas(true);
		}
	};

	/**Reestablecer valor de modal creacion */
	useEffect(() => {
		if (resetModalValues) {
			setTimeout(() => {
				setResetModalValues(false);
			}, 500);
		}
	}, [resetModalValues]);

	/**Crear / Editar teléfono contacto. */
	const handleTelefonoContacto = async (data: any) => {
		const user = await GetUser();
		if (editingPhone) {
			const editPhoneJson: IEditContactPhone = {
				idPersona: parseInt(rutAffiliate.rutWithoutDv),
				idPersonaDv: rutAffiliate.rutDv,
				indPreferenteTel: data.indPreferenteTel ? "S" : "N",
				numTelefono: data.numTelefono,
				seqTelefono: editPhone!.seqTelefono,
				tipoTelefono: data.tipoTelefono,
				fun: "BENSIMULACIONPE",
				usu: user,
			};

			const result = await UpdatePersonPhone(editPhoneJson);

			if (result.header !== "AU00") {
				ToastNotification({
					description: result.message || "",
					duration: 10,
					key: "",
					message: "Error al editar teléfono de contacto.",
					type: "error",
				});
				return;
			}
			ToastNotification({
				description: "Teléfono de contacto editado con éxito.",
				duration: 10,
				key: "",
				message: "Contacto editado con éxito.",
				type: "success",
			});
			setPhoneModal(false);
			setResetPhoneValue(false);
			fetchPhone();

			return;
		}

		const createPhone: ICrearTelefono = {
			idPersona: rutAffiliate.rutWithoutDv,
			idPersonaDv: rutAffiliate.rutDv,
			numTelefono: data.numTelefono,
			indPreferenteTel: data.indPreferenteTel ? "S" : "N",
			tipoTelefono: data.tipoTelefono,
			fun: "BENSIMULACIONPE",
			usu: user,
		};

		const result = await CrearTelefono(createPhone);

		if (result.header !== "AU00") {
			ToastNotification({
				description: result.message || "",
				duration: 10,
				key: "",
				message: "Error al crear teléfono de contacto.",
				type: "error",
			});
			return;
		}
		ToastNotification({
			description: "Teléfono de contacto creado con éxito.",
			duration: 10,
			key: "",
			message: "Contacto creado con éxito.",
			type: "success",
		});
		setPhoneModal(false);
		setResetPhoneValue(false);
		fetchPhone();
		return;
	};

	/**Crear / Editar correo contacto. */
	const handleCorreoContacto = async (data: any) => {
		const user = await GetUser();
		if (editingMail) {
			const editMailJson: IEditContactMail = {
				idPersona: parseInt(rutAffiliate.rutWithoutDv),
				idPersonaDv: rutAffiliate.rutDv,
				indPreferenteEmail: data.indPreferenteEmail ? "S" : "N",
				direccionEmail: data.direccionEmail,
				indUsoCartola: data.indPreferenteEmail ? "S" : "N",
				seqEmail: editMail!.seqEmail,
				tipoEmail: data.tipoEmail,
				fun: "BENSIMULACIONPE",
				usu: user,
			};

			const result = await UpdatePersonMail(editMailJson);

			if (result.header !== "AU00") {
				ToastNotification({
					description: result.message || "",
					duration: 10,
					key: "",
					message: "Error al editar correo de contacto.",
					type: "error",
				});
				return;
			}
			ToastNotification({
				description: "Correo de contacto editado con éxito.",
				duration: 10,
				key: "",
				message: "Contacto editado con éxito.",
				type: "success",
			});
			setMailModal(false);
			fetchMail();

			return;
		}

		const createMail: ICrearEmail = {
			idPersona: rutAffiliate.rutWithoutDv,
			idPersonaDv: rutAffiliate.rutDv,
			direccionEmail: data.direccionEmail,
			indPreferenteEmail: data.indPreferenteEmail ? "S" : "N",
			indUsoCartola: data.indPreferenteEmail ? "S" : "N",
			tipoEmail: data.tipoEmail,
			fun: "BENSIMULACIONPE",
			usu: user,
		};

		const result = await CrearEmail(createMail);

		if (result.header !== "AU00") {
			ToastNotification({
				description: result.message || "",
				duration: 10,
				key: "",
				message: "Error al crear correo de contacto.",
				type: "error",
			});
			return;
		}
		ToastNotification({
			description: "Correo de contacto creado con éxito.",
			duration: 10,
			key: "",
			message: "Contacto creado con éxito.",
			type: "success",
		});
		setMailModal(false);
		fetchMail();
		return;
	};

	/**Solicitar teléfonos */
	const fetchPhone = async () => {
		const affiliatePhone = await PhonesSearch(rutAffiliate.rutWithoutDv, rutAffiliate.rutDv);
		if (affiliatePhone.personaTel.length > 0) {
			setPhones(affiliatePhone.personaTel);
			return;
		}
		setPhones([]);
	};

	/**Solicitar correos */
	const fetchMail = async () => {
		const affiliateMail = await MailsSearch(rutAffiliate.rutWithoutDv, rutAffiliate.rutDv);

		if (affiliateMail.personaEmail.length > 0) {
			setMails(affiliateMail.personaEmail);
			return;
		}

		setMails([]);
	};

	useEffect(() => {
		fetchMail();
		fetchPhone();
	}, []);

	return (
		<>
			<Modal
				showModal={(value) => setMailModal(value)}
				visible={mailModal}
				title={mailModalTitle}
				footer={
					<div className="flex gap-4">
						<Button
							id=""
							buttonType="Guardar"
							label="Guardar"
							onClick={formCorreoContacto.handleSubmit(handleCorreoContacto)}
						/>
						<Button
							id=""
							variant="secondary"
							buttonType="Volver"
							label="Volver"
							onClick={() => setMailModal(false)}
						/>
					</div>
				}
			>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<ComboBoxField
							label="Tipo correo"
							options={{
								data: tipoMail,
								textField: "descripcion",
								valueField: "tipoEmail",
							}}
							name="tipoEmail"
							control={formCorreoContacto.control}
							errors={formCorreoContacto.formState.errors}
						/>
					</Col>
					<Col span={12}>
						<TextField
							label="Correo contacto"
							name="direccionEmail"
							control={formCorreoContacto.control}
							errors={formCorreoContacto.formState.errors}
						/>
					</Col>
					<Col span={24}>
						<CheckboxField
							label="¿Es preferente?"
							name="indPreferenteEmail"
							control={formCorreoContacto.control}
							errors={formCorreoContacto.formState.errors}
						/>
					</Col>
				</Row>
			</Modal>
			<Modal
				showModal={(value) => {
					setPhoneModal(value);
					setResetPhoneValue(false);
				}}
				visible={phoneModal}
				title={phoneModalTitle}
				footer={
					<div className="flex gap-4">
						<Button
							id=""
							buttonType="Guardar"
							label="Guardar"
							onClick={formTelefonoContacto.handleSubmit(handleTelefonoContacto)}
						/>
						<Button
							id=""
							variant="secondary"
							buttonType="Volver"
							label="Volver"
							onClick={() => {
								setPhoneModal(false);
								setResetPhoneValue(false);
							}}
						/>
					</div>
				}
			>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<ComboBoxField
							label="Tipo teléfono"
							options={{
								data: tipoTelefono,
								textField: "descripcion",
								valueField: "tipoTelefono",
							}}
							name="tipoTelefono"
							control={formTelefonoContacto.control}
							errors={formTelefonoContacto.formState.errors}
						/>
					</Col>
					<Col span={12}>
						<NumberField
							label="Teléfono contacto"
							name="numTelefono"
							control={formTelefonoContacto.control}
							errors={formTelefonoContacto.formState.errors}
							resetValues={resetPhoneValue}
						/>
					</Col>
					<Col span={24}>
						<CheckboxField
							label="¿Es preferente?"
							name="indPreferenteTel"
							control={formTelefonoContacto.control}
							errors={formTelefonoContacto.formState.errors}
						/>
					</Col>
				</Row>
			</Modal>
			<Modal
				title={modalTitle}
				showModal={(value) => setShowBankModal(value)}
				visible={showBankModal}
				width={"70%"}
				footer={
					<div className="flex gap-4">
						<Button
							id=""
							buttonType="Guardar"
							label="Guardar"
							onClick={formCuentaBancaria.handleSubmit(handleCuentaBancaria)}
						/>
						<Button
							id=""
							variant="secondary"
							buttonType="Volver"
							label="Volver"
							onClick={() => setShowBankModal(false)}
						/>
					</div>
				}
			>
				<Row gutter={[16, 16]}>
					<Col span={8}>
						<ComboBoxField
							label="Entidad Bancaria"
							options={{
								data: entidadBancaria.filter((f) => f.tipoInstFinanciera === "BCO"),
								textField: "descripcion",
								valueField: "codInstFinanciera",
							}}
							name="entidadBancaria"
							control={formCuentaBancaria.control}
							errors={formCuentaBancaria.formState.errors}
							resetValues={resetModalValues}
						/>
					</Col>
					<Col span={8}>
						<ComboBoxField
							label="Tipo Cuenta"
							options={{
								data: tipoCuenta,
								textField: "descripcion",
								valueField: "tipoCuentaBanco",
							}}
							name="tipoCuenta"
							control={formCuentaBancaria.control}
							errors={formCuentaBancaria.formState.errors}
							resetValues={resetModalValues}
						/>
					</Col>
					<Col span={8}>
						<NumberField
							label="Cuenta Bancaria"
							name="cuentaBancaria"
							control={formCuentaBancaria.control}
							errors={formCuentaBancaria.formState.errors}
							resetValues={resetModalValues}
						/>
					</Col>
					<Col span={24}>
						<CheckboxField
							label="¿Es preferente?"
							name="indPreferente"
							control={formCuentaBancaria.control}
							errors={formCuentaBancaria.formState.errors}
						/>
					</Col>
				</Row>
			</Modal>
			<Modal
				title="Eliminando cuenta bancaria"
				showModal={(value) => setShowDeleteBankModal(value)}
				visible={showDeleteBankModal}
				footer={
					<div className="flex gap-4">
						<Button
							id=""
							buttonType="Eliminar"
							label="Eliminar"
							onClick={() => handleDeleteAccount()}
						/>
						<Button
							id=""
							variant="secondary"
							buttonType="Volver"
							label="Volver"
							onClick={() => setShowDeleteBankModal(false)}
						/>
					</div>
				}
			>
				<span>
					¿ESTÁ SEGURO DE ELIMINAR{" "}
					<strong>{editCuentaBancaria?.tipoCuentaBancoDescripcion || ""}</strong> DE{" "}
					<strong>{editCuentaBancaria?.codInstFinancieraDescripcion || ""}</strong> CUENTA N°{" "}
					<strong>{editCuentaBancaria?.numCuentaBanco}</strong> ?
				</span>
			</Modal>
			<Modal
				title={titleModalMap.get(typeModal)}
				visible={showModal}
				showModal={setShowModal}
				width="70%"
				labelOk="Guardar"
				onClickOkButton={() => {
					// setShowModal(!showModal);
					if (typeModal.includes("beneficiary")) {
						agregarPorcentaje();
						// handleSubmit;
					}
				}}
				labelCancel="Nuevo"
				onClickCancelButton={() => {
					if (typeModal.includes("beneficiary")) return setTypeModal("new-beneficiary");
					if (typeModal.includes("account")) return setTypeModal("new-account");
				}}
			>
				{typeModal.includes("beneficiary") && (
					<>
						<DataTable
							rowSelection="radio"
							persistGrid={false}
							columns={beneficiaryColumns}
							dataSource={beneficiaryState}
							pagination={false}
							title="Beneficiarios"
							onChangeRowSelection={(_key) => {
								setTypeModal("edit-beneficiary");
							}}
						/>
						<BodyControls
							inputs={[
								[
									{
										inputType: "textfield",
										name: "rut",
										label: "Rut",
										value: "12.345.678-9",
									},
									{
										inputType: "comboboxfield",
										name: "",
										defaultValue: "Declarado en vida",
										label: "Tipo de Beneficiario",
										options: [
											{
												label: "Declarado en vida",
												value: "Declarado en vida",
											},
										],
									},
									{
										inputType: "comboboxfield",
										name: "",
										label: "Estado",
										value: "Vigente",
										options: [
											{
												label: "Vigente",
												value: "Declarado en vida",
											},
										],
									},
								],
								[
									{
										inputType: "textfield",
										name: "name",
										label: "Nombre",
										value: "Mauricio Fredy",
									},
									{
										inputType: "textfield",
										name: "name",
										label: "Primer Apellido",
										value: "Montenegro",
									},
									{
										inputType: "textfield",
										name: "name",
										label: "Segundo Apellido",
										value: "Inostroza",
									},
								],
								[
									{
										inputType: "datepickerfield",
										name: "",
										label: "Fecha de Nacimiento",
										value: new Date(),
									},
									{
										inputType: "textfield",
										name: "percentage",
										label: "Porcentaje",
										defaultValue: "40%",
										value: beneficiaryState.percentage,
										onChange(e: ChangeEvent<HTMLInputElement>) {
											handleChangePorcentaje(e);
										},
										maxLength: 3,
									},
									{
										inputType: "comboboxfield",
										name: "",
										label: "Parentesco",
										value: "Hija",
										options: [
											{
												label: "Hija",
												value: "Hija",
											},
										],
									},
								],
							]}
						/>
					</>
				)}

				{typeModal.includes("account") && (
					<BodyControls
						inputs={[
							[
								{
									value: `${typeModal === "edit-account" ? "Banco Estado" : ""}`,
									inputType: "comboboxfield",
									name: "",
									label: "Banco",
									options: [
										{
											label: "Cuenta Corrienta",
											value: "Banco Scotiabank",
										},
										{
											label: "Banco Falabella",
											value: "Banco Falabella",
										},
										{
											label: "Banco Estado",
											value: "Banco Estado",
										},
										{
											label: "Banco de Chile",
											value: "Banco de Chile",
										},
									],
								},
								{
									value: `${typeModal === "edit-account" ? "Cuenta Vista" : ""}`,
									inputType: "comboboxfield",
									name: "",
									label: "Tipo de Cuenta",
									options: [
										{
											label: "Cuenta Corrienta",
											value: "Cuenta Corrienta",
										},
										{
											label: "Cuenta Vista",
											value: "Cuenta Vista",
										},
										{
											label: "Cuenta de Ahorro",
											value: "Cuenta de Ahorro",
										},
									],
								},
								{
									value: `${typeModal === "edit-account" ? "12345678" : ""}`,
									inputType: "textfield",
									name: "name",
									label: "Nro. de Cuenta",
								},
							],
							[
								{
									value: `${typeModal === "edit-account" ? "Vigente" : ""}`,
									inputType: "textfield",
									name: "name",
									label: "Nro. de Cuenta",
								},
							],
						]}
					/>
				)}

				{typeModal === "edit-contact" && (
					<Row gutter={[16, 16]}>
						<Col span={12}>
							<TextField label="Correo Electrónico" />
						</Col>
						<Col span={12}>
							<TextField label="Teléfono" />
						</Col>
					</Row>
				)}
			</Modal>

			<Card>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<H3>Datos del Pago</H3>
				</Col>
				<Col span={6}>
					<ComboBoxField
						label="Receptor del pago"
						disabled
						value="affiliate"
						options={{
							data: [
								{
									id: "affiliate",
									name: "Afiliado Pensionado",
								},
							],
							textField: "name",
							valueField: "id",
						}}
					/>
				</Col>
				<Col span={6}>
					<ComboBoxField
						value={paymentMethod}
						label="Modalidad de Pago"
						placeholder="Selecciona Modalidad de Pago"
						onChange={(e) => {
							updateConsolidadaData("modalidadPago", e);
							setPaymentMethod(e);
							e !== "deposit"
								? setTabDisabled((prevState: any) => ({
										...prevState,
										[3]: { ...prevState[3], disabled: false },
								  }))
								: setTabDisabled((prevState: any) => ({
										...prevState,
										[3]: { ...prevState[3], disabled: true },
								  }));
						}}
						options={{
							data: modalidadPago,
							textField: "descripcion",
							valueField: "tipoModalidad",
						}}
					/>
				</Col>
				{paymentMethod === "DEP" && (
					<Col span={24}>
						<DataTable
							title=""
							rowSelection="radio"
							persistGrid={false}
							columns={bankAccountColumns}
							dataSource={cuentasBancarias}
							pagination={false}
							onChangeRowSelection={(_keys, rows) =>
								updateConsolidadaData("cuentaBancaria", rows[0])
							}
						/>
						<div className="flex justify-end">
							<Button
								id=""
								label="Agregar"
								buttonType="Agregar"
								variant="secondary"
								className="mb-2"
								onClick={() => {
									setEditBank(false);
									setShowBankModal(true);
									setModalTitle("Agregar Cuenta Bancaria");
									formCuentaBancaria.setValue("indPreferente", false);
									setResetModalValues(true);
								}}
							/>
						</div>
					</Col>
				)}
			<Divider />

				<Col span={24}>
					<DataTable
						persistGrid={false}
						columns={contactEmailColumns}
						dataSource={mails || []}
						onChangeRowSelection={(_keys, rows) => updateConsolidadaData("mailContacto", rows[0])}
						pagination={{ pageSize: 5 }}
						title="Correos de Contacto"
						rowSelection="radio"
					/>
					<div className="mt-4 flex justify-end">
						<Button
							id=""
							label="Agregar"
							buttonType="Agregar"
							variant="secondary"
							className="mb-2"
							onClick={() => {
								setMailModalTitle("Crear correo contacto");
								setMailModal(true);
								setEditingMail(false);
								formCorreoContacto.setValue("direccionEmail", "");
								formCorreoContacto.setValue("tipoEmail", "");
								formCorreoContacto.setValue("indPreferenteEmail", false);
							}}
						/>
					</div>
				</Col>
				<Divider />

				<Col span={24}>
					<DataTable
						persistGrid={false}
						columns={contactTelColumns}
						dataSource={phones || []}
						onChangeRowSelection={async (_keys, rows) =>
							updateConsolidadaData("telefonoContacto", rows[0])
						}
						pagination={{ pageSize: 5 }}
						title="Teléfono de Contacto"
						rowSelection="radio"
					/>
					<div className="mt-4 flex justify-end">
						<Button
							id=""
							label="Agregar"
							buttonType="Agregar"
							variant="secondary"
							className="mb-2"
							onClick={() => {
								setPhoneModalTitle("Crear teléfono contacto");
								formTelefonoContacto.setValue("numTelefono", "");
								formTelefonoContacto.setValue("tipoTelefono", "");
								formTelefonoContacto.setValue("indPreferenteTel", false);
								setPhoneModal(true);
								setEditingPhone(false);
								setResetPhoneValue(true);
							}}
						/>
					</div>
				</Col>
				<Col span={24}>
					<BeneficiaryHandler
						rutAffiliate={rutAffiliate}
						updateConsolidadaData={updateConsolidadaData}
					/>
				</Col>
			</Row>
			</Card>

			<Row gutter={[16, 16]}>
				<Col span={24} className="mt-4 flex justify-end">
					<Button
						id=""
						buttonType="Siguiente"
						label="Siguiente"
						onClick={() => nextTab("3", "summary")}
					/>
				</Col>
			</Row>
		</>
	);
};

export { UpdateDataView };
