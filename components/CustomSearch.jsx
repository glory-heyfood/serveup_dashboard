import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { searchIcon } from "@/SVGs";
import { InputAdornment } from "@mui/material";

function CustomSearch({ placeholder, handleChange, ...props }) {
	return (
		<TextField
			onChange={(e) => {
				handleChange(e);
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment sx={{ mr: "0.75em" }} position='start'>
						{searchIcon}
					</InputAdornment>
				),
				sx: {
					padding: "0px 0px",
					border: "0px 0px",
                    color:"red",
				},
			}}
			sx={{
				backgroundColor: "#F8F8F8",
				borderRadius: "8px",
				padding: "13.5px 20px",

				"& .MuiOutlinedInput-root": {
					"& fieldset": {
						borderColor: "transparent",
						padding: "0px 0px",
					},
					"&:hover fieldset": {
						borderColor: "transparent",
					},
					"&.Mui-focused  fieldset": {
						borderColor: "transparent",
					},
					"& .MuiOutlinedInput-input": {
						padding: "0px",
						fontSize: "0.75em",
						letterSpacing: "-0.24px",
						color: "#000",
						fontFamily: "sodoSans-reg",
					},
				},
			}}
			type='text'
			placeholder={placeholder}
			{...props}
		/>
	);
}

export default CustomSearch;
