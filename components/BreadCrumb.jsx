import { chevronRight } from "@/SVGs";
import React from "react";

const BreadCrumb = ({ main, link }) => {
	return (
		<div className="flex items-center space-x-[3px]">
			<h1 className='text-[20px] sodo700 tracking-[-0.9px] '>{main}</h1>
            <span> {chevronRight} </span>
            <h2 className="text-[20px] sodo600 tracking-[-0.9px]  ">{link}</h2>

		</div>
	);
};

export default BreadCrumb;
