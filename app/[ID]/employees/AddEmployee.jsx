"use client";
import LabelInput from "@/components/label/LabelInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import Modal from "@/components/modal/Modal";
import { options } from "@/data";
import { createEmployeeAsync } from "@/redux/features/business/employeeSlice";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddEmployee = () => {
	const dispatch = useDispatch();
	const btnLoading = useSelector((state) => state.employee.loading);
	const [data, setData] = useState();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		phone_number: "",
		email: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// This functions handles the add employee
	const handleClick = () => {
		const payload = {
			first_name: formData.first_name,
			last_name: formData.last_name,
			phone_number: formData.phone_number,
			email: formData.email,
			business_id: data?.id,
			employeeType: "employee", //this will always be employee no need to change
		};
		dispatch(createEmployeeAsync(payload))
			// .unwrap()
			// .then((res) => {
            //     console.log(res)
			// 	if (res?.data.error === false) {
			// 		dispatch(toggleModal(false));
			// 	}
			// });
	};

	useEffect(() => {
		const dat = JSON.parse(window.localStorage.getItem("serveup_business"));
		setData(dat);
	}, []);

	return (
		<Modal
			header='Add new employee'
			maxWidth='max-w-[850px]'
			handleClick={handleClick}
			btnLoading={btnLoading}
		>
			<div className='flex flex-col space-y-[32px]'>
				<div className='flex items-center flex-col md:flex-row space-y-[32px] md:space-y-0 w-full space-x-0 md:space-x-[16px]  '>
					<div className=' w-full md:w-[50%]'>
						<LabelSearchInput
							name='first_name'
							handleChange={handleChange}
							fontweight='sodo700'
							label='First name'
							placeholder='First name'
						/>
					</div>
					<div className='w-full md:w-[50%]'>
						<LabelSearchInput
							name='last_name'
							handleChange={handleChange}
							fontweight='sodo700'
							label='Last name'
							placeholder='Last name'
						/>
					</div>
				</div>
				<LabelSearchInput
					handleChange={handleChange}
					fontweight='sodo700'
					name='phone_number'
					label='Phone number'
					placeholder='Phone number'
				/>
				<LabelSearchInput
					handleChange={handleChange}
					fontweight='sodo700'
					name='email'
					label='Email address'
					placeholder='Email address'
				/>
				<LabelSelect
					label='Location(s)'
					option={options}
					defaultValue='Select Locations'
					selectedValue=''
				/>
				<LabelSelect
					label='Role'
					option={options}
					defaultValue='Select role'
					selectedValue=''
				/>
			</div>
		</Modal>
	);
};

export default AddEmployee;
