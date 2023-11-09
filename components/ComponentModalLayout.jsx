import React from "react";
import DashHeader from "./DashHeader";
import { XIcon } from "@/SVGs";

const ComponentModalLayout = ({ handleClose, children }) => {
	return (
		<div className='h-screen w-full'>
			<DashHeader />
			<div className='flex h-[93.5vh] w-full'>
				<div className='w-[350px] mt-[2em] ml-[4em] '>
					<span ClassName='cursor-pointer' onClick={handleClose}>
						{XIcon}
					</span>
				</div>
				<div className='px-[32px] py-[2em] w-full'>{children}</div>
			</div>
		</div>
	);
};

export default ComponentModalLayout;
