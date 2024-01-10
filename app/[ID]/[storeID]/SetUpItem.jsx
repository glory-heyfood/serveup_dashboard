import { checkmarkIcon, checkmarkIconBlue, rightArrIcon } from "@/SVGs";
import React from "react";

const SetUpItem = ({ text, completed, icon }) => {
	return (
		<div
			className={`py-[12px] px-[1rem] ${
				completed ? "border-[#072A85]" : "border-[#E6E6E6]"
			} border rounded-[8px] flex items-center justify-between`}
		>
			<div className='flex items-center space-x-[1.5rem]'>
				<div
					className={`${
						completed ? "bg-[#F2F4F9]" : "bg-[#606B7C]"
					} rounded-[8px] h-[40px] w-[40px] flex items-center justify-center `}
				>
					<span> {completed ? icon("#072A85") : icon("white")} </span>
				</div>
				<h2
					className={`text-[0.825rem] sodo600 tracking-[-0.56px] ${
						completed ? "text-[#072A85]" : "text-black"
					} `}
				>
					{text}
				</h2>
			</div>

			<span>{completed ? checkmarkIconBlue : rightArrIcon()}</span>
		</div>
	);
};

export default SetUpItem;
