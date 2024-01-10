"use client";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import StoreDashLayout from "@/components/Dashboard/storeDashLayout";
import InterTextComp from "@/components/InterTextComp";
import { options } from "@/data";
import React from "react";
import StickyHeadTable from "./Table";

const Page = () => {    
    const handleChange =(e) =>{
        console.log(e.value)
    }

 
	return (
		<StoreDashLayout>
			<div className='w-full flex flex-col space-y-[1.5rem] pb-[3rem]'>
				<h1 className='dashHeader !md:mb-[3rem]'> Order history </h1>

				<div className='flex flex-col md:flex-row md:items-center justify-between w-full lg:w-[70%]  '>
					<InterTextComp header='Total number of orders' text='1,875' />
					<hr className='h-[51px] w-[0.5px] hidden md:block bg-[#E6E6E6]  ' />
					<div className="flex items-center justify-between mt-[1.5rem] md:mt-0">
                    <InterTextComp header='Total Earnings' text='₦ 4,815,000' />
					<hr className='h-[51px] w-[0.5px] hidden md:block bg-[#E6E6E6]  ' />
					<InterTextComp header='Average Order Value' text='₦ 2,568' />
                    </div>
				</div>
                <hr className="w-full mt-[0.75rem] h-[0.5px] bg-[#E6E6E6] " />

				<div className='flex md:space-x-[0.75rem] md:items-center flex-col md:flex-row  space-y-[1.5rem] md:space-y-0'>
					<div className="w-fit">
                    <CustomSelect
						defaultValue='Sort by'
						option={options}
						selectedValue=''
					/>
                    </div>
					<CustomSearch
						placeholder='Search '
						handleChange={handleChange}						
					/>
				</div>


                <StickyHeadTable />
			</div>
		</StoreDashLayout>
	);
};

export default Page;
