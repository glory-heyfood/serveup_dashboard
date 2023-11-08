"use client";
import { Button } from "@mui/material";
import React from "react";

const DashBtn = ({text, padding, handleClick, disabled}) => {
	return (
		<Button        
			variant='contained'
            disabled={disabled}            
            onClick={()=>{
                handleClick()
            }}
            className="text-[14px] sodoBold font-[600] tracking-[-0.56px] text-white "
			sx={{
				backgroundColor: `${!disabled && ("#072A85 !important")}`,
				padding: `${padding}`,
                textTransform:'capitalize',
                width:"100%"
			}}
		>
			{text}
		</Button>
	);
};

export default DashBtn;
