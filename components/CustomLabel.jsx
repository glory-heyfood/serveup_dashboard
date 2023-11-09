import React from "react";

const CustomLabel = ({children, header, subHeader}) => {
	return (
		<div className='flex flex-col space-y-[1em]'>
			<div>
				<h1 className='text-[14px] font-[700] tracking-[-0.56px]'>{header}</h1>
				{subHeader && (
					<h3 className='text-[#5F6370] tracking-[-0.24px] mt-[0.25em]'>
						{subHeader}
					</h3>
				)}
			</div>
			{children}
		</div>
	);
};

export default CustomLabel;
