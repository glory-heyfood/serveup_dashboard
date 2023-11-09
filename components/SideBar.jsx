import { sidebarData } from "@/data";
import React from "react";
import SidebarItem from "./SidebarItem";

const SideBar = () => {
	return (
		<div
			className='w-[350px]  '
			style={{
				boxShadow: "1px 0px 0px 0px #E6E6E6",
				padding: "40px 20px 0px 20px",
			}}
		>
			<div className=' grid grid-cols-3 gap-x-[1.5em] gap-y-[2em]'>
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
