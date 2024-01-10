import { Switch } from "@mui/material";
import React from "react";

const SwitchPicker = ({ header, text, handleChange, fontweight, border }) => {
	return (
		<div
			className={`flex items-center space-x-[20px]${
				border ? border : " border border-[#E6E6E6]"
			}rounded-[8px] py-[18px] md:py-[21px] md:px-[24px] w-full px-[16px] `}
		>
			<Switch
				onChange={(e) => {
					handleChange(e.target.checked);
				}}
			/>
			<div className='flex flex-col space-y-[3px] '>
				<h1
					className={`text-black text-[16px] md:text-[14px]  tracking-[-0.56px]  ${
						fontweight ? fontweight : "sodo700"
					}`}
				>
					{header}
				</h1>
				<h3 className='text-[#5F6370] sodo600 text-[14px] md:text-[12px] tracking-[-0.24px]  '>
					{text}
				</h3>
			</div>
		</div>
	);
};

export default SwitchPicker;
