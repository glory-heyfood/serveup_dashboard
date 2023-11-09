"use client";
import { Button } from "@mui/material";
import React from "react";

const DashBtn = ({ text, padding, handleClick, disabled, icon }) => {
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
			}}
		>
			<h1 className='text-[12px] sodoSemiBold font-[0]  tracking-[-0.48px] normal-case text-white '>
				{text}
			</h1>
		</Button>
	);
};

export default DashBtn;
