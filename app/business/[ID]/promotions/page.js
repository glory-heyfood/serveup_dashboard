"use client";
import CustomSearch from "@/components/CustomSearch";
import DashLayout from "@/components/Dashboard/DashLayout";
import DashBtn from "@/components/buttons/DashBtn";
import React, { useState } from "react";
import StickyHeadTable from "./Table";
import { plusIcon } from "@/SVGs";
import Table from "./Table";
import CreateDiscount from "./CreateDiscount";

const Page = () => {
	const [showCreateDiscount, setShowCreateDiscount] = useState(false);
	const handleCloseDiscount = () => {
        console.log('close')
		setShowCreateDiscount(false);
	};
	return (
		<>
			{showCreateDiscount ? (
				<CreateDiscount handleClose={handleCloseDiscount} />
			) : (
				<DashLayout>
					<div>
						<h1 className='text-black sodo700 text-[20px] tracking-[-0.8px] mb-[30px] '>
							Promotions
						</h1>
						<div className='flex flex-col  md:flex-row md:items-center justify-between mb-[32px]  '>
							<div className='order-2 md:order-1 w-full md:w-fit'>
								<CustomSearch fullWidth placeholder='Search' />
							</div>
							<div className='inline-block w-fit order-1 md:order-2 mb-[24px] md:mb-0'>
								<DashBtn
									text='Create new discount'
									icon={plusIcon}
									handleClick={() => {
										setShowCreateDiscount(true);
									}}
								/>
							</div>
						</div>

						<Table />
					</div>
				</DashLayout>
			)}
		</>
	);
};

export default Page;
