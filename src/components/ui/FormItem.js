import React from "react";

const FormItem = (props) => {
	return (
		<div className="form-item">
			{props.children}
		</div>
	)
};

export default FormItem;