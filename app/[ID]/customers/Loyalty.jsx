import React from "react";
import CustomeSideText from "./CustomeSideText";

const Loyalty = ({ data, points }) => {
	return (
		<div className='ml-[2.5em]'>
			<div
				className='flex flex-col space-y-[6px] pt-[0.87em] pb-[0.75em]'
				style={{
					boxShadow: " 0px 1px 0px 0px #F0F0F0",
				}}
			>
				<h3 className='text-[0.635em] text-black sodo600 tracking-[-0.2px] '>
					{" "}
					POINTS BALANCE{" "}
				</h3>
				<h3 className='text-[1.25em] text-black sodo600 tracking-[-0.4px] '>
					{" "}
					{points}{" "}
				</h3>
			</div>
			{data.map((data, i) => (
				<div
					key={i}
					className='pt-[0.87em] pb-[0.75em] pr-[1.5em]  flex items-start justify-between '
					style={{
						boxShadow: " 0px 1px 0px 0px #F0F0F0",
					}}
				>
					<CustomeSideText header={data.header} text={data.text} space='6px' />
					<h3 className='text-[#5F6370] sodo400 text-[0.75em] tracking-[-0.24px]'>
						{" "}
						{data.date}{" "}
					</h3>
				</div>
			))}
		</div>
	);
};

export default Loyalty;
