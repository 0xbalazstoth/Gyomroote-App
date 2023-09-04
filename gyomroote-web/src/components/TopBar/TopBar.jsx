import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./TopBar.scss";
import LanguageContext from "../../contexts/LanguageContext";
import Flag from "react-flagkit";

const TopBar = () => {
	const { t, i18n, locales } = useContext(LanguageContext);
	return (
		<Navbar expand="lg" className="sticky-top">
			<Container fluid>
				<Navbar.Brand href="/">Gyomroote</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="topnav ml-auto mb-lg-0" navbarScroll>
						<Nav.Link href="/">{t("word.home")}</Nav.Link>
						<Nav.Link href="/about">{t("word.about")}</Nav.Link>
						<Nav.Link href="/donate">{t("word.donate")}</Nav.Link>
						<Nav.Link href="/join">{t("word.join")}</Nav.Link>
						<Nav.Link href="/contact">{t("word.contact")}</Nav.Link>
						<NavDropdown
							title={t("word.language")}
							id="basic-nav-dropdown"
						>
							{Object.keys(locales).map((locale) => (
								<NavDropdown.Item
									key={locale}
									style={{
										fontWeight:
											i18n.resolvedLanguage === locale
												? "bold"
												: "normal",
									}}
									type="submit"
									onClick={() => i18n.changeLanguage(locale)}
								>
									<div>
										<Flag
											country={locales[locale].code}
										></Flag>
										{locales[locale].title}
									</div>
								</NavDropdown.Item>
							))}
						</NavDropdown>
					</Nav>
					<Navbar.Collapse className="justify-content-end">
						<button>Bejelentkezés</button>
					</Navbar.Collapse>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default TopBar;
