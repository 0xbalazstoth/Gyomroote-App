import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./TopBar.scss";
import LanguageContext from "../../contexts/LanguageContext";

const TopBar = () => {
	const { t, i18n, locales } = useContext(LanguageContext);
	return (
		<Navbar expand="md" className="sticky-top">
			<Container fluid>
				<Navbar.Brand href="#">Gyomroote</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="topnav ms-auto mb-2 mb-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/egyesuletunkrol">
							Egyesületünkről
						</Nav.Link>
						<Nav.Link href="/tamogatas">Támogatás</Nav.Link>
						<Nav.Link href="/jelentkezes">Jelentkezés</Nav.Link>
						<Nav.Link href="/kapcsolat">Kapcsolat</Nav.Link>
						<NavDropdown title="Nyelv" id="basic-nav-dropdown">
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
									{locales[locale].title}
								</NavDropdown.Item>
							))}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default TopBar;
