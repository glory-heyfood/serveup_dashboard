"use client";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import React, { useState } from "react";
import LabelDateInput from "./LabelDateInput";
import LabelSelect from "@/components/label/LabelSelect";
import DashBtn from "@/components/Dashboard/DashBtn";

import TimePicker from "@/components/TimePicker";
import { AddStoreLabeDateInputData } from "@/data";

const AddStore = ({ handleClose }) => {
	const [selectedValue, setSelectedValue] = useState("");
	const [disabledDays, setDisabledDays] = useState({
		Monday: true,
		Tuesday: true,
		Wednesday: true,
		Thursday: true,
		Friday: true,
		Saturday: true,
		Sunday: true,
	});

	const [formData, setFormData] = useState({
		storeName: "",
		storeAddress: "",
		phoneNumer: "",
		email: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
		console.log(name, value);
	};

	const handleSelectChange = (e) => {
		setSelectedValue(e.target.value);
	};

	const handleTimeChange = (e) => {
		console.log(e.target);
	};

	const handleDayClick = (day) => {
		setDisabledDays((prevDisabledDays) => ({
			...prevDisabledDays,
			[day]: !prevDisabledDays[day],
		}));
	};

	return (
		<ComponentModalLayout handleClose={handleClose}>
			<div className='w-full px-[20px] pb-[32px]'>
				<h1 className='dashHeader !mb-[32px] ml-[44px] md:ml-0'>
					Add a new store
				</h1>
				<div className='flex flex-col space-y-[2em]'>
					<CustomLabel header='Store information'>
						<div>
							<LabelSearchInput
								placeholder='Store name'
								label='Store name'
								name='storeName'
								handleChange={handleChange}
							/>
							<LabelSearchInput
								label='Store Address'
								name='storeAddress'
								placeholder='Search store address'
								handleChange={handleChange}
							/>
						</div>
					</CustomLabel>

					<CustomLabel header='Contact information'>
						<div>
							<LabelSearchInput
								placeholder='Phone number'
								name='phoneNumber'
								label='Phone number'
								handleChange={handleChange}
							/>
							<LabelSearchInput
								label='Email'
								name='email'
								placeholder='Email'
								handleChange={handleChange}
							/>
						</div>
					</CustomLabel>

					<CustomLabel header='Business Hours'>
						<div className=' overflow-scroll scroll-hidden '>
							{/* To get each time you will have to pass in different state for both open and close time for the 7 days or find a way to automate it. Glory i believe in you nice work by the way.. */}
							{AddStoreLabeDateInputData.map((data) => (
								<LabelDateInput
									key={data.label}
									handleClick={handleDayClick}
									disabled={disabledDays[data.label]}
									time={
										<TimePicker
											disabled={disabledDays[data.label]}
											handleTimeChange={handleTimeChange}
										/>
									}
									label={data.label}
								/>
							))}
						</div>
					</CustomLabel>

					<CustomLabel
						header='Copy item library from another location'
						subHeader='Copy another location’s Item Library into your new location'
					>
						<div>
							<LabelSelect
								label='Location'
								selectedValue={selectedValue}
								defaultValue='Select a location to match'
								handleChange={handleSelectChange}
								option={[
									{ value: "1", text: "Select a location to match" },
									{ value: "1", text: "Select a location to match" },
									{ value: "1", text: "Select a location to match" },
									{ value: "1", text: "Select a location to match" },
									{ value: "1", text: "Select a location to match" },
								]}
							/>
						</div>
					</CustomLabel>
				</div>

				<div className='block md:inline-block mt-[2.5em] mb-[5em]'>
					<DashBtn padding='12px 37px' text='Save' />
				</div>
			</div>
		</ComponentModalLayout>
	);
};

export default AddStore;
