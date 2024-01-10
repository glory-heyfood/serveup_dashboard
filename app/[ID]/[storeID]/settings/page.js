"use client";
import React, { useState } from "react";
import StoreDashLayout from "@/components/Dashboard/storeDashLayout";
import Status from "./Status";
import DashBtn from "@/components/buttons/DashBtn";
import { doorClosedIcon, locationIcon, playIcon, pauseIcon } from "@/SVGs";
import CustomLabel from "@/components/label/CustomLabel";
import LabelTextInputEdit from "@/components/label/LabelTextInputEdit";
import LabelInput from "@/components/label/LabelInput";
import LabelText from "@/components/label/LabelText";
import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import SwitchPicker from "@/components/SwitchPicker";
import LabelDateInput from "@/components/label/LabelDateInput";
import { AddStoreLabeDateInputData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "@/components/TimePicker";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";

const Page = () => {
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
		<StoreDashLayout>
			<div className='pb-[40px]'>
				<h1 className='dashHeader !mb-[2.525rem]'>Store Settings</h1>	

				<div className='flex flex-col md:flex-row space-y-[2rem] md:space-y-0  md:items-center justify-between w-full mb-[2rem]'>
					<Status status={status} />
					<div className='flex items-center  space-x-[1rem] w-[300px]'>
						<DashBtn
							text='Close Store'
							icon={doorClosedIcon}
							padding='10px 9px'
							lightTheme={true}
						/>
						<DashBtn
							text={status !== "inactive" ? "Deactivate Store" : "Activate Store"}
							icon={status === "inactive" ? playIcon("white") : pauseIcon("white")}
							bgColor={status !== "inactive" && "#F01C1C !important"}
							padding='10px 20px'
						/>
					</div>
				</div>

				<div className='flex flex-col space-y-[2rem] w-full md:w-[70%] '>
					<CustomLabel header='Store information'>
						<div>
							<LabelTextInputEdit
								inputFont='sodo600'
								readOnly={true}
								initialValue='Toasties Ikeja'
								label='Store name'
							/>
							<LabelTextInputEdit
								inputFont='sodo600'
								readOnly={true}
								initialValue='22, Akinwale Ave'
								label='Store Address'
							/>
						</div>
					</CustomLabel>

					<CustomLabel header='Contact information'>
						<div>
							<LabelTextInputEdit
								inputFont='sodo600'
								readOnly={true}
								initialValue='+2347093857361'
								label='Pone number'
							/>
							<LabelTextInputEdit
								inputFont='sodo600'
								readOnly={true}
								initialValue='Toasties@toastiesng.com'
								label='Email'
							/>
						</div>
					</CustomLabel>

					{status === "open" && (
						<>
							<CustomLabel
								header='Delivery Area'
								subHeader='Enter an area radius or select points on map. Customers outside the set area will not be able to order from this store.  '
							>
								<LabelInput
									label={<LabelText label='Delivery Area' />}
									padding='15px 16px'
								>
									<div className='flex items-center justify-between'>
										<div className='flex items-center  '>
											<input
												className='border-none w-[1rem] outline-none placeholder:ext-[#A9ADB5] text-black text-[13px] sodo600 tracking-[-0.52px] '
												placeholder='0'
											/>
											<h2 className='text-[13px] sodo600 tracking-[-0.52px] text-black '>
												km
											</h2>
										</div>

										<div className='w-fit mr-[1rem] hidden md:block'>
											<DashBtn
												icon={locationIcon}
												lightTheme={true}
												text='Select points on map'
												padding='11px 12px'
											/>
										</div>
									</div>
								</LabelInput>
							</CustomLabel>
                            <div className='w-fit mr-[1rem] md:hidden !mt-[1rem]'>
											<DashBtn
												icon={locationIcon}
												lightTheme={true}
												text='Select points on map'
												padding='11px 12px'
											/>
										</div>

							<CustomLabel header='How do you charge for delivery?'>
								<div className='border border-[#E6E6E6] rounded-[8px] px-[1rem] py-[1.5rem] flex space-y-[1rem] flex-col '>
									<RadioDiscountPicker header='Flat fee based on area' />
									<RadioDiscountPicker header='The same delivery fee for all orders' />
									<RadioDiscountPicker header='Distance based fee' />
									<RadioDiscountPicker header='Fee delivery' />
								</div>
							</CustomLabel>
						</>
					)}

					<CustomLabel header='Notifications'>
						<div className='flex flex-col space-y-[1rem]'>
							<SwitchPicker
								header='Email Notifications'
								text='Recieve notifications via email'
							/>
							<SwitchPicker
								header='SMS Notifications'
								text='Recieve notifications via SMS'
							/>
						</div>
					</CustomLabel>

					<CustomLabel header='Business Hours'>
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

					<SaveDiscardBtn />
				</div>
			</div>
		</StoreDashLayout>
	);
};

export default Page;
