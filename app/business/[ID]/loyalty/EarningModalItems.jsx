"use client";
import RadioCheck from "@/components/RadioCheck";
import LabelInput from "@/components/label/LabelInput";
import LabelTime from "@/components/label/LabelTime";
import React, { useEffect, useState } from "react";

const Label = ({ label }) => {
	return <h1 className='text-[13px] sodo700 tracking-[-0.52px]  '>{label}</h1>;
};

const EarningModalItems = ({
	header,
	subHeader,
	children,
	index,
    data,
	itemSelected,
	setItemSelected,
}) => {
	const [show, setShow] = useState(false);
	const [check, setCheck] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleItemClick = (data) => {
		setItemSelected(data);
	};

	return (
		<div
			className={`w-full border border-[#E6E6E6] rounded-[4px] p-[16px] ${
				itemSelected === index ? "" : "cursor-pointer"
			}`}
			onClick={() => {
				handleItemClick(index);
			}}
		>
			<div className={`flex space-x-[16px] cursor-pointer `}>
				<RadioCheck isChecked={itemSelected === index} />
				<div>
					<h2 className='text-[12px] sodo600 tracking-[-0.24px]'>{header}</h2>
					<h3
						className={`text-[#5F6370] text-[12px] tracking-[-0.24px] sodo400  `}
					>
						{subHeader}
					</h3>
				</div>
			</div>

			<div
				className={`relative  animate00s z-0 w-[100%] pb-[8px]
                 ${itemSelected === index ? "block" : " hidden"}
                `}
			>
				<div className='flex flex-col space-y-[16px] mt-[15px]'>
					{children}
					<LabelInput
						width='md:w-[34%]'
						label={<Label label='Customers earn' />}
						padding='13px 0px 14px 16px'
					>
						<div className='flex pr-[16px]'>
							<input
								type='text'
								placeholder='0'
								className='outline-none flex-grow sodo400 tracking-[-0.52px] text-[13px]'
							/>
							<span className='text-[#818A98] sodo600 text-[13px] tracking-[-0.52px] text-right '>
								Points
							</span>
						</div>
					</LabelInput>

					<LabelTime label='Expiry' />
				</div>
			</div>
		</div>
	);
};

export default EarningModalItems;
