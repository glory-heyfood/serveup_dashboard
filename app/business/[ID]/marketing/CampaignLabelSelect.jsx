import { dropDownBlueIcon } from "@/SVGs";
import { MenuItem, Select } from "@mui/material";
import React from "react";

const Label = ({ label }) => {
	return (
		<h1 className='text-black sodo700 tracking-[-0.52px] text-[0.81em] '>
			{label}
		</h1>
	);
};

const Icon = () => {
	return <span className='ml-[8px]'>{dropDownBlueIcon}</span>;
};



const CampaignLabelSelect = ({ padding, label, defaultValue, selectedValue, option }) => {
	return (
		<div className=' border border-[#E6E6E6] py-[14px] px-[16px] md:p-0 flex flex-col space-y-[12px] md:space-y-0 md:flex-row md:space-x-[0.94em] md:items-center  rounded-[4px]'>
			<div
				className='md:w-[30%] padd  md:bg-[#F4F4F4] md:border md:border-transparent md:border-r-[#E6E6E6]  '
				style={{
					padding: '13px 0px 14px 16px',
				}}
			>
				<h1 className='text-black sodo700 tracking-[-0.52px] text-[0.81em] '>
					{label}
				</h1>
			</div>
			<div className='w-[70%]'>
            <Select
				displayEmpty
				IconComponent={() => <Icon />}
				inputProps={{ "aria-label": "Without label" }}
				value={selectedValue}
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
            </div>
		</div>
	);
};

export default CampaignLabelSelect;
