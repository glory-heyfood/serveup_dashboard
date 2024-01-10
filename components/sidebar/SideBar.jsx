import { sidebarData } from "@/data";
import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "@/SVGs";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";

const SideBar = ({ btn }) => {
    const showSidebar = useSelector((state) => state.sidebar.showSidebar);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(showSidebar);
	}, []);

	
	return (
		<>
			<div
				className={`bg-[#00000096]  h-screen w-full fixed top-0 left-0 z-50 ${
					showSidebar ? "hidden" : "sidebarCont hidden"
				} `}
				onClick={() => {
					dispatch(toggleSidebar(true));
				}}
			></div>
			<div
				className={`bg-white  animate05s  h-screen pt-[32px]  fixed top-0 left-0 z-[60] sidebar pr-[21px] pl-[20px] w-full sm:w-[345px] max-w-[350px]   ${
					showSidebar ? "translate-x-[-100%]" : "translate-x-0  "
				} ${btn && " md:pt-[100px]"} `}
				style={{
					boxShadow: "1.1px 0px 0px 0px #E6E6E6",
				}}
			>
				<span
					className='sideXIcon flex items-center justify-center h-[32px] w-[32px] mb-[32px] absolte top-[32px] left-[32px] cursor-pointer '
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
				>
					{XIcon}
				</span>

				<div className=' grid grid-cols-4 md:grid-cols-3 gap-x-[32px] md:gap-x-[1.5em] gap-y-[50px] md:gap-y-[1.5em]'>
					{sidebarData.map((data, i) => (
						<SidebarItem
							href={data.href}
							icon={data.icon}
							text={data.text}
							key={i}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default SideBar;
