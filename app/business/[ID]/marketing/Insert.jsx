import { dropDownBlueIcon } from '@/SVGs';
import { MenuItem, Select } from '@mui/material';
import React from 'react'

const Insert = ({options, defaultValue, handleChange, selectedValue}) => {
    const Icon = () => {
		return <span className='ml-[4px] mt-[-1px]'>{dropDownBlueIcon}</span>;
	};

  return (
    <div>
        <Select
			displayEmpty
			IconComponent={() => <Icon />}
			inputProps={{ "aria-label": "Without label" }}
			value={selectedValue}			
			onChange={(e) => {
				handleChange(e);
			}}
			style={{
				backgroundColor: "none",
				border: "none",				
				outline: "none",				                
                dispalay:"flex",
                alignItems:"center",
                padding:"16px",
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
				className='text-black tracking-[-0.26px]  font-[400] text-[0.9em]'
				value=''
				disabled
			>
				{defaultValue}
			</MenuItem>
			{options?.map((option, i) => (
				<MenuItem
                sx={{
                    padding:"16px"
                }}
					key={i}
					className='text-black tracking-[-0.24px] text-[0.75em] p-[16px]'
					value={option.value}
				>
					{option.label}
				</MenuItem>
			))}
		</Select>
    </div>
  )
}

export default Insert