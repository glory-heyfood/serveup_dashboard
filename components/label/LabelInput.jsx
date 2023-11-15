import React from "react";

const LabelInput = ({ label, padding, children, width }) => {
	return (
		<div className=' border border-[#E6E6E6] py-[14px] px-[16px] md:p-0 flex flex-col space-y-[12px] md:space-y-0 md:flex-row md:space-x-[0.94em] md:items-center  rounded-[4px]'>
            {/* The padd here is for the mobile design */}
			<div
				className={`${width ? width : "md:w-[26%]" }  padd  md:bg-[#F4F4F4] md:border md:border-transparent md:border-r-[#E6E6E6] `}
				style={{
					padding: padding,
				}}
			>
				{label}
			</div>
			<div className="flex-grow">
            {children}
            </div>
		</div>
	);
};

export default LabelInput;
