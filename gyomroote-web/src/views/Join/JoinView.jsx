import React, { useContext } from "react";
import LanguageContext from "../../contexts/LanguageContext";
import "./JoinView.scss";

const JoinView = () => {
	const { t, i18n } = useContext(LanguageContext);
	return (
		<div>
			<h1>{t("word.join")}</h1>
		</div>
	);
};

export default JoinView;
