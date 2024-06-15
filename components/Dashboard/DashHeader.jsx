import { buildingIcon, dropDownBlueIcon, menuIcon } from "@/SVGs";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashHeader = ({ handleSideBar }) => {    
    const dispatch = useDispatch()
    const [data, setData] = useState()
    useEffect(()=>{
        const dat = JSON.parse(window.localStorage.getItem("serveup_business"))        
        setData(dat)
    }, [])

	return (
		<div
			className='flex justify-between h-[56px] items-center fixed top-0 left-0 w-full z-50 bg-white px-[20px] md:pt-[15px] md:pr-[40px] md:pb-[16px] md:pl-[24px]  '
			style={{
				boxShadow: " 0px 1px 0px 0px #E6E6E6",
			}}
		>
			<div className='flex space-x-[24px] items-center'>
				<span
					onClick={() => {
						dispatch(toggleSidebar(false))
					}}
				>
					{menuIcon}
				</span>
				<Image src='/images/logo.svg' width={24} height={24} alt='logo' />
			</div>

			<div className='flex items-center space-x-[12px]'>
				<div className='flex space-x-[5px] items-center'>
					<span> {buildingIcon} </span>
					<h1 className=' text-[#072A85] text-[14px] capitalize leading-[15px] sodo600 tracking-[-0.56px]  '>
						{data?.name}
					</h1>
					<span>{dropDownBlueIcon}</span>
				</div>
				<div
					style={{
						background: "rgba(255, 138, 0, 0.10)",
						padding: "4px 8px",
						borderRadius: "2px",
					}}
				>
					<h1 className='text-[#FF8A00] text-[10px] sodo600 tracking-[-0.1px] '>
						{data?.subscription_plan}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default DashHeader;
