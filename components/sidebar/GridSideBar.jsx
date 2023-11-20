import { sidebarData } from "@/data";
import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";
import { XIcon, menuGrid } from "@/SVGs";
import { toggleGridSidebar } from "@/redux/features/gridSidebarSlice";

const GridSideBar = ({ btn, sideBarShow, GridComponent }) => {
	const [gridSidebar, setGridSidebar] = useState(false);
	const grid = useSelector((state) => state.gridSidebar.showGridSidebar);
	const showSidebar = useSelector((state) => state.sidebar.showSidebar);

	const dispatch = useDispatch();

	useEffect(() => {
		setGridSidebar(!gridSidebar);
	}, [grid]);

	return (
		<>
			<div
				className={`bg-[#00000096]  h-screen w-full fixed top-0 left-0 z-50 ${
					showSidebar ? "hidden" : "sidebarCont hidden"
				} `}
			></div>
			<div
				className={`bg-white  animate05s  h-screen pt-[32px]  fixed top-0 left-0 z-50 sidebar pr-[21px]  w-full sm:w-[345px] max-w-[350px]   ${
					showSidebar ? "translate-x-[-100%]" : "translate-x-0  "
				} ${btn && " md:pt-[100px]"} `}
				style={{
					boxShadow: "1.1px 0px 0px 0px #E6E6E6",
				}}
			>
				{grid ? (
					// I had to use an array for some reason the components display using arrays instead

					<>
						<div className='flex items-center justify-between'>
							<div
								className='bg-[#F0F0F0] w-fit rounded-[4px] p-[8px] ml-[24px] cursor-pointer'
								onClick={() => {
									dispatch(toggleGridSidebar(false));
								}}
							>
								{menuGrid}
							</div>

							<span
								className='sideXIcon flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
								onClick={() => {
									dispatch(toggleSidebar(true));
								}}
							>
								{XIcon}
							</span>
						</div>

						{GridComponent}
					</>
				) : (
					<div>
						<span
							className='sideXIcon flex items-center justify-center h-[32px] w-[32px] ml-[32px] mb-[32px]  cursor-pointer '
							onClick={() => {
								dispatch(toggleSidebar(true));
								setTimeout(() => {
									dispatch(toggleGridSidebar(true));
								}, 1000);
							}}
						>
							{XIcon}
						</span>
						<div className=' grid grid-cols-4 md:grid-cols-3 gap-x-[32px] md:gap-x-[1.5em] gap-y-[50px] md:gap-y-[1.5em] ml-[20.2px]'>
							{sidebarData.map((data, i) => (
								<SidebarItem
									noClick={data.text === "Marketing" && true}
									href={data.href}
									icon={data.icon}
									text={data.text}
									key={i}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default GridSideBar;
