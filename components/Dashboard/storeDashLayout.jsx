"use client";
import React, { useEffect, useState } from "react";
import DashHeader from "./DashHeader";
import StoreSideBar from "../sidebar/StoreSideBar";

const StoreDashLayout = ({ children, btn }) => {
	return (
		<div className='h-screen w-full '>
			<DashHeader />
			{/* I am calculating the padding top if there is a button the pt is 6px lower cause for the padding of the button */}
			<div className={`flex h-full  w-full `}>
				<StoreSideBar btn={btn} />

				<div className=' px-[20px] md:px-[32px] pt-[88px]  h-screen  relative overflow-auto scroll-hidden  w-full '>
					{children}
				</div>
			</div>
		</div>
	);
};

export default StoreDashLayout;
