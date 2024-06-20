"use client";
import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "./GridComponent";
import EmptyState from "@/components/EmptyState";
import { noBannerIcon, plusIcon } from "@/SVGs";
import { Button } from "@mui/material";
import BreadCrumb from "@/components/BreadCrumb";
import DashBtn from "@/components/buttons/DashBtn";
import BannerCard from "./BannerCard";
import BannerModal from "./BannerModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const BannerPage = () => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const modal = useSelector((state) => state.modal.showModal);

	return (
		<GridLayout GridComponent={<GridComponent />}>
			<BreadCrumb main='Mobile App' link='Banners' />
			{show ? (
				<div className='mt-[32px]'>
					<EmptyState
						header='No Banners'
						text='You have not created any banners in the mobile app'
						btnText='Add new banner'
						icon={noBannerIcon}
                        handleClick={()=>{
                            dispatch(toggleModal(true))
                        }}
					/>
				</div>
			) : (
				<div className='mt-[24px]'>
					<div className='flex justify-start  md:justify-end w-full'>
						<span className='w-fit'>
							<DashBtn icon={plusIcon} text='Add new banner' handleClick={()=>{
                                dispatch(toggleModal(true))
                            }} />
						</span>
					</div>
					{/*  */}
					<div className='  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px] mt-[24px]'>
						<BannerCard
							header='50 off all orders'
							text='Get Amazing deals of up to 50% OFF across all our stores'
							color='bg-[#7A16FC]'
						/>
						<BannerCard
							header='50 off all orders'
							text='Get Amazing deals of up to 50% OFF across all our stores'
							color='bg-[#F01C1C]'
						/>{" "}
						<BannerCard
							header='50 off all orders'
							text='Get Amazing deals of up to 50% OFF across all our stores'
							color='bg-[#06AE68]'
						/>{" "}
						<BannerCard
							header='50 off all orders'
							text='Get Amazing deals of up to 50% OFF across all our stores'
							color='bg-[#FFA310]'
						/>{" "}
						<BannerCard
							header='50 off all orders'
							text='Get Amazing deals of up to 50% OFF across all our stores'
							color='bg-[#072A85]'
						/>{" "}
						<BannerCard
							header='50 off all orders'
							text='Get Amazing deals of up to 50% OFF across all our stores'
							color='bg-[#FF5F00]'
						/>{" "}
						<BannerCard
							header='50 off all orders'
							text='Get Amazing deals of up to 50% OFF across all our stores'
							color='bg-black'
						/>
					</div>
				</div>
			)}

			<Button
				onClick={() => {
					setShow(!show);
				}}
			>
				Toggle
			</Button>
			{modal && <BannerModal />}
		</GridLayout>
	);
};

export default BannerPage;
