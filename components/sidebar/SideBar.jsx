import { sidebarData } from "@/data";
import React from "react";
import SidebarItem from "./SidebarItem";

const SideBar = ({btn, sideBarShow}) => {
	return (
		<div
			className={`bg-white md:bg-transparent translate-x-[${sideBarShow}] animate05s md:translate-x-0  h-screen md:h-full md:block fixed top-0 left-0 z-50 md:z-0 pt-[40px] md:static w-full md:w-[345px]  ${btn ? "md:mt-[-26px]" : "md:mt-[-32px]"}`}
			style={{
				boxShadow: "1.1px 0px 0px 0px #E6E6E6",
				padding: "40px 21px 0px 20px",
			}}
		>
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
	);
};

export default SideBar;
