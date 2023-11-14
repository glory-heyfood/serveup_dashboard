"useClient";
import React, { useState } from "react";
import DashHeader from "./Dashboard/DashHeader";
import GridSideBar from "./sidebar/GridSideBar";

const MarketingLayout = ({children}) => {
    const [gridContent, setGridContent] = useState(true)
	return (
		<div className='h-screen'>
			<DashHeader />
			<div className='flex h-[93.5vh] pt-[80px] w-full'>
				<GridSideBar gridContent={gridContent} setGridContent={setGridContent} />
				<div className='px-[32px] w-full '>{children}</div>
			</div>
		</div>
	);
};

export default MarketingLayout;
