import ComponentModalLayout from "@/components/ComponentModalLayout";
import StoreHeader from "@/components/StoreHeader";
import DashBtn from "@/components/buttons/DashBtn";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import { options } from "@/data";
import React, { useState } from "react";
import Success from "@/components/Success";

const AddBankAccount = ({ handleClose }) => {
	const [success, setSuccess] = useState(false);

	return (
		<ComponentModalLayout handleClose={handleClose}>
			{success ? (
				<div className='flex items-center justify-center w-full'>
					<Success
						header='Bank account added'
						subHeader='Your bank account has been successfully added to your store'
						btnText='Continue'
						handleClick={handleClose}
					/>
				</div>
			) : (
				<div className='w-full px-[20px] pb-[32px]'>
					<div className='mb-[2rem]'>
						<StoreHeader
							header='Add your bank account'
							subHeader='Add your bank account where you want your withdrawn funds to return to'
						/>
					</div>
					<div className='flex flex-col space-y-[2em]'>
						<CustomLabel header='Enter Account Number'>
							<LabelSearchInput
								label='Account Number'
								width='w-[35%]'
								fontweight='sodo700'
								placeholder='Account number'
							/>
						</CustomLabel>

						<CustomLabel header='Select Bank'>
							<LabelSelect
								label='Select Bank'
								defaultValue='Select Bank'
								selectedValue=''
								option={options}
							/>
						</CustomLabel>

						<CustomLabel header='Account Name'>
							<LabelSearchInput
								label='Account Name'
								width='w-[35%]'
								fontweight='sodo700'
								value='FALOLA ELIZABETH PETERSON'
								inputFont='sodo700'
							/>
						</CustomLabel>

						<div className='w-fit'>
							<DashBtn
								text='Add bank account'
								padding='11px 24px'
								handleClick={() => {
									setSuccess(true);
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</ComponentModalLayout>
	);
};

export default AddBankAccount;
