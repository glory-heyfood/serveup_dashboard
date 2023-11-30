import LabelInput from "@/components/label/LabelInput";
import Modal from "@/components/modal/Modal";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import React, { useState } from "react";
import EarningModalItems from "./EarningModalItems";
import SelectItemsModal from "./SelectItemsModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const Label = ({ label }) => {
	return <h1 className='text-[13px] sodo700 tracking-[-0.52px]  '>{label}</h1>;
};

// Please note i pass in a data when its edit

const EarningModel = ({data}) => {
	const [selectedValue, setSelectedValue] = useState("");
	const dispatch = useDispatch();
	const outerModal = useSelector((state) => state.modal.showOuterModal);

	const [formData, setFormData] = useState({
		customerEarn: data ? data.customerEarn : "",
		expiry: data ? data.expiry : "",
		customerSpends: data ? data.customerSpends : "",
		eligibleItems: data ? data.eligibleItems : "",
		itemSelected: data ? data.itemSelected : null,        
	});

   

	const setItemSelected = (data) => {
		setFormData((prev) => ({
			...prev,
			["itemSelected"]: data,
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSelectChange = (e) => {
		setSelectedValue(e.target.value);
	};
	return (
		<>
			<Modal header={data ? 'Edit earning rule' : 'Add new earning rule'} minHeight=''>
				<div className='flex flex-col space-y-[16px]'>
					<EarningModalItems
						data={formData}
						header='Order based'
						subHeader='Reward a customer everytime they place a order'
						index={1}
						itemSelected={formData.itemSelected}
						setItemSelected={setItemSelected}
					/>

					<EarningModalItems
						data={formData}
						header='Amount spent'
						subHeader='Reward a customer on amount spent on orders'
						index={2}
						itemSelected={formData.itemSelected}
						setItemSelected={setItemSelected}
					>
						<LabelSearchInput
							width='md:w-[34%]'
							inputFont='sodo400'
							name='customerSpends'
							value={formData.customerSpends}
							label={<Label label={`Everytime customers spend`} />}
							icon={<Label label='₦' />}
						/>
					</EarningModalItems>

					<EarningModalItems
						header='Item based'
						data={formData}
						subHeader='Reward a customer for purchasing a specific item'
						index={3}
						itemSelected={formData.itemSelected}
						setItemSelected={setItemSelected}
					>
						<LabelInput
							label={<Label label='Item' />}
							padding='13px 0px 16px 16px'
							width='md:w-[34%]'
						>
							<h1
								className='text-[#072A85] text-[13px] tracking-[-0.56px] sodo600 cursor-pointer'
								onClick={() => {
									dispatch(
										toggleModal({
											modal: "outer",
											payload: true,
										}),
									);
								}}
							>
								{formData.selectedItem !== ""
									? formData.selectedItem
									: "Select Items"}
							</h1>
						</LabelInput>
					</EarningModalItems>
				</div>
			</Modal>
			{outerModal && <SelectItemsModal />}
		</>
	);
};

export default EarningModel;
