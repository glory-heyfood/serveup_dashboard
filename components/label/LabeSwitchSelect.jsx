import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import LabelText from "./LabelText";

const label = { inputProps: { "aria-label": "Switch demo" } };

const LabelSwitchSelect = ({ labelFontweight, data, textLabel, labelHeader, labelHeaderFontWeight, labelWidth }) => {
	const [checkedData, setCheckedData] = useState({});
	const [checkAllData, setCheckAllData] = useState(false);

	

	const handleSwitchChange = () => {
		setCheckAllData(!checkAllData);
		const updatedData = {};

		data.forEach((location) => {
			updatedData[location] = !checkAllData;
		});

		setCheckedData(updatedData);
	};

	const handleCheckboxChange = (dat) => {
		setCheckedData((prevCheckedData) => ({
			...prevCheckedData,
			[dat]: !prevCheckedData[dat],
		}));
	};

	return (
		<LabelInput
			stretch={true}
			padding='16px 0px 16px 16px'
            width={labelWidth}
			label={<LabelText label={textLabel} labelFontWeight={labelFontweight} />}
		>
			<div className='py-[20px] flex flex-col space-y-[2px]'>
				{/* Switch button */}

				<div className='flex space-x-[4px] items-center  '>
					<Switch
						{...label}
						checked={checkAllData}
						onChange={handleSwitchChange}
					/>
					<h1 className={`text-[13px]  tracking-[-0.52px] ${labelHeaderFontWeight ? labelHeaderFontWeight : 'sodo700'}`}>
						{labelHeader}
					</h1>
				</div>
				<div className='flex flex-col space-y-[12px] '>
					{data.map((data, i) => (
						<div
							key={i}
							className='flex items-center space-x-[1em] cursor-pointer'
							onClick={() => {
								handleCheckboxChange(data);
							}}
						>
							<span>
								<input type='checkbox' checked={checkedData[data]} />
							</span>
							<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]'>
								{data}
							</h2>
						</div>
					))}
				</div>
			</div>
		</LabelInput>
	);
};

export default LabelSwitchSelect;
