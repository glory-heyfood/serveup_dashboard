"use client";
import DashHeader from "@/components/Dashboard/DashHeader";
import GridLayout from "@/components/GridLayout";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashBtn from "@/components/buttons/DashBtn";
import StoreHeader from "@/components/StoreHeader";
import InterTextComp from "@/components/InterTextComp";
import TextComp from "./TextComp";
import {
	backArrowIcon,
	bellIcon,
	bellIconBlue,
	calenderIconBlack,
	calenderIconWhiteBig,
	clockIconBlack,
	cookIconBlue,
	locationIcon,
	readyIconBlue,
} from "@/SVGs";
import KitchenOrderCard from "./KitchenOrderCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/modal/Modal";
import TimeComp from "./TimeComp";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import SetTime from "@/components/SetTime";
import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import LabelText from "@/components/label/LabelText";
import LabelTextarea from "@/components/label/LabelTextarea";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import { riderData } from "@/data";

const Page = () => {
	const [tab, setTab] = useState("Needs Action");
	const showModal = useSelector((state) => state.modal.showModal);
	const [readyOrderTime, setReadyOrderTime] = useState("");
	const [modalToShow, setModalToShow] = useState("");
	const [driver, setDriver] = useState();
	const [formData, setFormData] = useState({
		riderName: "",
		riderNumber: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const dispatch = useDispatch();

	const handleReadyOrderTime = (text) => {
		setReadyOrderTime(text);
	};

	const Numb = () => {
		<h2 className='text-black text-[13px] sodo400'>+234</h2>;
	};

	return (
		<GridLayout type='store' gridType='kitchen' tab={tab} setTab={setTab}>
			<div className='pb-[2rem]'>
				<span className='md:hidden bg-[#F0F0F0] h-[32px] w-[32px] rounded-[4px] flex items-center justify-center mb-[2rem]  '>
					{backArrowIcon}
				</span>
				<div className='flex items-center justify-between w-full'>
					<h1 className='text-black text-[1.25rem] sodo600 tracking-[-0.8px]'>
						Esther Sanusi
					</h1>
					<div className='md:flex items-center hidden  space-x-[0.75rem] '>
						<div className='w-fit'>
							<DashBtn
								lightTheme={true}
								text='Additional charge'
								handleClick={() => {
									setModalToShow("additional_charge");
									dispatch(toggleModal(true));
								}}
							/>
						</div>
						<div className='w-fit'>
							<DashBtn
								lightTheme={true}
								text='Refund'
								handleClick={() => {
									setModalToShow("refund");
									dispatch(toggleModal(true));
								}}
							/>
						</div>
						<div className='w-fit'>
							<DashBtn
								text='Cancel order'
								bgColor='#F01C1C !important'
								handleClick={() => {
									setModalToShow("cancel_order");
									dispatch(toggleModal(true));
								}}
							/>
						</div>
					</div>
				</div>
				<div className='bg-[#F0F3FC] rounded-[4px] py-[0.5rem] px-[0.75rem] w-fit'>
					<h3 className='text-[# text-[#072A85] ] sodo400 tracking-[-0.24px] text-[0.75rem]'>
						+2348064578212
					</h3>
				</div>

				<div className='mt-[1.25rem] mb-[0.825rem] w-full sm:w-[170px] '>
					<TextComp
						header='Delivery Address'
						subHeader='24, Akinyemi Street Akobo.Ibadan, Nigeria'
						fontSize='text-[0.825rem]'
						tracking='tracking-[-0.56px]'
					/>
				</div>

				<div className='flex flex-col md:flex-row  w-full justify-between md:items-center space-y-[1.25rem] md:space-y-0'>
					<div className='w-fit order-1'>
						<DashBtn
							text='View location on map'
							icon={locationIcon}
							lightTheme={true}
						/>
					</div>

					<div className='w-full md:w-fit order-4 md:order-2'>
						<div
							className='bg-[#FF5F00] flex items-center  space-x-[6px] py-[6px] px-[8px] '
							style={{
								borderTopLeftRadius: "4px",
								borderTopRightRadius: "4px",
							}}
						>
							<span> {calenderIconWhiteBig} </span>
							<h2 className='text-white sodo600 tracking-[-0.48px] text-[0.75rem]'>
								Scheduled for
							</h2>
						</div>
						<div
							className='border border-[#E6E6E6] border-t-transparent p-[8px]'
							style={{
								borderBottomLeftRadius: "4px",
								borderBottomRightRadius: "4px",
							}}
						>
							<h1 className='text-black tracking-[-0.48px] sodo400 text-[0.75rem] '>
								{" "}
								Sat 28 , Oct 2023 . 10:30AM{" "}
							</h1>
						</div>
					</div>

					{/* Buttons for mobile */}
					<div className='flex items-center md:hidden order-3 w-full md:w-fit space-x-[0.75rem]  '>
						<div className='w-fit'>
							<DashBtn
								lightTheme={true}
								text='Additional charge'
								handleClick={() => {
									setModalToShow("additional_charge");
									dispatch(toggleModal(true));
								}}
							/>
						</div>
						<div className='w-fit'>
							<DashBtn
								lightTheme={true}
								text='Refund'
								handleClick={() => {
									setModalToShow("refund");
									dispatch(toggleModal(true));
								}}
							/>
						</div>
						<div className='w-fit'>
							<DashBtn
								text='Cancel order'
								bgColor='#F01C1C !important'
								handleClick={() => {
									setModalToShow("cancel_order");
									dispatch(toggleModal(true));
								}}
							/>
						</div>
					</div>

					<div className='w-full md:w-fit flex space-x-[2rem] items-center order-2 md:order-3 '>
						<TextComp header='Order type' subHeader='Delivery' />
						<TextComp header='Order channel' subHeader='Mobile App' />
						<TextComp header='Order time' subHeader='11:33AM . 2 min ago' />
					</div>
				</div>

				<hr className='w-full h-[1px] bg-[#E6E6E6] mt-[2rem] mb-[1.5rem] ' />

				<div className='flex flex-col space-y-[1.5rem] w-full'>
					<div className='border border-[#E6E6E6] rounded-[4px] items-center justify-between flex py-[19px] px-[1.5rem] '>
						<div className='flex space-x-[0.5rem] items-center '>
							<span>
								{tab === "Needs Action"
									? bellIconBlue
									: tab === "Preparing"
									? cookIconBlue
									: readyIconBlue}
							</span>
							<h1 className='text-black sodo400 tracking-[-0.56px] text-[0.825rem]  '>
								{tab === "Needs Action"
									? "This is a new order"
									: tab === "Preparing"
									? "You are preaparing this order"
									: "This order is ready"}
							</h1>
						</div>

						<h1 className='sodo400 text-[0.825rem] tracking-[-0.56px] text-black'>
							{tab === "Needs Action"
								? ""
								: tab === "Preparing"
								? "Ready in"
								: "Ready since"}
							<span className='sodo700 text-[0.825rem] tracking-[-0.56px] text-black'>
								{" "}
								{tab === "Needs Action"
									? ""
									: tab === "Preparing"
									? " : 5 mins"
									: " : 2 mins ago"}{" "}
							</span>{" "}
						</h1>
					</div>

					<div className='flex flex-col space-y-[1rem] mt-[1.5rem] '>
						<KitchenOrderCard
							data={{
								name: "Chicken Sandwich",
								packs: "2 packs",
								amount: "3,500",
								orders: [
									{
										item: "Extra cheese",
										number: "2x",
									},
									{
										item: "Chicken",
										number: "1x",
									},
									{
										item: "Salted fries",
										number: "2x",
									},
								],
							}}
						/>
						<KitchenOrderCard
							data={{
								name: "Chicken Sandwich",
								packs: "2 packs",
								amount: "3,500",
								orders: [
									{
										item: "Extra cheese",
										number: "2x",
									},
									{
										item: "Chicken",
										number: "1x",
									},
									{
										item: "Salted fries",
										number: "2x",
									},
								],
							}}
						/>
					</div>

					<div className=' flex flex-col space-y-[0.5rem] mt-[2rem] w-full sm:w-[50%] lg:w-1/3 '>
						<div className='flex items-center justify-between'>
							<h1 className='text-black text-[0.75rem] tracking-[-0.48px] sodo700 '>
								Subtotal
							</h1>
							<h1 className='text-black text-[0.75rem] tracking-[-0.48px] inter600 '>
								₦4,800
							</h1>
						</div>
						<div className='flex items-center justify-between'>
							<h1 className='text-black text-[0.75rem] tracking-[-0.48px] sodo700 '>
								Delivery fee
							</h1>
							<h1 className='text-black text-[0.75rem] tracking-[-0.48px] inter600 '>
								₦500
							</h1>
						</div>
						<div className='flex items-center justify-between'>
							<h1 className='text-black text-[0.75rem] tracking-[-0.48px] sodo700 '>
								Total
							</h1>
							<h1 className='text-black text-[0.75rem] tracking-[-0.48px] inter600 '>
								₦5,300
							</h1>
						</div>
					</div>

					<div>
						{tab !== "Ready" && (
							<DashBtn
								text={
									tab === "Needs Action"
										? "I am making this order"
										: tab === "Preparing"
										? "This order is ready"
										: "This order has been delivered"
								}
								padding='12px 12px'
								handleClick={
									tab === "Needs Action"
										? () => {
												setModalToShow("ready_order");
												dispatch(toggleModal(true));
										  }
										: () => {
												setModalToShow("rider");
												dispatch(toggleModal(true));
										  }
								}
							/>
						)}
					</div>
				</div>

				{showModal &&
					(modalToShow === "ready_order" ? (
						<Modal header='When will this order be ready' btnText='Set time'>
							<div
								className='flex items-center flex-wrap  '
								style={{
									gap: "1rem",
								}}
							>
								<TimeComp
									handleClick={(text) => {
										handleReadyOrderTime(text);
									}}
									readyOrderTime={readyOrderTime}
									text='5 minutes'
								/>
								<TimeComp
									handleClick={(text) => {
										handleReadyOrderTime(text);
									}}
									readyOrderTime={readyOrderTime}
									text='10 minutes'
								/>
								<TimeComp
									handleClick={(text) => {
										handleReadyOrderTime(text);
									}}
									readyOrderTime={readyOrderTime}
									text='15 minutes'
								/>
								<TimeComp
									handleClick={(text) => {
										handleReadyOrderTime(text);
									}}
									readyOrderTime={readyOrderTime}
									text='20 minutes'
								/>
								<TimeComp
									handleClick={(text) => {
										handleReadyOrderTime(text);
									}}
									readyOrderTime={readyOrderTime}
									text='25 minutes'
								/>
								<TimeComp
									handleClick={(text) => {
										handleReadyOrderTime(text);
									}}
									readyOrderTime={readyOrderTime}
									text='30 minutes'
								/>
								<TimeComp
									handleClick={(text) => {
										handleReadyOrderTime(text);
									}}
									readyOrderTime={readyOrderTime}
									text='Other'
								/>
								<TimeComp
									handleClick={(text) => {
										handleReadyOrderTime(text);
									}}
									readyOrderTime={readyOrderTime}
									icon={calenderIconBlack}
									text='Date and time'
								/>
							</div>

							{readyOrderTime === "Other" && (
								<div className='mt-[2rem]'>
									<CustomLabel header='Set time'>
										<SetTime />
									</CustomLabel>
								</div>
							)}
						</Modal>
					) : modalToShow === "additional_charge" ? (
						<Modal header='Request additional charge' btnText='Request charge'>
							<div className='flex flex-col space-y-[1rem]'>
								<div>
									<LabelInput
										label={<LabelText label='Amount' fontWeight='sodo700' />}
										padding='15px 16px'
									>
										<span className='inter600 text-[0.825rem]'>₦</span>
										<input
											className='border-none outline-none text-black sodo300 text-[0.825rem] tracking-[-0.56px] placeholder:text-[#A9ADB5]  '
											placeholder='0'
										/>
									</LabelInput>
								</div>

								<LabelTextarea
									label='Reason'
									placeholder='Reason for additional charge'
								/>
							</div>
						</Modal>
					) : modalToShow === "refund" ? (
						<Modal header='Make refund' btnText='Make refund'>
							<div className='flex flex-col space-y-[1rem]'>
								<div>
									<LabelInput
										label={<LabelText label='Amount' fontWeight='sodo700' />}
										padding='15px 16px'
									>
										<span className='inter600 text-[0.825rem]'>₦</span>
										<input
											className='border-none outline-none text-black sodo300 text-[0.825rem] tracking-[-0.56px] placeholder:text-[#A9ADB5]  '
											placeholder='0'
										/>
									</LabelInput>
								</div>

								<LabelTextarea label='Reason' placeholder='Reason for refund' />
							</div>
						</Modal>
					) : modalToShow === "rider" ? (
						<Modal header='Delivery rider' btnText='none'>
							<div className='mt-[-1rem]'>
								<h1 className='text-[0.825rem] sodo600 tracking-[-0.28px] text-black'>
									Enter the contact details of the delivery rider
								</h1>
								<h3 className='text-[#5F6370] sodo400 text-[0.75rem] '>
									This will be provided to the customer
								</h3>

								<div className='flex flex-col space-y-[1rem] mt-[1.25rem] '>
									<LabelSearchInput
										label='Name'
										placeholder='Name'
										name='riderName'
										value={formData.riderName}
										handleChange={handleChange}
									/>
									<LabelSearchInput
										value={formData.riderNumber}
										name='riderNumber'
										handleChange={handleChange}
										label='Phone number'
										icon={<Numb />}
										placeholder='Phone number'
									/>
								</div>

								<div className='border-[0.78px] border-transparent border-t-[#E6E6E6]  pt-[1.25rem] mt-[1.5rem] '>
									<h2 className='text-black sodo600 text-[0.75rem] tracking-[-0.24px] mb-[0.5rem]'>
										Previously used
									</h2>

									<div className=' w-fit grid grid-cols-2 gap-[0.5rem]'>
										{riderData.map((data) => (
											<div
												className={`py-[0.5rem] px-[0.75rem] ${
													driver === data ? "bg-[#072A85]" : "bg-[#F2F2F2]"
												} rounded-[4px] w-[175px] cursor-pointer capitalize `}
												onClick={() => {
													setDriver(data);
													setFormData((prevData) => ({
														...prevData,
														riderName: data.name,
														riderNumber: data.number,
													}));
												}}
											>
												<h1
													className={`text-[10px] sodo400 tracking-[-0.2px] ${
														driver === data ? "text-white" : "text-black"
													} `}
												>
													{data.name} . {data.number}
												</h1>
											</div>
										))}
									</div>
								</div>

								<div className='mt-[2.5rem]'>
									<DashBtn
										text='Continue'
										disabled={
											formData.riderName === "" || formData.riderNumber === ""
										}
										padding='11px 15px'
									/>
								</div>
							</div>
						</Modal>
					) : (
						<Modal
							header='cancel order'
							btnText='Cancel order'
							btnColor='#F01C1C !important'
						>
							<div className='flex flex-col space-y-[1.5rem]'>
								<div className='bg-[#FFEFE6] flex items-center justify-center w-full py-[0.5rem] px-[10px] '>
									<h2 className='text-[#FF5F00]'>
										Cancelling this order will automatically refund the customer{" "}
									</h2>
								</div>

								<LabelTextarea
									label='Reason'
									placeholder='Reason for cancelling order'
								/>
							</div>
						</Modal>
					))}
			</div>
		</GridLayout>
	);
};

export default Page;
