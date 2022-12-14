import React from "react";

const Input = (props) => {
	const {type, name, id, placeholder, required, autoFocus, onInput, pattern, title} = props;

	return (
		<>
			<input
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
				required={required}
				autoFocus={autoFocus}
				onChange={onInput}
				pattern={pattern}
				title={title}
			/>
		</>
	)
};

export default Input;