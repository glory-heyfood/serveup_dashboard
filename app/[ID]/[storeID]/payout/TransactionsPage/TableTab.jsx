import { sendT, sendTransactionData } from "@/data";
import React from "react";

 const TableTab = ({ setData, setSelected, selected, setLength, length }) => {
	const selectedArray = [
		{
			label: "Payouts",
		
		},
		{
			label: "Withdrawals",			
		},
	
	];
	return (
		<div className='flex  w-full justify-between sm:justify-start sm:space-x-[24px] md:space-x-[40px]'>
			{selectedArray.map((data, i) => (
				<div
					key={i}
					onClick={() => {
						setSelected(data.label);
						const dat = sendTransactionData(0, 10, data.label);
						setData(dat.data);
						setLength(dat.length);
					}}
					className={` ${
						selected === data.label
							? "border-transparent border-[2px] border-b-[#072A85]  "
							: "  "
					} flex space-x-[4px] pb-[12px] cursor-pointer items-center`}
				>
					<h3
						className={` ${
							selected === data.label ? "text-[#072A85]" : "text-[#7E8493]"
						} "tracking-[-0.24px] text-[12px]"`}
					>
						{data.label}
					</h3>				
				</div>
			))}
		</div>
	);
};


export default TableTab