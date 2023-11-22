import { XIcon } from "@/SVGs";
import React from "react";
import DashBtn from "./Dashboard/DashBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const Modal = ({ btn, header, children, minHeight }) => {
	const dispatch = useDispatch();

	const handleOverlayClick = (e) => {
		if (e.target.classList.contains("overlay")) {
			dispatch(toggleModal(false));
			dispatch(
				toggleModal({
					modal: "earn",
					payload: false,
				}),
			);
		}
	};

	return (
		<div
			className='fixed flex justify-center pt-[87px] bg-[#00000067] top-0 left-0 z-[55] overflow-y-auto scroll-hidden h-screen w-full overlay pb-[40px]'
			onClick={handleOverlayClick}
		>
			<div
				className={` rounded-[8px]  bg-white z-[60] w-[90%] max-w-[552px] pb-[32px] h-fit ${minHeight} `}
			>
				<div
					className={`flex items-center justify-between ${
						btn ? "px-[24px] py-[10px]" : "px-[12px] py-[12px]"
					}`}
				>
					{btn ? (
						<span
							className=' flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
							onClick={() => {
								toggleModal(false);
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
					) : (
						<div></div>
					)}
					<h1 className='text-black text-[18px] sodo700 tracking-[-0.72px]'>
						{header}
					</h1>
					{btn ? (
						<DashBtn text={btn} padding='9px 24px' />
					) : (
						<span
							className=' flex items-center justify-center h-[32px] w-[32px] cursor-pointer '
							onClick={() => {
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
					)}
				</div>
				<div className='mt-[40px] px-[40px] '>{children}</div>

				<div className='flex justify-end px-[40px] mt-[24px]'>
					<div className='inline-block w-fit'>
						<DashBtn text='Save' padding='14px 32px' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
