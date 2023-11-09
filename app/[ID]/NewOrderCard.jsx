import { bikeIcon, rightArr } from "@/SVGs";
import React from "react";

const NewOrderCard = () => {
	return (
		<div className='border border-[#E6E6E6] rounded-[4px] pt-[1.25em] pb-[0.75em] pr-[1em] pl-[1.25em] '>
			<div className='w-full flex flex-col space-y-[0.5em]'>
				<div className='flex justify-between items-center w-full'>
					<h2 className='tracking-[-0.56px] font-[600] sodoSemiBold'>Toasties Ikeja</h2>
					<h3 className='tracking-[-0.48px] sodoReg text-[#7E8493]'>9:35 PM</h3>
				</div>
				<h3 className='text-[#5F6370] sodoReg tracking-[-0.48px]'>
					Adeniran Temitope
				</h3>
				<div className="flex items-start space-x-[0.7em]">
                    <h3 className="font-[600] text-black  sodoSemiBold">1x</h3>
					<div className='flex flex-col space-y-[0.25em]'>
						<h3 className='tracking-[-0.48px] sodoReg text-[#000]'>
							Chicken Sandwich
						</h3>
						<h3 className='tracking-[-0.48px] sodoReg text-[#7E8493] '>
							1x Extra cheese
						</h3>
						<h3 className='tracking-[-0.48px] sodoReg text-[#7E8493] '>
							2x Sausage
						</h3>
					</div>
				</div>
			</div>

			<div className='flex items-center justify-between mt-[0.8em] '>
				<div className='flex space-x-[0.25em]'>
					<span> {bikeIcon} </span>
					<h3 className='tracking-[-0.48px] sodoReg font-[400] '>Delivery</h3>
				</div>

				<div className='inline-flex space-x-[0.25em] py-[0.375em] px-[0.75em] bg-[#F0F0F0] rounded-[120px] items-center justify-center '>
					<h3>Go to store</h3>
					<span> {rightArr} </span>
				</div>
			</div>
		</div>
	);
};

export default NewOrderCard;
