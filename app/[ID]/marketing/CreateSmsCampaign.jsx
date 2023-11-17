"use client";
import { backArrowIcon, clockBlueIcon, dateIconBlue } from "@/SVGs";
import React, { useEffect, useState } from "react";
import CampaignItems from "./CampaignItems";
import CampaignItemInput from "./CampaignItemInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import CampaignItemSelect from "./CampaignItemSelect";

import LabelInput from "@/components/label/LabelInput";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";

const CreateSmsCampaign = ({ handleClick }) => {
	const [scheduleContent, setScheduleContent] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [formData, setFormData] = useState({
		name: null,
		email: null,
		from: null,
		fromEmail: null,
		scheduleSelect: "Now",
		sheduleContent: {
			date: "",
			time: "",
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleDateChange = (value) => {
		setDate(value);
	};

	const handleTimeChange = (value) => {
		setTime(value);
	};

	useEffect(() => {
		setScheduleContent(`${date} . ${time}`);
	}, [date, time]);

	return (
		<div className='pb-[120px]'>
			<div
				className='bg-[#F0F0F0]  rounded-[4px] mb-[24px] flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
				onClick={handleClick}
			>
				{backArrowIcon}
			</div>

			<h1 className='text-[16px] sodo700 tracking-[-0.64px] mb-[24px] '>
				Campaign Details
			</h1>

			<CampaignItems
				header='Campaign name'
				subHeader='Give your campaign a unique name'
				linkText='Add campaign name'
				content={formData.name}
			>
				<CampaignItemInput
					placeholder='Campaign name'
					name='name'
					handleChange={handleChange}
				/>
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
								width='w-[40%]'
								label='Use date joined'
								defaultValue='Select date'
								selectedValue=''
								option={[""]}
							/>
						</div>

						<div className='w-[50%]'>
							<LabelSelect
								width='w-[40%]'
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
                content={scheduleContent}
			>
				<div className='flex flex-col w-full space-y-[20px] '>
					<div className='w-[20%] '>
						<CampaignItemSelect
							name='scheduleSelect'
							handleChange={handleChange}
							selectedValue={formData.scheduleSelect}
							option={[
								{
									value: "Later",
									text: "Later",
								},
								{
									value: "Now",
									text: "Now",
								},
							]}
						/>
					</div>

					{formData.scheduleSelect === "Later" && (
						<div className='flex space-x-[20px]'>
							<div className='w-[50%]'>
								<LabelInput
									width='w-[40%]'
									label='Date'
									padding='13px 0px 14px 16px'
								>
									<div className='flex items-center justify-between'>
										<DatePicker handleDateChange={handleDateChange} color='black' />
										<span className='mr-[22px]'> {dateIconBlue} </span>
									</div>
								</LabelInput>
							</div>
							<div className='w-[50%]'>
								<LabelInput
									width='w-[40%]'
									label='Date'
									padding='13px 0px 14px 16px'
								>
									<div className='flex items-center justify-between'>
										<TimePicker handleTimeChange={handleTimeChange} color='black' />
										<span className='mr-[22px]'> {clockBlueIcon} </span>
									</div>
								</LabelInput>
							</div>
						</div>
					)}
				</div>
			</CampaignItems>
		</div>
	);
};

export default CreateSmsCampaign;
