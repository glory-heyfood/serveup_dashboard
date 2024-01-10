import React from "react";

const SidebarTab = ({ status, name, number, icon, handleClick }) => {
	return (
		<div
        onClick={()=>{handleClick()}}
			className={`relative cursor-pointer ${
				status === "active"
					? "border-[2px] border-[#4971D9] bg-[#F2F4F9]"
					: "border border-[#E6E6E6] "
			} rounded-[4px] py-[12px] px-[1.25rem] `}
		>
			<div className='w-[24px] h-[24px] bg-[#F01C1C] rounded-full flex items-center justify-center absolute top-[-14px] right-[-14px]'>
				<h2 className='text-white sodo600 tracking-[-0.48px] text-[0.75rem]'>
					{number}
				</h2>
			</div>
			<div className='flex items-center space-x-[6px]'>
				<span> {status === "active" ? icon("#072A85") : icon("#000000")} </span>
				<h1
					className={` sodo600 tracking-[-0.48px] text-[0.75rem] ${
						status === "active" ? "text-[#072A85]" : "text-black"
					} `}
				>
					{name}
				</h1>
			</div>
		</div>
	);
};

export default SidebarTab;
