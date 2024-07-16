import { searchIconLarge } from "@/SVGs";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import EmptyState from "@/components/EmptyState";
import OuterModal from "@/components/modal/OuterModal";
import React, { useEffect, useState } from "react";
import DiscountSelectModalItem from "./DiscountSelectModalItem";
import { Button } from "@mui/material";
import useDebounce from "@/hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
	addItemToCategory,
	removeItemFromCategory,
	removeItemFromCategoryWeb,
	searchItem,
} from "@/redux/features/stores/menuSlice";
import { menu_id } from "@/data";
import FadeLoad from "../loaders/FadeLoader";

const DiscountSelectItemsModal = ({ name }) => {
	const [selectedValue, setSelectedValue] = useState("");
	const [searchedArray, setSearchedArray] = useState();
	const [showModal, setShowModal] = useState(false);
	const itemsData = useSelector((state) => state.menu.itemsData);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const dataLoading = useSelector((state) => state.menu.dataLoading);

	const [checkedItems, setCheckedItems] = useState([]);

	const handleToggleItems = (item) => {
		// Check if the item is already in the array
		if (
			checkedItems?.some(
				(checkedItem) => JSON.stringify(checkedItem) === JSON.stringify(item),
			)
		) {
			// If it's already checked, remove it
			setCheckedItems((prevItems) =>
				prevItems.filter((data) => data.id !== item.id),
			);
			dispatch(
				removeItemFromCategory({
					category_name: name,
					item_id: item.id,
				}),
			)
				.unwrap()
				.then((res) => {
					dispatch(removeItemFromCategoryWeb(item.id));
				});
		} else {
			// If it's not checked, add it
			dispatch(
				addItemToCategory({
					item_id: item.id,
					category_name: name,
				}),
			);
			setCheckedItems((prevItems) => [...prevItems, item]);
		}
	};

	// Call the useDebounce hook
	const debounceCallback = useDebounce((value) => {
		dispatch(
			searchItem({
				value,
				menu_id: menu_id,
			}),
		)
			.unwrap()
			.then((res) => {
				setSearchedArray(res?.data[0]);
				setLoading(false);
			});
	}, 2);

	const handleChange = (event) => {
		setShowModal(true);
		setLoading(true);
		debounceCallback(event.target.value);
	};

	useEffect(() => {
		setCheckedItems(itemsData);
	}, [itemsData]);

	return (
		<OuterModal header='Select Items' minHeight='min-h-[477px]'>
			<div className='flex flex-col space-y-[32px]'>
				<div className='flex space-x-[12px] w-full relative'>
					<div className='w-full relative z-[10]'>
						<CustomSearch
							placeholder='Search items'
							fullWidth
							handleChange={handleChange}
						/>
					</div>

					{showModal && (
						<div className='w-full  p-4 bg-white border border-[#E6E6E6] rounded-[4px] absolute top-[50px] z-[5] left-0 !ml-0 min-h-fit h-[300px] overflow-auto scroll-hidden '>
							{loading ? (
								<FadeLoad />
							) : (
								searchedArray?.map((data) => (
									<div
										key={data.id}
										className='flex items-center space-x-2 py-2 cursor-pointer'
										onClick={() => {
											// setShowModal(false);
											handleToggleItems(data);
											// setSearchedArray([]);
										}}
									>
										<input
											type='checkbox'
											checked={checkedItems?.some(
												(checkedItem) => checkedItem.id === data.id,
											)}
											onChange={() => handleToggleItems(data)}
										/>
										<h1 className='sodo400 text-[0.75rem] tracking-[-0.24px]'>
											{data.name}
										</h1>
									</div>
								))
							)}
						</div>
					)}
				</div>

				{checkedItems.length === 0 ? (
					<EmptyState
						icon={searchIconLarge}
						header='No search result'
						text='Search for an item to select it'
					/>
				) : (
					<div>
						<h3 className='sodo700'>Selected Items:</h3>

						{checkedItems?.map((item) => (
							<DiscountSelectModalItem
								key={item.id}
								header={item.name}
								handleClick={() => {
									handleToggleItems(item);
								}}
								subHeader={item.price}
							/>
						))}
					</div>
				)}
			</div>
		</OuterModal>
	);
};

export default DiscountSelectItemsModal;
