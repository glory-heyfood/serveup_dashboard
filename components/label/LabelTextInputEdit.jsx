"use client";
import React, { useState } from "react";
import LabelInput from "./LabelInput";
import LabelText from "./LabelText";
import { Button } from "@mui/material";

const Label = ({ icon, label }) => {
	return icon ? (
		<div className='flex space-x-[8px] items-center '>
			<span>{icon}</span>
			<LabelText label={label} />
		</div>
	) : (
		<LabelText label={label} />
	);
};

const LabelTextInputEdit = ({
	label,
	initialValue,
	inputFont,
	handleChange,
	name,
	placeholder,
	icon,
	readOnly,
	rounded,
}) => {
	const [inputValue, setInputValue] = useState(initialValue);
	const [isEditing, setIsEditing] = useState(false);

	// Function to handle the "Edit" button click
	const handleEditClick = () => {
		setIsEditing(true);
	};

	return (
		<LabelInput
			label={<Label icon={icon} label={label} />}
			rounded={rounded}
			padding='13px 0px 14px 16px'
		>
			<div className='flex items-center justify-between'>
				<input
					type='text'
					name={name}
					value={initialValue && initialValue}
					readOnly={readOnly && true}
					placeholder={placeholder}
					className={`w-full placeholder:text-[#A9ADB5] placeholder:text-[13px] border-none outline-none  tracking-[-0.52px] bg-transparent p-0 text-[13px] text-[#000] ${
						inputFont ? inputFont : "sodo400"
					}`}
					onChange={(e) => handleChange(e)}
				/>
			</div>
		</LabelInput>
	);
};

export default LabelTextInputEdit;
