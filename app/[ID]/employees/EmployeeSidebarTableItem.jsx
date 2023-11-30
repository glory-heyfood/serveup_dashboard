import CustomSelect from "@/components/CustomSelect";
import { options } from "@/data";
import React, { useEffect, useState } from "react";

const EmployeeSidebarTableItem = ({ bold, data }) => {
	const [selectedValue, setSelectedValue] = useState(data.role);

	useEffect(() => {
		setSelectedValue(data?.role)
	}, []);

    console.log(selectedValue)
	return (
		<div
			className={`flex ml-[32px] items-center ${bold ? "h-[40px]" : "h-[56px]"}`}
			style={
				bold
					? { boxShadow: "0px 1px 0px 0px #F0F0F0" }
					: { boxShadow: " 0px 0.5px 0px 0px #F0F0F0" }
			}
		>
			<div className='flex w-2/5'>
				<h1
					className={`${
						bold ? "sodo700 " : "sodo400"
					} text-black text-[12px]  tracking-[-0.24px]`}
				>
					{data?.store}
				</h1>
			</div>
			<div className='flex w-2/5'>
				{" "}
				{bold ? (
					<h1
						className={`${"sodo700 "} text-black text-[12px]  tracking-[-0.24px]`}
					>
						{data?.role}
					</h1>
				) : (
					<CustomSelect  
                    height="32px"                  
						options={[
							{
								value: "Manager",
								label: "Manager",
							},

                            {
								value: "Staff",
								label: "Staff",
							},
                            {
								value: "Gateman",
								label: "Gateman",
							},
						]}
						selectedValue={selectedValue}
					/>
				)}
			</div>
			<div className='flex w-1/5'>
				<h3
					className={`text-[#F01C1C] tracking-[-0.48px] text-[12px] sodo700 cursor-pointer ${
						bold && "hidden"
					} `}
				>
					Remove
				</h3>
			</div>
		</div>
	);
};

export default EmployeeSidebarTableItem;
