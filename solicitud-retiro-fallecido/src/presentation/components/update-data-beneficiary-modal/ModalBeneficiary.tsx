import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Beneficiary, TypeModal } from "../../types/update-data";
import { IBeneficiarioCreateApi } from "../../types/beneficiarios";
import {
	Modal,
	Row,
	TextField,
	Col,
	ComboBoxField,
	NumberField,
	RutField,
	Alert,
	Button,
	SpinLoader,
} from "sonda.core.controls";
import { useForm } from "react-hook-form";
import useParametersTable from "../../hooks/use-parameters-table";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GetUsers from "../../hooks/getUsers";
import { ModalAffiliateSearch } from "../../../application/services/person-services";

interface Props {
	rutAffiliate: { rutWithoutDv: string; rutDv: string };
	selectedBeneficiary: IBeneficiarioCreateApi | undefined;
	setSelectedBeneficiary: Dispatch<SetStateAction<IBeneficiarioCreateApi | undefined>>;
	modalType: TypeModal;
	isModalVisible: boolean;
	setIsModalVisible: Dispatch<SetStateAction<boolean>>;
	shouldResetForm: boolean;
	setShouldResetForm: Dispatch<SetStateAction<boolean>>;
	beneficiaryList: IBeneficiarioCreateApi[];
	setBeneficiaryList: Dispatch<SetStateAction<IBeneficiarioCreateApi[] | []>>;
}

