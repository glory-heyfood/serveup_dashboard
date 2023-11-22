import Modal from "@/components/Modal";
import LabelInput from "@/components/label/LabelInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import React, { useState } from "react";

const Label = ({ label }) => {
	return <h1 className='text-[13px] sodo700 tracking-[-0.52px]  '>{label}</h1>;
};

const RewardModal = () => {
	const [selectedValue, setSelectedValue] = useState("");
	const [Discsel, setDiscSel] = useState("Amount");
	const handleSelectChange = (e) => {
		setSelectedValue(e.target.value);
	};
	return (
		<Modal header='Add New Reward' minHeight='min-h-[477px]'>
			<div className='flex flex-col space-y-[40px]'>
				<LabelSelect
					width='w-[26%]'
					selectedValue={selectedValue}
					label='Reward Type'
					defaultValue='Select reward type'
					handleChange={handleSelectChange}
					option={[
						{ text: "Order Discount", value: "OrderDiscount" },
						{ text: "Delivery Discount", value: "deliveryDiscount" },
					]}
				/>

				{selectedValue !== "" && (
					<div>
						<LabelInput
							width='w-[26%]'
							label={<Label label='Reward Value' />}
							padding='13px 0px 14px 16px'
						>
							<div className='flex pr-[16px]'>
								<input
									type='text'
									placeholder='0'
									className='outline-none flex-grow sodo400 tracking-[-0.52px] text-[13px]'
								/>
								<span className='text-[#818A98] sodo600 text-[13px] tracking-[-0.52px] text-right '>
									Points
								</span>
							</div>
						</LabelInput>
						<LabelInput
							label={<Label label='Discount' />}
							padding='13px 0px 14px 16px'
						>
							<div className='flex pr-[16px]'>
								<input
									type='text'
									placeholder='0'
									className='outline-none flex-grow sodo400 tracking-[-0.52px] text-[13px]'
								/>
								<div className=' flex space-x-[2px] '>
									<div
										className={`${
											Discsel === "Amount"
												? "border-[1.5px] border-[#4971D9] "
												: ""
										} rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
										onClick={() => {
											setDiscSel("Amount");
										}}
									>
										<h3
											className={`${
												Discsel === "Amount" ? "text-[#072A85] " : "text-black"
											} tracking-[-0.48px] text-[12px] sodo700 flex space-x-[4px]`}
										>
											<span className='sodo700'>₦</span> <span>Amount</span>
										</h3>
									</div>

									<div
										className={`${
											Discsel === "Percent"
												? "border-[1.5px] border-[#4971D9] "
												: ""
										} rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
										onClick={() => {
											setDiscSel("Percent");
										}}
									>
										<h3
											className={`${
												Discsel === "Percent" ? "text-[#072A85] " : "text-black"
											} tracking-[-0.48px] text-[12px] sodo600 flex space-x-[4px]`}
										>
											<span className='sodo700'>%</span> <span>Percent</span>
										</h3>
									</div>
								</div>
							</div>
						</LabelInput>
					</div>
				)}

				<LabelSearchInput
					width='w-[26%]'
					label='Reward Name'
					placeholder='Reward name'
					fontweight='sodo700'
                    inputFont="sodo400"
				/>
			</div>
		</Modal>
	);
};

export default RewardModal;
