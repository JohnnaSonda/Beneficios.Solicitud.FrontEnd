import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "sonda.core.shared.components";
import { i18nextInstance, initOptions, LocaleProvider } from "sonda.core.localization";
import { IProps } from "./home.cb";
import { AppProvider } from "sonda.core.controls/providers";
import { Card, Col, PageContent, Row, TitleSection } from "sonda.core.controls/layout";
import { RutField } from "sonda.core.controls/inputs";
import { Button } from "sonda.core.controls/buttons";
import { H3, H4, H5, SummaryTable } from "sonda.core.controls";
import { Tabs, TabPanel, Modal } from "sonda.core.controls/navigation";
import { Alert, ToastNotification, SpinLoader } from "sonda.core.controls";
import { AffiliateData, BenefitsView, UpdateDataView, RequestSummary } from "../../views";
import { ISearchRut } from "../../types/affiliate-data";
import { ITipoMail, ITipoTelefono } from "../../types/contactos";
import { ConsultarAntecedentes } from "../../../application/services/consultar-antecedentes";
import { ConsultaDatosParametrica } from "../../../application/services/consulta-prevision";
import { ConsultarCuentaBancaria } from "../../../application/services/consulta-cuenta-bancaria";
import { IPrevision, ITipoPension } from "../../types/prevision";
import { IDatosConsolidado } from "../../types/cursar-simulacion";
import { ICuentaBancaria, ICuentaBancariaApi } from "../../types/cuenta-bancaria";
import { IInstitucionFinanciera } from "../../types/institucion-financiera";
import { ISaldos } from "../../types/solicitud-pensionado";
import { IModalidadPago } from "../../types/modalidad-pago";
import GetUsers from "../../../application/services/get-user";
import { SearchClaim } from "../../../application/services/reclamos-normativos";
import { IDataClaim } from "../../types/home";
import { convertToMoneyFormat } from "../../utils/index";
import "../../styles/styles.css";
import { ConsultarSolicitudPensionado } from "../../../application/services/consultar-solicitud-pensionado";
import { ConsultarSaldo } from "../../../application/services/solicitud-pensionado-service";
import "../../styles/styles.css";
import moment from "moment";

i18nextInstance.init(initOptions);

