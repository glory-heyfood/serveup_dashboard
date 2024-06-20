"use client";
import { XIcon, plusIcon, deleteRedIcon } from "@/SVGs";
import DashBtn from "@/components/buttons/DashBtn";
import React, { useState } from "react";
import EmployeeSidebarTableItem from "./EmployeeSidebarTableItem";
import InvitaitonSentLabel from "./invitaitonSentLabel";
import { useDispatch } from "react-redux";
import { deleteEmployeeAsync } from "@/redux/features/business/employeeSlice";

const EmployeeSideBar = ({ handleClose, data }) => {
	const storeData = [
		{
			store: "Tosties - Ikeja",
			role: "Manager",
		},
		{
			store: "Tosties - VI",
			role: "Manager",
		},
		{
			store: "Tosties - Lekki",
			role: "Manager",
		},
	];

	const dispatch = useDispatch();
	return (
		<div
			className='fixed top-0 right-0 w-[35%] min-w-[350px] customerSidebar z-30 h-screen pt-[3.5em] bg-white'
			style={{
				boxShadow: "0px 4px 24px 0px #E6E6E6",
			}}
		>
			<div className='pt-[2em] pl-[2.5em] pr-[1.5em]'>
				<div className='flex items-start justify-between mb-[1em]'>
					<div>
						<div className='flex items-center space-x-[0.5rem]'>
							<h1 className='dashHeader tracking-[-0.8px] !mb-[0px]'>
								{data.employeeType === "Admin"
									? data.email
									: `${data.first_name} ${data.last_name}`}
							</h1>{" "}
							{data.invitation === "sent" && <InvitaitonSentLabel />}
						</div>
						<h3 className='text-[#5F6370] ext-[14px] sodo400 tracking-[-0.28px] '>
							{data.employeeType}
						</h3>
					</div>
					<span
						className='cursor-pointer w-fit inline-block'
						onClick={handleClose}
					>
						{XIcon}
					</span>
				</div>
				<div className='flex items-center space-x-[0.75em] mb-[40px]'>
					<div className='bg-[#F0F3FC] cursor-pointer rounded-[4px] flex items-center  justify-center py-[0.5em] px-[0.75em] '>
						<h3 className='text-[#072A85] text-[0.75em] sodo400 tracking-[-0.24px]'>
							{data.email}
						</h3>
					</div>

					<div className='bg-[#F0F3FC] cursor-pointer rounded-[4px] flex items-center  justify-center py-[0.5em] px-[0.75em] '>
						<h3 className='text-[#072A85] text-[0.75em] sodo400 tracking-[-0.24px]'>
							{data.phone_number}
						</h3>
					</div>
				</div>
				{/* 
				<div className='flex space-x-[1.5em]'>
					<CustomeSideText
						header='Join Date'
						text='Fri, Oct 6 2023'
						space='2px'
					/>
					<CustomeSideText
						header='Last Order Date'
						text='Fri, Oct 6 2023'
						space='2px'
					/>
				</div> */}
			</div>

			<div className=' w-fit flex space-x-[16px] items-center pl-[2.5em] mb-[24px] '>
				<span className='w-fit'>
					<DashBtn text='Add to store' icon={plusIcon} padding='10px 24px' />
				</span>
				<div
					className='flex items-center space-x-[4px] py-[10px] px-[12px]'
					onClick={() => {
						dispatch(deleteEmployeeAsync(data.id));
					}}
				>
					<span> {deleteRedIcon} </span>
					<h3 className='text-[#F01C1C] sodo700 text-[12px] tracking-[-0.48px] '>
						{" "}
						Delete employee{" "}
					</h3>
				</div>
			</div>

			<div>
				<EmployeeSidebarTableItem
					data={{ store: "Store", role: "Role" }}
					bold={true}
				/>
				{storeData?.map((data, i) => (
					<EmployeeSidebarTableItem key={i} data={data} />
				))}
			</div>
		</div>
	);
};

export default EmployeeSideBar;
