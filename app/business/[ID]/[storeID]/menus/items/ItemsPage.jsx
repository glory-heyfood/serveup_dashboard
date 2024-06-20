import GridLayout from "@/components/GridLayout";
import React, { useEffect, useState } from "react";
import GridComponent from "../GridComponent";
import EmptyState from "@/components/EmptyState";
import BreadCrumb from "@/components/BreadCrumb";
import { plusIcon, shieldIcon } from "@/SVGs";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "@/components/CustomSelect";
import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import StickyHeadTable from "./Table";
import AddnewItems from "./AddnewItems";
import InStock from "@/components/InStock";
import { getAllItems } from "@/redux/features/stores/menuSlice";

const ItemsPage = () => {
	const dispatch = useDispatch();
	const itemsData = useSelector((state) => state.menu.itemsData);
	const [showAddItems, setShowAddItems] = useState(false);
	const [sortValue, setSortValue] = useState("name");
	const [editData, setEditData] = useState();

	const itemSortOptions = [
		{
			label: "Name",
			value: "name",
		},
		{
			label: "Price: High to low",
			value: "price-high-to-low",
		},
		{
			label: "Price: Low to high",
			value: "price-low-to-high",
		},
		// {
		// 	label: "Category",
		// 	value: "category",
		// },
		{
			label: "Stock",
			value: "stock",
		},
		{
			label: "Date added",
			value: "date-added",
		},
	];

	const handleClick = () => {
		setEditData();
		setShowAddItems(true);
	};
	const handleCloseAddItems = () => {
		setShowAddItems(false);
	};

	const handleEditItems = (data) => {
		setEditData(data);
		setShowAddItems(true);
	};

	const handleSort = (e) => {
		const menu_id = JSON.parse(
			window.localStorage.getItem("serveup_store"),
		)?.menu_id;
		setSortValue(e.target.value);
		dispatch(
			getAllItems({
				menu_id: menu_id,
				page: 1,
				pageSize: 10,
				sortString: e.target.value,
			}),
		);
	};

	useEffect(() => {
		const menu_id = JSON.parse(
			window.localStorage.getItem("serveup_store"),
		)?.menu_id;
		console.log(menu_id);
		dispatch(
			getAllItems({
				menu_id: menu_id,
				page: 1,
				pageSize: 10,
				sortString: "name",
			}),
		);
	}, []);

	return showAddItems ? (
		<AddnewItems handleClose={handleCloseAddItems} editData={editData} />
	) : (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div className='mb-[1.5rem] md:mb-[2rem]'>
				<BreadCrumb main='Menu' link='Items' />
			</div>

			{itemsData?.length === 0 ? (
				<EmptyState
					header='No Items'
					text='You have not added any items to your menu'
					btnText='Add new Item'
					handleClick={handleClick}
					icon={shieldIcon}
				/>
			) : (
				<div>
					<div className='flex flex-col md:flex-row md:items-center justify-between mb-[1.5rem]'>
						<div className='flex space-x-[0.75rem] items-center order-2 md:order-1 '>
							<CustomSelect
								defaultValue='Sort by'
								options={itemSortOptions}
								selectedValue={sortValue}
								handleChange={handleSort}
							/>
							<CustomSearch
								placeholder='Search '
								handleChange={() => {}}
								fullWidth
							/>
						</div>

						<div className='w-fit order-1 md:order-2 mb-[1.5rem] md:mb-0 '>
							<DashBtn
								icon={plusIcon}
								text='Add new Item'
								handleClick={handleClick}
								padding='7px 15px'
							/>
						</div>
					</div>

					<StickyHeadTable handleEdit={handleEditItems} sort={sortValue} />
				</div>
			)}
		</GridLayout>
	);
};

export default ItemsPage;
