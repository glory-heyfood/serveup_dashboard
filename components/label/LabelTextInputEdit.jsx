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
		)
	
};

const LabelTextInputEdit = ({
	label,
	initialValue,
	inputFont,
	placeholder,
	icon,
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
			padding='13px 0px 14px 16px'
		>
			<div className='flex items-center justify-between'>
				{isEditing ? (
					// If in edit mode, show input field
					<input
						type='text'
						value={inputValue}
						placeholder={placeholder}
						className={`w-full placeholder:text-[#A9ADB5] placeholder:text-[13px] border-none outline-none  tracking-[-0.52px] bg-transparent p-0 text-[13px] text-[#000] ${
							inputFont ? inputFont : "sodo300"
						}`}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				) : inputValue ? ( // If not in edit mode, show the value
					<h3 className='text-black text-[13px] sodo400 tracking-[-0.52px] w-full '>
						{inputValue}
					</h3> // If not in edit mode, show the value
				) : (
					<h3 className='text-[#A9ADB5] text-[13px] sodo300 tracking-[-0.52px] w-full '>
						{placeholder}
					</h3>
				)}

				<Button variant='text' onClick={handleEditClick}>
					<h3 className='text-[#072A85] tracking-[-0.24px] sodo700  w-fit '>
						Edit
					</h3>
				</Button>
			</div>
		</LabelInput>
	);
};

export default LabelTextInputEdit;
