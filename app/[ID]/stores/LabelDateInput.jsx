import { checkBoxIcon, clockBlueIcon } from "@/SVGs";
import LabelInput from "@/components/label/LabelInput";
import React from "react";

const Label = ({ label }) => {
	return (
		<div className='flex items-center space-x-[1em]'>
			{/* <span>{checkBoxIcon}</span> */}
            <span><input type="checkbox" /></span>
			<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]'>
				{label}
			</h2>
		</div>
	);
};

const LabelDateInput = ({ label, time }) => {
	return (
		<div className=' border border-[#E6E6E6]  flex space-x-[0.94em] items-center  rounded-[4px] w-[700px] md:w-full'>
			<div
				className='w-[26%]  bg-[#F4F4F4] border border-transparent border-r-[#E6E6E6]  '
				style={{
					padding: "13px 0px 14px 16px",
				}}
			>
				<div className='flex items-center space-x-[1em]'>
					<span>{checkBoxIcon}</span>
					<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]'>
						{label}
					</h2>
				</div>
			</div>
			<div className='w-[74%]'>
				<div className='w-[100%] flex items-center justify-between'>
					<div className='flex items-center space-x-[0.5em]'>
						<h2 className='text-[0.81em] sodo300 tracking-[-0.52px] text-[#A9ADB5]'>
							Open
						</h2>
						<div className='flex items-center space-x-[0.25em]'>
							{" "}
							<span> {clockBlueIcon} </span>{" "}
							<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#072A85]'>
								{time}
							</h2>{" "}
						</div>
					</div>

					<div className='flex items-center space-x-[0.5em]'>
						<h2 className='text-[0.81em] sodo300 tracking-[-0.52px] text-[#A9ADB5]'>
							Close
						</h2>
						<div className='flex items-center space-x-[0.25em]'>
							{" "}
							<span> {clockBlueIcon} </span>{" "}
							<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#072A85]'>
								{time}
							</h2>{" "}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LabelDateInput;
