import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "./Table";
import { plusIcon } from "@/SVGs";

const Campaign = ({ handleClick }) => {
	const [isVisible, setIsVisible] = useState(false);

    
	return (
		<div>
			<div className='flex flex-col  md:flex-row md:items-center justify-between mb-[32px]  '>
				<div className='order-2 md:order-1 w-full md:w-fit'>
					<CustomSearch fullWidth placeholder='Search' />
				</div>
				<div className='inline-block w-fit order-1 md:order-2 mb-[24px] md:mb-0'>
					<DashBtn
						text='Create new campaign'
						icon={plusIcon}
						handleClick={handleClick}
					/>
				</div>
			</div>
		

			<StickyHeadTable />
		</div>
	);
};

export default Campaign;
