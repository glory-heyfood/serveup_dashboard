import React from "react";

const AnalyticsCardItem = ({itemLeft, itemRight}) => {
	return (
		<div className='flex justify-between items-center w-full'>
			<h2 className='text-[16px] md:text-[12px]  tracking-[-0.48px] sodo600 '>
				{itemLeft}
			</h2>

			<h2 className='text-[16px] md:text-[12px]  tracking-[-0.48px] inter font-[500] '>
				{itemRight}
			</h2>
		</div>
	);
};

export default AnalyticsCardItem;
