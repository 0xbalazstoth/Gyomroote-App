import React, { useContext } from "react";
import "./Footer.scss";
import LanguageContext from "../../contexts/LanguageContext";
import LinkManager from "../../managers/LinkManager";
import Container from "react-bootstrap/esm/Container";

const Footer = () => {
	const { t, i18n } = useContext(LanguageContext);

	return (
		<Container>
			<footer className="py-3 my-4">
				<ul className="nav justify-content-center pb-3 mb-3">
					<li className="nav-item">
						<a href={LinkManager.home} className="nav-link px-2">
							{t("word.home")}
						</a>
					</li>
					<li className="nav-item">
						<a href={LinkManager.about} className="nav-link px-2">
							{t("word.about")}
						</a>
					</li>
					<li className="nav-item">
						<a href={LinkManager.donate} className="nav-link px-2">
							{t("word.donate")}
						</a>
					</li>
					<li className="nav-item">
						<a href={LinkManager.join} className="nav-link px-2">
							{t("word.join")}
						</a>
					</li>
					<li className="nav-item">
						<a href={LinkManager.contact} className="nav-link px-2">
							{t("word.contact")}
						</a>
					</li>
				</ul>
				<p className="text-center">
					&copy; {new Date().getFullYear()} Gyömrői Polgárőr és
					Önkéntes Tűzoltó Egyesület. Minden jog fenntartva.
				</p>
			</footer>
		</Container>
	);
};

export default Footer;
