"use client";
import { XIcon, plusIcon, deleteRedIcon } from "@/SVGs";
import DashBtn from "@/components/buttons/DashBtn";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ClickableTableSideBar = ({ handleClose, sideBarDetails }) => {
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
			<div className='relative'>
				<span
					className='cursor-pointer w-fit inline-block absolute top-7 right-6'
					onClick={handleClose}
				>
					{XIcon}
				</span>
				{sideBarDetails}
			</div>
		</div>
	);
};

export default ClickableTableSideBar;
