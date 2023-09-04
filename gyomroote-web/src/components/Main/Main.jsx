import React from "react";
import "./Main.scss";

const Main = ({ children }) => {
	return (
		<div className="main-layout">
			<div className="main-layout-body">{children}</div>
		</div>
	);
};

export default Main;
