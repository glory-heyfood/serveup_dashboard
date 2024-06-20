import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";

const GridComponent = () => {
	const dispatch = useDispatch();
	const [shaded, setShaded] = useState(true);

	useEffect(() => {
		const url = window.location.hash.substr(1);         

		if (url === "/settings") {
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
					href='#/overview'
					className={`${
						shaded ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							shaded ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Overview
					</h2>
				</a>

				<a  
                onClick={()=>{
                    dispatch(toggleSidebar(true))
                }}
					href='#/settings'
					className={`${
						!shaded ? "bg-[#F2F4F9]" : "bg-white"
					} pl-[24px] py-[16px] block   `}
				>
					<h2
						className={` ${
							!shaded ? "text-[#072A85]" : "text-black"
						} sodo600 tracking-[-0.28px] text-[14px]  `}
					>
						Settings
					</h2>
				</a>
			</div>
		</div>
	);
};

export default GridComponent;
