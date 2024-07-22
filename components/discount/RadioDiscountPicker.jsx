import React from "react";
import RadioCheck from "../RadioCheck";

const RadioDiscountPicker = ({
	itemSelected,
	header,
	fontWeight,
	subHeader,
	headerClass,
	subHeaderClass,
	absolute,	
	handleItemClick,
	children,
}) => {
	return (
		<div
			className={`w-full border border-[#E6E6E6] rounded-[4px] ${
				!absolute && " p-[16px]"
			}  relative ${itemSelected === header ? "" : "cursor-pointer"}`}
			onClick={() => {
				handleItemClick(header);
			}}
		>
			<div
				className={`flex space-x-[16px] cursor-pointer ${
					absolute && " p-[16px]"
				} items-center  `}
			>
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
					{subHeader && (
						<h3
							className={
								subHeaderClass
									? subHeaderClass
									: `text-[#5F6370] text-[12px] tracking-[-0.24px] sodo400  `
							}
						>
							{subHeader}
						</h3>
					)}
					{children && !absolute && itemSelected === header && (
						<div className='mt-[1rem] '>{children}</div>
					)}
				</div>
			</div>
			{children && absolute && itemSelected === header && (
				<div className='  w-full  '>{children}</div>
			)}
		</div>
	);
};

export default RadioDiscountPicker;
