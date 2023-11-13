import { dropDownBlackIcon } from "@/SVGs";
import { MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const CustomSelect = ({
	options,
	handleChange,
	selectedValue,
	defaultValue,
	...props
}) => {
	const Icon = () => {
		return <span className='ml-[4px] mt-[-1px]'>{dropDownBlackIcon}</span>;
	};

	return (
		<Select
			displayEmpty
			IconComponent={() => <Icon />}
			inputProps={{ "aria-label": "Without label" }}
			value={selectedValue}
			{...props}
			onChange={(e) => {
				handleChange(e);
			}}
			style={{
				backgroundColor: "#F2F2F2",
				border: "none",
				borderRadius: "4px",
				outline: "none",
				padding: "0px 14px",
                height:"44px",
                dispalay:"flex",
                alignItems:"center",
				"&:focus": {
					border: "none",
				},
			}}
			sx={{
				"& .MuiSelect-select": {
					color: "#000",
					fontFamily: "sodoSans-SemiBold",
					letterSpacing: "-0.24px",
					fontSize: "0.75em",
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
				className='text-black tracking-[-0.26px]  font-[400] text-[0.9em]'
				value=''
				disabled
			>
				{defaultValue}
			</MenuItem>
			{options?.map((option, i) => (
				<MenuItem
					key={i}
					className='text-black tracking-[-0.24px] text-[0.75em]'
					value={option.value}
				>
					{option.label}
				</MenuItem>
			))}
		</Select>
	);
};

export default CustomSelect;
