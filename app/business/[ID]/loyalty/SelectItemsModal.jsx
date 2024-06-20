import { searchIconLarge } from "@/SVGs";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import EmptyState from "@/components/EmptyState";
import OuterModal from "@/components/modal/OuterModal";
import React, { useState } from "react";
import SelectModalItem from "./SelectModalItem";

const SelectItemsModal = () => {
	const [selectedValue, setSelectedValue] = useState("");
	return (
		<OuterModal header='Select Items' minHeight='min-h-[477px]'>
			<div className="flex flex-col space-y-[32px]">
				<div className='flex space-x-[12px] w-full'>
					{/* <CustomSelect
						selectedValue={selectedValue}
						defaultValue='Select categories'
						handleChange={(e) => setSelectedValue(e.target.value)}
						options={[{ label: "All categories", value: "allCategories" }]}
					/> */}

					<div className='w-full'>
						<CustomSearch placeholder='Search items' fullWidth />
					</div>
				</div>

                {/* <EmptyState icon={searchIconLarge} header="Search for an item to select it" /> */}

                <div>
                    <h3 className="sodo700">Selected Items:</h3>

                    <div className="">
                        <SelectModalItem header="Chicken Sandcwich" subHeader="500" />
                        <SelectModalItem header="Chicken Sandcwich" subHeader="500" />
                    </div>
                </div>
			</div>
		</OuterModal>
	);
};

export default SelectItemsModal;
