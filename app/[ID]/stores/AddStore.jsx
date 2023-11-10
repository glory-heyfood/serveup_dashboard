"use client";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import React, { useState } from "react";
import LabelDateInput from "./LabelDateInput";
import LabelSelect from "@/components/label/LabelSelect";
import DashBtn from "@/components/Dashboard/DashBtn";

const AddStore = ({ handleClose }) => {
    const [selectedValue, setSelectedValue] = useState("")
	const handleChange = (e) => {
		console.log(e.target.value);
	};

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value)
    }

	return (
		<ComponentModalLayout handleClose={handleClose}>
			<div className='w-[50%] h-[88vh] absolute   overflow-auto scroll-hidden '>
				<h1 className='dashHeader'>Add a new store</h1>
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
						<div>
							<LabelDateInput label='Monday' />
							<LabelDateInput label='Tuesday' />
							<LabelDateInput label='Wednesday' />
							<LabelDateInput label='Thursday' />
							<LabelDateInput label='Friday' />
							<LabelDateInput label='Saturday' />
							<LabelDateInput label='Sunday' />
						</div>
					</CustomLabel>

					<CustomLabel
						header='Copy item library from another location'
						subHeader='Copy another location’s Item Library into your new location'
					>
						<div >
							<LabelSelect
								label='Location'
                                selectedValue={selectedValue}
                                defaultValue="Select a location to match"
                                handleChange={handleSelectChange}
								option={[{ value: "1", text: "Select a location to match" },{ value: "1", text: "Select a location to match" },{ value: "1", text: "Select a location to match" },{ value: "1", text: "Select a location to match" },{ value: "1", text: "Select a location to match" }]}
							/>
						</div>
					</CustomLabel>
				</div>

                <div className="inline-block mt-[2.5em] mb-[5em]">
                <DashBtn padding="14px 32px" text="Save"  />
                </div>
			</div>
		</ComponentModalLayout>
	);
};

export default AddStore;
