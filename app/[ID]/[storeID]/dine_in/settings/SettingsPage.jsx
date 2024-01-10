"use client";
import React, { useState } from "react";
import StoreDashLayout from "@/components/Dashboard/storeDashLayout";
import CustomLabel from "@/components/label/CustomLabel";

import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import SwitchPicker from "@/components/SwitchPicker";
import LabelDateInput from "@/components/label/LabelDateInput";
import { AddStoreLabeDateInputData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "@/components/TimePicker";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";
import BreadCrumb from "@/components/BreadCrumb";
import GridLayout from "@/components/GridLayout";
import GridComponent from "../GridComponent";

const SettingsPage = () => {
	const [selectedValue, setSelectedValue] = useState("");
	const dispatch = useDispatch();
	const btnLoading = useSelector((state) => state.stores.loading);
	const [status, setStatus] = useState("open");
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
		phoneNumber: "",
		email: "",
		business_hours: {
			Monday: {
				open: "",
				close: "",
				workingDays: false,
			},
			Tuesday: {
				open: "",
				close: "",
				workingDays: false,
			},
			Wednesday: {
				open: "",
				close: "",
				workingDays: false,
			},
			Thursday: {
				open: "",
				close: "",
				workingDays: false,
			},
			Friday: {
				open: "",
				close: "",
				workingDays: false,
			},
			Saturday: {
				open: "",
				close: "",
				workingDays: false,
			},
			Sunday: {
				open: "",
				close: "",
				workingDays: false,
			},
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSelectChange = (e) => {
		setSelectedValue(e.target.value);
	};

	const handleTimeChange = (time, data) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			business_hours: {
				...prevFormData.business_hours,
				[data.label]: {
					...prevFormData.business_hours[data.label],
					[data.status.toLowerCase()]: time,
					["workingDays"]: data.workingDays,
				},
			},
		}));
	};

	const handleDayClick = (day) => {
		setDisabledDays((prevDisabledDays) => ({
			...prevDisabledDays,
			[day]: !prevDisabledDays[day],
		}));
	};
	return (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div className='pb-[40px] flex flex-col space-y-[2rem] md:w-[70%]'>
				<div>
					<BreadCrumb main='Dine-in' link='Settings' />
				</div>

				<CustomLabel header='Dine In Hours'>
					<div className=' overflow-scroll scroll-hidden '>
						{/* To get each time you will have to pass in different state for both open and close time for the 7 days or find a way to automate it. Glory i believe in you nice work by the way.. */}
						{AddStoreLabeDateInputData.map((data) => (
							<LabelDateInput
								key={data.label}
								data={data}
								handleClick={handleDayClick}
								disabled={disabledDays[data.label]}
								time={
									<TimePicker
										data={data}
										disabled={disabledDays[data.label]}
										handleTimeChange={handleTimeChange}
									/>
								}
								label={data.label}
							/>
						))}
					</div>
				</CustomLabel>
				<CustomLabel header='Can customers pay with cash when in store ?'>
					<SwitchPicker
						header='Pay with cash'
						text='Allow customers pay for dine-in orders with cash'
					/>
				</CustomLabel>

				<CustomLabel header='How are customers served?'>
					<div className='border border-[#E6E6E6] rounded-[8px] py-[1.5rem] px-[1rem] flex flex-col space-y-[1rem]'>
						<RadioDiscountPicker
							header='Table service'
							subHeader='Orders are served at customer’s table when ready'
						/>
						<RadioDiscountPicker
							header='Over the counter'
							subHeader='Customers pick up their orders from the counter'
						/>
					</div>
				</CustomLabel>

				<SaveDiscardBtn />
			</div>
		</GridLayout>
	);
};

export default SettingsPage;
