import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const SelectLocations = () => {
	const [checkedLocations, setCheckedLocations] = useState({});
	const [checkAllLocations, setCheckAllLocations] = useState(false);

	const Locations = [
		"Toasties - Ikeja",
		"Toasties - Lekki",
		"Toasties - VI",
		"Toasties - Abuja",
	];

	const handleSwitchChange = () => {
		setCheckAllLocations(!checkAllLocations);
		const updatedLocations = {};

		Locations.forEach((location) => {
			updatedLocations[location] = !checkAllLocations;
		});

		setCheckedLocations(updatedLocations);
	};

	const handleCheckboxChange = (location) => {
		setCheckedLocations((prevCheckedLocations) => ({
			...prevCheckedLocations,
			[location]: !prevCheckedLocations[location],
		}));
	};

	return (
		<CustomLabel header='Select Locations'>
			<LabelInput
				stretch={true}
				padding='16px 0px 16px 16px'
				label={
					<h1 className='text-[13px] sodo700 tracking-[-0.52px]  '>
						{" "}
						Locations{" "}
					</h1>
				}
			>
				<div className='py-[20px] flex flex-col space-y-[2px]'>
					{/* Switch button */}

					<div className='flex space-x-[4px] items-center  '>
						<Switch
							{...label}
							checked={checkAllLocations}
							onChange={handleSwitchChange}
						/>
						<h1 className='text-[13px] sodo700 tracking-[-0.52px]'>
							Select all locations
						</h1>
					</div>
					<div className='flex flex-col space-y-[12px] '>
						{Locations.map((data, i) => (
							<div
								key={i}
								className='flex items-center space-x-[1em] cursor-pointer'
								onClick={() => {
									handleCheckboxChange(data);
								}}
							>
								<span>
									<input type='checkbox' checked={checkedLocations[data]} />
								</span>
								<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]'>
									{data}
								</h2>
							</div>
						))}
					</div>
				</div>
			</LabelInput>
		</CustomLabel>
	);
};

export default SelectLocations;
