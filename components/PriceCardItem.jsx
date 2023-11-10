import { checkmarkIcon } from "@/SVGs";
import React from "react";

const PriceCardItem = ({ text }) => {
	return (
		<div className="flex space-x-[8px] items-center">
			<div>{checkmarkIcon}</div>
			<p className='text-[#181818] text-[12px] tracking-[-0.4px] font-[300] '>
				{text}
			</p>
		</div>
	);
};

export default PriceCardItem;
