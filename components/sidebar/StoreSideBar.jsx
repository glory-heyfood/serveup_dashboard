import { sidebarData, storeSideBarData } from "@/data";
import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import {
	XIcon,
	clipBoardIcon,
	doorClosedIcon,
	rightArrIcon,
	storeIconBlack,
} from "@/SVGs";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";
import StoreSidebarItem from "./StoreSideBarItem";
import Status from "../Status";
import DashBtn from "../buttons/DashBtn";
import Modal from "../modal/Modal";
import StoreStatus from "../StoreStatus";
import UpdateStoreBtn from "../UpdateStoreBtn";
import { listenForStorageChanges } from "@/utils";
import { getSingleStore } from "@/redux/features/business/storeSlice";

const StoreSideBar = ({ btn }) => {
	const showSidebar = useSelector((state) => state.sidebar.showSidebar);
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState("Your store is currently open");
	const [open, setOpen] = useState(true);    
	const [id, setId] = useState();
	const [store, setStore] = useState();

	const updateId = () => {
		const ID = JSON.parse(window.localStorage.getItem("serveup_business"))?.id;
		setId(ID);
	};

	listenForStorageChanges(updateId, "serveup_business");

	const updateStore = () => {
		const data = JSON.parse(window.localStorage.getItem("serveup_store"));
		setStore(data);
	};

	listenForStorageChanges(updateStore, "serveup_store");

	useEffect(() => {		
		updateId();
		updateStore();
	}, []);


	return (
		<>
			<div
				className={`bg-[#00000096]  h-screen w-full fixed top-0 left-0 z-50 ${
					showSidebar ? "hidden" : "sidebarCont hidden"
				} `}
				onClick={() => {
					dispatch(toggleSidebar(true));
				}}
			></div>
			<div
				className={`bg-white  animate05s shrink-0  h-screen pt-[32px]  fixed top-0 left-0 z-[60] sidebar pr-[21px] pl-[20px] w-full md:w-[300px]  max-w-[300px] md:max-w-[300px]  pb-[2.5rem] overflow-scroll scroll-hidden   ${
					showSidebar ? "translate-x-[-100%]" : "translate-x-0  "
				} ${btn && " md:pt-[100px]"} `}
				style={{
					boxShadow: "1.1px 0px 0px 0px #E6E6E6",
				}}
			>
				<span
					className='sideXIcon flex items-center justify-center h-[32px] w-[32px] mb-[32px] absolte top-[32px] left-[32px] cursor-pointer '
					onClick={() => {
						dispatch(toggleSidebar(true));
					}}
				>
					{XIcon}
				</span>

				<div className='flex items-center justify-center p-[0.825rem] flex-col border border-[#E6E6E6] rounded-[4px] mb-[1.25rem]'>
					<div className='flex items-center justify-between w-full'>
						<div className='flex items-center space-x-[4px]'>
							<span>{clipBoardIcon}</span>
							<h1 className='sodo700 text-[0.75rem] tracking-[-0.24px] text-[#072A85]'>
								Setup Guide{" "}
							</h1>
						</div>
						<span> {rightArrIcon("#072A85")} </span>
					</div>

					<h1 className='text-[#5F6370] text-[0.75rem] sodo400 tracking-[-0.48px] '>
						Complete these steps to setup your store
					</h1>
				</div>

				<div className='mb-[0.825rem] flex items-center space-x-[0.5rem] pt-[11px] pb-[13px] pl-[16px] border border-[#E6E6E6] rounded-[4px] '>
					<span>{storeIconBlack}</span>
					<h3 className='text-[0.875rem] tracking-[-0.28px] sodo700'>
						{store?.name}
					</h3>
				</div>

				<div className='mb-[2rem] '>
					<Status message={message} isOpen={open} id={id} />
				</div>

				<div className=' grid grid-cols-3 gap-x-[1.5em]  gap-y-[1.5em]'>
					{storeSideBarData.map((data, i) => (
						<StoreSidebarItem
							href={`/business/${id}/${store?.id}${data.href}`}
							icon={data.icon}
							text={data.text}
							bgColor={data.bgColor}
							key={i}
						/>
					))}
				</div>

				<div className='mt-[5rem] w-full'>
					<UpdateStoreBtn setShowModal={setShowModal} />
				</div>
			</div>

			<StoreStatus
				isOpen={open}
				setMessage={setMessage}
				setIsOpen={setOpen}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</>
	);
};

export default StoreSideBar;
