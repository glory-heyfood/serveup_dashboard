import React from "react";
import LabelText from "./LabelText";
import LabelInput from "./LabelInput";

const LabelTextarea = ({ label, placeholder, rows,width, fontweight }) => {
	return (
		<LabelInput
        width={width}
			padding='16px 0px 16px 16px'
			stretch={true}
			label={<LabelText label={label} fontWeight={fontweight} />}
		>
			<textarea
				placeholder={placeholder}
				style={{ border: "none", outline: "none", resize: "none" }}
				className='scroll-hidden w-full placeholder:text-[#A9ADB5] placeholder:text-[13px] sodo300 border-none outline-none  tracking-[-0.52px] bg-transparent p-0 text-[13px] text-[#000] py-[16px]'
				rows={rows ? rows : "5"}
			/>
		</LabelInput>
	);
};

export default LabelTextarea;
