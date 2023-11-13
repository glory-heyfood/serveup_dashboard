import { TextField } from "@mui/material";
import React from "react";

const Input = ({ text, type, onChange }) => {
	return (
		<TextField
			label={text}
			type={type}
			sx={{
				borderRadius: "6px",
				"& input": {
					color: "#000",
					fontSize: "0.9em",                    
                    fontFamily:"SodoSans-reg"
				},
				"& label": {
					color: "#cacaca",
					fontSize: "0.9em",
                    fontFamily:"SodoSans-reg"
                    					
				},
			}}
			onChange={(e) => onChange(e)}
		/>
	);    
};

export default Input;
