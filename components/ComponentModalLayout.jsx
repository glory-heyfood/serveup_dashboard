import React from "react";
import DashHeader from "./Dashboard/DashHeader";
import { XIcon } from "@/SVGs";

const ComponentModalLayout = ({ handleClose, children }) => {
	return (
		<div className='h-screen w-full '>
			<DashHeader />
			<div className='flex h-screen relative w-full pt-[2.5em]'>
				<div className='w-[350px]  '>
					<span
						className='cursor-pointer w-fit inline-block mt-[2em] ml-[4em]'
						onClick={handleClose}
					>
						{XIcon}
					</span>
				</div>

				<div className='px-[32px] py-[2em] w-full  '>{children}</div>
			</div>
		</div>
	);
};

export default ComponentModalLayout;
