import BreadCrumb from "@/components/BreadCrumb";
import EmptyState from "@/components/EmptyState";
import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "../GridComponent";
import { bankIconBig } from "@/SVGs";
import AddBankAccount from "./AddBankAccount";
import AccountDetails from "../AccountDetails";
import CustomLabel from "@/components/label/CustomLabel";
import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import AutomaticWithdraw from "./AutomaticWithdraw";

const BankAccountPage = () => {
	const [showAddBankAccout, setShowAddBankAccount] = useState(false);
	const [showEmptyState, setShowEmptyState] = useState(false);
    const [withdrawalProcess, setWithdrawalProcess] = useState("")
    const [automaticPayoutInterval, setAutomaticPayoutInterval] = useState("")

    const hanldleWithdrawalProcess = (item) =>{
        setWithdrawalProcess(item)
    }



	return showAddBankAccout ? (
		<AddBankAccount
			handleClose={() => {
				setShowAddBankAccount(false);
			}}
		/>
	) : (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div>
				<div className='mb-[2rem]'>
					<BreadCrumb main='Payout' link='Bank Account' />
					<button
						onClick={() => {
							setShowEmptyState(!showEmptyState);
						}}
					>
						toggle
					</button>
				</div>

				{showEmptyState ? (
					<EmptyState
						header='Add your bank account'
						text='Link your bank account for withdrawals'
						btnText='Add bank account'
						icon={bankIconBig}
						handleClick={() => {
							setShowAddBankAccount(true);
						}}
					/>
				) : (
					<div className='flex flex-col space-y-[2.5rem] w-full  lg:w-[70%] '>
						<AccountDetails
							name='FALOLA ELIZABETH PETERSON'
							account='0108890453 - ACCESS BANK'
                            edit={true}
						/>
						<CustomLabel header='How will you like to process withdrawals?'>
							<div className='flex flex-col py-[1.5rem] px-[1rem] space-y-[1rem] border border-[#E6E6E6] rounded-[8px]'>
								<RadioDiscountPicker
                                itemSelected={withdrawalProcess}
                                handleItemClick={hanldleWithdrawalProcess}
									header='Automatic'
									subHeader='Process earnings automatically into my bank account'
									headerClass='text-[0.8rem] sodo600 tracking-[-0.52px'                                    
								>
                                    <AutomaticWithdraw getAutomaitcIntervalValue={(value)=>{setAutomaticPayoutInterval(value)}} />
                                </RadioDiscountPicker>
								<RadioDiscountPicker
                                itemSelected={withdrawalProcess}
                                handleItemClick={hanldleWithdrawalProcess}
									header='Manually'
									subHeader='I will manually withdraw earnings into my bank account'
									headerClass='text-[0.8rem] sodo600 tracking-[-0.52px'
								/>
							</div>
						</CustomLabel>
					</div>
				)}
			</div>
		</GridLayout>
	);
};

export default BankAccountPage;
