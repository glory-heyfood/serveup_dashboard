import { RadioCheckIcon } from "@/SVGs";
import React from "react";

const RadioCheck = ({ isChecked }) => {    
	return (
		<div>
			{isChecked ? (
				<span>{RadioCheckIcon}</span>
			) : (
				<div className='w-[20px] h-[20px] border border-[#C4C5CA] rounded-[120px] '></div>
			)}
		</div>
	);
};

export default RadioCheck;
