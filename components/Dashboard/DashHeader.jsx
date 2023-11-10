import { buildingIcon, menuIcon } from "@/SVGs";
import Image from "next/image";
import React from "react";

const DashHeader = () => {
	return (
		<div
			className='flex justify-between  items-center fixed top-0 left-0 w-full z-50 bg-white '
			style={{
				boxShadow: " 0px 1px 0px 0px #E6E6E6",
				padding: "15px 40px 16px 24px",
			}}
		>
			<div className='flex space-x-[24px] items-center'>
				<span>{menuIcon}</span>
				<Image src='/images/logo.svg' width={24} height={24} alt='logo' />
			</div>

			<div className='flex items-center space-x-[24px]'>
				<div className='flex space-x-[4px] items-center'>
					<span> {buildingIcon} </span>
					<h1 className=' text-[#072A85] text-[14px] font-[600] tracking-[-0.5px] '>
						Toasties
					</h1>
				</div>
				<div
					style={{
						background: "rgba(255, 138, 0, 0.10)",
						padding: "4px 8px",
						borderRadius: "2px",
					}}
				>
					<h1 className='text-[#FF8A00] text-[10px] font-[700] tracking-[-0.4px] '>
						STARTER
					</h1>
				</div>
			</div>
		</div>
	);
};

export default DashHeader;
