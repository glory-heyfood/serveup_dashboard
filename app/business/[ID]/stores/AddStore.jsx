"use client";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import React, { useState } from "react";
import LabelDateInput from "@/components/label/LabelDateInput";
import LabelSelect from "@/components/label/LabelSelect";
import DashBtn from "@/components/buttons/DashBtn";

import TimePicker from "@/components/TimePicker";
import { AddStoreLabeDateInputData, ID } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { createStoreAsync } from "@/redux/features/business/storeSlice";
import { ClipLoader } from "react-spinners";
import useLocationSuggestions from "@/hooks/useLocationSuggestions";

const AddStore = ({ handleClose, businessID }) => {
	const [selectedValue, setSelectedValue] = useState("");
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const btnLoading = useSelector((state) => state.stores.loading);		
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
		storeAddress: {
			longitude: 0,
			latitude: 0,
			address: "",
		},
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

	const handleSuggestions = (suggestions) => {
		console.log(suggestions);
		setSuggestions(suggestions);
		setLoader(false);
	};

	const { getSuggestions, getDetails } =
		useLocationSuggestions(handleSuggestions);

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
		console.log(time);
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

	// Function to handle the submission
	const handleSaveClick = () => {
		const payload = {
			name: formData.storeName,
			address: formData.storeAddress,
			phone_number: formData.phoneNumber,
			email: formData.email,
			business_id: businessID,
            use_business_delivery_settings:true,
            notification:{
                email:false,
                sms:false
            },
			business_hours: JSON.stringify(formData.business_hours),
			isOpen: JSON.stringify({
				status: true,
				message: "Your store is currently open",
				referenceData: "",
			}),
		};
		

		dispatch(createStoreAsync(payload))
			.unwrap()
			.then((res) => {});
	};

	const handleInputChange = (inputValue) => {
		if (inputValue) {
			setLoader(true);
			setShowModal(true);
		} else {
			setShowModal(false);
		}
		setInputValue(inputValue);
		getSuggestions(inputValue);
	};

	const handleLocationSelect = async (placeId) => {
		const locationDetails = await getDetails(placeId);
		setInputValue(locationDetails.address);
		setShowModal(false);
		setFormData((prevData) => ({
			...prevData,
			storeAddress: {
				longitude: locationDetails.longitude,
				latitude: locationDetails.latitude,
				address: locationDetails.address,
			},
		}));
		console.log("Location Details:", locationDetails);
	};


	return (
		<ComponentModalLayout handleClose={handleClose}>
			<div className='w-full px-[20px] pb-[32px]'>
				<h1 className='dashHeader !mb-[32px] ml-[44px] md:ml-0'>
					Add a new store
				</h1>
				<div className='flex flex-col space-y-[2em]'>
					<CustomLabel header='Store information'>
						<div className='relative'>
							<LabelSearchInput
								placeholder='Store name'
								label='Store name'
								name='storeName'
								handleChange={handleChange}
							/>
							<LabelSearchInput
								label='Store Address'
								name='storeAddress'
								value={inputValue}
								placeholder='Search store address'
								handleChange={(e) => {
									handleInputChange(e.target.value);
								}}
							/>

							{showModal && (
								<div
									className='absolute  w-full h-fit min-h-[100px] flex flex-col items-start justify-center space-y-[1rem] bg-white  mt-[0.5rem] p-[1rem] cursor-pointer'
									style={{
										boxShadow: "0px 0px 4px 0px #C0C0C0",
									}}
								>
									<div className='flex justify-start w-full mb-[1rem]'>
										<img src='/images/gmap.png' />
									</div>

									{loader ? (
										<div className='flex items-center justify-center w-full h-full'>
											{" "}
											<ClipLoader color='#2B50D6' size={25} />{" "}
										</div>
									) : (
										suggestions.map((data) => (
											<h1
												className='sodo400 text-[0.825rem] tracking-[-0.28px]'
												onClick={() => {
													handleLocationSelect(data.googleMapsPlaceId);
												}}
											>
												{data.address}
											</h1>
										))
									)}
								</div>
							)}
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
									data={data}
									handleClick={handleDayClick}
									disabled={disabledDays[data.label]}
									time={() => (
										<TimePicker
											data={data}
											disabled={disabledDays[data.label]}
											handleTimeChange={handleTimeChange}
										/>
									)}
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
					<DashBtn
						padding='12px 37px'
						text='Save'
						handleClick={handleSaveClick}
						btnLoading={btnLoading}
					/>
				</div>
			</div>
		</ComponentModalLayout>
	);
};

export default AddStore;
