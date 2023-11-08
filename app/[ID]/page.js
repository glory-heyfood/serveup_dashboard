// import DashLayout from "@/components/DashLayout";
// import React from "react";

// const Page = () => {
// 	return (
// 		<DashLayout>
// 			<div className=" py-[40px] ">
//                 <h1 className="dashHeader">New Orders</h1>
//             </div>
// 		</DashLayout>
// 	);
// };

// export default Page;

// pages/about.js
"use client";
import DashLayout from "@/components/DashLayout";
import { useEffect, useState } from "react";
let WINDOW;

if (typeof window !== "undefined") {
	WINDOW = window;
}

const Page = () => {
	const [subRoute, setSubRoute] = useState(WINDOW?.location.hash.substr(1));
	const [Content, setContent] = useState();
	const [hashChange, setHashChange] = useState(false);

	const handleHashChange = () => {
		const newSubRoute = WINDOW?.location.hash.substr(1);
		console.log(newSubRoute);
		setSubRoute(newSubRoute);
		setHashChange(!hashChange);
	};

	useEffect(() => {
		// Add a hash change event listener to handle sub-route changes
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			// Clean up the event listener
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	const renderContent = () => {
		switch (subRoute) {
			case "/blog":
				return <Blog />; // Render your custom Blog component
			// Add other sub-routes and handling logic as needed
			default:
				return <DefaultContent />;
		}
	};

	const DefaultContent = () => (
		<div>
			<h2>About Page Default Content</h2>
			<a href='#/blog'>Go to Blog</a>
		</div>
	);

	const Blog = () => (
		<div>
			<h2>Custom Blog Component</h2>
			{/* Add your custom Blog component content here */}
		</div>
	);

	useEffect(() => {
		const cont = renderContent();
		setContent(cont);
	}, [hashChange]);

	return (
		<DashLayout>
			<div>
				<h1>About Page</h1>
				{Content}
			</div>
		</DashLayout>
	);
};

export default Page;
