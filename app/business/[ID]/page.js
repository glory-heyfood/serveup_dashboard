
"use client";
import DashLayout from "@/components/Dashboard/DashLayout";
import React, { useState } from "react";
import NewOrderCard from "./NewOrderCard";
import EmptyState from "@/components/EmptyState";
import { Button } from "@mui/material";
import { shieldIcon } from "@/SVGs";

const Page = () => {
	const [showState, setShowState] = useState(true);
	return (
		<DashLayout>
			<div className=' w-full '>
				<h1 className='dashHeader '>New Orders</h1>

				{showState ? (
					<EmptyState
						header='No new orders'
                        icon={shieldIcon}
						text='New orders from all stores will appear here'
					/>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1em]  '>
						<NewOrderCard />
						<NewOrderCard />
						<NewOrderCard />
					</div>
				)}



                <Button variant="text"
                onClick={()=> {
                    setShowState(!showState)
                }}
                >
                    Click on me to toggle between states
                </Button>
			</div>
		</DashLayout>
	);
};

export default Page;
