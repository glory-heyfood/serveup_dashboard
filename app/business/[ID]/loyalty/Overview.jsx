import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import Charts from "./Chart";
import LoyaltyUnavailable from "./LoyaltyUnavailable";
import { Button } from "@mui/material";

const Overview = () => {
	const [show, setShow] = useState(false);
	return (
		<GridLayout GridComponent={<GridComponent />}>
			{show ? (
				<>
					<BreadCrumb main='Loyalty Rewards' link='Overview' />

					<div className='grid grid-cols-1 md:grid-cols-2 w-full  gap-[20px] mt-[32px]'>
						<div className='flex flex-col space-y-[24px] md:space-y-0 md:flex-row justify-between w-full border border-[#E6E6E6] py-[20px] px-[20px] rounded-[4px]'>
							<div className='flex flex-col '>
								<h1 className='text-[20px] md:text-[18px] tracking-[-0.72px] sodo700 mb-[16px] '>
									Sales
								</h1>
								<div className='flex flex-col space-y-[12px]'>
									<div className='flex space-x-[8px] items-center'>
										<div className='w-[12px] h-[12px] rounded-full bg-[#74006D]'></div>{" "}
										<h2 className=' text-[16px] md:text-[12px] tracking-[-0.48px] sodo600 '>
											Sales with loyalty (33%){" "}
										</h2>
									</div>
									<div className='flex space-x-[8px] items-center'>
										<div className='w-[12px] h-[12px] rounded-full bg-[#436CD5]'></div>{" "}
										<h2 className='text-[16px] md:text-[12px] tracking-[-0.48px] sodo600 '>
											Sales without loyalty (67%){" "}
										</h2>
									</div>
								</div>
							</div>
							<div className=' w-[80%] mx-auto  md:w-[40%] flex items-center justify-center '>
								<Charts />
							</div>
						</div>

						<div className='flex flex-col w-full border border-[#E6E6E6] py-[24px] px-[20px] rounded-[4px]'>
							<h1 className='text-[20px] md:text-[18px] tracking-[-0.72px] sodo700 mb-[16px] '>
								Spend
							</h1>
							<div className='flex flex-col space-y-[12px] w-full'>
								<div className='flex justify-between items-center w-full'>
									<h2 className=' text-[16px] md:text-[14px] tracking-[-0.28px] sodo700 '>
										Total spend n rewards
									</h2>

									<h2 className=' text-[16px] md:text-[14px] tracking-[-0.28px] inter font-[700] '>
										₦291,897.65{" "}
									</h2>
								</div>

								<div className='flex justify-between items-center w-full'>
									<h2 className='text-[16px] md:text-[12px]  tracking-[-0.48px] sodo600 '>
										Total points earned
									</h2>

									<h2 className='text-[16px] md:text-[12px]  tracking-[-0.48px] inter font-[500] '>
										610{" "}
									</h2>
								</div>
								<div className='flex justify-between items-center w-full'>
									<h2 className='text-[16px] md:text-[12px]  tracking-[-0.48px] sodo600 '>
										Total reward claimed
									</h2>

									<h2 className='text-[16px] md:text-[12px]  tracking-[-0.48px] inter font-[500] '>
										447{" "}
									</h2>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<LoyaltyUnavailable />
			)}

			<Button
				onClick={() => {
					setShow(!show);
				}}
			>
				Toggle{" "}
			</Button>
		</GridLayout>
	);
};

export default Overview;
