import React from "react";
import LabelInput from "./LabelInput";

const LabelSearchInput = ({ placeholder, label, handleChange }) => {
	return (
		<LabelInput
			padding='15px 0px 16px 16px'
			label={
				<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] '>{label}</h2>
			}
		>
			<input
				type='text'
				placeholder={placeholder}
				className='w-full placeholder:text-[#A9ADB5] placeholder:text-[0.82em] border-none outline-none text-black sodo300 tracking-[-0.52px] bg-transparent p-0 text-[0.82em]'
				onChange={(e) => handleChange(e)}
			/>
		</LabelInput>
	);
};

export default LabelSearchInput;
