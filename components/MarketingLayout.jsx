"useClient";
import React, { useState } from "react";
import DashHeader from "./Dashboard/DashHeader";
import GridSideBar from "./sidebar/GridSideBar";

const MarketingLayout = ({children}) => {
    const [gridContent, setGridContent] = useState(true)
	return (
		<div className='h-screen'>
			<DashHeader />
			<div className='flex   w-full'>
				<GridSideBar gridContent={gridContent} setGridContent={setGridContent} />
				<div className='px-[32px] w-full h-screen overflow-auto scroll-hidden pt-[80px] '>{children}</div>
			</div>
		</div>
	);
};

export default MarketingLayout;
