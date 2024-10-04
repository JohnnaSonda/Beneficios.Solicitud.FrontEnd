import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const urlBase: string = (window as any).SONDA_CORE_USUARIOS_SERVICES;
const apiVersion: string = (window as any).SONDA_CORE_USUARIOS_SERVICES_VERSION;

const config = (modulo: string): AxiosRequestConfig => {
	return {
		baseURL: `${urlBase}/api/${apiVersion}/${modulo}/`,
		xsrfCookieName: "XSRF-TOKEN",
		xsrfHeaderName: "X-XSRF-TOKEN",
	};
};

export const EntityInstance = setupInterceptorsTo(axios.create(config("entity")));

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
	//config.headers.token = window.localStorage.getItem("token");
	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
	axiosInstance.interceptors.request.use(onRequest, onRequestError);
	axiosInstance.interceptors.response.use(onResponse, onResponseError);
	return axiosInstance;
}

export const BasicRequest = {
	Buscar: "Buscar",
	Traer: "Traer",
	Crear: "Crear",
	Modificar: "Modificar",
	Eliminar: "Eliminar",
};
