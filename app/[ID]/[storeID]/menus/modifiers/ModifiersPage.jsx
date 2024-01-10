import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "../GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import EmptyState from "@/components/EmptyState";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import StoreHeader from "@/components/StoreHeader";
import { shieldIcon } from "@/SVGs";
import AddNewModifiers from "./AddNewModifiers";

const ModifiersPage = () => {
	const [showAddNewModfiers, setShowAddNewModifiers] = useState(false);
	const [showEmptyState, setShowEmptyState] = useState(false);
	const [data, setData] = useState({});

	const dispatch = useDispatch();
	const handleClick = () => {
		setShowAddNewModifiers(true);
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

	const handleClose = () => {
		setShowAddNewModifiers(false);
	};

	return showAddNewModfiers ? (
		<AddNewModifiers handleClose={handleClose}  />
	) : (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div className='mb-[1.5rem] md:mb-[2rem]'>
				<BreadCrumb main='Menu' link='Modifiers' />				
			</div>

			{showEmptyState ? (
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
						{[
							"Packaging",
							"Choice of protein",
							"Extra Portion",
							"Toppings",
							"Sides",
						].map((name, i) => (
							<div
								key={i}
								className='py-[1rem] items-center justify-between flex border-[0.5px] border-transparent border-b-[#E6E6E6] '
							>
								<h2 className='sodo400 text-[0.75rem] tracking-[-0.24px]  '>
									{name}
								</h2>
							</div>
						))}
					</div>
				</div>
			)}
		</GridLayout>
	);
};

export default ModifiersPage;
