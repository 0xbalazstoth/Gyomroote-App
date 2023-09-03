import React, { useContext } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./AboutView.scss";

const AboutView = () => {
	const { t, i18n } = useContext(LanguageContext);

	return (
		<div>
			<h1>{t("word.about")}</h1>
		</div>
	);
};

export default AboutView;
