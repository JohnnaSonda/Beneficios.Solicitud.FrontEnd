import React, { useEffect, useState } from "react";
import {
	BeneficiarySearch,
	CreateBeneficiary,
	UpdateBeneficiary,
} from "../../../application/services/beneficiary-services";
import { Button, DataTable, Modal, ToastNotification } from "sonda.core.controls";
import { getBeneficiaryColumns } from "./constants";
import { TypeModal } from "../../types/update-data";
import {
	IBeneficiarioCreateApi,
	ITraerBeneficiarios,
	IModificarBeneficiario,
} from "../../types/beneficiarios";
import { ModalBeneficiary } from "../update-data-beneficiary-modal/ModalBeneficiary";
import { rutFormatter } from "../../utils/index";

interface Props {
	rutAffiliate: {
		rutWithoutDv: string;
		rutDv: string;
	};
	updateConsolidadaData: (key: string, value: string) => void;
	paymentReceiver: string;
}

const BeneficiaryHandler = ({ rutAffiliate, updateConsolidadaData, paymentReceiver }: Props) => {
	const [selectedBeneficiary, setSelectedBeneficiary] = useState<IBeneficiarioCreateApi>();
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
	const [modalType, setModalType] = useState<TypeModal>("new-beneficiary");
	const [shouldResetForm, setShouldResetForm] = useState<boolean>(false);
	const [beneficiaryList, setBeneficiaryList] = useState<IBeneficiarioCreateApi[]>([]);
	const [hasBeneficiarys, setHasBeneficiarys] = useState<boolean>(false);

	const fetchBeneficiary = async () => {
		const { rutWithoutDv, rutDv } = rutAffiliate;
		const apiBeneficiaryData = await BeneficiarySearch(rutWithoutDv, rutDv);

		if (apiBeneficiaryData.header !== "AU00" || parseInt(apiBeneficiaryData) >= 400) {
			if (!apiBeneficiaryData.message || parseInt(apiBeneficiaryData)) {
				ToastNotification({
					description: "Se ha perdido la conexión con el servidor",
					duration: 10,
					key: "",
					message: "Se ha perdido la conexión con el servidor.",
					type: "warning",
				});
			} else {
				ToastNotification({
					description: apiBeneficiaryData.message,
					duration: 10,
					key: "",
					message: "Error al traer beneficiarios.",
					type: "error",
				});
			}
		} else {
			if (apiBeneficiaryData?.beneficiarios.length > 0) {
				const beneficiaryMaped: IBeneficiarioCreateApi[] = apiBeneficiaryData.beneficiarios.map(
					(beneficiario: ITraerBeneficiarios) => {
						const formated: IBeneficiarioCreateApi = {
							idBeneficiario: parseInt(rutFormatter(beneficiario.idBeneficiario).rutWithoutDv),
							idBeneficiarioDv: rutFormatter(beneficiario.idBeneficiario).rutDv,
							primerApellido: beneficiario.primerApellidoBeneficiario,
							segundoApellido: beneficiario.segundoApellidoBeneficiario,
							nombres: beneficiario.nombresBeneficiario,
							fecNacimiento: beneficiario.fecNacimiento,
							sexo: beneficiario.sexo,
							estadoCivil: beneficiario.estadoCivil,
							tipoBeneficiario: beneficiario.tipoBeneficiario,
							codParentesco: beneficiario.codParentesco,
							porcentajeBeneficio: beneficiario.porcentajeBeneficio,
							idAfiliado: parseInt(rutAffiliate.rutWithoutDv),
							idAfiliadoDv: rutAffiliate.rutDv,
							idUsuarioIngReg: beneficiario.idUsuarioIngReg,
							idFuncionIngReg: beneficiario.idFuncionUltModifReg,
						};
						return formated;
					},
				);
				setBeneficiaryList(beneficiaryMaped);
				setHasBeneficiarys(true);
			} else {
				setBeneficiaryList([]);
				setHasBeneficiarys(false);
			}
		}
	};

	useEffect(() => {
		fetchBeneficiary();
	}, [rutAffiliate]);

	/**Función para crear / editar / eliminar beneficiarios. */
	const handleSubmitBeneficiary = async () => {
		/**Si no vienen beneficiarios desde la api, se deben crear. */
		if (!hasBeneficiarys) {
			/**Si existe al menos 1 registro en el listado de beneficiarios, se ingresa al flujo de creación. */
			if (beneficiaryList.length > 0) {
				/**Se obtiene el porcentaje total de la suma de beneficiarios. */
				const porcentaje = beneficiaryList.reduce((acc, current) => {
					return {
						...acc,
						porcentajeBeneficio: acc.porcentajeBeneficio + current.porcentajeBeneficio,
					};
				});

				/**Si el porcentaje es mayor o menor a 100, entonces se entrega mensaje de error. */
				if (
					porcentaje.porcentajeBeneficio > 100 ||
					(porcentaje.porcentajeBeneficio < 100 && porcentaje.porcentajeBeneficio !== 0)
				) {
					ToastNotification({
						description: "La suma de los porcentajes debe ser 100",
						duration: 10,
						key: "",
						message: "Error en los porcentajes.",
						type: "error",
					});
					return;
				}

				/**Si las validaciones han pasado, se procede a ejecutar la creación de los beneficiarios. */
				const result = await CreateBeneficiary(beneficiaryList);
				if (result.header !== "AU00") {
					/**Mensaje error entregado por la api. */
					ToastNotification({
						description: result.message || "",
						duration: 10,
						key: "",
						message: "Error al crear beneficiarios.",
						type: "error",
					});
					return;
				}

				/**Mensaje éxito. */
				ToastNotification({
					description: "Beneficiarios creados con éxito.",
					duration: 10,
					key: "",
					message: "Beneficiarios creados.",
					type: "success",
				});

				/**Se refrescan los beneficiarios del usuario. */
				fetchBeneficiary();
				updateConsolidadaData("indActBeneficiarios", "S");
			}
			return;
		}

		/**Si vienen beneficiarios, entonces se debe ejecutar el flujo edición. */
		const modificarBeneficiarios: IModificarBeneficiario[] = [];
		if (beneficiaryList.length > 0) {
			/**Se arma el arreglo a modificar si vienen beneficiarios. */
			beneficiaryList.forEach((beneficiario) => {
				modificarBeneficiarios.push({
					codParentesco: beneficiario.codParentesco,
					idAfiliado: beneficiario.idAfiliado,
					idAfiliadoDv: beneficiario.idAfiliadoDv,
					idBeneficiario: beneficiario.idBeneficiario,
					idBeneficiarioDv: beneficiario.idBeneficiarioDv,
					idFuncionUltModifReg: beneficiario.idFuncionIngReg,
					idUsuarioUltModifReg: beneficiario.idUsuarioIngReg,
					porcentajeBeneficio: beneficiario.porcentajeBeneficio,
					tipoBeneficiario: beneficiario.tipoBeneficiario,
					estadoCivil: beneficiario.estadoCivil,
					fecNacimiento: beneficiario.fecNacimiento,
					nombres: beneficiario.nombres,
					primerApellido: beneficiario.primerApellido,
					segundoApellido: beneficiario.segundoApellido,
					sexo: beneficiario.sexo,
				});
			});
		} else {
			modificarBeneficiarios.push({
				idAfiliado: parseInt(rutAffiliate.rutWithoutDv),
				idAfiliadoDv: rutAffiliate.rutDv,
			});
		}

		/**Se ejecuta petición API modificar. */
		const result = await UpdateBeneficiary(modificarBeneficiarios);

		if (result?.header !== "AU00" || result?.statusCode >= 400) {
			/**Mensaje error entregado por la api. */
			ToastNotification({
				description: result?.message || "",
				duration: 10,
				key: "",
				message: "Error al modificar beneficiarios.",
				type: "error",
			});
			return;
		}

		/**Mensaje éxito. */
		ToastNotification({
			description: "Beneficiarios modificados con éxito.",
			duration: 10,
			key: "",
			message: "Beneficiarios modificados.",
			type: "success",
		});

		/**Se refrescan los beneficiarios del usuario. */
		fetchBeneficiary();
		updateConsolidadaData("indActBeneficiarios", "S");
		return;
	};

	return (
		<>
			<Modal
				showModal={setIsDeleteModalVisible}
				visible={isDeleteModalVisible}
				onClickClose={() => setShouldResetForm(true)}
				title="Eliminando beneficiario"
				footer={
					<div className="flex gap-4">
						<Button
							id=""
							buttonType="Eliminar"
							label="Eliminar"
							onClick={() => {
								const keepRecords = beneficiaryList.filter(
									(f) =>
										f.idBeneficiario + f.idBeneficiarioDv !==
										selectedBeneficiary!.idBeneficiario + selectedBeneficiary!.idBeneficiarioDv,
								);
								setBeneficiaryList(keepRecords);
								setIsDeleteModalVisible(false);
								setShouldResetForm(true);
							}}
						/>
						<Button
							id=""
							variant="secondary"
							buttonType="Volver"
							label="Volver"
							onClick={() => {
								setShouldResetForm(true);
								setIsDeleteModalVisible(false);
							}}
						/>
					</div>
				}
			>
				<p>
					¿ESTÁ SEGURO DE ELIMINAR AL BENEFICIARIO <strong>{selectedBeneficiary?.nombres}</strong>{" "}
					RUT{" "}
					<strong>
						{selectedBeneficiary?.idBeneficiario.toLocaleString()}-
						{selectedBeneficiary?.idAfiliadoDv}
					</strong>
					?
				</p>
			</Modal>

			<ModalBeneficiary
				rutAffiliate={rutAffiliate}
				selectedBeneficiary={selectedBeneficiary}
				setSelectedBeneficiary={setSelectedBeneficiary}
				modalType={modalType}
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				shouldResetForm={shouldResetForm}
				setShouldResetForm={setShouldResetForm}
				beneficiaryList={beneficiaryList}
				setBeneficiaryList={setBeneficiaryList}
			/>
			<DataTable
				persistGrid={false}
				columns={getBeneficiaryColumns(
					setSelectedBeneficiary,
					setIsModalVisible,
					setModalType,
					setIsDeleteModalVisible,
				)}
				dataSource={beneficiaryList}
				pagination={{ pageSize: 10 }}
				title="Beneficiarios"
			/>
			<div className="flex justify-end mt-3">
				<Button
					id=""
					disabled={paymentReceiver === "mandatory"}
					label="Guardar"
					buttonType="Guardar"
					variant="primary"
					className="mb-2 mr-4"
					onClick={() => handleSubmitBeneficiary()}
				/>
				<Button
					id=""
					disabled={paymentReceiver === "mandatory"}
					label="Agregar"
					buttonType="Agregar"
					variant="secondary"
					className="mb-2"
					onClick={() => {
						setModalType("new-beneficiary");
						setIsModalVisible(true);
						setShouldResetForm(true);
					}}
				/>
			</div>
		</>
	);
};

export { BeneficiaryHandler };
