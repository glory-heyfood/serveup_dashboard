import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "../GridComponent";
import EmptyState from "@/components/EmptyState";
import BreadCrumb from "@/components/BreadCrumb";
import { plusIcon, shieldIcon } from "@/SVGs";
import { useDispatch } from "react-redux";
import CustomSelect from "@/components/CustomSelect";
import { options } from "@/data";
import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import StickyHeadTable from "./Table";
import AddnewItems from "./AddnewItems";
import InStock from "@/components/InStock";

const ItemsPage = () => {
	const dispatch = useDispatch();
	const [showEmptyState, setShowEmptyState] = useState(false);
	const [showAddItems, setShowAddItems] = useState(false);
	const handleClick = () => {
		setShowAddItems(true)
	};
	const handleCloseAddItems = () => {
		setShowAddItems(false);
	};
	return showAddItems ? (
		<AddnewItems handleClose={handleCloseAddItems} />
	) : (
		<GridLayout GridComponent={<GridComponent />} type="store">
			<div className='mb-[1.5rem] md:mb-[2rem]'>
				<BreadCrumb main='Menu' link='Items' />				
			</div>

			{showEmptyState ? (
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
								option={options}
								selectedValue=''
							/>
							<CustomSearch placeholder='Search ' handleChange={() => {}} fullWidth />
						</div>

						<div className='w-fit order-1 md:order-2 mb-[1.5rem] md:mb-0 '>
							<DashBtn icon={plusIcon} text='Add new Item' handleClick={handleClick} padding='7px 15px' />
						</div>
					</div>

					<StickyHeadTable />
				</div>
			)}
		</GridLayout>
	);
};

export default ItemsPage;
