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
        console.log(url)

		if (url === "/sms") {
			setShaded(false);
		} else {
			setShaded(true);
		}
	}, []);
	return (
		<div>
			{" "}
			
			<div className='pr-[14px] mt-[20px] '>
				<a  
                onClick={()=>{
                    dispatch(toggleSidebar(true))
                }}
					href='#/email'
					className={`${
						shaded ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Email campaign
					</h2>
				</a>

				<a  
                onClick={()=>{
                    dispatch(toggleSidebar(true))
                }}
					href='#/sms'
					className={`${
						!shaded ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							!shaded ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						SMS campaign
					</h2>
				</a>
			</div>
		</div>
	);
};

export default GridComponent;
