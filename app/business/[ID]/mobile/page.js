"use client";
import { useEffect, useState } from "react";
import OverviewPage from "./OverviewPage";
import FulfillmentPage from "./FulfillmentPage";
import BannerPage from "./BannerPage";
let WINDOW;

if (typeof window !== "undefined") {
	WINDOW = window;
}

const Page = () => {
	const [subRoute, setSubRoute] = useState(WINDOW?.location.hash.substr(1));
	const [Show, setShow] = useState(false);

	const handleHashChange = () => {
		const newSubRoute = WINDOW?.location.hash.substr(1);
		setSubRoute(newSubRoute);
	};

	useEffect(() => {
		window.addEventListener("hashchange", handleHashChange);
		window.addEventListener("reload", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	const renderContent = () => {
		switch (subRoute) {
			case "/overview":
				return <OverviewPage />;
			case "/fulfillment":
				return <FulfillmentPage />;
			case "/banner":
				return <BannerPage />;
		}
	};

	useEffect(() => {
		setSubRoute(WINDOW?.location.hash.substr(1));
		setShow(true);
	}, []);

	// If u reload  it throws hydration error so i am using show to make sure it calls the render function after initial render and this avoided the error on reload
	return <div>{Show && renderContent()}</div>;
};

export default Page;
