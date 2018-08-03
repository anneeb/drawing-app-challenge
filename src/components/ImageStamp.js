import React, { PropTypes } from "react";

export default function ImageStamp(props) {
	const { action, image_stamp } = props;
	return (
		<div>
			<div className="file-input button-input">
				<input type="file" id="upload-image"
					onChange={ (e) => {
						const reader = new FileReader()
						reader.onload = function(event) {
							action(event.target.result)
						}
						reader.readAsDataURL(e.target.files[0])
					}}
				/>
				<label htmlFor="upload-image">Upload Image</label>
			</div>
			<div className="file-image">
				<img alt="" src={image_stamp} id="uploaded-image"/>
			</div>
		</div>
	);
}

ImageStamp.propTypes = {
	action: PropTypes.func.isRequired,
	image_stamp: PropTypes.string.isRequired
};
