import { XIcon } from "@/SVGs";
import React from "react";
import DashBtn from "../buttons/DashBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const Modal = ({
	btn,
	header,
	children,
	minHeight,
	maxWidth,
	handleClick,
	btnLoading,
	btnText,
    btnColor,
}) => {
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
			className='fixed flex justify-center md:pt-[87px] bg-[#00000067] top-0 left-0 z-[55] overflow-y-auto scroll-hidden h-screen w-full overlay md:pb-[40px]'
			onClick={handleOverlayClick}
		>
			<div
				className={` rounded-[8px]  bg-white z-[60] w-screen md:w-[90%] h-screen overflow-y-auto scroll-hidden md:h-fit ${
					maxWidth ? maxWidth : "md:max-w-[552px]"
				} pb-[32px]  ${minHeight} `}
			>
				<div
					className={`flex items-center justify-between ${
						btn ? "px-[24px] py-[10px]" : "px-[12px] py-[12px]"
					}`}
					style={{
						boxShadow: "0px 1px 0px 0px #E6E6E6",
					}}
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
						<span className='w-fit'>
							<DashBtn text={btn} padding='9px 24px' />
						</span>
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
				<div className='mt-[40px] px-[20px] md:px-[40px] '>{children}</div>

				{!btn && (
					<div className='flex  md:justify-end px-[20px] md:px-[40px] mt-[24px]'>
						<div className='inline-block w-full md:w-fit'>
							{btnText !== "none" && (
								<DashBtn
									text={btnText ? btnText : "Save"}
                                    bgColor={btnColor}
									padding='14px 32px'
									handleClick={handleClick}
									btnLoading={btnLoading}
								/>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;
