import { menuGrid } from "@/SVGs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleGridSidebar } from "@/redux/features/gridSidebarSlice";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";

const GridComponent = () => {
	const dispatch = useDispatch();
	const [shaded, setShaded] = useState(true);

	useEffect(() => {
		const url = window.location.hash.substr(1);
		console.log(url);

		// if (url === "/theme") {
		// 	setShaded(true);
		// } else {
		// 	setShaded(true);
		// }

		switch (url) {
			case "/overview":
				setShaded("/overview");
				break;

			case "/fulfillment":
				setShaded("/fulfillment");
				break;
			case "/banner":
				setShaded("/banner");
				break;

			default:
				break;
		}
	}, []);

	return (
		<div>
			{" "}
			<div className='pr-[14px] mt-[20px] '>
				<a
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
					href='#/overview'
					className={`${
						shaded === "/overview" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/overview" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Overview
					</h2>
				</a>

				<a
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
					href='#/fulfillment'
					className={`${
						shaded === "/fulfillment" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/fulfillment" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Fulfillment
					</h2>
				</a>

				<a
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
					href='#/banner'
					className={`${
						shaded === "/banner" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/banner" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Banners
					</h2>
				</a>
			</div>
		</div>
	);
};

export default GridComponent;
