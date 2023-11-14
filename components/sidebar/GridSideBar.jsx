import { sidebarData } from "@/data";
import React from "react";
import SidebarItem from "./SidebarItem";
import { menuGrid } from "@/SVGs";
import { useDispatch, useSelector } from "react-redux";
import { toggleGridSidebar } from "@/redux/features/gridSidebarSlice";

const GridSideBar = ({ btn, sideBarShow }) => {
    const gridSidebar = useSelector((state) => state.gridSidebar.showGridSidebar)
    const dispatch = useDispatch()
	return (
		<div
			className={`bg-white md:bg-transparent  animate05s md:translate-x-0  h-screen  md:block hidden top-0 left-0 z-50 md:z-0  md:static w-full md:w-[350px]     ${
				btn ? "md:mt-[-26px]" : ""
			}`}
			style={{
				boxShadow: "1.1px 0px 0px 0px #E6E6E6",
				padding: "80px 0px 0px 0",
			}}
		>

			{gridSidebar ? (
				<>
					{" "}
					<div className='bg-[#F0F0F0] w-fit rounded-[4px] p-[8px] ml-[24px] cursor-pointer'
                    onClick={()=>{
                        dispatch(toggleGridSidebar(false))                        
                    }}
                    >
						{menuGrid}
					</div>
					<div className='pr-[35px] mt-[20px] '>
						<div className='bg-[#F2F4F9] pl-[24px] py-[16px] '>
							<h2 className='text-[#072A85] tracking-[-0.28px] text-[14px] '>
								Email campaign
							</h2>
						</div>

						<div className='bg-[#fff] pl-[24px] py-[19px] '>
							<h2 className='text-[#000] tracking-[-0.28px] text-[14px] '>SMS campaign</h2>
						</div>
					</div>
				</>
			) : (
				<div className=' grid grid-cols-4 md:grid-cols-3 gap-x-[32px] md:gap-x-[1.5em] gap-y-[50px] md:gap-y-[1.5em] ml-[20.2px]'>
					{sidebarData.map((data, i) => (
						<SidebarItem							
							href={data.href}
							icon={data.icon}
							text={data.text}
							key={i}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default GridSideBar;
