import { Button } from "@mui/material";
import { ClipLoader } from "react-spinners";
import React from "react";

const AuthBtn = ({ text, padding, handleClick, disabled, icon, loading }) => {
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
				boxShadow: "none",
			}}
		>
			{loading ? (
				<ClipLoader color='#fff' size={24} />
			) : (
				<span className='normal-case text-[14px]  sodo400 tracking-[-0.56px] text-white '>
					{text}
				</span>
			)}
		</Button>
	);
};

export default AuthBtn;
