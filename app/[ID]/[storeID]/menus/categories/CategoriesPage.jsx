import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
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

const CategoriesPage = () => {
	const showModal = useSelector((state) => state.modal.showModal);
	const showEarnModal = useSelector((state) => state.modal.showEarnModal);
	const [showEmptyState, setShowEmptyState] = useState(false);
	const [data, setData] = useState({});

	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(toggleModal(true));
	};
	const handleEdit = (index, data) => {
		setData({});
		const dat = {
			index,
			name: data,
		};
		setData(dat);
		dispatch(
			toggleModal({
				modal: "earn",
				payload: true,
			}),
		);
	};
	return (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div className=' mb-[1.5rem] md:mb-[2rem]'>
				<BreadCrumb main='Menu' link='Categories' />			
			</div>

			{showEmptyState ? (
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
						<CategoriesItem
							name='Intercontinental meals'
							handleEdit={handleEdit}
							i={0}
						/>
						<CategoriesItem
							name='African meals'
							handleEdit={handleEdit}
							i={1}
						/>
						<CategoriesItem
							name='Healthy meals'
							handleEdit={handleEdit}
							i={2}
						/>
						<CategoriesItem
							name='Pastries & Baked foods'
							handleEdit={handleEdit}
							i={3}
						/>
						<CategoriesItem
							name='Chops and Snacks'
							handleEdit={handleEdit}
							i={4}
						/>
					</div>
				</div>
			)}

			{showModal && (
				<Modal header='Create new category'>
					<LabelSearchInput label='Category Name' placeholder='category name' />
				</Modal>
			)}

			{showEarnModal  && (
				<MenuModal header={data.name} btn={true}>
					<CustomLabel header='All Items in this category'>
						{[
							"Chicken Pasta",
							"Fish and Chips",
							"Yamarita",
							"Tuna Sandwish",
							"Turkey wings",
						].map((name, i) => (
							<div
								key={i}
								className='py-[1rem] items-center justify-between flex border-[0.5px] border-transparent border-b-[#E6E6E6] '
							>
								<h2 className='sodo400 text-[0.835rem] tracking-[-0.28px]  '>
									{name}
								</h2>

								<Button>
									<h2 className='normal-case text-[#F01C1C] sodo700 tracking-[-0.24px] text-[0.75rem] '>
										Remove
									</h2>
								</Button>
							</div>
						))}
					</CustomLabel>
				</MenuModal>
			)}
		</GridLayout>
	);
};

export default CategoriesPage;
