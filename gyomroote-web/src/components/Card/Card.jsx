import React from "react";
import "./Card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const Card = ({ title, children }) => {
	return (
		<div className="card-container">
			<div className="card-header">
				<div className="card-icon">
					<FontAwesomeIcon icon={faFire} />
				</div>
				<div className="card-title">
					<span>{title}</span>
				</div>
			</div>
			<div className="card-body">{children}</div>
		</div>
	);
};

export default Card;
