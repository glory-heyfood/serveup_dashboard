import { Button } from "@mui/material";
import React from "react";

const AuthBtn = ({ text, padding, handleClick, disabled, icon }) => {
	return (
		<Button
			variant='contained'
			disabled={disabled}
			onClick={() => {
				handleClick();
			}}
			startIcon={icon}			
			sx={{
				backgroundColor: `${!disabled && "#072A85 !important"}`,
				padding: `${padding}`,				
				width: "100%",
                boxShadow:"none",
			}}
		>
			<span className="normal-case text-[14px]  sodo400 tracking-[-0.56px] text-white ">{text}</span>
		</Button>
	);
};

export default AuthBtn;