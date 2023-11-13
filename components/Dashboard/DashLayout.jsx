import React, { useState } from "react";
import DashHeader from "./DashHeader";
import SideBar from "../sidebar/SideBar";

const DashLayout = ({ children, btn }) => {
    const [sideBarShow, setSideBarShow] = useState('-100%')

    const handleSideBar = () => {
        console.log("called")
        setSideBarShow('0%')
    }

    
	return (
		<div className='h-screen w-full '>
			<DashHeader handleSideBar={handleSideBar} />
            {/* I am calculating the padding top if there is a button the pt is 6px lower cause for the padding of the button */}
			<div className={`flex h-screen  relative  w-full ${btn ? "pt-[82px]" : "pt-[88px]"}`}>
				<SideBar btn={btn} sideBarShow={sideBarShow} />
				<div className=" px-[20px] md:px-[32px]   w-full ">
                    {children}
                </div>
			</div>
		</div>
	);
};

export default DashLayout;
