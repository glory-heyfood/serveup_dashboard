import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/Dashboard/DashBtn";
import React from "react";
import StickyHeadTable from "./Table";
import { plusIcon } from "@/SVGs";

const Campaign = ({handleClick}) => {
	return (
		<div>
			<div className='flex items-center justify-between mb-[32px]'>
				<CustomSearch placeholder='Search' />
				<div className='inline'>
					<DashBtn text='Create new campaign' icon={plusIcon} handleClick={handleClick} />
				</div>
			</div>

			<StickyHeadTable />
		</div>
	);
};

export default Campaign;
