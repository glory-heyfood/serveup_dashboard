"use client";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import React, { useState } from "react";
import LabelDateInput from "./LabelDateInput";
import LabelSelect from "@/components/label/LabelSelect";
import DashBtn from "@/components/Dashboard/DashBtn";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Clock from "./Clock";

const AddStore = ({ handleClose }) => {
	const [selectedValue, setSelectedValue] = useState("");
	const handleChange = (e) => {
		console.log(e.target.value);
	};

	const handleSelectChange = (e) => {
		setSelectedValue(e.target.value);
	};

    const handleTimeChange = (e) =>{
        console.log(e.target)
    }

	return (
		<ComponentModalLayout handleClose={handleClose}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<div className='w-full px-[20px]'>
					<h1 className='dashHeader !mb-[32px] ml-[44px] md:ml-0'>Add a new store</h1>
					<div className='flex flex-col space-y-[2em]'>
						<CustomLabel header='Store information'>
							<div>
								<LabelSearchInput
									placeholder='Store name'
									label='Store name'
									handleChange={handleChange}
								/>
								<LabelSearchInput
									label='Store Address'
									placeholder='Search store address'
									handleChange={handleChange}
								/>
							</div>
						</CustomLabel>

						<CustomLabel header='Contact information'>
							<div>
								<LabelSearchInput
									placeholder='Phone number'
									label='Phone number'
									handleChange={handleChange}
								/>
								<LabelSearchInput
									label='Email'
									placeholder='Email'
									handleChange={handleChange}
								/>
							</div>
						</CustomLabel>

						<CustomLabel header='Business Hours'>
							<div className=" overflow-scroll scroll-hidden ">
                                {/* To get each time you will have to pass in different state for both open and close time for the 7 days or find a way to automate it. Glory i believe in you nice work by the way.. */}
								<LabelDateInput time={<Clock handleTimeChange={handleTimeChange} />} label='Monday' />
								<LabelDateInput time={<Clock handleTimeChange={handleTimeChange} />}  label='Tuesday' />
								<LabelDateInput time={<Clock handleTimeChange={handleTimeChange} />}  label='Wednesday' />
								<LabelDateInput time={<Clock handleTimeChange={handleTimeChange} />}  label='Thursday' />
								<LabelDateInput time={<Clock handleTimeChange={handleTimeChange} />}  label='Friday' />
								<LabelDateInput time={<Clock handleTimeChange={handleTimeChange} />}  label='Saturday' />
								<LabelDateInput time={<Clock handleTimeChange={handleTimeChange} />}  label='Sunday' />
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

					<div className='inline-block mt-[2.5em] mb-[5em]'>
						<DashBtn padding='12px 37px' text='Save' />
					</div>
				</div>
			</LocalizationProvider>
		</ComponentModalLayout>
	);
};

export default AddStore;
