import React from "react";
import LabelInput from "./LabelInput";
import { FormControl, MenuItem, Select } from "@mui/material";
import { dropDownBlueIcon } from "@/SVGs";

const Label = ({ label }) => {
	return (
		<h1 className='text-black sodo600 tracking-[-0.52px] text-[0.81em] '>
			{label}
		</h1>
	);
};

const Icon = () => {
	return <span className='ml-[8px]'>{dropDownBlueIcon}</span>;
};

const LabelSelect = ({
	label,
	option,
	handleChange,
	selectedValue,
	defaultValue,
}) => {
	return (
		<LabelInput label={<Label label={label} />} padding='15px 0px 16px 16px'>
			<Select
				displayEmpty
				IconComponent={() => <Icon />}
				inputProps={{ "aria-label": "Without label" }}
				value={selectedValue}
				onChange={(e) => {
					handleChange(e);
				}}
				style={{
					backgroundColor: "transparent",
					border: "none",
					outline: "none",
					"&:focus": {
						border: "none",
					},
				}}
				sx={{
					"& .MuiSelect-select": {
						color: "#072A85",
						fontFamily: "sodoSans-reg",
						letterSpacing: "-0.52px",
						fontSize: "0.81em",
						padding: "0px !important",
					},

					boxShadow: "none",
					".MuiOutlinedInput-notchedOutline": { border: 0 },
					"&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							border: 0,
						},
				}}
			>
				<MenuItem
					className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
					value=''
					disabled
				>
					{defaultValue}
				</MenuItem>
				{option.map((option, i) => (
					<MenuItem
						key={i}
						className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
						value={option.value}
					>
						{option.text}
					</MenuItem>
				))}
			</Select>

			{/* <FormControl fullWidth>
				<Select
					value={selectedValue}
					displayEmpty
					inputProps={{ "aria-label": "Without label" }}
					// onChange={handleBusinessChange}
                    style={{
                        border:"none",
                    }}
					sx={{
						"& .MuiSelect-select": {
							color: "#5F6370",
                            padding:"0px",
                            border:"none"
						},
                        "& .MuiOutlinedInput-root": {
							color: "#5F6370",
                            padding:"0px",
                            border:"none"
						},
					}}
				>
					<MenuItem
						className='text-black tracking-[-0.26px] sudoBold font-[400]  text-[0.9em]'
						value=''
						disabled
					>
						What kind of business do you run?
					</MenuItem>
					<MenuItem
						className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
						value='Restaurant'
					>
						Restaurant
					</MenuItem>
					<MenuItem
						className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
						value='Hotel'
					>
						Hotel
					</MenuItem>
					<MenuItem
						className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
						value='Food Truck'
					>
						Food Truck
					</MenuItem>
					<MenuItem
						className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
						value='Cafe & Bakery'
					>
						Cafe & Bakery
					</MenuItem>
					<MenuItem
						className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
						value='Bar & NightClub'
					>
						Bar & NightClub
					</MenuItem>
					<MenuItem
						className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
						value='Others'
					>
						Others
					</MenuItem>
				</Select>
			</FormControl> */}
		</LabelInput>
	);
};

export default LabelSelect;
