"use client";
import { XIcon } from "@/SVGs";
import React, { useState } from "react";
import CustomeSideText from "./CustomeSideText";
import Activity from "./Activity";
import Loyalty from "./Loyalty";

const CustomerSideBar = ({ handleClose }) => {
	const [selected, setSelected] = useState("Activity");
	const loyaltyData = [
		{
			header: "Earned Points",
			text: "4 points",
			date: "Fri, Oct 6 2023",
		},
		{
			header: "Redemed eeward",
			text: "Free delivery",
			date: "Fri, Oct 6 2023",
		},
		{
			header: "Earned Points",
			text: "8 points",
			date: "Fri, Oct 6 2023",
		},
		{
			header: "Redemed eeward",
			text: "Free delivery",
			date: "Fri, Oct 6 2023",
		},
	];

	const activityData = [
		{
			header: "Order - Toasties Ikeja",
			text: "Chicken Salad",
			date: "Fri, Oct 6 2023",
		},

		{
			header: "Order - Toasties Ikeja",
			text: "Egg Sandwich",
			date: "Fri, Oct 6 2023",
		},
		{
			header: "Fund Wallet",
			text: "₦3,500",
			date: "Fri, Oct 6 2023",
		},
		{
			header: "Order - Toasties Ikeja",
			text: "Chicken Salad",
			date: "Fri, Oct 6 2023",
		},
		{
			header: "Fund Wallet",
			text: "₦3,500",
			date: "Fri, Oct 6 2023",
		},
	];
	return (
		<div
			className='fixed top-0 right-0 w-[35%] min-w-[350px] customerSidebar z-30 h-screen pt-[3.5em] bg-white'
			style={{
				boxShadow: "0px 4px 24px 0px #E6E6E6",
			}}
		>
			<div className='pt-[2em] pl-[2.5em] pr-[1.5em]'>
				<div className='flex items-center justify-between mb-[1em]'>
					<h1 className='dashHeader tracking-[-0.8px] !mb-[0px]'>
						{" "}
						Katherine Alariko{" "}
					</h1>
					<span
						className='cursor-pointer w-fit inline-block'
						onClick={handleClose}
					>
						{XIcon}
					</span>
				</div>
				<div className='flex items-center space-x-[0.75em] mb-[1.5em]'>
					<div className='bg-[#F0F3FC] cursor-pointer rounded-[4px] flex items-center  justify-center py-[0.5em] px-[0.75em] '>
						<h3 className='text-[#072A85] text-[0.75em] sodo400 tracking-[-0.24px]'>
							Kattryko@gmail.com
						</h3>
					</div>

					<div className='bg-[#F0F3FC] cursor-pointer rounded-[4px] flex items-center  justify-center py-[0.5em] px-[0.75em] '>
						<h3 className='text-[#072A85] text-[0.75em] sodo400 tracking-[-0.24px]'>
							+2348064578212
						</h3>
					</div>
				</div>

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
				</div>
			</div>

			<div className='border border-transparent border-b-[#E6E6E6] w-full space-x-[4em] mb-[0.5em] flex items-center pl-[2.5em] mt-[2em] '>
				<div
					className={` cursor-pointer ${
						selected === "Activity" &&
						"border-b-[#072A85] border-[2px] border-transparent  pb-[0.75em]"
					}`}
					onClick={() => setSelected("Activity")}
				>
					<h1
						className={` text-[0.75em] tracking-[-0.24px]  ${
							selected === "Activity" ? "text-[#072A85] sodo600" : "text-[#7E8493] sodo400"
						}`}
					>
						Activity
					</h1>
				</div>

				<div
					className={` cursor-pointer ${
						selected !== "Activity" &&
						"border-b-[#072A85] border-[2px] border-transparent  pb-[0.75em]"
					}`}
					onClick={() => setSelected("Loyalty")}
				>
					<h1
						className={` text-[0.75em] tracking-[-0.24px]  ${
							selected !== "Activity" ? "text-[#072A85] sodo600" : "text-[#7E8493] sodo400"
						}`}
					>
						Loyalty Summary
					</h1>
				</div>
			</div>

			<div className="mt-[0.5em]">
				{selected === "Activity" ? (
					<Activity data={activityData} />
				) : (
					<Loyalty points='324' data={loyaltyData} />
				)}
			</div>
		</div>
	);
};

export default CustomerSideBar;
