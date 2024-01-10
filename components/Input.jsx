import { TextField } from "@mui/material";
import React from "react";

const Input = ({ text, type, onChange, err, onBlur, value }) => {
	return (
		<div className='w-full'>
			<TextField
				fullWidth
				autoComplete='off'
				onBlur={(e) => onBlur(e)}
				label={text}
				type={type}
				value={value && value}
				sx={{
					borderRadius: "6px",
					"& input": {
						color: "#000",
						fontSize: "0.9em",
						fontFamily: "SodoSans-reg",
					},
					"& label": {
						color: "#cacaca",
						fontSize: "0.9em",
						fontFamily: "SodoSans-reg",
					},
				}}
				onChange={(e) => onChange(e)}
			/>
			{err && (
				<p className='text-[12px] sodoSemibold text-red-500 tracking-[-0.24px]'>
					{" "}
					{err}{" "}
				</p>
			)}
		</div>
	);
};

export default Input;
