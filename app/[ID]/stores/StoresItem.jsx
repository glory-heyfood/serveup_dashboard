import { storeColorIcon, storeRightIcon } from "@/SVGs";
import React from "react";

const StoresItem = ({ text }) => {
	return (
		<div
			className='w-full h-[3.56em] flex items-center justify-between my-[1px]'
			style={{
				background: "#FFF",
				boxShadow: " 0px 1px 0px 0px #F0F0F0",
			}}
		>
			<div className='flex items-center justify-center space-x-[1.25em]'>
				<div className='bg-[#F2F4F9] rounded-[4px] p-[0.375em] flex items-center justify-center '>
					{storeColorIcon}
				</div>
				<h3 className='tracking-[0.24px] sodoReg font-[0]'>{text}</h3>
			</div>
			<div>{storeRightIcon}</div>
		</div>
	);
};

export default StoresItem;
