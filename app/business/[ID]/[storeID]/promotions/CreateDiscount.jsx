"use client";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import CustomLabel from "@/components/label/CustomLabel";
import React, { useState } from "react";
import DiscountTab from "./DiscountTab";
import { deliveryIcon, itemIcon, orderIcon } from "@/SVGs";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelTextarea from "@/components/label/LabelTextarea";
import LabelDiscount from "@/components/label/LabelDiscount";
import LabelSelectLocations from "@/components/label/LabelSelectLocations";
import SwitchPicker from "@/components/SwitchPicker";
import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import DashBtn from "@/components/buttons/DashBtn";
import DiscountSelectItems from "@/components/discount/DiscountSelectItems";

const CreateDiscount = ({ handleClose }) => {
	const [selectedDiscountTab, setSelectedDiscountTab] = useState(null);
	const [discountType, setDiscountType] = useState("Amount");
	const [radioItemSelected, setRadioItemSelected] = useState("");
	const handleDiscountClick = (type) => {
		setDiscountType(type);
	};

	const handleRadioItemSelected = (type) => {
		setRadioItemSelected(type);
	};

	return (
		<ComponentModalLayout handleClose={handleClose}>
			<div className='w-full px-[20px] pb-[32px]'>
				<h1 className='dashHeader !mb-[32px] ml-[44px] md:ml-0'>
					Create new discount
				</h1>
				<div className='flex flex-col space-y-[2em]'>
					<CustomLabel header='Select discount type'>
						<div className='flex flex-col md:flex-row md:space-x-[16px] space-y-[0.75rem] md:space-y-0 md:items-center w-full'>
							<DiscountTab
								selected={selectedDiscountTab}
								setSelected={setSelectedDiscountTab}
								icon={
									selectedDiscountTab === "Order discount"
										? orderIcon("#072A85")
										: orderIcon("black")
								}
								text='Order discount'
							/>
							<DiscountTab
								selected={selectedDiscountTab}
								setSelected={setSelectedDiscountTab}
								icon={
									selectedDiscountTab === "Delivery discount"
										? deliveryIcon("#072A85")
										: deliveryIcon("black")
								}
								text='Delivery discount'
							/>
							<DiscountTab
								selected={selectedDiscountTab}
								setSelected={setSelectedDiscountTab}
								icon={
									selectedDiscountTab === "Item discount"
										? itemIcon("#072A85")
										: itemIcon("black")
								}
								text='Item discount'
							/>
						</div>
					</CustomLabel>

					{selectedDiscountTab !== null && (
						<div className='space-y-[2em] flex flex-col '>
							<div className='flex space-y-[16px] flex-col'>
								<LabelSearchInput
									label='Discount name'
									placeholder='Discount name'
									fontweight='sodo600'
								/>
								<LabelTextarea
									label='Description'
									placeholder='Role description'
									fontweight='sodo600'
								/>
								<LabelDiscount
									value={""}
									discountType={discountType}
									handleClick={handleDiscountClick}
									fontweight='sodo600'
								/>
								<LabelSelectLocations showLabel={false} fontweight='sodo600' />

                                {
                                    selectedDiscountTab === 'Item discount' && (<DiscountSelectItems label='Apply to Items' />)
                                }
							</div>

							<div className='flex space-y-[16px] flex-col'>
								<SwitchPicker
									fontweight='sodo600'
									header='Maximum discount value'
									text='What is the highest amount per order you wish to give as discount?'
								/>
								<SwitchPicker
									fontweight='sodo600'
									header='Minimum order amount'
									text='The minimum order amount to qualify for a discount'
								/>
								<SwitchPicker
									fontweight='sodo600'
									header='Minimum order count'
									text='How many orders should a customer have to use this promo?'
								/>
								<SwitchPicker
									fontweight='sodo600'
									header='Usage limit'
									text='How many times can a customer use this discount?'
								/>
								<SwitchPicker
									fontweight='sodo600'
									header='Date range'
									text='Set the start date and end date for this discount'
								/>
							</div>

							<CustomLabel header='How will this discount be applied'>
								<div className="border border-[#E6E6E6] rounded-[8px] py-[1.5rem] px-[1rem] flex flex-col space-y-[1rem]">
                                <RadioDiscountPicker
									handleItemClick={handleRadioItemSelected}
									header='Automatic'
									itemSelected={radioItemSelected}
									subHeader='Automatically apply this discount on all qualified customers'
								/>
								<RadioDiscountPicker
									handleItemClick={handleRadioItemSelected}
									itemSelected={radioItemSelected}
									header='Discount code'
									subHeader='Customers will apply a discount code on checkout'
								/>
                                </div>
							</CustomLabel>

							<span className='w-fit'>
								<DashBtn text='Save' padding='11px 70px' />
							</span>
						</div>
					)}
				</div>
			</div>
		</ComponentModalLayout>
	);
};

export default CreateDiscount;
