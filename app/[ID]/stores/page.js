"use client";
import { plusIcon, shieldIcon } from "@/SVGs";
import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import DashLayout from "@/components/Dashboard/DashLayout";
import React, { useEffect, useState } from "react";
import StoresItem from "./StoresItem";
import { Button } from "@mui/material";
import EmptyState from "@/components/EmptyState";
import AddStore from "./AddStore";
import { useDispatch, useSelector } from "react-redux";
import { getAllStoresAsync } from "@/redux/features/business/storeSlice";
import { ID } from "@/data";
import { searchArrayForStores } from "@/utils";

const Page = () => {
	const [showStore, setShowStore] = useState(false);
	const dispatch = useDispatch();
	const data = useSelector((state) => state.stores.data);
	const [filteredData, setFilteredData] = useState();
	const handleOpenStore = () => {
		setShowStore(true);
	};

	const handleCloseStore = () => {
		setShowStore(false);
	};

	const handleChange = (e) => {		
		const newArr = searchArrayForStores(data, e.target.value);
		setFilteredData(newArr);
	};

	const getAllStores = () => {
		dispatch(getAllStoresAsync(ID))
			.unwrap()
			.then((res) => {
				console.log(res);
			});
	};

	useEffect(() => {
		setFilteredData(data);
	}, [data]);

	useEffect(() => {
		getAllStores();
	}, []);

	return showStore ? (
		<AddStore handleClose={handleCloseStore} />
	) : (
		<DashLayout btn={true}>
			{data?.length === 0 ? (
				<div>
					<h1 className='dashHeader'>Stores</h1>
					<EmptyState
						handleClick={handleOpenStore}
						btnText='Add new store'
						header='No Stores'
						text='You have not added any store'
						icon={shieldIcon}
					/>
				</div>
			) : (
				<>
					<div className='flex flex-col space-y-[1.5em] md:space-y-0 md:flex-row  md:items-center justify-between mb-[1.5em] md:mb-[1.2em]'>
						<h1 className='dashHeader !mb-[0px]'>Stores</h1>
						<div className='inline-block w-fit'>
							<DashBtn
								handleClick={handleOpenStore}
								icon={plusIcon}
								padding='7px 15px'
								text='Add new store'
							/>
						</div>
					</div>

					<CustomSearch
						placeholder='Search'
						fullWidth
						handleChange={handleChange}
					/>

					<div className='flex flex-col mt-[0.75em]'>
						{filteredData?.map((data, i) => (
							<StoresItem text={data.name} key={i} />
						))}
					</div>
				</>
			)}
		</DashLayout>
	);
};

export default Page;
