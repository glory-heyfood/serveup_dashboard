import { searchIconLarge } from "@/SVGs";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import EmptyState from "@/components/EmptyState";
import OuterModal from "@/components/modal/OuterModal";
import React, { useState } from "react";
import DiscountSelectModalItem from "./DiscountSelectModalItem";
import { Button } from "@mui/material";

const DiscountSelectItemsModal = () => {
	const [selectedValue, setSelectedValue] = useState("");
	const [show, setShow] = useState(false);
	return (
		<OuterModal header='Select Items' minHeight='min-h-[477px]'>
			<div className='flex flex-col space-y-[32px]'>
				<div className='flex space-x-[12px] w-full'>
					<div className='w-full'>
						<CustomSearch placeholder='Search items' fullWidth />
					</div>
				</div>

				{show ? (
					<EmptyState
						icon={searchIconLarge}
						header='No search result'
                        text='Search for an item to select it'
					/>
				) : (
					<div>
						<h3 className='sodo700'>Selected Items:</h3>

						<div className=''>
							<DiscountSelectModalItem
								header='Chicken Sandcwich'
								subHeader='500'
							/>
							<DiscountSelectModalItem
								header='Chicken Sandcwich'
								subHeader='500'
							/>
						</div>
					</div>
				)}

				<Button
					onClick={() => {
						setShow(!show);
					}}
				>
					show
				</Button>
			</div>
		</OuterModal>
	);
};

export default DiscountSelectItemsModal;
