import React from "react";
import LabelText from "./LabelText";
import LabelInput from "./LabelInput";

const LabelDiscount = ({ value, handleChange, discountType, handleClick, fontweight }) => {
	return (
		<LabelInput
			label={<LabelText label='Discount' fontWeight={fontweight} />}
			padding='13px 0px 14px 16px'
		>
			<div className='flex pr-[16px]'>
				<input
					type='text'
					placeholder='0'
					name='discount'
					value={value}
					onChange={(e) => handleChange(e)}
					className='outline-none flex-grow sodo400 tracking-[-0.52px] text-[13px]'
				/>
				<div className=' flex space-x-[2px] '>
					<div
						className={`${
							discountType === "Amount"
								? "border-[1.5px] border-[#4971D9] "
								: ""
						} rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
						onClick={() => {
							handleClick("Amount");
						}}
					>
						<h3
							className={`${
								discountType === "Amount" ? "text-[#072A85] " : "text-black"
							} tracking-[-0.48px] text-[12px] sodo700 flex space-x-[4px]`}
						>
							<span className='sodo700'>₦</span> <span>Amount</span>
						</h3>
					</div>

					<div
						className={`${
							discountType === "Percent"
								? "border-[1.5px] border-[#4971D9] "
								: ""
						} rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
						onClick={() => {
							handleClick("Percent");
						}}
					>
						<h3
							className={`${
								discountType === "Percent" ? "text-[#072A85] " : "text-black"
							} tracking-[-0.48px] text-[12px] sodo600 flex space-x-[4px]`}
						>
							<span className='sodo700'>%</span> <span>Percent</span>
						</h3>
					</div>
				</div>
			</div>
		</LabelInput>
	);
};

export default LabelDiscount;
