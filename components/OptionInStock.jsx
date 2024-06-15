// InStock.js
import React, { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import Modal from "./modal/Modal";
import RadioCheck from "./RadioCheck";
import SetTime from "./SetTime";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import DashBtn from "./buttons/DashBtn";
import { XIcon } from "@/SVGs";
import {
	updateItemStock,
	updateItemStockWeb,
} from "@/redux/features/stores/menuSlice";
import { checkItemStock } from "@/utils";

const OptionInStock = ({
	data,
	setClearSelectedData,
	type,
	optionData,
	setSelectedData,
	setData,
	handleOutOfStock,
	clearSelectedData,
	selectedData,
}) => {
	const [isInStock, setIsInStock] = useState(true);
	const showModal = useSelector((state) => state.modal.showModal);
	const [referenceDate, setReferenceDate] = useState();
	const [messageToShow, setMessageToShow] = useState("");
	const [selectedOption, setSelectedOption] = useState();
	const [updatedData, setUpdatedData] = useState();
	const dispatch = useDispatch();
	const btnLoading = useSelector((state) => state.menu.loading);

	const handleSelectOption = (name) => {
		setSelectedOption(name);
	};

	const handleSwitchChange = (isInStock) => {
		// setIsInStock((prev) => !prev);
		const message = checkItemStock(selectedData?.in_stock);

		// console.log(selectedData);

		// console.log(message);

        console.log(isInStock)

		if (isInStock) {
			dispatch(toggleModal(true));
		} else {
			// const payload = {
			// 	in_stock_obj: {
			// 		status: true,
			// 		reference_date: "",
			// 		message: "In Stock",
			// 	},
			// };
			const in_stock = {
				status: true,
				reference_date: "",
				message: "In Stock",
			};

			handleOutOfStock(in_stock, selectedData);
			setUpdatedData(in_stock);
			setClearSelectedData(!clearSelectedData);
			// dispatch(updateItemStock(payload))
			// 	.unwrap()
			// 	.then((res) => {
			// 		if (res) {
			// 			setIsInStock((prev) => !prev);
			// 			dispatch(
			// 				updateItemStockWeb({
			// 					id: data?.id,
			// 					in_stock_obj: payload.in_stock_obj,
			// 				}),
			// 			);
			// 		}
			// 	});
		}
	};

	const handleOverlayClick = (e) => {
		if (e.target.classList.contains("overlay")) {
			if (setClearSelectedData) {
				setClearSelectedData(!clearSelectedData);
			}
			dispatch(toggleModal(false));
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
		setMessageToShow("Until tomorrow");
		setReferenceDate(endOfDay);
	};

	const setIndefinitedly = () => {
		setReferenceDate("");
		setMessageToShow("Indefinitely");
	};

	const handleApply = () => {
		// const payload = {
		// in_stock_obj: {
		// 	status: false,
		// 	reference_date: referenceDate,
		// 	message: messageToShow,
		// },
		// 	item_id: selectedData.id,
		// };
		// if (data === selectedData) {
		// 	setIsInStock(false);
		// }
		// console.log(payload, selectedData);
		// setUpdatedData(payload);
		// dispatch(updateItemStock(payload))
		// 	.unwrap()
		// 	.then((res) => {
		// 		if (res) {
		// 			dispatch(
		// 				updateItemStockWeb({
		// 					id: selectedData.id,
		// 					in_stock_obj: payload.in_stock_obj,
		// 				}),
		// 			);
		// dispatch(toggleModal(false));
		// dispatch(
		// 	toggleModal({
		// 		modal: "earn",
		// 		payload: false,
		// 	}),
		// );
		// 			if (setClearSelectedData) {
		// 				setClearSelectedData(!clearSelectedData);
		// 			}
		// 			setSelectedOption();
		// 		}
		// 	});

		const in_stock_obj = {
			status: false,
			reference_date: referenceDate,
			message: messageToShow,
		};

		console.log(in_stock_obj, selectedData.option_name);

		handleOutOfStock(in_stock_obj, selectedData);

		setUpdatedData({
			in_stock: in_stock_obj,
			option_name: selectedData.option_name,
		});

		setClearSelectedData(!clearSelectedData);

		dispatch(toggleModal(false));
		dispatch(
			toggleModal({
				modal: "earn",
				payload: false,
			}),
		);
	};

	useEffect(() => {
		const message = checkItemStock(optionData?.in_stock);
		if (message === "In stock") {
			setIsInStock(true);
		} else {
			setIsInStock(optionData?.in_stock?.status);
		}
	}, [optionData]);

	return (
		<div className='flex items-center space-x-2 stock'>
			<label className='flex items-center cursor-pointer stock'>
				<Switch
					className='stock'
					checked={isInStock}
					onChange={() => {
						handleSwitchChange(isInStock);
					}}
					sx={{
						"& .MuiSwitch-thumb": {
							color: isInStock ? "#4CAF50 !important" : "#FF0000", // Thumb (circle) color
						},
						"& .MuiSwitch-track": {
							backgroundColor: isInStock ? "#4CAF50 !important" : "#FF0000", // Track (rectangle) color
						},
					}}
				/>
				<span
					className={`ml-2 text-[0.75rem] sodo400 tracking-[-0.48px] stock ${
						isInStock ? "text-green-500" : "text-red-500"
					}`}
				>
					{checkItemStock(
						updatedData?.option_name === optionData?.option_name
							? updatedData?.in_stock
							: optionData?.in_stock,
					)}
				</span>
			</label>

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
							<h1 className='text-black text-[18px] sodo700 tracking-[-0.72px]'>
								How long should {selectedData?.option_name} be out of stock
							</h1>

							<span
								className=' flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
								onClick={() => {
									if (setClearSelectedData) {
										console.log("sseel");
										setClearSelectedData(!clearSelectedData);
									}
									dispatch(toggleModal(false));
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
								<SetTime handleTime={setTime} />
							</div>

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
									Until tomorrow
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
						</div>
						<div className='flex  md:justify-end px-[20px] md:px-[24px] mt-[24px] mb-[2.5rem]'>
							<div className='inline-block w-full md:w-fit'>
								<DashBtn
									text='Apply'
									padding='14px 32px'
									handleClick={handleApply}
									btnLoading={btnLoading}
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

export default OptionInStock;
