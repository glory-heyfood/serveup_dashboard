import React, { useState } from "react";
import LabelInput from "./LabelInput";

const Label = ({ label }) => {
	return <h1 className='text-[13px] sodo700 tracking-[-0.52px]  '>{label}</h1>;
};

const LabelTime = ({ label }) => {
	const [Discsel, setDiscSel] = useState("Amount");
	return (
		<LabelInput
			width='md:w-[35%]'
			childWidth='md:w-[65%]'
			label={<Label label={label} />}
			padding='13px 0px 14px 16px'
		>
			<div className='flex pr-[16px]'>
				<input
					type='text'
					placeholder='0'
					className='outline-none sodo400 tracking-[-0.52px] text-[13px] w-[40%] '
				/>
				<div className=' flex space-x-[4px] '>
					<div
						className={`${
							Discsel === "Days" ? "border-[1.5px] border-[#4971D9] " : ""
						} rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
						onClick={() => {
							setDiscSel("Days");
						}}
					>
						<h3
							className={`${
								Discsel === "Days" ? "text-[#072A85] " : "text-black"
							} tracking-[-0.48px] text-[12px] sodo600 `}
						>
							<span>Days</span>
						</h3>
					</div>

					<div
						className={`${
							Discsel === "Weeks" ? "border-[1.5px] border-[#4971D9] " : ""
						} rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
						onClick={() => {
							setDiscSel("Weeks");
						}}
					>
						<h3
							className={`${
								Discsel === "Weeks" ? "text-[#072A85] " : "text-black"
							} tracking-[-0.48px] text-[12px] sodo600 `}
						>
							<span>Weeks</span>
						</h3>
					</div>

					<div
						className={`${
							Discsel === "Months" ? "border-[1.5px] border-[#4971D9] " : ""
						} rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
						onClick={() => {
							setDiscSel("Months");
						}}
					>
						<h3
							className={`${
								Discsel === "Months" ? "text-[#072A85] " : "text-black"
							} tracking-[-0.48px] text-[12px] sodo600 `}
						>
							<span>Months</span>
						</h3>
					</div>
				</div>
			</div>
		</LabelInput>
	);
};

export default LabelTime;
