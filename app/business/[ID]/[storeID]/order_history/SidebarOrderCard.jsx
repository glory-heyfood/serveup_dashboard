import { extractValidationProps } from "@mui/x-date-pickers/internals";
import React from "react";

const SidebarOrderCard = ({ number, name, extra }) => {
	return (
		<div className='flex items-start space-x-[0.5em]'>
			<h3 className=' text-black text-[11.5px] sodo700 border-[0.5px] rounded-[2px] py-[1px] px-[2px]  border-[#E6E6E6]'>
				{number}
			</h3>
			<div className='flex flex-col space-y-[0.25em]'>
				<h3 className='tracking-[-0.6px] sodo600 text-[#000]'>{name}</h3>
				{extra.map((data, i) => (
					<h3
						key={i}
						className='tracking-[-0.38px] sodo400 leading-[15px] text-[#7E8493] '
					>
						{data}
					</h3>
				))}
			</div>
		</div>
	);
};

export default SidebarOrderCard;
