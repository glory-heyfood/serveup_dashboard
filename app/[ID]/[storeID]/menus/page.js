"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CategoriesPage from "./categories/CategoriesPage";
import ItemsPage from "./items/ItemsPage";
import ModifiersPage from "./modifiers/ModifiersPage";
let WINDOW;

if (typeof window !== "undefined") {
	WINDOW = window;
}

const Page = () => {
	const [subRoute, setSubRoute] = useState(WINDOW?.location.hash.substr(1));
	const [Show, setShow] = useState(false);

    const loyaltyGrid = useSelector(
		(state) => state.gridSidebar.showLoyaltyGridSidebar,
	);

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
			case "/categories":
				return <CategoriesPage />;
			case "/items":
				return <ItemsPage />;
            case "/modifiers":
				return <ModifiersPage />;
		}
	};

    useEffect(()=>{        
        console.log(WINDOW?.location.hash.substr(1))
        setSubRoute(WINDOW?.location.hash.substr(1))
        setShow(true)
    }, [loyaltyGrid])

    // If u reload  it throws hydration error so i am using show to make sure it calls the render function after initial render and this avoided the error on reload
	return <div>{Show && renderContent()}</div>;
};

export default Page;
