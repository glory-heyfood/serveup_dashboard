import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { searchIcon } from "@/SVGs";
import { InputAdornment } from "@mui/material";

function CustomTextField({ inputType, placeholder, options, ...props }) {
	switch (inputType) {
		case "search":
			return (
				<TextField
					InputProps={{
						startAdornment: (
							<InputAdornment sx={{ mr: "0.75em" }} position='start'>
								{searchIcon}                                
							</InputAdornment>
						),
						sx: {
							padding: "0px 0px",
							border: "0px 0px",
							outlineColor: "yellow",
						},
					}}
					sx={{
						backgroundColor: "#F8F8F8",
						borderRadius: "8px",
						padding: "0.875em 1.25em",

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
								color: "#B1B1B1",
							},
						},
					}}
					type='text'
					placeholder={placeholder}
					{...props}
				/>
			);

		case "dropdown":
			return (
				<TextField select {...props}>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			);

		default:
			// Handle other input types here or provide a default case
			return null;
	}
}

export default CustomTextField;
