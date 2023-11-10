import React from "react";
import DashHeader from "./Dashboard/DashHeader";

const MarketingLayout = ({children}) => {
	return (
		<div className='h-screen'>
			<DashHeader />
			<div className='flex h-[93.5vh]'>
				
				<div className='px-[32px]'>{children}</div>
			</div>
		</div>
	);
};

export default MarketingLayout;
