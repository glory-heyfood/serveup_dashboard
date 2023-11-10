import { userBlueIcon } from "@/SVGs";
import React from "react";

const CustomerItems = ({ data, handleClick, isSelected }) => {
	return (
		<div
			className={`flex space-x-[1.25em] pt-[0.875em] pb-[1em] hover:bg-[#F0F3FC]  cursor-pointer ${
				isSelected && "bg-[#F0F3FC]"
			} `}
			onClick={() => {
				handleClick(data);
			}}
		>
			<span className='p-[0.5em] w-[2em] h-[2em] rounded-full flex items-center justify-center bg-[#F0F3FC]'>
				{" "}
				{userBlueIcon}{" "}
			</span>
			<div className='flex flex-col space-y-[2px]'>
				<h3 className='sodo600 text-[#000] text-[0.75em] tracking-[-0.24px]'>
					{" "}
					{data.name}{" "}
				</h3>
				<h3 className='text-[#5F6370] text-[0.75em] tracking-[-0.24px] sodo400'>
					{" "}
					{data.email}{" "}
				</h3>
			</div>
		</div>
	);
};

export default CustomerItems;
