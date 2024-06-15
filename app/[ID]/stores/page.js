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
import StoreLoader from "@/components/loaders/StoreLoader";
import FadeLoad from "@/components/loaders/FadeLoader";
import { getBusinessById } from "@/redux/features/business/businessSlice";

const Page = () => {
	const [showStore, setShowStore] = useState(false);
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.stores.loading);
	const data = useSelector((state) => state.stores.data);
	const [businessID, setBusinessID] = useState();
	const [filteredData, setFilteredData] = useState([]);
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
		const url = window.location.href.split("/");
		const id = url[url.length - 2];
		setBusinessID(id);

		dispatch(
			getAllStoresAsync({
				business_id: id,
				page: 1,
				noOfStores: 5,
			}),
		)
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
		setFilteredData([]);
	}, []);

	return showStore ? (
		<AddStore handleClose={handleCloseStore} businessID={businessID} />
	) : (
		<DashLayout btn={true}>
			{loading ? (
				<div className='w-full h-full'>
					<h1 className='dashHeader'>Stores</h1>
					<FadeLoad />
				</div>
			) : data?.length === 0 ? (
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
							<StoresItem data={data} key={i} businessID={businessID} />
						))}
					</div>
				</>
			)}
		</DashLayout>
	);
};

export default Page;
