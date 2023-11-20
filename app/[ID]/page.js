// "use client";
// import DashLayout from "@/components/DashLayout";
// import { useEffect, useState } from "react";
// let WINDOW;

// if (typeof window !== "undefined") {
// 	WINDOW = window;
// }

// const Page = () => {
// 	const [subRoute, setSubRoute] = useState(WINDOW?.location.hash.substr(1));
// 	const [Content, setContent] = useState();
// 	const [hashChange, setHashChange] = useState(false);

// 	const handleHashChange = () => {
// 		const newSubRoute = WINDOW?.location.hash.substr(1);
// 		console.log(newSubRoute);
// 		setSubRoute(newSubRoute);
// 		setHashChange(!hashChange);
// 	};

// 	useEffect(() => {
// 		// Add a hash change event listener to handle sub-route changes
// 		window.addEventListener("hashchange", handleHashChange);

// 		return () => {
// 			// Clean up the event listener
// 			window.removeEventListener("hashchange", handleHashChange);
// 		};
// 	}, []);

// 	const renderContent = () => {
// 		switch (subRoute) {
// 			case "/blog":
// 				return <Blog />; // Render your custom Blog component
// 			// Add other sub-routes and handling logic as needed
// 			default:
// 				return <DefaultContent />;
// 		}
// 	};

// 	const DefaultContent = () => (
// 		<div>
// 			<h2>Dashboard Page Default Content</h2>
// 			<a href='#/blog'>Go to Blog</a>
// 		</div>
// 	);

// 	const Blog = () => (
// 		<div>
// 			<h2>Custom Blog Component</h2>
// 			{/* Add your custom Blog component content here */}
// 		</div>
// 	);

// 	useEffect(() => {
// 		const cont = renderContent();
// 		setContent(cont);
// 	}, [hashChange]);

// 	return (
// 		<DashLayout>
// 			<div>
// 				<h1>Welcome to the dashboard Page</h1>
// 				{Content}
// 			</div>
// 		</DashLayout>
// 	);
// };

// export default Page;
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
