import React, { useState } from "react";

const SettingRowReward = ({
	width,
	bold,
	col1,
	col2,
	col3,	
}) => {
const [disabled, setDisable] = useState(false)

	return (
		<div
			className={`${
				bold ? "border " : "border-[0.5px]"
			} border-transparent border-b-[#F0F0F0] flex items-center py-[12px] `}
		>
			<div
				className={` ${width ? width : "w-[30%]"} ${
					bold ? "sodo700" : "sodo600"
				} text-[12px] tracking-[-0.24px] ${
					disabled ? "text-[#B7B7B7]" : "text-black"
				}  `}
			>
				{" "}
				{col1}{" "}
			</div>

			<div
				className={`  ${
					bold ? "sodo700" : "sodo600"
				} text-[12px] tracking-[-0.24px]  w-[60%] ${
					disabled ? "text-[#B7B7B7]" : "text-black"
				}  `}
			>
				{" "}
				{col2}{" "}
			</div>
			<div
				// onClick={}
				className={` w-[10%] flex  justify-end pr-[12px] cursor-pointer`}
			>
				{" "}
				{col3}{" "}
			</div>
		</div>
	);
};

export default SettingRowReward;
