import { deleteRedIcon, userBlueIcon } from "@/SVGs";
import React from "react";

const EmployeesItems = ({ data, handleClick, isSelected }) => {
	const handleDelete = (e) => {
        console.log(e.target.classList)
		if (e.target.classList.contains("delete")) {
			console.log("deleee");
		} else {
			handleClick(data);
		}
	};
	return (
		<div
			className={`flex justify-between items-center pt-[0.813em] pb-[0.813em] hover:bg-[#F0F3FC] lg:pl-[32px]  animate03s cursor-pointer ${
				isSelected && "bg-[#F0F3FC]"
			} `}
			onClick={(e) => {
				handleDelete(e);
			}}
		>
			<div className='flex space-x-[0.85em] items-center'>
				<div
					className={`p-[0.5em] w-[2em] h-[2em] rounded-full flex items-center justify-center ${
						data.role === "Admin" ? "bg-[#436CD5]" : "bg-[#F56412]"
					}`}
				>
					<h3 className='text-white text-[12px] sodo700 tracking-[-0.24px]  '>
						JE
					</h3>
				</div>
				<div className='flex flex-col space-y-[2px]'>
					<h3 className=' text-[#000] sodo700 text-[0.75em] tracking-[-0.24px]'>
						{" "}
						{data.name}{" "}
					</h3>
					<h3 className='text-[#5F6370] text-[0.75em] tracking-[-0.24px] sodo400'>
						{" "}
						{data.role}{" "}
					</h3>
				</div>
			</div>

			<span
				className={`delete mr-[32px] ${data.role === "Admin" && "hidden"}`}
				onClick={() => {
					console.log("delete clicked");
				}}
			>
				{deleteRedIcon}
			</span>
		</div>
	);
};

export default EmployeesItems;
