import {
	toggleDineInGridSidebar,
	toggleKitchenSidebar,
	toggleLoyaltyGridSidebar,
	toggleMarketingGridSidebar,
	toggleMenusGridSidebar,
	toggleMobileAppGridSidebar,
	togglePayoutGridSidebar,
	toggleWebsiteGridSidebar,
} from "@/redux/features/gridSidebarSlice";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const StoreSidebarItem = ({ icon, href, text, noClick, bgColor }) => {
	const dispatch = useDispatch();
	

	return (
		<Link
			href={href}
			className={`h-[81px] `}
			onClick={() => {
				!noClick && dispatch(toggleSidebar(true));

				if (text === "Menus") {
					dispatch(toggleMenusGridSidebar(true));
				}

				if (text === "Payout") {
					dispatch(togglePayoutGridSidebar(true));
				}

				if (text === "Dine-in") {
					dispatch(toggleDineInGridSidebar(true));
				}
				if (text === "Kitchen") {
					console.log("hiii")
					dispatch(toggleKitchenSidebar(true));
				}
			}}
		>
			<div className='flex flex-col items-center space-y-[0.6em] '>
				<div
					className={` rounded-[8px] p-[0.75em]`}
					style={{
						backgroundColor: `${bgColor}`,
					}}
				>
					<span>{icon}</span>
				</div>
				<h1 className='text-[0.75em] sodo600 tracking-[-0.34px] text-center leading-[17px] '>
					{text}
				</h1>
			</div>
		</Link>
	);
};

export default StoreSidebarItem;
