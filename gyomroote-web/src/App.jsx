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
import "./App.scss";
import Footer from "./components/Footer/Footer";
import LinkManager from "./managers/LinkManager";

function App() {
	const { t, i18n } = useTranslation();
	const locales = {
		en: { title: t("language.en"), code: "US" },
		hu: { title: t("language.hu"), code: "HU" },
	};

	return (
		<div className="App layout">
			<LanguageContext.Provider value={{ t, i18n, locales }}>
				<BrowserRouter>
					<TopBar></TopBar>
					<Routes>
						<Route
							path={LinkManager.home}
							element={<HomeView></HomeView>}
						></Route>
						<Route
							path={LinkManager.about}
							element={<AboutView></AboutView>}
						></Route>
						<Route
							path={LinkManager.donate}
							element={<DonateView></DonateView>}
						></Route>
						<Route
							path={LinkManager.join}
							element={<JoinView></JoinView>}
						></Route>
						<Route
							path={LinkManager.contact}
							element={<ContactView></ContactView>}
						></Route>
						<Route
							path="*"
							element={<ErrorView></ErrorView>}
						></Route>
					</Routes>
					<Footer></Footer>
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
