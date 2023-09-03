import React, { useContext } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./ContactView.scss";

const ContactView = () => {
	const { t, i18n } = useContext(LanguageContext);

	return (
		<div>
			<h1>{t("word.contact")}</h1>
		</div>
	);
};

export default ContactView;
