import React from "react";

const SidebarText = ({header, text, textFontSize}) => {
	return (
		<div>
			<h3 className='text-[#5F6370] sodo400 text-[0.75rem] tracking-[-0.48px] '>
				{header}
			</h3>
			<h1 className={`text-[#000] sodo400 ${textFontSize ? textFontSize : "text-[0.825rem]"} tracking-[-0.56px]`}>
				{text}
			</h1>
		</div>
	);
};

export default SidebarText;
