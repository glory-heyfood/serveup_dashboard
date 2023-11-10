"use client";
import React, { useEffect, useState } from "react";
import PriceCardItem from "./PriceCardItem";
import RadioCheck from "./RadioCheck";

const PriceCard = ({ data, isSelected, index, onCardClick }) => {
	return (
		<label className='relative' onClick={() => onCardClick(data)}>
			<div className='absolute top-[18px] right-[12px]'>
				<RadioCheck isChecked={isSelected} />
			</div>

			<div
				className={`rounded-[12px] px-[1.75em] py-[2em] w-[290px]  h-fit sm:h-[700px] ${
					isSelected
						? "bg-[#f1f5ff] border-[#DCE6FF]  border-[2px]"
						: "bg-white border border-[#F0F0F0]"
				} `}
			>
				<div className='flex flex-col space-y-[0.75em]'>
					<h1
						className={`${
							isSelected
								? "text-[#072a85] sodo400 tracking-[-0.96px] font-[400]"
								: " text-[#00081C] sodo400 tracking-[-0.96px] font-[400]"
						}`}
					>
						{data.name}
					</h1>
					<p className='text-[#646976] text-[0.75em] tracking-[-0.48px] sodo300 '>
						{" "}
						{data.text}{" "}
					</p>
				</div>

				{data.price === "Custom Pricing" ? (
					<h4
						className={`mt-[0.8em] mb-[1.1em] items-center  text-[1.75em] tracking-[-0.56px] text-[#00081C] font-[600] inter ${
							isSelected ? "text-[#072a85]" : " text-[#00081C]"
						}
							
						`}
					>
						{data.price}{" "}
					</h4>
				) : (
					<div
						className={`flex space-x-[6px] items-center ${
							index === 0 || index === 1
								? "mb-[2em] mt-[2.6em]"
								: "mt-[1.5em] mb-[2em]"
						}`}
					>
						<h1
							className={`items-center   text-[1.75em] font-[600] sodo600 ${
								isSelected ? "text-[#072a85]" : " text-[#00081C]"
							}`}
						>
							₦{data.price}{" "}
						</h1>
						<p className='text-[#646976] text-[0.82em] tracking-[-0.56px] font-[400]  '>
							/month
						</p>
					</div>
				)}

				<div className='flex flex-col pace-y-[8px] '>
					{data.plans.map((data, i) => (
						<PriceCardItem text={data} key={i} />
					))}
				</div>
			</div>
		</label>
	);
};

export default PriceCard;
