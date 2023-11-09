import { plusIcon, shieldIcon } from "@/SVGs";
import { Button } from "@mui/material";
import React from "react";
import DashBtn from "./DashBtn";

const EmptyState = ({ header, text, btnText, handleClick, icon }) => {
	return (
		<div
			className={`border border-[#E6E6E6] rounded-[8px] flex items-center justify-center flex-col space-y-[1em] ${
				btnText ? "py-[2.5em]" : "py-[3.75em]"
			} `}
		>
			<div className='flex flex-col space-y-[1.25em] items-center'>
				<div className='h-[80px] w-[80px] p-[16px] flex items-center justify-center border-[2px] rounded-[100px] border-black'>
					{icon}
				</div>
				<div className='flex flex-col space-y-[0.25em] items-center justify-center'>
					<h1 className='text-[1em] text-black tracking-[-0.64px] sodoBold '>
						{" "}
						{header}
					</h1>
					<p className='text-[#7E8493] text-[12px] tracking-[-0.48px] sodoReg '>
						{text}
					</p>
				</div>
			</div>
			{btnText && (
				<div className="inline">
                    <DashBtn
					text={btnText}
					padding='10px 12px'
					onClick={handleClick}
					icon={plusIcon}
				/>
                </div>
			)}
		</div>
	);
};

export default EmptyState;
