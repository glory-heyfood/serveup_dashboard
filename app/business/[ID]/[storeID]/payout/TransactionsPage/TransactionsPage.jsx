import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "../GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";

import InterTextComp from "@/components/InterTextComp";
import DashBtn from "@/components/buttons/DashBtn";
import CustomSelect from "@/components/CustomSelect";
import { options } from "@/data";
import CustomSearch from "@/components/CustomSearch";
import StickyHeadTable from "./Table";
import Modal from "@/components/modal/Modal";
import AccountDetails from "../AccountDetails";
import LabelInput from "@/components/label/LabelInput";
import LabelText from "@/components/label/LabelText";
import Success from "@/components/Success";

const TransactionsPage = () => {
	const showModal = useSelector((state) => state.modal.showModal);
	const showEarnModal = useSelector((state) => state.modal.showEarnModal);
	const [showEmptyState, setShowEmptyState] = useState(false);
	const [data, setData] = useState({});
	const [withdrawSuccessful, setWithdrawSuccessful] = useState(false);

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(toggleModal(true));
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
	return (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div className='mb-[2.5rem]'>
				<div className='mb-[2rem]'>
					<BreadCrumb main='Payout' link='Transactions' />
				</div>

				<div className='mb-[2rem]'>
					<InterTextComp header='Your Balance' text={`₦ 334,500`} />
					<div className='mt-[1.5rem] w-fit '>
						<DashBtn
							text='Withdraw'
							padding='11px 27px'
							handleClick={handleClick}
						/>
					</div>

					<div className='flex space-x-[0.75rem] items-center mt-[2rem]'>
						<CustomSelect
							defaultValue='Sort by'
							option={options}
							selectedValue=''
						/>
						<CustomSearch placeholder='Search ' handleChange={() => {}} />
					</div>
				</div>

				<StickyHeadTable />
			</div>

			{showModal && (
				<Modal
					header='Withdraw from wallet'
					btnText={withdrawSuccessful ? "none" : "Withdraw"}
					handleClick={() => {
						setWithdrawSuccessful(true);
					}}
				>
					{withdrawSuccessful ? (
						<div className='flex items-center justify-center flex-col space-y-[5.5rem]'>
							<Success
								header='Withdraw Successful'
								subHeader='Your funds has been successfully transfered to your bank'
							/>
							<div className='w-fit'>
								<DashBtn
									text='Done'
									padding='11px 105px'
									handleClick={() => {
										dispatch(toggleModal(false));
                                        setWithdrawSuccessful(false)
									}}
								/>
							</div>
						</div>
					) : (
						<div className='flex flex-col space-y-[2rem]'>
							<div>
								<AccountDetails
									color='text-[#072A85]'
									bgColor='bg-[#F1F5FF]'
									name='FALOLA ELIZABETH PETERSON'
									account='0108890453 - ACCESS BANK'
									borderColor='border-[#DCE6FF]'
								/>
							</div>
							<div>
								<LabelInput
									label={
										<LabelText label='Enter Amount' fontWeight='sodo700' />
									}
									padding='15px 16px'
								>
									<span className='inter600 text-[0.825rem]'>₦</span>
									<input className='border-none outline-none text-black sodo700 text-[0.825rem] tracking-[-0.56px]    ' />
								</LabelInput>
							</div>
						</div>
					)}
				</Modal>
			)}
		</GridLayout>
	);
};

export default TransactionsPage;
