import React, { useEffect, useState } from "react";
import Modal from "./modal/Modal";
import RadioCheck from "./RadioCheck";
import SetTime from "./SetTime";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import DashBtn from "./buttons/DashBtn";
import { XIcon, doorClosedIcon } from "@/SVGs";
import {
	updateItemStock,
	updateItemStockWeb,
} from "@/redux/features/stores/menuSlice";
import { checkItemStock } from "@/utils";
import {
	updateStoreIsOpenObj,
	updateStoreIsOpenObjWeb,	
} from "@/redux/features/business/storeSlice";

const StoreStatus = ({
	data,
	setClearSelectedData,
	type,
	setSelectedData,
	clearSelectedData,
	selectedData,
	isOpen,
	setIsOpen,
	name,
	setMessage,
	showModal,
	setShowModal,
}) => {
	const [open, setOpen] = useState(true);

	const [referenceDate, setReferenceDate] = useState();
	const [messageToShow, setMessageToShow] = useState("");
	const [selectedOption, setSelectedOption] = useState();
	const [updatedData, setUpdatedData] = useState();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const handleSelectOption = (name) => {
		setSelectedOption(name);
	};

	const handleSwitchChange = () => {
		// setIsInStock((prev) => !prev);
		if (isInStock === true) {
			dispatch(toggleModal(true));
		} else {
			const payload = {
				in_stock_obj: {
					status: true,
					reference_date: "",
					message: "In Stock",
				},
				item_id: data.id,
			};
			setUpdatedData(payload);
			dispatch(updateItemStock(payload))
				.unwrap()
				.then((res) => {
					if (res) {
						setIsInStock((prev) => !prev);
						dispatch(
							updateItemStockWeb({
								id: data?.id,
								in_stock_obj: payload.in_stock_obj,
							}),
						);
					}
				});
		}
	};

	const handleOverlayClick = (e) => {
		if (e.target.classList.contains("overlay")) {
			if (setClearSelectedData) {
				setClearSelectedData(!clearSelectedData);
			}
			dispatch(toggleModal(false));
			setShowModal(false);
			setSelectedOption();
			dispatch(
				toggleModal({
					modal: "earn",
					payload: false,
				}),
			);
		}
	};

	const setTime = (date, message) => {
		setMessageToShow(message);
		setReferenceDate(date);
	};

	const setEndOfDay = () => {
		const endOfDay = new Date();
		endOfDay.setHours(23, 59, 59, 999);
		setMessageToShow("Your store is closed for the day");
		setReferenceDate(endOfDay);
	};

	const setIndefinitedly = () => {
		setReferenceDate("");
		setMessageToShow("Your store is closed indefinitely");
	};

	const handleApply = () => {
		setLoading(true);

		const payload ={
            isOpen: {
                status: false,
                referenceDate: referenceDate,
                message: messageToShow,
            },
            id: JSON.parse(window.localStorage.getItem("serveup_store"))?.id,
        }

		dispatch(updateStoreIsOpenObj(payload))
			.unwrap()
			.then((res) => {
				dispatch(updateStoreIsOpenObjWeb(payload.isOpen));
				setLoading(false);
				setShowModal(false);
			});
	};

	return (
		<div className='flex items-center space-x-2 stock'>
			{showModal && (
				<div
					className='w-screen h-screen fixed top-0 left-0  z-[355] flex item-center justify-center bg-[#00000023] !ml-[0px] md:pt-[2rem]  overlay'
					onClick={handleOverlayClick}
				>
					{/* <Modal
						header='How long should chicken sandwich be out of stock?'
						btnText='Apply'
					> */}
					<div className='bg-white rounded-[8px] w-full  md:max-w-[552px]  h-screen md:h-fit  '>
						<div
							className={`flex items-center justify-between px-[24px] py-[12px]
					}`}
							style={{
								boxShadow: "0px 1px 0px 0px #E6E6E6",
							}}
						>
							<div>
								<h3 className='sodo400 text-[0.825rem] tracking-[-0.28px] mb-[0.75rem] '>
									{name}
								</h3>
								<h1 className='text-black text-[18px] sodo700 tracking-[-0.72px]'>
									How long should this store be closed
								</h1>
							</div>

							<span
								className=' flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
								onClick={() => {
									if (setClearSelectedData) {
										console.log("sseel");
										setClearSelectedData(!clearSelectedData);
									}
									setSelectedOption();
									dispatch(toggleModal(false));
									setShowModal(false);
									dispatch(
										toggleModal({
											modal: "earn",
											payload: false,
										}),
									);
								}}
							>
								{XIcon}
							</span>
						</div>

						<div className='px-[1.5rem]'>
							<div
								className='flex items-center justify-between py-[1.5rem] cursor-pointer'
								style={{
									boxShadow: "0px 0.5px 0px 0px #E6E6E6",
								}}
								onClick={() => {
									handleSelectOption("End of the day");
									setEndOfDay();
								}}
							>
								<div className='flex items-center space-x-2'>
									{" "}
									<RadioCheck isChecked={"End of the day" === selectedOption} />
									<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
										End of the day
									</h2>
								</div>
								<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
									Until next opening time
								</h2>
							</div>

							<div
								className='flex items-center justify-between py-[1.5rem] cursor-pointer'
								onClick={() => {
									handleSelectOption("Indefinitely");
									setIndefinitedly();
								}}
							>
								<div className='flex items-center space-x-2'>
									{" "}
									<RadioCheck isChecked={"Indefinitely" === selectedOption} />
									<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
										Indefinitely
									</h2>
								</div>
								<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
									Unitl manually reactivated
								</h2>
							</div>

							<div
								className='flex items-center justify-between py-[1.5rem] '
								style={{
									boxShadow: "0px 0.5px 0px 0px #E6E6E6",
								}}
								onClick={() => {
									setSelectedOption("Set time");
								}}
							>
								<div className='flex items-center space-x-2'>
									{" "}
									<RadioCheck isChecked={"Set time" === selectedOption} />
									<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
										Set time
									</h2>
								</div>
								<SetTime handleTime={setTime} type='store' />
							</div>
						</div>
						<div className='flex  md:justify-end px-[20px] md:px-[24px] mt-[24px] mb-[2.5rem]'>
							<div className='inline-block w-full md:w-fit'>
								<DashBtn
									text='Apply'
									padding='14px 32px'
									handleClick={handleApply}
									btnLoading={loading}
								/>
							</div>
						</div>
					</div>
					{/* </Modal> */}
				</div>
			)}
		</div>
	);
};

export default StoreStatus;
