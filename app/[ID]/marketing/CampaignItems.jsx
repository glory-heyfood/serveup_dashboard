"use client";
import DashBtn from "@/components/Dashboard/DashBtn";
import RadioCheck from "@/components/RadioCheck";
import React, { useState } from "react";
import Insert from "./Insert";

const CampaignItems = ({
	header,
	subHeader,
	linkText,
	children,
	content,
	insert,
}) => {
	const [show, setShow] = useState(false);
	const [check, setCheck] = useState(false);
	return (
		<div className={`pt-[22px] pr-[34px] ${show ? "w-[80%]" : "w-full"}`}>
			<div
				className='flex justify-between items-center z-20 relative mb-[16px] pb-[22px]'
				style={{
					boxShadow: show ? "0px" : " 0px 0.5px 0px 0px #F0F0F0",
				}}
			>
				<div
					className={`flex space-x-[16px] ${show ? "w-[50%]" : "w-[160px]"} `}
					onClick={() => setCheck(false)}
				>
					<RadioCheck isChecked={check} />
					<div>
						<h2 className='text-[12px] sodo600 tracking-[-0.24px]'>{header}</h2>
						<h3
							className={`text-[#5F6370] text-[12px] tracking-[-0.24px] sodo400 ${
								show ? "block" : "hidden"
							} `}
						>
							{subHeader}
						</h3>
					</div>
				</div>

				<div className='w-[50%] flex-grow'>
					<h3 className='text-[#5F6370] text-[12px] tracking-[-0.24px] sodo400 text-left '>
						{check && content}
					</h3>
				</div>

				{show ? (
					<div
						className={`text-[#072A85] sodo700 text-[12px] tracking-[-0.24px] cursor-pointer 		
						 `}
					>
						{insert && <Insert defaultValue='Insert' selectedValue="" option={[""]} />}
					</div>
				) : (
					<div
						className={`text-[#072A85] sodo700 text-[12px] tracking-[-0.24px] cursor-pointer 
						} `}
						onClick={() => {
							setShow(true);
                            setCheck(false)
						}}
					>
						{check ? "Edit" : linkText}
					</div>
				)}
			</div>

			<div
				className={`relative  animate01s z-0 w-[100%]  ${
					show
						? "translate-y-[0%] opacity-100 max-h-fit"
						: "  translate-y-[-100%] opacity-0 max-h-[0]"
				}`}
			>
				{children}

				<div className=' items-center space-x-[12px] mt-[20px] inline-flex w-fit'>
					<DashBtn
						text='Save'
						disabled={content === null || content === "" ? true : false}
						padding='7px 32px 7px 32px'
						handleClick={() => {
							setCheck(true);
							setShow(false);
						}}
					/>
					<DashBtn
						text='Cancel'
						padding='7px 7px 7px 7px'
						handleClick={() => setShow(false)}
					/>
				</div>
			</div>
		</div>
	);
};

export default CampaignItems;
