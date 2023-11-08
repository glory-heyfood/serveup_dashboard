import React from "react";
import DashHeader from "./DashHeader";
import SideBar from "./SideBar";

const DashLayout = ({ children }) => {
	return (
		<div className='h-screen'>
			<DashHeader />
			<div className='flex h-[93.5vh]'>
				<SideBar />
				<div className="px-[32px]">
                    {children}
                </div>
			</div>
		</div>
	);
};

export default DashLayout;
