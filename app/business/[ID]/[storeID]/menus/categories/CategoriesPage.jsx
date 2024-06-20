import GridLayout from "@/components/GridLayout";
import React, { useEffect, useState } from "react";
import GridComponent from "../GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import EmptyState from "@/components/EmptyState";
import Modal from "@/components/modal/Modal";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import StoreHeader from "@/components/StoreHeader";
import { shieldIcon } from "@/SVGs";
import MenuModal from "../MenuModal";
import CustomLabel from "@/components/label/CustomLabel";
import CategoriesItem from "./CategoriesItem";
import { Button } from "@mui/material";
import {
	createCategory,
	deleteCategoriesFromWeb,
	deleteCategory,
	getAllCategories,
	getAllItemsByCategoryName,
	removeItemFromCategory,
	removeItemFromCategoryWeb,
} from "@/redux/features/stores/menuSlice";
import RectangleLoader from "@/components/loaders/FadeLoader";
import FadeLoad from "@/components/loaders/FadeLoader";

const CategoriesPage = () => {
	const showModal = useSelector((state) => state.modal.showModal);
	const showEarnModal = useSelector((state) => state.modal.showEarnModal);
	const [data, setData] = useState({});
	const btnLoading = useSelector((state) => state.menu.loading);
	const itemsData = useSelector((state) => state.menu.itemsData);
	const dataLoading = useSelector((state) => state.menu.dataLoading);
	const categoriesData = useSelector((state) => state.menu.categoriesData);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleClick = () => {
		dispatch(toggleModal(true));
	};
	const handleEdit = (index, data) => {
		const menu_id = JSON.parse(
			window.localStorage.getItem("serveup_store"),
		)?.menu_id;
		const payload = {
			category_name: data?.name,
			menu_id: menu_id,
		};
		dispatch(getAllItemsByCategoryName(payload));
		setData({});
		const dat = {
			index,
			name: data.name,
		};
		setData(dat);
		dispatch(
			toggleModal({
				modal: "earn",
				payload: true,
			}),
		);
	};

	const handleCreateCategory = () => {
		const menu_id = JSON.parse(
			window.localStorage.getItem("serveup_store"),
		)?.menu_id;
		const payload = {
			name: formData.name,
			menu_id: menu_id,
		};

		dispatch(createCategory(payload));
	};

	const handleDeleteCategory = (payload) => {
		// This functions deletes a category from the DB
		dispatch(deleteCategory(payload));
		// This function deletes the categories from web
		dispatch(deleteCategoriesFromWeb(payload));
	};

	const handleRemoveItemFromCategory = (category_name, data) => {
		dispatch(
			removeItemFromCategory({
				category_name,
				item_id: data.id,
			}),
		)
			.unwrap()
			.then((res) => {
				dispatch(removeItemFromCategoryWeb(data.id));
			});
	};

	useEffect(() => {
		const menu_id = JSON.parse(
			window.localStorage.getItem("serveup_store"),
		)?.menu_id;
		dispatch(getAllCategories(menu_id));
	}, []);

	return (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div className=' mb-[1.5rem] md:mb-[2rem]'>
				<BreadCrumb main='Menu' link='Categories' />
			</div>

			{dataLoading ? (
				<FadeLoad />
			) : categoriesData?.length === 0 ? (
				<EmptyState
					header='No Categories'
					text='Categories help you arrange and organize your items'
					btnText='Add new category'
					handleClick={handleClick}
					icon={shieldIcon}
				/>
			) : (
				<div>
					<StoreHeader
						header='categories'
						subHeader='Categories help you arrange and organize your items'
						btnText='Create new category'
						handleClick={handleClick}
					/>

					<div className='mt-[1.75rem]'>
						{categoriesData?.map((data, i) => (
							<CategoriesItem
								key={i}
								name={data?.name}
								data={data}
								handleDelete={handleDeleteCategory}
								handleEdit={handleEdit}
								id={data?.id}
								i={i}
							/>
						))}
					</div>
				</div>
			)}
			{showModal && (
				<Modal
					header='Create new category'
					handleClick={handleCreateCategory}
					btnLoading={btnLoading}
				>
					<LabelSearchInput
						label='Category Name'
						name='name'
						handleChange={handleChange}
						placeholder='category name'
					/>
				</Modal>
			)}

			{showEarnModal && (
				<MenuModal header={data.name} btn={true}>
					<CustomLabel header='All Items in this category'>
						{dataLoading ? (
							<FadeLoad />
						) : (
							itemsData?.map((item_data, i) => (
								<div
									key={i}
									className='py-[1rem] items-center justify-between flex border-[0.5px] border-transparent border-b-[#E6E6E6] '
								>
									<h2 className='sodo400 text-[0.835rem] tracking-[-0.28px]  '>
										{item_data.name}
									</h2>

									<Button
										onClick={() => {
											handleRemoveItemFromCategory(data.name, item_data);
										}}
									>
										<h2 className='normal-case text-[#F01C1C] sodo700 tracking-[-0.24px] text-[0.75rem] '>
											Remove
										</h2>
									</Button>
								</div>
							))
						)}
					</CustomLabel>
				</MenuModal>
			)}
		</GridLayout>
	);
};

export default CategoriesPage;
