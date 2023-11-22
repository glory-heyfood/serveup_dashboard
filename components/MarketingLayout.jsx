"useClient";
import React, { useEffect, useState } from "react";
import DashHeader from "./Dashboard/DashHeader";
import GridSideBar from "./sidebar/GridSideBar";

const MarketingLayout = ({ children, GridComponent }) => {
	const [gridContent, setGridContent] = useState(true);
	

	return (
		<div className='h-screen w-full '>
			<DashHeader />
			{/* I am calculating the padding top if there is a button the pt is 6px lower cause for the padding of the button */}
			<div className={`flex h-full  w-full `}>
				<GridSideBar
					gridContent={gridContent}
					setGridContent={setGridContent}
					GridComponent={GridComponent}
				/>
				<div
					className=' px-[20px] md:px-[32px] pt-[88px]  h-screen  relative overflow-auto scroll-hidden  w-full '
					// onScroll={() => {handleScroll()}}
				>
					{children}
				</div>
			</div>

		
		</div>
	);
};

export default MarketingLayout;
