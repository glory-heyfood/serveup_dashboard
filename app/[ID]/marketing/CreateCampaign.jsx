"use client";
import { XIcon, backArrowIcon, clockBlueIcon, dateIconBlue } from "@/SVGs";
import React, { useEffect, useState } from "react";
import CampaignItems from "./CampaignItems";
import CampaignItemInput from "./CampaignItemInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import CampaignItemSelect from "./CampaignItemSelect";
import LabelInput from "@/components/label/LabelInput";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";
import Insert from "./Insert";

const CreateCampaign = ({ handleClick }) => {
	const [scheduleContent, setScheduleContent] = useState("");
	const [fromContent, setFromContent] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		from: "",
		fromEmail: "",
        locationSelect:"",
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

	const handleEmailChange = (e) => {
		setEmailValue(e.target.value);
	};

	const handleEmailSelectChange = (e) => {        
		const selectedValue = e.target.value
        setSelectedOption(selectedValue);
        setEmailValue((prevInputValue) => `${prevInputValue} ${selectedValue}`);
	};

	useEffect(() => {
		setScheduleContent(`${date} . ${time}`);
	}, [date, time]);

	useEffect(() => {
		if (formData.from.trim() !== "" && formData.fromEmail.trim() !== "") {
			setFromContent(formData.from);
		} else {
			setFromContent("");
		}
	}, [formData]);

	return (
		<div className='pb-[120px]'>
			<div
				className='bg-[#F0F0F0]  rounded-[4px] mb-[24px] flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
				onClick={handleClick}
			>
				{XIcon}
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
				header='Email Subject'
				subHeader='What is the subject of this campaign?'
				linkText='Add email subject '
				content={emailValue}
				insert={
					<Insert
						defaultValue='Insert'
						selectedValue={selectedOption}
						handleChange={handleEmailSelectChange}
						options={[
							{ label: "first name", value: "{{firstName}}" },
							{ label: "last name", value: "{{lastName}}" },
						]}
					/>
				}
			>
				<CampaignItemInput
					placeholder='Email Subject'
					name='email'
					value={emailValue}
					handleChange={handleEmailChange}
				/>
			</CampaignItems>

			<CampaignItems
				header='From'
				subHeader='Who is sending this campaign?'
				linkText='Add sender'
				content={fromContent}
			>
				<div className='flex flex-col sm:flex-row w-full sm:space-x-[20px] space-y-[12px] sm:space-y-0 '>
					<div className='w-full sm:w-[50%]'>
						<LabelSearchInput
							label='Name'
							handleChange={handleChange}
							placeholder='Name'
							name='from'
							fullWidth
						/>
					</div>
					<div className='w-full sm:w-[50%]'>
						<LabelSearchInput
							width='w-[40%]'
							label='Email Address'
							placeholder='Email address'
							name='fromEmail'
							fullWidth
							handleChange={handleChange}
						/>
					</div>
				</div>
			</CampaignItems>

			<CampaignItems
				header='Recipients'
				subHeader='Who will this campaign  be sent to?'
				linkText='Select recipients'
			>
				<div className='flex flex-col w-full space-y-[12px] sm:space-y-[20px]'>
					<LabelSelect
						label='Locations'
						defaultValue='Select locations'
                        name="locationSelect"
                        handleChange={handleChange}
						selectedValue={formData.locationSelect}
						option={[{text:"Location 1", value:"location1"}, {text:"Location 2", value:"location2"}]}
					/>

					<div className='flex flex-col sm:flex-row w-full sm:space-x-[20px] space-y-[12px] sm:space-y-0 '>
						<div className='w-full sm:w-[50%]'>
							<LabelSelect
								width='w-[60%] xl:w-[40%]'
								label='Use date joined'
								defaultValue='Select date'
								selectedValue=''
								option={[""]}
							/>
						</div>

						<div className='w-full sm:w-[50%]'>
							<LabelSelect
								width='w-[60%] xl:w-[40%]'
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
									value: "Now",
									text: "Now",
								},
                                {
									value: "Later",
									text: "Later",
								},
							]}
						/>
					</div>

					{formData.scheduleSelect === "Later" && (
						<div className='flex flex-col sm:flex-row w-full sm:space-x-[20px] space-y-[12px] sm:space-y-0 '>
							<div className='w-full sm:w-[50%]'>
								<LabelInput
									width='w-[40%]'
									label={
										<h1 className='text-black sodo700 tracking-[-0.52px] text-[0.81em] '>
											Date
										</h1>
									}
									padding='13px 0px 14px 16px'
								>
									<div className='flex items-center justify-between'>
										<DatePicker
											handleDateChange={handleDateChange}
											color='black'
										/>
										<span className='mr-[22px]'> {dateIconBlue} </span>
									</div>
								</LabelInput>
							</div>
							<div className='w-full sm:w-[50%]'>
								<LabelInput
									width='w-[40%]'
									label={
										<h1 className='text-black sodo700 tracking-[-0.52px] text-[0.81em] '>
											Time
										</h1>
									}
									padding='13px 0px 14px 16px'
								>
									<div className='flex items-center justify-between'>
										<TimePicker
											handleTimeChange={handleTimeChange}
											color='black'
										/>
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

export default CreateCampaign;
