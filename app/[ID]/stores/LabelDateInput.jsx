import { checkBoxIcon, clockStoreIcon } from "@/SVGs";
import LabelInput from "@/components/label/LabelInput";
import React from "react";

const Label = ({ label }) => {
	return (
		<div className='flex items-center space-x-[1em]'>
			<span>{checkBoxIcon}</span>
			<h2 className='text-[0.81em] sodo400 tracking-[-0.52px] text-[#000]'>
				{label}
			</h2>
		</div>
	);
};

const LabelDateInput = ({ label }) => {
	return (
		<LabelInput padding='15px 0px 16px 16px' label={<Label label={label} />}>
			<div className='w-[80%] flex items-center justify-between'>
				<div className='flex items-center space-x-[0.5em]'>
					<h2 className='text-[0.81em] sodo300 tracking-[-0.52px] text-[#A9ADB5]'>
						Open
					</h2>
					<div className='flex items-center space-x-[0.25em]'>
						{" "}
						<span> {clockStoreIcon} </span>{" "}
						<h2 className='text-[0.81em] sodo400 tracking-[-0.52px] text-[#072A85]'>
							9:00 AM
						</h2>{" "}
					</div>
				</div>

                <div className='flex items-center space-x-[0.5em]'>
					<h2 className='text-[0.81em] sodo300 tracking-[-0.52px] text-[#A9ADB5]'>
						Close
					</h2>
					<div className='flex items-center space-x-[0.25em]'>
						{" "}
						<span> {clockStoreIcon} </span>{" "}
						<h2 className='text-[0.81em] sodo400 tracking-[-0.52px] text-[#072A85]'>
							9:00 PM
						</h2>{" "}
					</div>
				</div>
			</div>
		</LabelInput>
	);
};

export default LabelDateInput;