const Home: React.FC<IProps> = (props: any): React.ReactElement => {
	const [rut, setRut] = useState<string>("");
	const [isValidRut, setIsValidRut] = useState<boolean>(false);
	const [formSended, setFormSended] = useState<boolean>(false);
	const [refreshCuentas, setRefreshCuentas] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [tabActive, setTabActive] = useState<string>("0");
	const [userFounded, setUserFounded] = useState<ISearchRut>();
	const [apiAffiliateErrorMessage, setApiAffiliateErrorMessage] = useState<string>("");
	const [errorCapture, setErrorCapture] = useState<boolean>(false);
	const [previsionOptions, setPrevisionOptions] = useState<IPrevision[]>([]);
	const [tipoPension, setTipoPension] = useState<ITipoPension[]>([]);
	const [cuentasBancarias, setCuentasBancarias] = useState<ICuentaBancaria[]>([]);
	const [tipoCuenta, setTipoCuenta] = useState<ICuentaBancariaApi[]>([]);
	const [institucionFinanciera, setInstitucionFinanciera] = useState<IInstitucionFinanciera[]>([]);
	const [modalidadPago, setModalidadPago] = useState<IModalidadPago[]>([]);
	const [usu, setUsu] = useState<string>("");
	const [consultaSolicitudError, setConsultaSolicitudError] = useState<string>("");
	const [dataClaim, setDataClaim] = useState<IDataClaim[]>([]);
	const [tipoMailOpciones, setTipoMailOpciones] = useState<ITipoMail[]>([]);
	const [tipoTelefonoOpciones, setTipoTelefonoOpciones] = useState<ITipoTelefono[]>([]);
	const [saldos, setSaldos] = useState<ISaldos[]>([]);
	const [modalClaim, setModalClaim] = useState<boolean>(false);
	const [consolidado, setConsolidado] = useState<IDatosConsolidado | any>();
	const today = moment();
	const formattedDate = today.format("DD/MM/YYYY");

	const [tabDisabled, setTabDisabled] = useState([
		{ id: 0, disabled: false },
		{ id: 1, disabled: true },
		{ id: 2, disabled: false },
		{ id: 3, disabled: true },
	]);

	const nuevaPrevision = (prevision: IPrevision) => {
		setUserFounded({ ...userFounded!, entidadPrevisional: prevision.codInstPrevision });
	};

	const updateConsolidadaData = (key: string, value: any) => {
		setConsolidado({ ...consolidado, [key]: value });
	};

	const nextTab = (
		tab: string,
		validate: "benefits" | "updateData" | "summary",
		setError?: (value: any) => void,
	) => {
		/**Revisión para avanzar al tab Beneficios */
		if (validate === "benefits") {
			/**Si no ha seleccionado fecha de pensión, se entrega mensaje. */
			if (!consolidado?.fechaPension) {
				ToastNotification({
					description: "Complete la fecha de pensión para continuar",
					duration: 10,
					key: "",
					message: "Seleccione una fecha de pensión",
					type: "error",
				});
				return;
			}

			/**Si no ha seleccionado tipo de pensión, se entrega mensaje. */
			if (!consolidado?.tipoPension) {
				ToastNotification({
					description: "Seleccione el tipo de pensión para continuar.",
					duration: 10,
					key: "",
					message: "Seleccione el tipo de pensión",
					type: "error",
				});
				if (setError) setError((prevState: any) => ({ ...prevState, typeOfPension: true }));
				return;
			} else {
				if (setError) setError((prevState: any) => ({ ...prevState, typeOfPension: false }));
			}

			/**Si no ha seleccionado entidad previsional, se entrega mensaje. */
			if (!consolidado?.entidadPrevisionalPension) {
				ToastNotification({
					description: "Seleccione la entidad previsional pensión para continuar.",
					duration: 10,
					key: "",
					message: "Seleccione la entidad previsional pensión",
					type: "error",
				});
				if (setError) setError((prevState: any) => ({ ...prevState, pensionInstitution: true }));
				return;
			} else {
				if (setError) setError((prevState: any) => ({ ...prevState, pensionInstitution: false }));
			}

			/**Si la fecha cuénta con algún error controlado, se entrega mensaje. */
			if (consolidado?.fechaError) {
				ToastNotification({
					description: "Existe un error con la fecha de pensión.",
					duration: 10,
					key: "",
					message: "Revise la fecha de pensión",
					type: "error",
				});
				return;
			}

			/**Si las validaciones han salido correctas, se actualiza la tab. */
			setTabActive(tab);
		}

		/**Revisión para avanzar al tab Cursar Actualizar Datos */
		if (validate === "updateData") {
			/**No se necesita prellenar información, solo se actualiza la tab. */
			setTabActive(tab);
		}

		/**Revisión para avanzar al tab Cursar Simulación */
		if (validate === "summary") {
			if (consolidado.modalidadPago === "DEP") {
				/**Validar que seleccione 1 cuenta bancaria. */
				if (consolidado.cuentaBancaria) {
					/**Se cambia de tab */
					setTabActive(tab);
				} else {
					ToastNotification({
						description: "Debe seleccionar 1 cuenta bancaria.",
						duration: 10,
						key: "",
						message: "Seleccione una cuenta bancaria",
						type: "error",
					});
				}
			} else {
				/**Se debe cambiar de tab, ya que no necesita nada adicional. */
				setTabActive(tab);
			}
		}
	};

	const tabs = [
		{
			title: "Datos Afiliados",
			render: (
				<AffiliateData
					nombres={userFounded?.nombres}
					primerApellido={userFounded?.primerApellido}
					entidadPrevisional={userFounded?.entidadPrevisional}
					segundoApellido={userFounded?.segundoApellido}
					fechaNacimiento={userFounded?.fecNacimiento || new Date().toString()}
					setTabDisabled={setTabDisabled}
					rut={rut}
					tipoPension={userFounded?.tipoPension}
					opcionesPension={tipoPension}
					fechaPension={userFounded?.fecPension || formattedDate}
					previsionOpciones={previsionOptions}
					nuevaPrevision={nuevaPrevision}
					updateConsolidadaData={updateConsolidadaData}
					setConsolidada={setConsolidado}
					consolidada={consolidado}
					nextTab={nextTab}
				/>
			),
			disabled: tabDisabled[0].disabled,
		},
		{
			title: "Beneficio",
			render: (
				<BenefitsView
					saldos={saldos}
					setConsolidado={setConsolidado}
					consolidado={consolidado}
					nextTab={nextTab}
					setTabDisabled={setTabDisabled}
				/>
			),
			disabled: tabDisabled[1].disabled,
		},
		{
			title: "Actualizar Datos",
			render: (
				<UpdateDataView
					setTabDisabled={setTabDisabled}
					cuentasBancarias={cuentasBancarias}
					entidadBancaria={institucionFinanciera}
					modalidadPago={modalidadPago}
					tipoCuenta={tipoCuenta}
					rut={userFounded?.idPersona || ""}
					setRefreshCuentas={setRefreshCuentas}
					tipoMail={tipoMailOpciones}
					tipoTelefono={tipoTelefonoOpciones}
					updateConsolidadaData={updateConsolidadaData}
					nextTab={nextTab}
				/>
			),
			disabled: tabDisabled[2].disabled,
		},
		{
			title: "Cursar Simulación",
			render: (
				<RequestSummary
					consolidado={consolidado}
					opcionesPension={tipoPension}
					previsionOpciones={previsionOptions}
					modalidadPago={modalidadPago}
				/>
			),
			disabled: tabDisabled[3].disabled,
		},
	];

	const handleSubmit = async (e: any) => {
		setErrorCapture(false);
		setFormSended(false);
		setLoading(true);
		e.preventDefault();
		setApiAffiliateErrorMessage("");
		const rutSplitted = rut.split("-");

		try {
			const solicitudRespuesta = await ConsultarSolicitudPensionado({
				idAfiliado: rutSplitted[0],
				idAfiliadoDv: rutSplitted[1],
				indSimulacion: "N",
				tipoSolicitud: "PE",
				estadoSolicitud: "VIG",
			});
			if (solicitudRespuesta.header !== "AU00") {
				ToastNotification({
					description: "Error al obtener las solicitudes.",
					duration: 10,
					key: "",
					message: "Se ha perdido la conexión con el servidor.",
					type: "warning",
				});
				return;
			}

			if (solicitudRespuesta.consultarSolicitud.length > 0) {
				setConsultaSolicitudError("El RUT consultado posee solicitudes vigentes de pensionado");
				setLoading(false);
				return;
			}

			setConsultaSolicitudError("");

			const apiPersonaData = await ConsultarAntecedentes({
				idPersona: rutSplitted[0],
				idPersonaDv: rutSplitted[1].toUpperCase(),
				tipoSolicitud: "PE",
				usu,
			});

			const apiCuentaBancariaData = await ConsultarCuentaBancaria({
				idPersona: rutSplitted[0],
				idPersonaDv: rutSplitted[1].toUpperCase(),
			});

			const apiConsultarSaldo = await ConsultarSaldo({
				idFuncion: "BENSIMULACIONPE",
				idPersona: rutSplitted[0],
				idPersonaDv: rutSplitted[1].toUpperCase(),
				idUsuario: usu,
			});

			if (apiCuentaBancariaData.header === "AU00") {
				setCuentasBancarias(apiCuentaBancariaData.cuentasBancarias);
			} else {
				setCuentasBancarias([]);
			}

			if (apiConsultarSaldo.header === "AU00") {
				setSaldos(apiConsultarSaldo.saldos);
			} else {
				setSaldos([]);
			}

			if (apiPersonaData.header === "AU00" && apiPersonaData.personaUsuario.length > 0) {
				const apiClaim = await SearchClaim({
					idAfiliado: Number(rutSplitted[0]),
					idAfiliadoDv: rutSplitted[1],
				});

				if (apiClaim?.header === "AU00" && apiClaim?.reclamos.length >= 1) {
					setErrorCapture(false);
					setFormSended(false);
					setModalClaim(true);
					setDataClaim(apiClaim?.reclamos);
				} else {
					setFormSended(true);
					setUserFounded(apiPersonaData.personaUsuario[0]);

					const fechaPartes = apiPersonaData.personaUsuario[0].fecNacimiento?.split("/");
					const fechaParsed = `${fechaPartes[1]}/${fechaPartes[0]}/${fechaPartes[2]}`;
					const edadUsuario = moment()!.diff(fechaParsed, "years", false);
					setConsolidado({
						numSolicitud: apiConsultarSaldo.numSolicitud || null,
						edad: edadUsuario.toString(),
						fechaNacimiento: apiPersonaData.personaUsuario[0].fecNacimiento,
						nombres: apiPersonaData.personaUsuario[0].nombres,
						primerApellido: apiPersonaData.personaUsuario[0].primerApellido,
						rut: rutSplitted[0],
						rutDv: rutSplitted[1],
						segundoApellido: apiPersonaData.personaUsuario[0].segundoApellido,
						modalidadPago: "DEP",
						indActBeneficiarios: "N",
						fechaPension: apiPersonaData.personaUsuario[0].fecPension || formattedDate,
						fechaError: false,
					});
				}
			} else {
				setErrorCapture(true);
				setApiAffiliateErrorMessage(
					apiPersonaData?.message !== null
						? apiPersonaData?.message
						: "No se Encontraron Registros",
				);
				setFormSended(false);
			}
		} catch (error) {
			setApiAffiliateErrorMessage(
				"El RUT consultado no registra información como Afiliado en el sistema.",
			);
			setFormSended(false);
		} finally {
			setLoading(false);
		}
	};

	/**Formatear el rut. */
	const rutParsed = userFounded?.idPersona?.split("").slice(-9, -1).join("");
	const rutParsedDv = userFounded?.idPersona?.split("").slice(-1).join("");

	/**Obtener Opciones Prevision */
	const handlePrevisionOptions = async () => {
		const result = await ConsultaDatosParametrica("PAR_INST_PREVISION");
		const instFinancieras = await ConsultaDatosParametrica("PAR_INST_FINANCIERAS");
		const apiTipoPension = await ConsultaDatosParametrica("PAR_AAA_TIPO_PENSION");
		const modalidadPagoData = await ConsultaDatosParametrica("PAR_BEN_TIPO_MODALIDAD_PAGO");
		const tipoCuentaBancariaData = await ConsultaDatosParametrica("PAR_AAA_TIPO_CUENTA_BANCARIA");

		/**Manejo instituciones financieras. */
		if (instFinancieras.header !== "AU00") {
			ToastNotification({
				description: "Error al obtener instituciones financieras.",
				duration: 10,
				key: "",
				message: "Se ha perdido la conexión con el servidor.",
				type: "warning",
			});
			setInstitucionFinanciera([]);
		} else {
			setInstitucionFinanciera(instFinancieras.datos);
		}

		/**Manejo tipo pensiones. */
		if (apiTipoPension.header !== "AU00") {
			ToastNotification({
				description: "Error al obtener tipo de pensiones.",
				duration: 10,
				key: "",
				message: "Se ha perdido la conexión con el servidor.",
				type: "warning",
			});
			setTipoPension([]);
		} else {
			setTipoPension(apiTipoPension.datos);
		}

		/**Manejo modalidad de pago. */
		if (modalidadPagoData.header !== "AU00") {
			ToastNotification({
				description: "Error al obtener modalidad de pago.",
				duration: 10,
				key: "",
				message: "Se ha perdido la conexión con el servidor.",
				type: "warning",
			});
			setModalidadPago([]);
		} else {
			setModalidadPago(modalidadPagoData.datos);
		}

		/**Manejo opciones cuenta bancaria. */
		if (tipoCuentaBancariaData.header !== "AU00") {
			ToastNotification({
				description: "Error al obtener opciones de cuenta bancaria.",
				duration: 10,
				key: "",
				message: "Se ha perdido la conexión con el servidor.",
				type: "warning",
			});
			setTipoCuenta([]);
		} else {
			setTipoCuenta(tipoCuentaBancariaData.datos);
		}

		/**Manejo tipo de previsión. */
		if (result.header !== "AU00") {
			ToastNotification({
				description: "Error al obtener tipo de previsión.",
				duration: 10,
				key: "",
				message: "Se ha perdido la conexión con el servidor.",
				type: "warning",
			});
			setPrevisionOptions([]);
		} else {
			setPrevisionOptions(result.datos);
		}
	};

	/**Obtener tipo teléfono y tipo mail */
	const handleMailPhoneType = async () => {
		const tipoTelefono = await ConsultaDatosParametrica("PAR_AAA_TIPO_TELEFONO");
		const tipoMail = await ConsultaDatosParametrica("PAR_AAA_TIPO_EMAIL");

		if (tipoTelefono.header !== "AU00") {
			ToastNotification({
				description: tipoTelefono.message || "",
				duration: 10,
				key: "",
				message: "Se ha perdido la conexión con el servidor.",
				type: "warning",
			});
		}

		setTipoTelefonoOpciones(tipoTelefono.datos);

		if (tipoMail.header !== "AU00") {
			ToastNotification({
				description: tipoMail.message || "",
				duration: 10,
				key: "",
				message: "Se ha perdido la conexión con el servidor.",
				type: "warning",
			});
		}

		setTipoMailOpciones(tipoMail.datos);
	};

	useEffect(() => {
		handlePrevisionOptions();
		handleMailPhoneType();
	}, []);

	/**Refrescar listado de cuentas bancarias. */
	const refreshCuentasBancarias = async () => {
		const rutSplitted = rut.split("-");
		const apiCuentaBancariaData = await ConsultarCuentaBancaria({
			idPersona: rutSplitted[0],
			idPersonaDv: rutSplitted[1].toUpperCase(),
		});

		if (apiCuentaBancariaData.header !== "AU00") {
			ToastNotification({
				description: "Error al obtener el listado de cuentas bancarias.",
				duration: 10,
				key: "",
				message: "Se ha perdido la conexión con el servidor.",
				type: "warning",
			});
			setCuentasBancarias([]);
		} else {
			setCuentasBancarias(apiCuentaBancariaData.cuentasBancarias);
		}
		setRefreshCuentas(false);
	};

	useEffect(() => {
		if (refreshCuentas) {
			refreshCuentasBancarias();
		}
	}, [refreshCuentas]);

	// get user
	const getUsersToken = async () => {
		const user = await GetUsers();
		setUsu(await user);
	};

	useEffect(() => {
		getUsersToken();
	}, []);

	useEffect(() => {
		if (consolidado?.modalidadPago === "DEP") {
			if (consolidado?.cuentaBancaria) {
				setTabDisabled((prevState: any) => ({
					...prevState,
					[3]: { ...prevState[3], disabled: false },
				}));
			} else {
				setTabDisabled((prevState: any) => ({
					...prevState,
					[3]: { ...prevState[3], disabled: true },
				}));
			}
		}

		if (consolidado?.modalidadPago !== "DEP") {
			if (consolidado?.cuentaBancaria) {
				setConsolidado({ ...consolidado, cuentaBancaria: null });
			}

			setTabDisabled((prevState: any) => ({
				...prevState,
				[3]: { ...prevState[3], disabled: false },
			}));
		}
	}, [consolidado?.cuentaBancaria, consolidado?.modalidadPago]);

	useEffect(() => {
		if (
			consolidado?.fechaPension &&
			consolidado?.tipoPension &&
			consolidado?.entidadPrevisionalPension &&
			!consolidado?.fechaError
		) {
			setTabDisabled((prevState: any) => ({
				...prevState,
				[1]: { ...prevState[1], disabled: false },
			}));
		} else {
			setTabDisabled((prevState: any) => ({
				...prevState,
				[1]: { ...prevState[1], disabled: true },
				[2]: { ...prevState[2], disabled: true },
				[3]: { ...prevState[3], disabled: true },
			}));
		}
	}, [
		consolidado?.fechaPension,
		consolidado?.tipoPension,
		consolidado?.entidadPrevisionalPension,
		consolidado?.fechaError,
	]);

	return (
		<div>
			<Modal
				visible={modalClaim}
				showModal={(value) => setModalClaim(value)}
				width={800}
				footer={
					<div className="flex gap-4">
						<Button
							id=""
							variant="secondary"
							buttonType="Volver"
							label="Volver"
							onClick={() => setModalClaim(false)}
						/>
					</div>
				}
			>
				<Col span={24}>
					<H3>Reclamos Vigentes</H3>
				</Col>
				<Col span={24}>
					<Alert
						closable
						message="No es posible cursar la Simulación debido a que el RUT consultado tiene Reclamos Pendientes"
						showIcon
						type="error"
						className="p-3"
					/>
				</Col>
				<SummaryTable
					columns={[
						{
							align: "start",
							dataIndex: "numeroReclamo",
							title: "N° Reclamo",
						},
						{
							align: "center",
							dataIndex: "motivoReclamo",
							title: "Motivo",
						},
					]}
					dataSource={dataClaim.filter((claim) => claim?.estadoReg === "V")}
				/>
			</Modal>
			<Router>
				<Provider store={props.store}>
					<AppProvider globalEventDistributor={props.globalEventDistributor} idModule="">
						<LocaleProvider i18nextInstance={i18nextInstance} namespace="namespace.test-simulacion">
							<PageContent>
								<TitleSection title="Solicitud Beneficio Fallecido" />
								<Card>
									<SpinLoader size="normal" spinning={loading}>
										{tabActive === "0" && (
											<form
												className="mb-4"
												onSubmit={(e) => {
													e.preventDefault();
												}}
											>
												<Row gutter={[16, 16]} className="align-items-end">
													<Col span={6}>
														<RutField
															className="mb-label-0"
															label="RUT Afiliado"
															placeholder="12.345.678-9"
															name="rut"
															value={rut}
															validateRUT={(cleanRut, _formatedValue, isValid) => {
																setRut(cleanRut);
																setIsValidRut(isValid);
																return false;
															}}
															rangeDigits={{
																max: 8,
																min: 7,
															}}
															separator="-"
														/>
													</Col>
													<Col span={6}>
														<Button
															className="h-inputs"
															disabled={!isValidRut}
															onClick={handleSubmit}
															type="submit"
															buttonType="Buscar"
															id="Buscar"
															label="Buscar"
														/>
													</Col>
												</Row>
											</form>
										)}
										{errorCapture && (
											<Alert
												message="Búsqueda por Rut"
												description={apiAffiliateErrorMessage}
												type="error"
												showIcon
											/>
										)}

										{consultaSolicitudError && (
											<Row>
												<Col span={24}>
													<Alert
														closable
														description={consultaSolicitudError}
														message="Consulta en curso"
														showIcon
														type="error"
													/>
												</Col>
											</Row>
										)}

										{tabActive !== "0" && (
											<>
												<Row className="mb-4" gutter={[16, 16]}>
													<Col className="h-full">
														<H4>Datos Afiliado</H4>
														<Card className="py-2 px-4 gap-0 h-17">
															<div className="flex justify-between gap-4 w-full">
																<div>
																	<H5 className="flex font-normal">Rut</H5>
																	<H4 className="leading-4">
																		{convertToMoneyFormat(parseInt(rutParsed || "0"))}-{rutParsedDv}
																	</H4>
																</div>
																<div>
																	<H5 className="flex font-normal">Nombre</H5>
																	<H4 className="leading-4">
																		{userFounded?.nombres} {userFounded?.primerApellido}{" "}
																		{userFounded?.segundoApellido}
																	</H4>
																</div>
															</div>
														</Card>
													</Col>
												</Row>
											</>
										)}
										{formSended && (
											<Tabs
												className="mt-4"
												defaultActiveKey="0"
												activeKey={tabActive}
												onTabClick={(key) => {
													setTabActive(key);
													key === "1" &&
														setTabDisabled((prevState: any) => ({
															...prevState,
															[2]: { ...prevState[2], disabled: false },
														}));
												}}
											>
												{tabs.map(({ title, render, disabled }, index) => (
													<TabPanel tab={title} key={index.toString()} disabled={disabled}>
														{render}
													</TabPanel>
												))}
											</Tabs>
										)}
									</SpinLoader>
								</Card>
								<ToastContainer />
							</PageContent>
						</LocaleProvider>
					</AppProvider>
				</Provider>
			</Router>
		</div>
	);
};

export default Home;
