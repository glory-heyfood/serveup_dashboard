import React from "react";
import DashHeader from "./DashHeader";
import SideBar from "./SideBar";

const DashLayout = ({ children }) => {
	return (
		<div className='h-screen w-full'>
			<DashHeader />
			<div className='flex h-[93.5vh] w-full'>
				<SideBar />
				<div className="px-[32px] py-[2em] w-full">
                    {children}
                </div>
			</div>
		</div>
	);
};

export default DashLayout;
