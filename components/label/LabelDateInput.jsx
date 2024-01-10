import { checkBoxIcon, clockBlueIcon, clockIconDisabled } from "@/SVGs";
import LabelInput from "@/components/label/LabelInput";
import React, { useState } from "react";

const Label = ({ label, handleClick, data }) => {
	const [check, setCheck] = useState(false);
	return (
		<div
			className='flex items-center space-x-[1em] cursor-pointer'
			onClick={() => {
				handleClick(label);
				setCheck(!check);
                data.workingDays = !check 
			}}
		>
			{/* <span>{checkBoxIcon}</span> */}
			<span>
				<input type='checkbox' checked={check} />
			</span>
			<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]'>
				{label}
			</h2>
		</div>
	);
};

const LabelDateInput = ({ label, time, handleClick, disabled, data }) => {
	return (
		<LabelInput
			padding='13px 0px 14px 16px'
			label={<Label label={label} handleClick={handleClick} data={data} />}
		>
			<div className='w-[100%] flex items-center justify-between'>
				<div
					className='flex items-center space-x-[0.5em]'
					onClick={() => {
						data.status = "open";
					}}
				>
					<h2 className='text-[0.81em] sodo300 tracking-[-0.52px] text-[#A9ADB5]'>
						Open
					</h2>
					<div className='flex items-center space-x-[0.25em]'>
						{" "}
						<span> {disabled ? clockIconDisabled : clockBlueIcon} </span>{" "}
						<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#072A85]'>
							{time}
						</h2>{" "}
					</div>
				</div>

				<div
					className='flex items-center space-x-[0.5em]'
					onClick={() => {
						data.status = "close";
					}}
				>
					<h2 className='text-[0.81em] sodo300 tracking-[-0.52px] text-[#A9ADB5]'>
						Close
					</h2>
					<div className='flex items-center space-x-[0.25em]'>
						{" "}
						<span> {disabled ? clockIconDisabled : clockBlueIcon} </span>{" "}
						<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#072A85]'>
							{time}
						</h2>{" "}
					</div>
				</div>
			</div>
		</LabelInput>
	);
};

export default LabelDateInput;
