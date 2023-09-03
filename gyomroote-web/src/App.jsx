import { Suspense, createContext, useContext } from "react";
import TopBar from "./components/TopBar/TopBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorView from "./views/Error/ErrorView";
import { useTranslation } from "react-i18next";
import LanguageContext from "./contexts/LanguageContext";

function App() {
	const { t, i18n } = useTranslation();
	const locales = {
		en: { title: t("language.en") },
		hu: { title: t("language.hu") },
	};

	return (
		<div className="App">
			<LanguageContext.Provider value={{ t, i18n, locales }}>
				<BrowserRouter>
					<TopBar></TopBar>
					<Routes>
						<Route
							path="/"
							element={
								<h1>
									{t("sentence.welcome", {
										user: "username",
									})}
								</h1>
							}
						></Route>
						<Route
							path="/kapcsolat"
							element={<h1>{t("word.contact")}</h1>}
						></Route>
						<Route
							path="*"
							element={<ErrorView></ErrorView>}
						></Route>
					</Routes>
				</BrowserRouter>
			</LanguageContext.Provider>
		</div>
	);
}

export default function WrappedApp() {
	return (
		<Suspense fallback="...betöltés">
			<App></App>
		</Suspense>
	);
}
