import { bankIconBlue, bankIconSmall } from "@/SVGs";
import React from "react";

const AccountDetails = ({
	name,
	account,
	edit,
	color,
	bgColor,
	borderColor,
}) => {
	return (
		<div
			className={`border ${
				borderColor ? borderColor : "border-[#E6E6E6]"
			} rounded-[4px] px-[1.25rem] py-[1.5rem] relative ${bgColor && bgColor} `}
		>
			{edit && (
				<div className='absolute top-[1rem] right-[1.25rem]  text-[#072A85] sodo600 text-[0.75rem] tracking-[-0.24px] '>
					Edit cccount
				</div>
			)}

			<div className='flex space-x-[0.75rem] items-center '>
				<span> {color ? bankIconBlue : bankIconSmall} </span>
				<div>
					<h1
						className={`sodo600 uppercase tracking-[-0.64px] text-[1rem] ${
							color && color
						} `}
					>
						{" "}
						{name}{" "}
					</h1>

					<h2
						className={`sodo400 uppercase tracking-[-0.56px] text-[0.825rem] ${
							color && color
						} `}
					>
						{" "}
						{account}{" "}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default AccountDetails;
