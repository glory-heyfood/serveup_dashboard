"use client";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import DashLayout from "@/components/Dashboard/DashLayout";
import { customerData, options } from "@/data";
import React, { useState } from "react";
import CustomerItems from "./CustomerItems";
import CustomerSideBar from "./CustomerSideBar";
import EmptyState from "@/components/EmptyState";
import { shieldIcon } from "@/SVGs";
import { Button } from "@mui/material";

const Page = () => {
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedlocation, setSelectedLocation] = useState("");
	const [show, setShow] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleChange = (e) => {
		console.log(e.target.value);
	};

	const handleItemClick = (item) => {
		setShow(true);
		setSelectedItem(item);
	};
	return (
		<DashLayout>
			{empty ? (
				<div className="">
                    <h1 className='dashHeader'>Customers</h1>
					<EmptyState
						icon={shieldIcon}
						header='No customers yet'
						text='customers from all locations will appear here'
					/>

					<Button
						onClick={() => {
							setEmpty(!empty);
						}}
					>
						Click to toggle
					</Button>
				</div>
			) : (
                // Using negative margin cause i didnt want to disrupt the entire layout
				<div className='flex flex-col  ml-[-32px] mr-[-32px] '>
					<div>
						{/* Dont forget to change this when integration starts */}
						<div className='flex space-x-4 items-start justify-between pl-[32px] pr-[32px]'>
							<h1 className='dashHeader'>Customers</h1>

							<Button
								onClick={() => {
									setEmpty(!empty);
								}}
							>
								Click to toggle
							</Button>
						</div>

						<div className='flex space-x-[0.75em] w-[50%] pl-[32px]'>
							<CustomSelect
								options={options}
								defaultValue='All Join dates'
								selectedValue={selectedDate}
								handleChange={(e) => setSelectedDate(e.target.value)}
							/>

							<CustomSelect
								options={options}
								defaultValue='All Locations'
								selectedValue={selectedDate}
								handleChange={(e) => setSelectedDate(e.target.value)}
							/>

							<CustomSearch
								placeholder='Search name, phone,email...'
								handleChange={handleChange}
								fullWidth
							/>
						</div>

						<hr className='h-[0.5px] w-[94%] bg-[#F0F0F0] mt-[1.25em] mb-[0.75em] ml-[32px] mr-[32px] ' />

						<div className='w-full overflow-auto scroll-hidden h-[65vh] flex-grow'>
							{customerData.map((data, i) => (
								<CustomerItems
									key={i}
									data={data}
									handleClick={handleItemClick}
									isSelected={selectedItem === data}
								/>
							))}
						</div>

						{show && (
							<CustomerSideBar
								handleClose={() => {
									setShow(false);
									setSelectedItem(null);
								}}
							/>
						)}
					</div>
				</div>
			)}
		</DashLayout>
	);
};

export default Page;
