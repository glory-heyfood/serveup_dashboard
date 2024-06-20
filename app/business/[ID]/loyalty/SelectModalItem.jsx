import { Button } from "@mui/material";
import React from "react";

const SelectModalItem = ({ header, subHeader, handleClick }) => {
	return (
		<div
			className='flex justify-between items-center'
			style={{
				boxShadow: "0px 1px 0px 0px #F0F0F0",
                padding:"15px 2px",
			}}
		>
			<div className='flex flex-col space-y-[2px] '>
				<h3 className='sodo700'> {header} </h3>
				<h3 className='text-[#5F6370] sodo600 '> ₦{subHeader} </h3>
			</div>

			<Button
				variant='text'
                onClick={handleClick}
				sx={{
					color: "#F01C1C",
					fontFamily: " SoDoSans-Bold",
					fontSize: " 12px",
					letterSpacing: "-0.48px",                    
				}}
			>
				Remove
			</Button>
		</div>
	);
};

export default SelectModalItem;
