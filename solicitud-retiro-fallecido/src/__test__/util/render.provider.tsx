import React, { ReactNode } from "react";
import { render } from "@testing-library/react";

import "./match.media";
import { i18nextInstance, initOptions, LocaleProvider } from "sonda.core.localization";
import { Provider } from "react-redux";
import generateStore from "../../infrastructure/redux/store";
import { PageContent } from "sonda.core.controls/layout";
import { AppProvider } from "sonda.core.controls/providers";
import { ToastContainer } from "sonda.core.shared.components";

export function RenderProvider(children: ReactNode) {
	i18nextInstance.init(initOptions);
	const store = generateStore();
	const globalEventDistributor = [generateStore()];
	return {
		...render(
			<div>
				<Provider store={store.store}>
					<AppProvider globalEventDistributor={globalEventDistributor} idModule="">
						<LocaleProvider i18nextInstance={i18nextInstance} namespace="namespace.demo-test">
							<PageContent>
								{children}
								<ToastContainer />
							</PageContent>
						</LocaleProvider>
					</AppProvider>
				</Provider>
			</div>,
		),
	};
}
