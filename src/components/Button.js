import React, { PropTypes } from "react";

export default function Button(props) {
	const { action, label } = props;
	return (
		<div className="button-input">
			<input type="button" id={label}
				onClick={ (e) => {
					action()
				}}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired
};
