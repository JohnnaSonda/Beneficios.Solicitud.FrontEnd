import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Home from "./presentation/pages/home/home.uc";

const lifecycles = singleSpaReact({
	React,
	ReactDOM,
	rootComponent: Home,
	domElementGetter: (): any => document.getElementById("content"),
	errorBoundary(_err, _info, _props) {
		// Customize the root error boundary for your microfrontend here.
		return <h1>error</h1>;
	},
});

export function mount(props: any) {
	return lifecycles.mount(props);
}
export function bootstrap(props: any) {
	return lifecycles.bootstrap(props);
}
export function unmount(props: any) {
	return lifecycles.unmount(props);
}
