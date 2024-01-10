import React from "react";
import AnalyticsCardItem from "./AnalyticsCardItem";

const AnalyticsCard = ({title, headerLeft, headerRight, items}) => {
	return (
		<div className='flex flex-col w-full border border-[#E6E6E6] py-[24px] px-[20px] rounded-[4px]'>
			<h1 className='text-[20px] md:text-[18px] tracking-[-0.72px] sodo700 mb-[16px] '>
				{title}
			</h1>
			<div className='flex flex-col space-y-[12px] w-full'>
				<div className='flex justify-between items-center w-full'>
					<h2 className=' text-[16px] md:text-[14px] tracking-[-0.28px] sodo700 '>
						{headerLeft}
					</h2>

					<h2 className=' text-[16px] md:text-[14px] tracking-[-0.28px] inter font-[700] '>
						{headerRight}{" "}
					</h2>
				</div>

                {
                    items.map((data,i)=> (
                        <AnalyticsCardItem key={i} itemLeft={data.left} itemRight={data.right} />
                    ))
                }
			</div>
		</div>
	);
};

export default AnalyticsCard;
