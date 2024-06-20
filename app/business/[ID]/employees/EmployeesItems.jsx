import { deleteRedIcon, userBlueIcon } from "@/SVGs";
import { deleteEmployeeAsync } from "@/redux/features/business/employeeSlice";
import { getSubstring } from "@/utils";
import React from "react";
import { useDispatch } from "react-redux";
import InvitaitonSentLabel from "./invitaitonSentLabel";

const EmployeesItems = ({ data, handleClick, isSelected, getAllEmployees }) => {
	const dispatch = useDispatch();

	const handleDelete = (e) => {
		console.log(e.target.classList);
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
						data.employeeType === "Admin" ? "bg-[#436CD5]" : "bg-[#F56412]"
					}`}
				>
					<h3 className='text-white text-[12px] sodo700 tracking-[-0.24px] uppercase '>
						{data.employeeType === "Admin"
							? getSubstring(0, 2, data.email)
							: ` ${getSubstring(0, 1, data.first_name)}${getSubstring(
									0,
									1,
									data.last_name,
							  )}`}
					</h3>
				</div>
				<div className='flex flex-col space-y-[2px]'>
					<div className='flex space-x-[0.5rem] items-center '>
						<h3 className=' text-[#000] sodo700 text-[0.75em] tracking-[-0.24px]'>
							{data.employeeType === "Admin"
								? data.email
								: `${data.first_name} ${data.last_name}`}
						</h3>
						{data.invitation === "sent" && <InvitaitonSentLabel />}
					</div>
					<h3 className='text-[#5F6370] text-[0.75em] tracking-[-0.24px] sodo400'>
						{" "}
						{data.employeeType}{" "}
					</h3>
				</div>
			</div>

			<span
				className={`delete mr-[32px] w-[44px] h-[44px] flex items-center justify-center  ${
					data.employeeType === "Admin" && "hidden"
				}`}
				onClick={() => {
					dispatch(deleteEmployeeAsync(data.id))
						.unwrap()
						.then((res) => {
							getAllEmployees();
						});
				}}
			>
				{deleteRedIcon}
			</span>
		</div>
	);
};

export default EmployeesItems;
