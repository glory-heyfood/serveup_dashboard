import React from "react";
import DashHeader from "./Dashboard/DashHeader";
import { XIcon } from "@/SVGs";

const ComponentModalLayout = ({ handleClose, children, className, XIconHideMoble}) => {
	return (
		<div className='h-screen w-full '>
			<DashHeader />
			<div className='flex h-screen relative  overflow-hidden overflow-y-scroll scroll-hidden w-full pt-[88px] '>
				<div className=' absolute md:fixed left-[20px] sm:left-[32px] lg:left-[64px]'>
					<span
						className={`cursor-pointer w-fit  ${XIconHideMoble ? "hidden md:inline-block" : "inline-block"} `}
						onClick={handleClose}
					>
						{XIcon}
					</span>
				</div>

				<div className={className ? className : '  w-full sm:w-[70%] lg:w-[53%] h-full  mx-auto '}>{children}</div>
			</div>
		</div>
	);
};

export default ComponentModalLayout;
