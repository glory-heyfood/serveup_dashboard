import React from "react";

const CustomLabel = ({children, header, subHeader, label, headerFontAndSize}) => {
	return (
		<div className='flex flex-col space-y-[1em]'>
			<div>
				<div className='flex space-x-[12px]'>
                <h1 className={`${headerFontAndSize ? headerFontAndSize : "text-[14px] sodo700"} tracking-[-0.56px]`}>{header}</h1>
                {label}
                </div>
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
