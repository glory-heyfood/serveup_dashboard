import { sidebarData } from "@/data";
import React from "react";
import SidebarItem from "./SidebarItem";

const SideBar = () => {
	return (
		<div
			className='w-[300px]  '
			style={{
				boxShadow: "1px 0px 0px 0px #E6E6E6",
				padding: "40px 28px 0px 21px",
			}}
		>
			<div className=' grid grid-cols-3 gap-x-[24px] gap-y-[32px]'>
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
