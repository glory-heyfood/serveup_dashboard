import React from "react";
import RadioCheck from "../RadioCheck";

const RadioDiscountPicker = ({
	itemSelected,
	header,
	fontWeight,
	subHeader,
	headerClass,
	subHeaderClass,
	handleItemClick,
	children,
}) => {
	return (
		<div
			className={`w-full border border-[#E6E6E6] rounded-[4px] p-[16px] ${
				itemSelected === header ? "" : "cursor-pointer"
			}`}
			onClick={() => {
				handleItemClick(header);
			}}
		>
			<div className={`flex space-x-[16px] cursor-pointer `}>
				<RadioCheck isChecked={itemSelected === header} />
				<div>
					<h2
						className={
							headerClass
								? headerClass
								: `text-[12px] ${
										fontWeight ? fontWeight : "sodo600"
								  } tracking-[-0.24px]`
						}
					>
						{header}
					</h2>
					<h3
						className={
							subHeaderClass
								? subHeaderClass
								: `text-[#5F6370] text-[12px] tracking-[-0.24px] sodo400  `
						}
					>
						{subHeader}
					</h3>
					{itemSelected === header && (
						<div className='mt-[1rem]'>{children}</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RadioDiscountPicker;
