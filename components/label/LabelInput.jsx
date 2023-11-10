import React from "react";

const LabelInput = ({ label, padding, children }) => {
	return (
		<div className=' border border-[#E6E6E6] flex space-x-[0.94em] items-center  rounded-[4px]'>
			<div
				className='w-[25%] bg-[#F4F4F4] border border-transparent border-r-[#E6E6E6]  '
				style={{
					padding: padding,
				}}
			>
				{label}
			</div>
			<div className="w-[75%]">
            {children}
            </div>
		</div>
	);
};

export default LabelInput;
