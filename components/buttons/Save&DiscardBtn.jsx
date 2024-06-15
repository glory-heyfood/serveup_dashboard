import React from "react";
import DashBtn from "./DashBtn";

const SaveDiscardBtn = ({
	handleSaveClick,
	handleDiscardClick,
	btnLoading,
	justify,
	padding,
}) => {
	return (
		<div
			className={`flex flex-col md:flex-row space-y-[20px] md:space-y-0 md:space-x-[12px] md:w-full items-center ${
				justify ? justify : "justify-start "
			} ${padding ? padding : "py-[40px]"}`}
		>
			<span className='w-full md:w-fit'>
				<DashBtn
					text='Save'
					padding='9px 70px'
					handleClick={handleSaveClick}
					btnLoading={btnLoading}
				/>
			</span>
			<span className='w-full md:w-fit'>
				<DashBtn
					text='Discard'
					padding='9px 35px'
					handleClck={handleDiscardClick}
				/>
			</span>
		</div>
	);
};

export default SaveDiscardBtn;
