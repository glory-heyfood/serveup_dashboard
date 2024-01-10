import { successIcon } from "@/SVGs";
import React from "react";
import DashBtn from "./buttons/DashBtn";

const Success = ({ header, subHeader, btnText, btnWidth, btnPadding, handleClick }) => {
	return (
		<div className='flex items-center flex-col justify-center'>
			<div className='border-[2px] border-[#072A85] rounded-full p-[1rem] h-[5rem] w-[5rem] '>
				<span>{successIcon}</span>
			</div>

			<div className='flex flex-col space-y-[0.25rem] mt-[1.25rem] items-center '>
				<h1 className='text-[1rem] sodo600 tracking-[-0.64px] text-black  '>
					{header}
				</h1>
				<h3 className='text-[#7E8493] sodo400 text-[0.75rem] tracking-[-0.48px] '>
					{subHeader}
				</h3>
			</div>

			{btnText && (
				<div className={`${btnWidth ? btnWidth : "w-full"}  mt-[1.5rem]`}>
					<DashBtn
						text={btnText}
						padding={btnPadding ? btnPadding : "11px 50px"}
                        handleClick={handleClick}
					/>
				</div>
			)}
		</div>
	);
};

export default Success;
