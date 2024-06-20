import React from "react";

const TextComp = ({ header, subHeader, fontSize, tracking }) => {
	return (
		<div>
			<h3 className='text-[#5F6370] tracking-[-0l48px] sodo400 text-[0.75rem]'>
				{header}
			</h3>
			<h1
				className={`sodo600 ${fontSize ? fontSize : "text-[0.75rem]"} ${
					tracking ? tracking : "tracking-[-0.48px"
				}  `}
			>
				{" "}
				{subHeader}{" "}
			</h1>
		</div>
	);
};

export default TextComp;
