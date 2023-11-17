import React from "react";
import { MenuItem, Select } from "@mui/material";
import { dropDownBlueIcon } from "@/SVGs";

const Icon = () => {
	return <span className='ml-[8px]'>{dropDownBlueIcon}</span>;
};

const CampaignItemSelect = ({
	option,
	defaultValue,
	name,
	handleChange,
	selectedValue,
}) => {
	return (
		<Select
			displayEmpty
			IconComponent={() => <Icon />}
			inputProps={{ "aria-label": "Without label" }}
			value={selectedValue}
			name={name}
			onChange={(e) => {
				handleChange(e);
			}}
			MenuProps={{
				anchorOrigin: {
					vertical: "bottom",
					horizontal: "left",
				},
				transformOrigin: {
					vertical: "top",
					horizontal: "left",
				},
				getContentAnchorEl: null,
			}}
			style={{
				backgroundColor: "#fff",
				border: "1px solid #E6E6E6",
				outline: "none",
				padding: "15px 26px 16px 16px",
				"&:focus": {
					// border: "none",
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
			{defaultValue && (
				<MenuItem
					className='text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]'
					value=''
					disabled
				>
					{defaultValue}
				</MenuItem>
			)}
			{option.map((option, i) => (
				<MenuItem
					key={i}
					className='text-black tracking-[-0.26px] sudo700 p-4 text-[0.9em]'
					value={option.value}
					sx={{
						// width:"300px",
						"& ~ &": {
							padding: "16px 120px 16px 12px ",
						},
					}}
				>
					{option.text}
				</MenuItem>
			))}
		</Select>
	);
};

export default CampaignItemSelect;
