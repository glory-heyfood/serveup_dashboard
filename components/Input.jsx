import { TextField } from "@mui/material";
import React from "react";

const Input = ({ text, type, onChange }) => {
	return (
		<TextField
			label={text}
			type={type}
			sx={{
				borderRadius: "4px",
				"& input": {
					color: "#A9ADB5",
					fontSize: "0.9em",
				},
				"& label": {
					color: "#A9ADB5",
					fontSize: "0.9em",
					// letterSpacing: "-0.24px",
				},
			}}
			onChange={(e) => onChange(e)}
		/>
	);
};

export default Input;
