import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "../GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import { plusIcon } from "@/SVGs";
import { Switch } from "@mui/material";
import Modal from "@/components/modal/Modal";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelectLocations from "@/components/label/LabelSelectLocations";
import LabelSwitchSelect from "@/components/label/LabeSwitchSelect";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import CreateQrCodePage from "./CreateQrCodePage";

const SectionsPage = () => {
	const dispatch = useDispatch();
	const showModal = useSelector((state) => state.modal.showModal);
    const [showQrCodePage, setShowQrCodePage] = useState(false)

	return showQrCodePage ? (
		<CreateQrCodePage handleClose={()=>{setShowQrCodePage(false)}} />
	) : (
		<GridLayout GridComponent={<GridComponent />} type='store'>
			<div>
				<BreadCrumb main='Dine-In' link='Sections' />
				<div className='flex items-center justify-between mt-[2rem]'>
					<CustomSearch placeholder='Search' />
					<span className='w-fit'>
						<DashBtn
							icon={plusIcon}
							text='Create new section'
							padding='7px 15px'
							handleClick={() => {
								dispatch(toggleModal(true));
							}}
						/>
					</span>
				</div>

				<table className='w-full mt-[2rem]'>
					<thead className='w-full'>
						<tr
							className='w-full'
							style={{
								boxShadow: " 0px 1px 0px 0px #F0F0F0",
							}}
						>
							<th className='py-[0.75rem] w-[25%] '>
								{" "}
								<h1 className='text-[0.75rem] sodo600 tracking-[-0.24px] text-left '>
									{" "}
									Section{" "}
								</h1>{" "}
							</th>
							<th className='py-[0.75rem] w-[10%] '>
								{" "}
								<h1 className='text-[0.75rem] sodo600 tracking-[-0.24px] text-left '>
									{" "}
									Tables{" "}
								</h1>{" "}
							</th>
							<th className='py-[0.75rem] w-[30%] '>
								{" "}
								<h1 className='text-[0.75rem] sodo600 tracking-[-0.24px] text-left '>
									{" "}
									Item Categories{" "}
								</h1>{" "}
							</th>
							<th className='py-[0.75rem] w-[10%] '></th>
							<th className='py-[0.75rem] w-[15%] '></th>
							<th className='py-[0.75rem] w-[10%] '></th>
						</tr>
					</thead>

					<tbody>
						<tr
							className=''
							style={{
								boxShadow: "0px 0.5px 0px 0px #E6E6E6",
							}}
						>
							<td className='text-black py-[1.5rem] text-[0.75rem] sodo400 tracking-[-0.24px]  '>
								Section 1
							</td>
							<td className='text-black py-[1.5rem] text-[0.75rem] sodo400 tracking-[-0.24px]  '>
								8
							</td>
							<td className='text-black py-[1.5rem] text-[0.75rem] sodo400 tracking-[-0.24px]  '>
								All categories
							</td>
							<td className='py-[1.5rem]'>
								<Switch />
							</td>
							<td className='py-[1.5rem]'
                            onClick={()=>{setShowQrCodePage(true)}}
                            >
								<h2 className='text-[#072A85] cursor-pointer sodo600 text-[0.75rem] tracking-[-0.24px] '>
									Create QR Codes
								</h2>
							</td>
							<td className='py-[1.5rem]'>
								<h2 className='text-[#072A85] cursor-pointer sodo600 text-[0.75rem] tracking-[-0.24px] '>
									Edit
								</h2>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{showModal && (
				<Modal header='Create Ordering Section'>
					<div className='flex space-y-[1rem] flex-col'>
						<LabelSearchInput
							width='md:w-[30%]'
                            fontweight="sodo700"
							label='Section name'
							placeholder='Section name'
						/>
						<LabelSwitchSelect
							labelWidth='md:w-[30%]'
							textLabel='Categories'
							labelHeader='Select all categories'
							data={[
								"intercontental meals",
								"African meals",
								"Healthy meals",
								"Pastries & Baked foods",
								"Chops and Snacks",
							]}
						/>
					</div>
				</Modal>
			)}
		</GridLayout>
	);
};

export default SectionsPage;
