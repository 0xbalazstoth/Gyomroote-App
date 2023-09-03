import { Suspense, createContext, useContext } from "react";
import TopBar from "./components/TopBar/TopBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorView from "./views/Error/ErrorView";
import { useTranslation } from "react-i18next";
import LanguageContext from "./contexts/LanguageContext";
import AboutView from "./views/About/AboutView";
import DonateView from "./views/Donate/DonateView";
import JoinView from "./views/Join/JoinView";
import ContactView from "./views/Contact/ContactView";
import HomeView from "./views/Home/HomeView";

function App() {
	const { t, i18n } = useTranslation();
	const locales = {
		en: { title: t("language.en"), code: "US" },
		hu: { title: t("language.hu"), code: "HU" },
	};

	return (
		<div className="App">
			<LanguageContext.Provider value={{ t, i18n, locales }}>
				<BrowserRouter>
					<TopBar></TopBar>
					<Routes>
						<Route path="/" element={<HomeView></HomeView>}></Route>
						<Route
							path="/about"
							element={<AboutView></AboutView>}
						></Route>
						<Route
							path="/donate"
							element={<DonateView></DonateView>}
						></Route>
						<Route
							path="/join"
							element={<JoinView></JoinView>}
						></Route>
						<Route
							path="/contact"
							element={<ContactView></ContactView>}
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
