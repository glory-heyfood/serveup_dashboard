import GridLayout from "@/components/GridLayout";
import React, { useEffect, useState } from "react";
import GridComponent from "../GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import EmptyState from "@/components/EmptyState";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import StoreHeader from "@/components/StoreHeader";
import { shieldIcon } from "@/SVGs";
import AddNewModifiers from "./AddNewModifiers";
import FadeLoad from "@/components/loaders/FadeLoader";
import {
	deleteModifier,
	getAllModifiers,
	deleteModifierFromWeb,
} from "@/redux/features/stores/menuSlice";
import VerticalDotMenu from "@/components/VerticalDotMenu";

const ModifiersPage = () => {
	const [showAddNewModfiers, setShowAddNewModifiers] = useState(false);
	const [showEmptyState, setShowEmptyState] = useState(false);
	const [editData, setEditData] = useState();
	const modifiersData = useSelector((state) => state.menu.modifiersData);
	const dataLoading = useSelector((state) => state.menu.dataLoading);

	const [data, setData] = useState({});

	const dispatch = useDispatch();
	const handleClick = () => {
		setEditData();
		setShowAddNewModifiers(true);
	};
	const handleEdit = (index, data) => {
		console.log(data);
		setShowAddNewModifiers(true);
		setEditData(data);
		const dat = {
			data: data,
		};
		setData(dat);
	};

	const handleClose = () => {
		setShowAddNewModifiers(false);
	};

	const handleDeleteModifier = (payload) => {
		// This functions deletes a category from the DB
		dispatch(deleteModifier(payload));
		// This function deletes the categories from web
		dispatch(deleteModifierFromWeb(payload));
	};

	useEffect(() => {
		const menu_id = JSON.parse(
			window.localStorage.getItem("serveup_store"),
		)?.menu_id;
		dispatch(getAllModifiers(menu_id));
	}, []);

	return showAddNewModfiers ? (
		<AddNewModifiers handleClose={handleClose} editData={editData} />
	) : (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div className='mb-[1.5rem] md:mb-[2rem]'>
				<BreadCrumb main='Menu' link='Modifiers' />
			</div>

			{dataLoading ? (
				<FadeLoad />
			) : modifiersData?.length === 0 ? (
				<EmptyState
					header='No Modifiers'
					text='Customers can use modifiers to customize their meals'
					btnText='Add new modifier'
					handleClick={handleClick}
					icon={shieldIcon}
				/>
			) : (
				<div>
					<StoreHeader
						header='Modifiers'
						subHeader='Modifiers help customers modify their orders'
						btnText='Create new modifier'
						handleClick={handleClick}
					/>

					<div className='mt-[1.75rem]'>
						{modifiersData?.map((data, i) => (
							<div
								key={i}
								className='py-[1rem] items-center justify-between flex border-[0.5px] border-transparent border-b-[#E6E6E6] '
							>
								<h2 className='sodo400 text-[0.75rem] tracking-[-0.24px]  '>
									{data?.name}
								</h2>

								<VerticalDotMenu
									handleDelete={handleDeleteModifier}
									data={data}
									handleEdit={handleEdit}
									index={data?.id}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</GridLayout>
	);
};

export default ModifiersPage;
