"use client";
import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import CustomLabel from "@/components/label/CustomLabel";
import { starBlueIcon } from "@/SVGs";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";
import ColorPicker from "@/components/ColorPicker";


// Label for the primary color
const Label = () => {
	return (
		<div
			className='py-[4px] px-[8px] rounded-[2px] flex items-center justify-center'
			style={{
				background: "rgba(73, 113, 217, 0.10)",
			}}
		>
			<span>{starBlueIcon}</span>

			<h2 className='text-[#136FFB] sodo700 tracking-[-0.4px] text-[12px]  '>
				UPGRADE YOUR PLAN
			</h2>
		</div>
	);
};

const ThemePage = () => {
	const [selectedColor, setSelectedColor] = useState();

	return (
		<GridLayout GridComponent={<GridComponent />}>
			<div className=' md:w-[70%] max-w-[640px]'>
				<BreadCrumb main='Website' link='Theme' />
				<div className='mt-[37px] flex-col space-y-[72px] '>
					<CustomLabel
						header='Primary Color'
						subHeader='This color will be displayed most frequently across your website '
						label={<Label />}
					>
						<ColorPicker setSelectedColor={setSelectedColor} />
					</CustomLabel>
				</div>



				<SaveDiscardBtn padding='py-[70px]' />
			</div>
		</GridLayout>
	);
};

export default ThemePage;
