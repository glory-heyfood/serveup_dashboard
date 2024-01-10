import StoreDashLayout from "@/components/Dashboard/storeDashLayout";
import CustomLabel from "@/components/label/CustomLabel";
import React from "react";
import SetUpItem from "./SetUpItem";
import { bankIcon, deliveryBikeIcon, fastFoodIcon } from "@/SVGs";

const page = () => {
	return (
		<StoreDashLayout>
			<div className='w-full flex items-center justify-center'>
				<div className='w-full sm:w-[70%] md:w-[50%]'>
					<h1 className='text-black sodo700 text-[1.25rem] tacking-[-0.8px] mb-[1.5rem]'>
						Setup Guide
					</h1>
					<div className='flex items-center w-full space-x-[0.5rem] mb-[2rem]'>
						<div className='w-full h-[8px] bg-[#DEE4F2] rounded-[8px] '>
							<div className='h-[8px] bg-[#072A85] w-[33%] rounded-[8px]'></div>
						</div>
						<h1 className='text-[0.825rem] sodo700 tracking-[-0.56px] '>33%</h1>
					</div>

					<CustomLabel header='Complete these steps to setup your store'>
						<div className='flex space-y-[1rem] flex-col w-full'>
							<SetUpItem
								icon={(color) => fastFoodIcon(color)}
								text='Menu'
								completed={true}
							/>
							<SetUpItem
								icon={(color) => deliveryBikeIcon(color)}
								text='Delivery Settings'
								completed={false}
							/>
							<SetUpItem
								icon={(color) => bankIcon(color)}
								text='Bank Account'
								completed={false}
							/>
						</div>
					</CustomLabel>
				</div>
			</div>
		</StoreDashLayout>
	);
};

export default page;
