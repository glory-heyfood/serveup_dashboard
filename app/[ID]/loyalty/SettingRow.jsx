import React from "react";

const SettingRow = ({
	width,
	bold,
	col1,
	col2,
	col3,
	col4,
	handleClick,
	type,
	disabled,
}) => {
	return (
		<div
			className={`${
				bold ? "border " : "border-[0.5px]"
			} border-transparent border-b-[#F0F0F0] flex items-center py-[12px] `}
		>
			<div
				className={` ${width ? width : "w-[20%]"} ${
					bold ? "sodo700" : "sodo600"
				} text-[12px] tracking-[-0.24px]  `}
			>
				{" "}
				{col1}{" "}
			</div>

			<div
				className={`  ${
					bold ? "sodo700" : "sodo600"
				} text-[12px] tracking-[-0.24px]  w-[20%]  `}
			>
				{" "}
				{col2}{" "}
			</div>
			<div
				className={`  ${
					bold ? "sodo700" : "sodo600"
				} text-[12px] tracking-[-0.24px]  w-[40%]  `}
			>
				{" "}
				{col3}{" "}
			</div>
			<div
				onClick={() => handleClick()}
				className={` w-[20%] text-[#072A85] text-right pr-[12px] text-[12px] sodo700 tracking-[-0.24px] `}
			>
				{" "}
				{col4}{" "}
			</div>
		</div>
	);
};

export default SettingRow;
