import { toggleGridSidebar } from "@/redux/features/gridSidebarSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const SidebarItem = ({ icon, href, text }) => {
    const dispatch = useDispatch()
    
	return (
		<Link href={href} className="h-[81px]"
        onClick = {()=> {            
            if(text==="Marketing"){                
                dispatch(toggleGridSidebar(true))
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
