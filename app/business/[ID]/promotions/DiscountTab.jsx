import React from "react";

const DiscountTab = ({ icon, text, selected, handleClick, setSelected }) => {
	return (
		<div
			className={`flex space-x-[8px] items-center cursor-pointer rounded-[4px] border py-[14px] px-[16px] w-full ${
				selected === text
					? "border-[#4971D9] bg-[#F2F4F9]"
					: "border-[#E6E6E6]  "
			} `}
			onClick={() => {
				setSelected(text);
			}}
		>
			<span>{icon}</span>
			<h2
				className={`text-[14px] sodo600 tracking-[-0.56px] ${
					selected === text ? "text-[#072A85]" : "text-black"
				} `}
			>
				{text}
			</h2>
		</div>
	);
};

export default DiscountTab;
