// InStock.js
import React, { useState } from "react";
import { Switch } from "@mui/material";
import Modal from "./modal/Modal";
import RadioCheck from "./RadioCheck";
import SetTime from "./SetTime";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const InStock = () => {
	const [isInStock, setIsInStock] = useState(false);
	const showModal = useSelector((state) => state.modal.showModal);
    const dispatch = useDispatch()

	const handleSwitchChange = () => {
		setIsInStock((prev) => !prev);
        if(isInStock === true) {
            dispatch(toggleModal(true))
        }
	};

	return (
		<div className='flex items-center space-x-2'>
			<label className='flex items-center cursor-pointer'>
				<Switch
					checked={isInStock}
					onChange={handleSwitchChange}
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
					className={`ml-2 text-sm font-medium ${
						isInStock ? "text-green-500" : "text-red-500"
					}`}
				>
					{isInStock ? "In Stock" : "Out of Stock"}
				</span>
			</label>

			{showModal && (
				<div className='w-screen h-screen fixed bg-[#00000038] top-0 left-0  '>
					<Modal
						header='How long should chicken sandwich be out of stock?'
						btnText='Apply'
					>
						<div
							className='flex items-center justify-between py-[1.5rem]'
							style={{
								boxShadow: "0px 0.5px 0px 0px #E6E6E6",
							}}
						>
							<div className='flex items-center space-x-2'>
								{" "}
								<RadioCheck />
								<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
									set time
								</h2>
							</div>
							<SetTime />
						</div>

						<div
							className='flex items-center justify-between py-[1.5rem]'
							style={{
								boxShadow: "0px 0.5px 0px 0px #E6E6E6",
							}}
						>
							<div className='flex items-center space-x-2'>
								{" "}
								<RadioCheck />
								<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
									End of the day
								</h2>
							</div>
							<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
								Until 12:00 AM
							</h2>
						</div>

						<div className='flex items-center justify-between py-[1.5rem]'>
							<div className='flex items-center space-x-2'>
								{" "}
								<RadioCheck />
								<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
									Indefinitely
								</h2>
							</div>
							<h2 className='text-black sodo400 tracking-[-0.28px] text-[0.825rem]'>
								Unitl manually reactivated
							</h2>
						</div>
					</Modal>
				</div>
			)}
		</div>
	);
};

export default InStock;
