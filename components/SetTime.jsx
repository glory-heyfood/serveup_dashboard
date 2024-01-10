import { minusIcon, plusTimeIcon } from "@/SVGs";
import React, { useState } from "react";

const SetTime = () => {
	const [time, setTime] = useState(0);
	const [inputValue, setInputValue] = useState(null);
	const convertToTime = (minutes) => {
		if (minutes < 60) {
			return `${minutes}mins`;
		} else {
			const hours = Math.floor(minutes / 60);
			const remainingMinutes = minutes % 60;

			if (remainingMinutes === 0) {
				return `${hours}hr`;
			} else {
				return `${hours}hr ${remainingMinutes}mins`;
			}
		}
	};


	const timeFormat = convertToTime(time);
	return (
		<div className='border border-[#E6E6E6] py-[0.5rem] px-[0.75rem] flex items-center space-x-[1.5rem] w-fit rounded-[4px]  '>
			<div
				className='bg-[#F0F0F0] p-[6px] rounded-[4px] cursor-pointer  '
				onClick={() => {
					setInputValue();
					const t = time - 5;
					if (t <= 0) {
						setTime(0);
					} else {
						setTime(t);
					}
				}}
			>
				{minusIcon}
			</div>

			<h1 className=" text-[0.825rem] w-fit tracking-[-0.56px] sodo400 text-black text-center" > {timeFormat} </h1>
			<div
				className='bg-[#F0F0F0] p-[6px] rounded-[4px] cursor-pointer  '
				onClick={() => {
					setInputValue();
					const t = time + 5;
					setTime(t);
				}}
			>
				{plusTimeIcon}
			</div>
		</div>
	);
};

export default SetTime;
