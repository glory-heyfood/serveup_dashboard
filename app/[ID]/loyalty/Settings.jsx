import MarketingLayout from "@/components/MarketingLayout";
import React from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import RuleTable from "./RuleTable";
import RewardTable from "./RewardTable";
import SelectLocations from "./SelectLocations";
import DashBtn from "@/components/Dashboard/DashBtn";
const Settings = () => {
	
	return (
		<MarketingLayout GridComponent={<GridComponent />}>
			<div className='mb-[32px]'>
				<BreadCrumb main='Loyalty Rewards' link='Settings' />
			</div>

			<div className="flex flex-col space-y-[32px]">
				<RuleTable />
                <RewardTable />
                <SelectLocations />
			</div>

           <div className="flex justify-end">
           <div className=' items-center justify-end space-x-[12px] inline-flex w-fit mt-[32px] pb-[32px]'>
					<DashBtn
						text='Save'						
						padding='7px 52px 7px 52px'						
					/>
					<DashBtn
						text='Discard'
						padding='7px 24px 7px 24px'						
					/>
				</div>
           </div>
           
		</MarketingLayout>
	);
};

export default Settings;
