"use client";
import { Button } from "@mui/material";
import React from "react";

const DashBtn = ({ text, padding, handleClick, disabled, icon }) => {
	return text === "Cancel" ? (
		<Button
			variant='contained'
			disabled={disabled}
			onClick={() => {
				handleClick();
			}}
			startIcon={icon}
			sx={{
				boxShadow: "none",
				backgroundColor: `${!disabled && "#F2F2F2 !important"} `,
				padding: `${padding}`,
				width: "100%",
			}}
		>
			<h1
				className={`text-[12px] sodo600 ml-[-4px] mt-[1px] tracking-[-0.48px] normal-case text-black `}
			>
				{text}
			</h1>
		</Button>
	) : (
		<Button
			variant='contained'
			disabled={disabled}
			onClick={() => {
				handleClick();
			}}
			startIcon={icon}
			sx={{
				boxShadow: "none",
				backgroundColor: `${!disabled && "#072A85 !important"} `,
				padding: `${padding}`,
				width: "100%",
			}}
		>
			<h1
				className={`text-[12px] sodo600 ml-[-4px] mt-[1px] tracking-[-0.48px] normal-case text-white `}
			>
				{text}
			</h1>
		</Button>
	);
};

export default DashBtn;
