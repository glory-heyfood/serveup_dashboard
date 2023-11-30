import { toggleLoyaltyGridSidebar, toggleMarketingGridSidebar } from "@/redux/features/gridSidebarSlice";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SidebarItem = ({ icon, href, text, noClick }) => {
	const dispatch = useDispatch();
    const [url, setUrl] = useState('')

    // useEffect(()=>{
    //     if(!noClick){
    //         if (text === "Marketing") {
    //             dispatch(toggleMarketingGridSidebar(true));
    //         }

    //         if (text === "Loyalty rewards") {
    //             setUrl(window.location.href)
    //         }
    //     }
    // },[])

	return (
		<Link
			href={href}
			className='h-[81px]'
			onClick={() => {
				!noClick && dispatch(toggleSidebar(true));

				if (text === "Marketing") {
					dispatch(toggleMarketingGridSidebar(true));
				}

                if (text === "Loyalty rewards") {
					dispatch(toggleLoyaltyGridSidebar(true));
				}
			}}

		>
			<div className='flex flex-col items-center space-y-[0.6em] '>
				<div className='bg-[#F0F0F0] rounded-[8px] p-[0.75em]'>
					<span>{icon}</span>
				</div>
				<h1 className='text-[0.75em] sodo600 tracking-[-0.34px] text-center leading-[17px] '>
					{text}
				</h1>
			</div>
		</Link>
	);
};

export default SidebarItem;
