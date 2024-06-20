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
			case "/theme":
				setShaded("/theme");
				break;

			case "/homepage":
				setShaded("/homepage");
				break;
			case "/about":
				setShaded("/about");
				break;
			case "/domain":
				setShaded("/domain");
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
					href='#/theme'
					className={`${
						shaded === "/theme" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/theme" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Theme
					</h2>
				</a>

				<a
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
					href='#/homepage'
					className={`${
						shaded === "/homepage" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/homepage" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Homepage
					</h2>
				</a>

				<a
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
					href='#/about'
					className={`${
						shaded === "/about" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/about" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						About Us
					</h2>
				</a>

				<a
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
					href='#/domain'
					className={`${
						shaded === "/domain" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/domain" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Domain
					</h2>
				</a>
			</div>
		</div>
	);
};

export default GridComponent;
