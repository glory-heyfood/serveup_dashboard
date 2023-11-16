"use client";
import { backArrowIcon } from "@/SVGs";
import React, { useState } from "react";
import CampaignItems from "./CampaignItems";
import { TextField } from "@mui/material";
import CampaignItemInput from "./CampaignItemInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import CampaignItemSelect from "./CampaignItemSelect";
import CampaignLabelSelect from "./CampaignLabelSelect";

const CreateCampaign = ({handleClick}) => {
    const [nameContent, setNameContent] = useState(null)
    const [emailContent, setEmailContent] = useState(null)
    const [fromContent, setFromContent] = useState(null)
    const [fromEmailContent, setFromEmailContent] = useState(null)
	const handleChange = () => {
		console.log("heu");
	};

    const handleNameChange = (e) =>{
        setNameContent(e.target.value)
    }

    const handleEmailChange = (e) =>{
        setEmailContent(e.target.value)
    }

    const handleFromChange = (e) =>{
        setFromContent(e.target.value)
    }

    const handleFromEmailChange = (e) =>{
        setFromEmailContent(e.target.value)
    }

	return (
		<div className="pb-[120px]">
			<div className='bg-[#F0F0F0]  rounded-[4px] mb-[24px] flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
            onClick={handleClick}
            >
				{backArrowIcon}
			</div>

            <h1 className="text-[16px] sodo700 tracking-[-0.64px] mb-[24px] ">Campaign Details</h1>

			<CampaignItems
				header='Campaign name'
				subHeader='Give your campaign a unique name'
				linkText='Add campaign name'
                content={nameContent}
			>
				<CampaignItemInput
					placeholder='Campaign name'                    
					handleChange={handleNameChange}
				/>
			</CampaignItems>

			<CampaignItems
				header='Email Subject'
				subHeader='What is the subject of this campaign?'
				linkText='Add email subject '
                content={emailContent}
                insert={true}
			>
				<CampaignItemInput
					placeholder='Email Subject'
					handleChange={handleEmailChange}
				/>
			</CampaignItems>

			<CampaignItems
				header='From'
				subHeader='Who is sending this campaign?'
				linkText='Add sender'
                content={fromContent}
			>
				<div className='flex w-full space-x-[20px]'>
					<div className='w-[50%]'>
						<LabelSearchInput label='Name' handleChange={handleFromChange} placeholder='Name' fullWidth />
					</div>
					<div className='w-[50%]'>
						<LabelSearchInput
                        width="w-[40%]"
							label='Email Address'
							placeholder='Email address'
							fullWidth
                            handleChange={handleFromEmailChange}
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
							<LabelSelect
                                width="w-[40%]"
								label='Use date joined'
								defaultValue='Select date'
								selectedValue=''
								option={[""]}
							/>
						</div>

						<div className='w-[50%]'>
							<LabelSelect
                                width="w-[40%]"
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
							<LabelSelect
                            width="w-[40%]"
								label='Date'
								selectedValue=''
								defaultValue='Select date'
								option={[""]}
							/>
						</div>
						<div className='w-[50%]'>
							<LabelSelect
                            width="w-[40%]"
								label='Time'
								selectedValue=''
								defaultValue='Select time'
								option={[""]}
							/>
						</div>
					</div>
				</div>
			</CampaignItems>
		</div>
	);
};

export default CreateCampaign;
