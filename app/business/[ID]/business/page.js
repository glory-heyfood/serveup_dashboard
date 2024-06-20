"use client";
import { locationIcon, plusIconBlack, uploadPhotoIcon } from "@/SVGs";
import DashBtn from "@/components/buttons/DashBtn";
import DashLayout from "@/components/Dashboard/DashLayout";
import CustomLabel from "@/components/label/CustomLabel";
import LabelTextInputEdit from "@/components/label/LabelTextInputEdit";
import React, { useEffect, useRef, useState } from "react";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";
import LabelInput from "@/components/label/LabelInput";
import LabelText from "@/components/label/LabelText";
import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import LabelAmountInput from "@/components/label/LabelAmountInput";
import { useDispatch, useSelector } from "react-redux";
import {
	getBusinessById,
	updateBusinessById,
} from "@/redux/features/business/businessSlice";
import { handleClientScriptLoad } from "next/script";
import FadeLoad from "@/components/loaders/FadeLoader";

const Page = () => {
	const [uploadedImage, setUploadedImage] = useState("");
	const inputRef = useRef(null);
	const [deliveryFeeCharge, setDeliveryFeeCharge] = useState("");
	const loading = useSelector((state) => state.business.loading);
	const btnLoading = useSelector((state) => state.business.btnLoading);
	const data = useSelector((state) => state.business.data);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		logo: "",
		phone_number: "",
		first_name: "",
		last_name: "",
		delivery_limit: "",
		del_fee: "",
		min_del_fee: "",
		id: "",
		del_fee_per_km: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "delivery_limit") {
			setFormData((prevFormData) => ({
				...prevFormData,
				delivery_limit: Number(value),
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value,
			}));
		}
	};

	const handleImage = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			const image = event.target.result;
			setUploadedImage(image);
		};

		reader.readAsDataURL(file);
	};

	useEffect(() => {
		const url = window.location.href;
		const parts = url.split("/");
		const id = parts[parts.length - 2];
		dispatch(getBusinessById(Number(id)));
	}, []);

	useEffect(() => {
		if (data) {
			setFormData({
				name: data?.name,
				email: data?.email,
				logo: "",
				phone_number: data?.phone_number,
				first_name: data?.first_name,
				last_name: data?.last_name,
				delivery_limit: data?.delivery_limit / 1000,
				del_fee: data?.delivery_fee_type?.delivery_fee,
				min_del_fee: data?.delivery_fee_type?.minimum_delivery_fee,
				del_fee_per_km: data?.delivery_fee_type?.delivery_fee_per_km,
				id: data?.id,
			});

			setDeliveryFeeCharge(data?.delivery_fee_type?.name);
		}
		console.log(data);
	}, [data]);

	const handleSave = () => {
		const payload = {
            name: formData?.name,
            email: formData?.email,
            logo: formData?.logo,
            phone_number: formData?.phone_number,
            first_name: formData?.first_name,
            last_name: formData?.last_name,
            delivery_limit: formData?.delivery_limit * 1000,
            del_fee: formData?.delivery_fee_type?.delivery_fee,
            min_del_fee: formData?.delivery_fee_type?.minimum_delivery_fee,
            del_fee_per_km: formData?.delivery_fee_type?.delivery_fee_per_km,
            id: formData?.id,
			delivery_fee_type: {
				name: deliveryFeeCharge,
				delivery_fee: formData.del_fee && Number(formData.del_fee),
				minimum_delivery_fee:
					formData?.min_del_fee && Number(formData.min_del_fee),
				delivery_fee_per_km:
					formData.del_fee_per_km && Number(formData.del_fee_per_km),
			},
		};
		console.log(payload);
		dispatch(updateBusinessById(payload));
	};

	return (
		<DashLayout>
			<div className=''>
				<h1 className='dashHeader'>Business Settings</h1>
				<>
					{loading ? (
						<div className='h-[95vh] w-full'>
							<FadeLoad />
						</div>
					) : (
						<>
							<div className='flex flex-col space-y-[48px] md:w-[70%] max-w-[677px]'>
								<CustomLabel
									header='Business Logo'
									subHeader='To display your custom branding please upload your logo, Upload images less than 5MB in size, that are either pngs or jpegs.'
								>
									<div className='flex flex-col space-y-[12px] w-[120px]'>
										<div className='border border-[#E6E6E6] h-[120px] w-[120px] flex items-center justify-center rounded-[8px] overflow-hidden '>
											<input
												type='file'
												onChange={handleImage}
												hidden
												ref={inputRef}
											/>
											{uploadedImage ? (
												<img src={uploadedImage} alt='Uploaded' width='100%' />
											) : (
												<span>{uploadPhotoIcon}</span>
											)}
										</div>
										<span className=''>
											<DashBtn
												lightTheme={true}
												text={
													uploadedImage === "" ? "Upload logo" : "Change logo"
												}
												icon={plusIconBlack}
												font='sodo700'
												handleClick={() => {
													inputRef.current.click();
												}}
												padding='10px 14px'
											/>
										</span>
									</div>
								</CustomLabel>

								<CustomLabel
									header='Business Information'
									subHeader='Manage your business details and information'
								>
									<div>
										<LabelTextInputEdit
											inputFont='sodo600'
											label='Business Name'
											name='name'
											handleChange={handleChange}
											initialValue={formData?.name}
										/>
										<LabelTextInputEdit
											inputFont='sodo600'
											name='phone_number'
											handleChange={handleChange}
											label='Phone number'
											initialValue={formData?.phone_number}
										/>
										<LabelTextInputEdit
											inputFont='sodo600'
											name='email'
											handleChange={handleChange}
											label='Email address'
											initialValue={formData?.email}
										/>
									</div>
								</CustomLabel>

								<CustomLabel
									header='Personal Information'
									subHeader='Manage your personal information'
								>
									<div>
										<LabelTextInputEdit
											inputFont='sodo600'
											label='First name'
											name='first_name'
											handleChange={handleChange}
											initialValue={formData?.first_name}
										/>
										<LabelTextInputEdit
											inputFont='sodo600'
											label='Last name'
											name='last_name'
											handleChange={handleChange}
											initialValue={formData?.last_name}
										/>
									</div>
								</CustomLabel>

								<div>
									<CustomLabel
										header='Delivery Limit'
										subHeader='You will be able to deliver within this area radius '
									>
										<LabelInput
											label={<LabelText label='Distance Limit' />}
											padding='15px 16px'
										>
											<div className='flex items-center justify-between'>
												<div className='flex items-center  '>
													<input
														className='border-none w-[2rem] outline-none placeholder:ext-[#A9ADB5] text-black text-[13px] sodo600 tracking-[-0.52px] '
														placeholder='0'
														name='delivery_limit'
														onChange={(e) => {
															handleChange(e);
														}}
														value={
															formData?.delivery_limit
																? formData?.delivery_limit
																: ""
														}
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
								</div>

								<CustomLabel header='How do you charge for delivery?'>
									<div className='border border-[#E6E6E6] rounded-[8px] px-[1rem] py-[1.5rem] flex space-y-[1rem] flex-col '>
										<RadioDiscountPicker
											header='The same delivery fee for all orders'
											itemSelected={deliveryFeeCharge}
											absolute={true}
											handleItemClick={(name) => {
												setDeliveryFeeCharge(name);
											}}
										>
											<div className=''>
												<LabelAmountInput
													label='Delivery fee'
													rounded='rounded-none'
													name='del_fee'
													value={formData?.del_fee}
													handleChange={handleChange}
												/>
											</div>
										</RadioDiscountPicker>
										<RadioDiscountPicker
											header='Distance based fee'
											absolute={true}
											itemSelected={deliveryFeeCharge}
											handleItemClick={(name) => {
												setDeliveryFeeCharge(name);
											}}
										>
											<div className='flex flex-col space-y-[1rem]'>
												<LabelAmountInput
													label='Minimum delivery fee'
													labelWidth='w-[35%]'
													rounded='rounded-none'
													name='min_del_fee'
													value={formData?.min_del_fee}
													handleChange={handleChange}
												/>
												<LabelAmountInput
													label='Delivery fee per kilometer '
													labelWidth='w-[35%]'
													name='del_fee_per_km'
													value={formData?.del_fee_per_km}
													handleChange={handleChange}
													rounded='rounded-none'
												/>
											</div>
										</RadioDiscountPicker>
										<RadioDiscountPicker
											header='Free delivery'
											itemSelected={deliveryFeeCharge}
											handleItemClick={(name) => {
												setDeliveryFeeCharge(name);
											}}
										/>
									</div>
								</CustomLabel>
							</div>

							<SaveDiscardBtn
								handleSaveClick={handleSave}
								btnLoading={btnLoading}
							/>
						</>
					)}
				</>
			</div>
		</DashLayout>
	);
};

export default Page;