const ModalBeneficiary = ({
	rutAffiliate,
	selectedBeneficiary,
	modalType,
	isModalVisible,
	setIsModalVisible,
	shouldResetForm,
	setShouldResetForm,
	beneficiaryList,
	setBeneficiaryList,
}: Props) => {
	const isCreating = modalType === "new-beneficiary";
	const modalTitle = isCreating ? "Agregar beneficiario" : "Modificar beneficiario";
	const getTablesData = useParametersTable({
		tableNames: ["PAR_AAA_TIPO_BENEFICIARIO", "PAR_AAA_PARENTESCO"],
	});
	const [currentRut, setCurrentRut] = useState<string>("");
	const [beneficiaryInList, setBeneficiaryInList] = useState<boolean>(false);
	const [rutSearched, setRutSearched] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	let beneficiarySchema = yup.object().shape({
		beneficiaryType: yup.string().required("Seleccione tipo de beneficiario"),
		names: yup
			.string()
			.required("Ingrese nombres")
			.test({
				test: (value) => value !== "Ignacio",
				message: "estoy cansado jefe",
			}),
		lastName: yup.string().required("Ingrese primer apellido"),
		motherLastName: yup.string().required("Ingrese segundo apellido"),
		//TODO aqui se debe validar que el porcentaje ingresado sumado al resto no sea superior a 100
		percentage: yup
			.number()
			.required("Ingrese porcentaje")
			.positive("El porcentaje debe ser mayor a 0")
			.lessThan(101, "El porcentaje no puede ser mayor a 100"),
		relationship: yup.string().required("Seleccione parentesco"),
	});

	const {
		control: beneficiaryControl,
		handleSubmit,
		clearErrors,
		setError,
		reset,
		setValue,
		formState: { errors: beneficiaryErrors },
	} = useForm<Beneficiary>({ resolver: yupResolver(beneficiarySchema) });

	const submitBeneficiary = async (formData: Beneficiary) => {
		const loggedUser = await GetUsers();

		const tableBeneficiary: Beneficiary = {
			...formData,
			rut: currentRut.split("-")[0],
			rutDv: currentRut.split("-")[1],
		};

		const createObject: IBeneficiarioCreateApi = {
			nombres: tableBeneficiary.names,
			primerApellido: tableBeneficiary.lastName,
			segundoApellido: tableBeneficiary.motherLastName,
			idBeneficiario: parseInt(tableBeneficiary.rut),
			idBeneficiarioDv: tableBeneficiary.rutDv,
			tipoBeneficiario: tableBeneficiary.beneficiaryType || "",
			codParentesco: tableBeneficiary.relationship,
			porcentajeBeneficio: parseInt(tableBeneficiary.percentage),
			idAfiliado: parseInt(rutAffiliate.rutWithoutDv),
			idAfiliadoDv: rutAffiliate.rutDv,
			idUsuarioIngReg: loggedUser,
			idFuncionIngReg: "BENSIMULACIONPE",
			estadoCivil: "",
			fecNacimiento: "",
			sexo: "",
		};

		/**Se busca si el beneficiario existe en el listado. */
		const beneciaryFounded = beneficiaryList.find(
			(f) =>
				f.idBeneficiario + f.idBeneficiarioDv === tableBeneficiary.rut + tableBeneficiary.rutDv,
		);

		/**Si está creando y el beneficiario ya se encuentra, retorna mensaje. */
		if (isCreating && beneciaryFounded) {
			setBeneficiaryInList(true);
			return;
		}

		if (!isCreating && beneciaryFounded) {
			/**Se elimina el registro duplicado */
			const listadoActualizado = beneficiaryList.filter(
				(f) =>
					f.idBeneficiario + f.idBeneficiarioDv !==
					beneciaryFounded.idBeneficiario + beneciaryFounded.idBeneficiarioDv,
			);
			/**Se agrega registro con datos actualizados. */
			listadoActualizado.push(createObject);
			setBeneficiaryList(listadoActualizado);
			setIsModalVisible(false);
			return;
		}

		setBeneficiaryInList(false);
		setBeneficiaryList([...beneficiaryList, createObject]);
		setIsModalVisible(false);
		reset();
	};

	// Aqui se actualizan los campos del formulario cuando el beneficiario seleccionado se actualiza
	useEffect(() => {
		if (selectedBeneficiary) {
			setValue("beneficiaryType", selectedBeneficiary.tipoBeneficiario);
			setValue("names", selectedBeneficiary.nombres);
			setValue("rut", selectedBeneficiary.idBeneficiario + selectedBeneficiary.idBeneficiarioDv);
			setCurrentRut(selectedBeneficiary.idBeneficiario + selectedBeneficiary.idBeneficiarioDv);
			setValue("lastName", selectedBeneficiary.primerApellido);
			setValue("motherLastName", selectedBeneficiary.segundoApellido);
			setValue("relationship", selectedBeneficiary.codParentesco);
			setValue("percentage", selectedBeneficiary.porcentajeBeneficio.toString());
		} else {
			//Ese necesario pasarle el porcentaje porque sino no lo reinicia
			reset({
				percentage: "0",
			});
		}
		clearErrors();
	}, [selectedBeneficiary]);

	useEffect(() => {
		if (shouldResetForm) {
			setShouldResetForm(false);
			setCurrentRut("");
			clearErrors();
			reset();
		}
	}, [shouldResetForm]);

	/**Función para buscar por Rut */
	const handleRutSearch = async () => {
		setLoading(true);
		const rutSplitted = currentRut.split("-");
		const result = await ModalAffiliateSearch(rutSplitted[0], rutSplitted[1].toUpperCase());

		if (result.header !== "AU00") {
			setRutSearched(true);
		} else {
			if (result.persona.length > 0) {
				setValue("names", result.persona[0].nombres);
				setValue("lastName", result.persona[0].primerApellido);
				setValue("motherLastName", result.persona[0].segundoApellido);
				setRutSearched(false);
			} else {
				setRutSearched(true);
			}
		}
		setLoading(false);
	};

	return (
		<Modal
			title={modalTitle}
			visible={isModalVisible}
			showModal={setIsModalVisible}
			width="70%"
			labelOk="Guardar"
			onClickOkButton={handleSubmit(submitBeneficiary)}
			labelCancel="Cancelar"
			onClickCancelButton={() => {
				setIsModalVisible(false);
			}}
		>
			<SpinLoader size="normal" spinning={loading}>
				<Row gutter={[16, 16]}>
					{beneficiaryInList && (
						<Col span={24}>
							<Alert
								message="El beneficiario ya existe."
								type="warning"
								closable
								showIcon
								description="El beneficiario ya se encuentra en el listado de beneficiarios."
							/>
						</Col>
					)}
					<Col span={24}>
						<Row gutter={[16, 16]} className="align-items-end">
							<Col span={8}>
								<RutField
									disabled={!isCreating}
									label="Rut"
									name="rut"
									placeholder="12.345.678-9"
									value={currentRut}
									rangeDigits={{
										max: 8,
										min: 7,
									}}
									separator="-"
									validateRUT={(cleanRut, _formatedValue, isValid) => {
										setCurrentRut(cleanRut);
										if (!isValid) {
											setError("rut", {
												message: "El rut ingresado no es válido",
											});
										} else {
											clearErrors("rut");
										}
										return false;
									}}
								/>
							</Col>
							<Col span={6} className="flex align-end">
								<Button
									disabled={!isCreating}
									id=""
									buttonType="Buscar"
									label="Buscar"
									onClick={handleRutSearch}
								/>
							</Col>
						</Row>
					</Col>
					<Col span={8}>
						<TextField
							disabled={!isCreating || !rutSearched}
							label="Nombres"
							name="names"
							control={beneficiaryControl}
							errors={beneficiaryErrors}
						/>
					</Col>
					<Col span={8}>
						<TextField
							disabled={!isCreating || !rutSearched}
							label="Primer apellido"
							name="lastName"
							control={beneficiaryControl}
							errors={beneficiaryErrors}
						/>
					</Col>
					<Col span={8}>
						<TextField
							disabled={!isCreating || !rutSearched}
							label="Segundo Apellido"
							name="motherLastName"
							control={beneficiaryControl}
							errors={beneficiaryErrors}
						/>
					</Col>
					<Col span={8}>
						<ComboBoxField
							placeholder="Seleccionar"
							label="Tipo de Beneficiario"
							options={{
								data: getTablesData("PAR_AAA_TIPO_BENEFICIARIO") || [],
								textField: "descripcion",
								valueField: "tipoBeneficiario",
							}}
							name="beneficiaryType"
							control={beneficiaryControl}
							errors={beneficiaryErrors}
						/>
					</Col>
					<Col span={8}>
						<NumberField
							label="Porcentaje"
							name="percentage"
							control={beneficiaryControl}
							errors={beneficiaryErrors}
						/>
					</Col>
					<Col span={8}>
						<ComboBoxField
							placeholder="Seleccionar"
							label="Parentesco"
							options={{
								data: getTablesData("PAR_AAA_PARENTESCO") || [],
								textField: "descripcion",
								valueField: "codParentesco",
							}}
							name="relationship"
							control={beneficiaryControl}
							errors={beneficiaryErrors}
						/>
					</Col>
				</Row>
			</SpinLoader>
		</Modal>
	);
};

export { ModalBeneficiary };
