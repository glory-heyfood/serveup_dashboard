"use client";
import { plusIcon, shieldIcon } from "@/SVGs";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import DashLayout from "@/components/Dashboard/DashLayout";
import EmptyState from "@/components/EmptyState";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmployeesItems from "./EmployeesItems";
import EmployeeSideBar from "./EmployeeSideBar";
import { EmployeeData, ID, options } from "@/data";
import DashBtn from "@/components/buttons/DashBtn";
import AddEmployee from "./AddEmployee";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import ManageRoles from "./ManageRoles";
import { getAllEmployeesAsync } from "@/redux/features/business/employeeSlice";
import EmployeeAndCustomerLoader from "@/components/loaders/EmployeeAndCustomerLoader";
import { searchArrayforEmployeeAndCustomer } from "@/utils";

const Page = () => {
	const [show, setShow] = useState(false);
	const [empty, setEmpty] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState("");
	const modal = useSelector((state) => state.modal.showModal);
	const dispatch = useDispatch();
	const loader = useSelector((state) => state.employee.loading);
    const store = useSelector((state) => state.stores.data);
    console.log(store)
	const [showManageRoles, setShowManageRoles] = useState(false);
	const [data, setData] = useState();
	const [filteredData, setFilteredData] = useState();

	const handleChange = (e) => {		
		const searchedData = searchArrayforEmployeeAndCustomer(
			data,
			e.target.value.trim(),
		);
		setFilteredData(searchedData);
	};

	const handleItemClick = (item) => {
		setShow(true);
		setSelectedItem(item);
	};

	const getAllEmployees = () => {
		if (ID) {
			dispatch(getAllEmployeesAsync(ID))
				.unwrap()
				.then((res) => {				
					setData(res.data[0]);
					setFilteredData(res.data[0]);
				});
		}
	};

	useEffect(() => {
        // i added this condition so that when a user add an employee, our getEmployee function is called immediately
		if (modal === false) {
			getAllEmployees();
		}
	}, [modal]);

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
									{loader
										? EmployeeData.map((data, i) => (
												<EmployeeAndCustomerLoader key={i} />
										  ))
										: filteredData?.map((data, i) => (
												<EmployeesItems
													key={i}
													data={data}
                                                    getAllEmployees={getAllEmployees}
													handleClick={handleItemClick}
													isSelected={selectedItem === data}
												/>
										  ))}
								</div>

								{show && (
									<EmployeeSideBar
										data={selectedItem}
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
