import React, { useContext } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./AboutView.scss";
import Main from "../../components/Main/Main";

const AboutView = () => {
	const { t, i18n } = useContext(LanguageContext);

	return (
		<Main>
			<h1>{t("word.about")}</h1>
		</Main>
	);
};

export default AboutView;
