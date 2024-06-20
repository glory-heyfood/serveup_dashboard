import { XIcon } from "@/SVGs";
import React, { useState } from "react";
import SidebarText from "./SidebarText";
import SidebarOrderCard from "./SidebarOrderCard";

const TableSideBarDetails = ({ data }) => {
	return (
		<div className='pt-[2em] pl-[2.5em] pr-[1.5em]'>
			<div className='flex items-center space-x-[0.5rem] mb-[1rem]'>
				<h1 className='dashHeader tracking-[-0.8px] !mb-[0px]'>
					Katherine Alariko
				</h1>{" "}
			</div>
			<div className='flex items-center space-x-[0.75em] mb-[1.5rem]'>
				<div className='bg-[#F0F3FC] cursor-pointer rounded-[4px] flex items-center  justify-center py-[0.5em] px-[0.75em] '>
					<h3 className='text-[#072A85] text-[0.75em] sodo400 tracking-[-0.24px]'>
						{/* {data.email} */}
						ezomonglory01@gmail.com
					</h3>
				</div>

				<div className='bg-[#F0F3FC] cursor-pointer rounded-[4px] flex items-center  justify-center py-[0.5em] px-[0.75em] '>
					<h3 className='text-[#072A85] text-[0.75em] sodo400 tracking-[-0.24px]'>
						{/* {data.phone_number} */}
						09074087328
					</h3>
				</div>
			</div>

			<div className='w-full md:w-[60%] lg:w-[170px] mb-[1.5rem]'>
				<SidebarText
					header='Delivery Address'
					text='24, Akinyemi Street Akobo. Ibadan, Nigeria'
				/>
			</div>

			<div className='flex items-center space-x-[2rem] mb-[2.25rem]'>
				<SidebarText
					header='Order date'
					text='Wed Oct 4, 2023  . 10:00 AM'
					textFontSize='text-[0.75rem]'
				/>
				<SidebarText
					header='Order Type'
					text='Delivery'
					textFontSize='text-[0.75rem]'
				/>
				<SidebarText
					header='Order Channel'
					text='Mobile App'
					textFontSize='text-[0.75rem]'
				/>
			</div>

			<div className='flex flex-col space-y-[1.25rem]'>
				<h1 className='text-black sodo700 text-[0.825rem] tracking-[-0.56px] '>
					Order details{" "}
				</h1>

				<SidebarOrderCard
					number='1x'
					name='Chicken Sandwish'
					extra={["1x Extra cheese", "2x Sausage"]}
				/>
				<SidebarOrderCard
					number='1x'
					name='Chicken Sandwish'
					extra={["1x Extra cheese", "2x Sausage"]}
				/>
			</div>

            <div className="w-full md:w-[212px] flex flex-col space-y-[0.5rem] mt-[2rem]">
                 <div className="flex items-center justify-between">
                    <h1 className="text-black text-[0.75rem] tracking-[-0.48px] sodo700 ">Subtotal</h1>
                    <h1 className="text-black text-[0.75rem] tracking-[-0.48px] inter600 ">₦4,800</h1>
                 </div>
                 <div className="flex items-center justify-between">
                    <h1 className="text-black text-[0.75rem] tracking-[-0.48px] sodo700 ">Delivery fee</h1>
                    <h1 className="text-black text-[0.75rem] tracking-[-0.48px] inter600 ">₦500</h1>
                 </div>
                 <div className="flex items-center justify-between">
                    <h1 className="text-black text-[0.75rem] tracking-[-0.48px] sodo700 ">Total</h1>
                    <h1 className="text-black text-[0.75rem] tracking-[-0.48px] inter600 ">₦5,300</h1>
                 </div>
            </div>
		</div>
	);
};

export default TableSideBarDetails;
