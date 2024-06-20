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
			case "/categories":
				setShaded("/categories");
				break;

			case "/items":
				setShaded("/items");
				break;
			case "/modifiers":
				setShaded("/modifiers");
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
					href='#/categories'
					className={`${
						shaded === "/categories" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/categories" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Categories
					</h2>
				</a>

				<a
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
					href='#/items'
					className={`${
						shaded === "/items" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/items" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Items
					</h2>
				</a>

				<a
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
					href='#/modifiers'
					className={`${
						shaded === "/modifiers" ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded === "/modifiers" ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Modifiers
					</h2>
				</a>
			</div>
		</div>
	);
};

export default GridComponent;
