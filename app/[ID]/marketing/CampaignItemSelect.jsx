import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { dropDownBlueIcon } from "@/SVGs";

const Icon = ({ setOpen }) => {
	return (
		<span
			onClick={() => {
				console.log("Call");

				setOpen(true);
			}}
            style={{
                padding:"15px 12px 16px 0px"
            }}
			className=' cursor-pointer'
		>
			{dropDownBlueIcon}
		</span>
	);
};

const CampaignItemSelect = ({
	option,
	defaultValue,
	name,
	handleChange,
	selectedValue,
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Select
			displayEmpty
			IconComponent={() => <Icon setOpen={setOpen} />}
			inputProps={{ "aria-label": "Without label" }}
			value={selectedValue}
			name={name}
			open={open}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
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
					width: "100%",
					padding: "15px 12px 16px 16px !important",
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
