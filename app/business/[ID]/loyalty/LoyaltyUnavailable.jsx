import DashBtn from "@/components/buttons/DashBtn";
import Image from "next/image";
import React from "react";

const LoyaltyUnavailable = () => {
	return (
	<div>
        <h1 className='text-[24px] md:text-[20px] sodo700 tracking-[-0.9px] '>Loyalty Rewards</h1>
        	<div
			className={`border border-[#E6E6E6] rounded-[8px] flex items-center justify-center flex-col space-y-[1em] py-[1.5em] md:py-[3.75em] relative overflow-hidden mt-[32px]`}
		>
			<div className='bg-[#072A85] w-full py-[22px] absolute top-0 h-fit flex items-center justify-center '>
				<Image
					src='/images/loyaltyBanner.svg'
					height={114}
					width={250}
					alt='loyalty icon'
				/>
			</div>
			<div className='flex flex-col space-y-[1.25em] items-center !md:mt-[130px] !mt-[160px] px-[32px]'>
				<div>
					<Image
						src='/images/loyalty.svg'
						height={80}
						width={80}
						alt='loyalty icon'
					/>
				</div>
				<div className='flex flex-col space-y-[0.25em] items-center justify-center'>
					<h1 className='text-[1em] text-black tracking-[-0.64px] sodo700 text-center'>
						{" "}
						Loyalty rewards is not available in your plan
					</h1>
					<p className='text-[#7E8493] text-[12px] tracking-[-0.48px] sodo400 text-center'>
						Subscribe to a higher plan to have access to this feature
					</p>
				</div>
			</div>

			<div className='inline'>
				<DashBtn
					text='Upgrade Plan'
					padding='8px 14px'
					// handleClick={handleClick}
				/>
			</div>
		</div>
    </div>
	);
};

export default LoyaltyUnavailable;
