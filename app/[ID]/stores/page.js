"use client";
import { plusIcon, shieldIcon } from "@/SVGs";
import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import DashLayout from "@/components/Dashboard/DashLayout";
import React, { useState } from "react";
import StoresItem from "./StoresItem";
import { Button } from "@mui/material";
import EmptyState from "@/components/EmptyState";
import AddStore from "./AddStore";

const Page = () => {
	const [showState, setShowState] = useState(true);
	const [showStore, setShowStore] = useState(false);
    const handleOpenStore = () => {
        setShowStore(true)
    }

    const handleCloseStore = () => {
        setShowStore(false)
    }

   const handleChange = (e) => {
        console.log(e.target.value)
    }

	return showStore ? (
		<AddStore handleClose={handleCloseStore} />
	) : (
		<DashLayout btn={true}>
			{showState ? (
				<div>
					<h1 className='dashHeader'>Stores</h1>
					<EmptyState
                        handleClick = {handleOpenStore}
						btnText='Add new store'
						header='No Stores'
						text='You have not added any store'
						icon={shieldIcon}
					/>
				</div>
			) : (
				<>
					<div className='flex flex-col space-y-[1.5em] md:space-y-0 md:flex-row  md:items-center justify-between mb-[1.5em] md:mb-[1.2em]'>
						<h1 className='dashHeader !mb-[0px]'>Stores</h1>
						<div className='inline-block w-fit'>
							<DashBtn
                                handleClick={handleOpenStore}
								icon={plusIcon}
								padding='7px 15px'
								text='Add new store'
							/>
						</div>
					</div>

					<CustomSearch placeholder='Search' fullWidth handleChange={handleChange} />

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
