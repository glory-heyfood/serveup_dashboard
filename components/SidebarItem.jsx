import Link from "next/link";
import React from "react";

const SidebarItem = ({ icon, href, text }) => {
	return (
		<Link href={href} className="h-[80px]">
			<div className='flex flex-col items-center space-y-[8px] '>                
				<div className='bg-[#F0F0F0] rounded-[8px] p-[12px]'>
					<span>{icon}</span>
				</div>
				<h1 className='text-[12px] font-[400] tracking-[-0.24px] text-center '>
					{text}
				</h1>
                

			</div>

            
		</Link>
	);
};

export default SidebarItem;
