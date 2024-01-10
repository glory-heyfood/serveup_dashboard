"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionsPage from "./TransactionsPage/TransactionsPage";
import BankAccountPage from "./BankAccountPage/BankAccountPage";

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
			case "/transactions":
				return <TransactionsPage />;
			case "/bank_account":
				return <BankAccountPage />;
            // case "/modifiers":
			// 	return <ModifiersPage />;
		}
	};

    useEffect(()=>{        
        console.log(WINDOW?.location.hash.substr(1))
        setSubRoute(WINDOW?.location.hash.substr(1))
        setShow(true)
    }, [])

    // If u reload  it throws hydration error so i am using show to make sure it calls the render function after initial render and this avoided the error on reload
	return <div>{Show && renderContent()}</div>;
};

export default Page;
