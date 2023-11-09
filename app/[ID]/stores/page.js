"use client";
import { plusIcon, shieldIcon } from "@/SVGs";
import CustomTextField from "@/components/CustomTextField";
import DashBtn from "@/components/DashBtn";
import DashLayout from "@/components/DashLayout";
import React, { useState } from "react";
import StoresItem from "./StoresItem";
import { Button } from "@mui/material";
import EmptyState from "@/components/EmptyState";

const Page = () => {
	const [showState, setShowState] = useState(true);
	return (
		<DashLayout>
			{showState ? (
				<div>
					<h1 className='dashHeader'>Stores</h1>
					<EmptyState
						btnText='Add new stores'
						header='No Stores'
						text='You have not added any store'
						icon={shieldIcon}
					/>
				</div>
			) : (
				<>
					<div className='flex items-center justify-between mb-[1.5em]'>
						<h1 className='dashHeader !mb-[0px]'>Stores</h1>
						<div className='inline'>
							<DashBtn icon={plusIcon} text='Add new store' />
						</div>
					</div>

					<CustomTextField inputType='search' placeholder='Search' fullWidth />

					<div className='flex flex-col mt-[0.75em]'>
						<StoresItem text='Toasties - Ikeja' />
						<StoresItem text='Toasties - Ikoyi' />
						<StoresItem text='Toasties - Oniru' />
						<StoresItem text='Toasties - Victoria Island' />
						<StoresItem text='Toasties - Lekki' />
					</div>
				</>
			)}

			<Button
				variant='text'
				onClick={() => {
					setShowState(!showState);
				}}
			>
				Click on me to toggle between states
			</Button>
		</DashLayout>
	);
};

export default Page;
