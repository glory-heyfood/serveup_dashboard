import Link from "next/link";
import React from "react";

const SidebarItem = ({ icon, href, text }) => {
	return (
		<Link href={href} className="h-[80px]">
			<div className='flex flex-col items-center space-y-[0.5em] '>                
				<div className='bg-[#F0F0F0] rounded-[8px] p-[0.75em]'>
					<span>{icon}</span>
				</div>
				<h1 className='text-[0.75em] sodoReg font-[400] tracking-[-0.24px] text-center '>
					{text}
				</h1>
                

			</div>

            
		</Link>
	);
};

export default SidebarItem;
