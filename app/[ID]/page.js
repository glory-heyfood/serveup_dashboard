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
			<h2>Dashboard Page Default Content</h2>
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
		
			<div>
				<h1>Welcome to the dashboard Page</h1>
				{Content}
			</div>
		
	);
};

export default Page;
