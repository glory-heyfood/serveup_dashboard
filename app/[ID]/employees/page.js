"use client";
import { plusIcon, shieldIcon } from "@/SVGs";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import DashLayout from "@/components/Dashboard/DashLayout";
import EmptyState from "@/components/EmptyState";
import { Button } from "@mui/material";
import React, { useState } from "react";
import EmployeesItems from "./EmployeesItems";
import EmployeeSideBar from "./EmployeeSideBar";
import { EmployeeData, options } from "@/data";
import DashBtn from "@/components/buttons/DashBtn";
import AddEmployee from "./AddEmployee";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import ManageRoles from "./ManageRoles";

const Page = () => {
	const [show, setShow] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState("");
	const modal = useSelector((state) => state.modal.showModal);
	const dispatch = useDispatch();
	const [showManageRoles, setShowManageRoles] = useState(false);

	const handleChange = (e) => {
		console.log(e.target.value);
	};

	const handleItemClick = (item) => {
		setShow(true);
		setSelectedItem(item);
	};
	if (showManageRoles) {
		return <ManageRoles setShowManageRoles={setShowManageRoles} />;
	} else {
		return (
			<DashLayout>
				{empty ? (
					<div className=''>
						<h1 className='dashHeader'>Employees</h1>
						<EmptyState
							icon={shieldIcon}
							header='No Employees yet'
							text='Employees from all locations will appear here'
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
					<>
						<div className='flex flex-col  lg:ml-[-32px] lg:mr-[-32px] '>
							<div>
								{/* Dont forget to change this when integration starts */}
								<div className='flex space-x-4 items-start justify-between lg:pl-[32px] lg:pr-[32px]'>
									<h1 className='dashHeader'>Employees</h1>

									<Button
										onClick={() => {
											setEmpty(!empty);
										}}
									>
										Click to toggle
									</Button>
								</div>

								<div className='flex flex-col md:flex-row space-y-[24px] md:space-y-0 justify-between w-full lg:pl-[32px]'>
									<div className='flex space-x-[0.75em]  '>
										<CustomSelect
											options={options}
											name='select'
											defaultValue='All Locations'
											selectedValue={selectedLocation}
											handleChange={(e) => setSelectedLocation(e.target.value)}
										/>
										<span className='hidden md:block'>
											<CustomSearch
												placeholder='Search name, phone,email...'
												handleChange={handleChange}
											/>
										</span>
									</div>

									<div className='flex  gap-x-[1rem] md:space-x-[1rem] w-fit mr-[32px]'>
										<span className='w-fit order-2 md:order-1 '>
											<DashBtn
												text='Manage Roles'
												font='sodo700'
												lightTheme={true}
												padding='10px 14px'
												handleClick={() => {
													setShowManageRoles(true);
												}}
											/>
										</span>
										<span className='w-fit order-1 md:order-2'>
											{" "}
											<DashBtn
												icon={plusIcon}
												text='Add new employess'
												handleClick={() => {
													dispatch(toggleModal(true));
												}}
												padding='10px 14px'
											/>{" "}
										</span>
									</div>

									<span className='block md:hidden'>
										<CustomSearch
											fullWidth
											placeholder='Search name, phone,email...'
											handleChange={handleChange}
										/>
									</span>
								</div>

								<hr className='h-[0.5px] w-full lg:w-[94%] hidden md:block bg-[#F0F0F0] mt-[1.25em] mb-[0.75em] lg:ml-[32px] lg:mr-[32px] ' />

								<div className='w-full  flex-grow mt-[1.25em]  md:mt-0'>
									{EmployeeData.map((data, i) => (
										<EmployeesItems
											key={i}
											data={data}
											handleClick={handleItemClick}
											isSelected={selectedItem === data}
										/>
									))}
								</div>

								{show && (
									<EmployeeSideBar
										handleClose={() => {
											setShow(false);
											setSelectedItem(null);
										}}
									/>
								)}
							</div>
						</div>

						{modal && <AddEmployee />}
					</>
				)}
			</DashLayout>
		);
	}
};

export default Page;
