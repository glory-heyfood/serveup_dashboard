import React from "react";
import DashBtn from "./buttons/DashBtn";
import { XIcon, plusIcon } from "@/SVGs";

const StoreHeader = ({
	header,
	subHeader,
	btnText,
	handleClick,
	headerClass,
    handleClose,
    showXIconMobile,
}) => {
	return (
		<div className='flex justify-between md:items-center flex-col md:flex-row  '>
			<div className='order-2 md:oder-1'>
				<div className="flex items-center space-x-[0.75rem] md:space-x-0">
                <span
					className={`cursor-pointer w-fit  ${
						showXIconMobile ? ":inline-block  md:hidden" : "hidden"
					} `}
					onClick={handleClose}
				>
					{XIcon}
				</span>
				<h1
					className={
						headerClass
							? headerClass
							: "sodo700 text-[1.25rem] md:text-[0.825rem]  text-black tracking-[-0.56px]"
					}
				>
					{" "}
					{header}{" "}
				</h1>
                </div>
				<h3 className='sodo400 text-[0.75rem] text-[#7E8493] tracking-[-0.48px]  mt-[0.75rem]'>
					{" "}
					{subHeader}{" "}
				</h3>
			</div>

			{btnText && (
				<div className='w-fit order-1 md:order-2 mb-[2rem] md:mb-0'>
					<DashBtn
						text={btnText}
						handleClick={handleClick}
						padding='7px 15px'
						icon={plusIcon}
					/>
				</div>
			)}
		</div>
	);
};

export default StoreHeader;
