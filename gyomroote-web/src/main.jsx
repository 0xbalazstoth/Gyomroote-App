import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App></App>
	</React.StrictMode>
);
