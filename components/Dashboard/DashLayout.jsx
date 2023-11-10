import React from "react";
import DashHeader from "./DashHeader";
import SideBar from "../sidebar/SideBar";

const DashLayout = ({ children }) => {
	return (
		<div className='h-screen w-full '>
			<DashHeader />
			<div className='flex h-screen  relative pt-[3.5em] w-full'>
				<SideBar />
				<div className="px-[32px] py-[2em] w-full ">
                    {children}
                </div>
			</div>
		</div>
	);
};

export default DashLayout;
