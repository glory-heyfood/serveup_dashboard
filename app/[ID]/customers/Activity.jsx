import React from "react";
import CustomeSideText from "./CustomeSideText";

const Activity = ({ data }) => {
	return data.map((data, i) => (
		<div
        key={i}
			className='pt-[0.87em] pb-[0.75em] ml-[2.5em] pr-[1.5em] flex items-start justify-between '
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
	));
};

export default Activity;
