import { backArrowIcon } from "@/SVGs";
import React from "react";
import CampaignItems from "./CampaignItems";
import { TextField } from "@mui/material";
import CampaignItemInput from "./CampaignItemInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import CampaignItemSelect from "./CampaignItemSelect";
import CampaignLabelSelect from "./CampaignLabelSelect";

const Campaign = ({handleClick}) => {
	const handleChange = () => {
		console.log("heu");
	};
	return (
		<div>
			<div className='bg-[#F0F0F0]  rounded-[4px] mb-[24px] flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
            onClick={handleClick}
            >
				{backArrowIcon}
			</div>

            <h1 className="text-[16px] sodo700 tracking-[-0.64px]  ">Campaign Details</h1>

			<CampaignItems
				header='Campaign name'
				subHeader='Give your campaign a unique name'
				linkText='Add campaign name'
			>
				<CampaignItemInput
					placeholder='Campaign name'
					handleChange={handleChange}
				/>
			</CampaignItems>

			<CampaignItems
				header='Email Subject'
				subHeader='What is the subject of this campaign?'
				linkText='Insert data'
			>
				<CampaignItemInput
					placeholder='Email Subject'
					handleChange={handleChange}
				/>
			</CampaignItems>

			<CampaignItems
				header='From'
				subHeader='Who is sending this campaign?'
				linkText='Add sender'
			>
				<div className='flex w-full space-x-[20px]'>
					<div className='w-[50%]'>
						<LabelSearchInput label='Name' placeholder='Name' fullWidth />
					</div>
					<div className='w-[50%]'>
						<LabelSearchInput
							label='Email Address'
							placeholder='Email address'
							fullWidth
						/>
					</div>
				</div>
			</CampaignItems>

			<CampaignItems
				header='Recipients'
				subHeader='Who will this campaign  be sent to?'
				linkText='Select recipients'
			>
				<div className='flex flex-col w-full space-y-[20px]'>
					<LabelSelect
						label='Locations'
						defaultValue='Select locations'
						selectedValue=''
						option={[""]}
					/>

					<div className='flex space-x-[20px]'>
						<div className='w-[50%]'>
							<CampaignLabelSelect
								label='Use date joined'
								defaultValue='Select date'
								selectedValue=''
								option={[""]}
							/>
						</div>

						<div className='w-[50%]'>
							<CampaignLabelSelect
								label='Use last order date'
								selectedValue=''
								defaultValue='Select date'
								option={[""]}
							/>
						</div>
					</div>
				</div>
			</CampaignItems>

			<CampaignItems
				header='Schedule'
				subHeader='When will this campaign be sent to customers?'
				linkText='Set Schedule'
			>
				<div className='flex flex-col w-full space-y-[20px] '>
					<div className="w-[20%] ">
                    <CampaignItemSelect defaultValue='Now' option={[""]} />
                    </div>

					<div className='flex space-x-[20px]'>
						<div className='w-[50%]'>
							<CampaignLabelSelect
								label='Use data joined'
								selectedValue=''
								defaultValue='Select date'
								option={[""]}
							/>
						</div>
						<div className='w-[50%]'>
							<CampaignLabelSelect
								label='Use last order date'
								selectedValue=''
								defaultValue='Select date'
								option={[""]}
							/>
						</div>
					</div>
				</div>
			</CampaignItems>
		</div>
	);
};

export default Campaign;
