import React, { useContext } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./DonateView.scss";

const DonateView = () => {
	const { t, i18n } = useContext(LanguageContext);

	return (
		<div>
			<h1>{t("word.donate")}</h1>
		</div>
	);
};

export default DonateView;
