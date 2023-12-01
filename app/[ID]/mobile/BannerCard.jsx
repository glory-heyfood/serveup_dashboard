import { verticalDotIcon } from "@/SVGs";
import Image from "next/image";
import React from "react";

const BannerCard = ({ color, header, text }) => {
	return (
		<div
			className={`flex items-center rounded-[8px] relative overflow-hidden ${color}`}
		>
			<div className={`w-[60%] pl-[20px] pr-[5%]  py-[16px] `}>
				<h1 className='text-[18px] text-white uppercase sodo700 tracking-[-0.72px]'>
					{header}
				</h1>
				<h3 className='text-[16px] text-white tracking-[-0.624px] sodo400 md:w-[90%] '>
					{text}
				</h3>
			</div>
			<div className='w-[40%] '>
				<img src='/images/bannerImage.png' width='100%' alt='banner' />
			</div>

			<span className='absolute top-2 right-2'>{verticalDotIcon}</span>
		</div>
	);
};

export default BannerCard;
