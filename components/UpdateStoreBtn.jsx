import React, { useEffect, useState } from "react";
import DashBtn from "./buttons/DashBtn";
import { listenForStorageChanges, setItemWithEvent } from "@/utils";
import { doorClosedIcon } from "@/SVGs";
import { useDispatch } from "react-redux";
import {
	updateStoreIsOpenObj,
	updateStoreIsOpenObjWeb,
} from "@/redux/features/business/storeSlice";

const UpdateStoreBtn = ({ setShowModal }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState();
	const [open, setOpen] = useState();

	useEffect(() => {
		updateIsOpen();
	}, []);

	const updateIsOpen = () => {
		const isOpen = JSON.parse(localStorage.getItem("store_isOpen"));
		setOpen(isOpen.status);
	};

	listenForStorageChanges(updateIsOpen, "store_isOpen");

	const handleClick = () => {
		setLoading(true);
		const payload = {
			isOpen: {
				status: true,
				message: "Your store is currently open",
				referenceDate: "",
			},
			id: JSON.parse(window.localStorage.getItem("serveup_store"))?.id,
		};
		dispatch(updateStoreIsOpenObj(payload))
			.unwrap()
			.then((res) => {
				if (res) {
					dispatch(updateStoreIsOpenObjWeb(payload.isOpen));
					setLoading(false);
				}
			});
	};

	return (
		<div>
			{open ? (
				<DashBtn
					lightTheme={true}
					text='Close Store'
					icon={doorClosedIcon("black")}
					handleClick={() => {
						setShowModal(true);
					}}
					padding='9px 16px'
				/>
			) : (
				<DashBtn
					text='Open Store'
					icon={doorClosedIcon("white")}
					btnLoading={loading}
					handleClick={() => {
						handleClick();
					}}
					padding='9px 16px'
				/>
			)}
		</div>
	);
};

export default UpdateStoreBtn;
