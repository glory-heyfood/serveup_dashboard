import React from "react";
import LabelInput from "./LabelInput";

const LabelSearchInput = ({ placeholder, label, handleChange }) => {
	return (
		<LabelInput
			padding='13px 0px 14px 16px'
			label={
				<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] '>{label}</h2>
			}
		>
			<input
				type='text'
				placeholder={placeholder}
				className='w-full placeholder:text-[#A9ADB5] placeholder:text-[13px] border-none outline-none sodo300 tracking-[-0.52px] bg-transparent p-0 text-[13px] text-[#000]'
				onChange={(e) => handleChange(e)}
			/>
		</LabelInput>
	);
};

export default LabelSearchInput;
