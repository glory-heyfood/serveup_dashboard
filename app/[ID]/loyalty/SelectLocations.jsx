import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import React, { useState } from "react";

const SelectLocations = () => {
	const [checkedLocations, setCheckedLocations] = useState({});

	const Locations = [
		"Toasties - Ikeja",
		"Toasties - Lekki",
		"Toasties - VI",
		"Toasties - Abuja",
	];

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
				<div className='flex flex-col space-y-[12px] py-[20px]'>
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
			</LabelInput>
		</CustomLabel>
	);
};

export default SelectLocations;
