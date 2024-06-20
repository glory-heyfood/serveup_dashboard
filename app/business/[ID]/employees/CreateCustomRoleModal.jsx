"use client";
import LabelInput from "@/components/label/LabelInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelText from "@/components/label/LabelText";
import Modal from "@/components/modal/Modal";
import React, { useState } from "react";

const CreateCustomRoleModal = () => {
	const [checkedAccess, setCheckedAccess] = useState({});

	const handleCheckboxChange = (Access) => {
		setCheckedAccess((prevCheckedAccess) => ({
			...prevCheckedAccess,
			[Access]: !prevCheckedAccess[Access],
		}));
	};

	const Access = [
		"Access",
		"Access1",
		"Access2",
		"Access3",
		"Access4",
		"Access5",
	];

	return (
		<Modal header='Create custom role' btn='Save'>
			<div className='flex flex-col space-y-[16px]'>
				<LabelSearchInput
					fontweight='sodo700'
					label='Role title'
					placeholder='Role title'
				/>
				<LabelInput
					padding='16px 0px 16px 16px'
					stretch={true}
					label={<LabelText label='Description' />}
				>
					<textarea
						placeholder='Role description'
						style={{ border: "none", outline: "none", resize: "none" }}
						className='scroll-hidden w-full placeholder:text-[#A9ADB5] placeholder:text-[13px] sodo300 border-none outline-none  tracking-[-0.52px] bg-transparent p-0 text-[13px] text-[#000] py-[16px]'
						rows='5'
					/>
				</LabelInput>
				<LabelInput
					stretch={true}
					padding='16px 0px 16px 16px'
					label={
						<h1 className='text-[13px] sodo700 tracking-[-0.52px]  '>
							{" "}
							Set access for this role{" "}
						</h1>
					}
				>
					<div className='flex space-y-[24px] flex-col'>
						<div className='py-[20px] flex flex-col space-y-[12px]'>
							<h1 className='text-[13px] sodo700 tracking-[-0.52px]'>
								New Orders
							</h1>

							<div className='flex flex-col space-y-[12px] '>
								{Access.map((data, i) => (
									<div
										key={i}
										className='flex items-center space-x-[1em] cursor-pointer'
										onClick={() => {
											handleCheckboxChange(data);
										}}
									>
										<span>
											<input type='checkbox' checked={checkedAccess[data]} />
										</span>
										<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]'>
											{data}
										</h2>
									</div>
								))}
							</div>
						</div>
						<div className='py-[20px] flex flex-col space-y-[12px]'>
							<h1 className='text-[13px] sodo700 tracking-[-0.52px]'>
								New Orders
							</h1>

							<div className='flex flex-col space-y-[12px] '>
								{Access.map((data, i) => (
									<div
										key={i}
										className='flex items-center space-x-[1em] cursor-pointer'
										onClick={() => {
											handleCheckboxChange(data);
										}}
									>
										<span>
											<input type='checkbox' checked={checkedAccess[data]} />
										</span>
										<h2 className='text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]'>
											{data}
										</h2>
									</div>
								))}
							</div>
						</div>
					</div>
				</LabelInput>
			</div>
		</Modal>
	);
};

export default CreateCustomRoleModal;
