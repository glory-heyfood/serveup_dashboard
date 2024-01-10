import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function EmployeeAndCustomerLoader() {
	return (
		<div className='flex gap-[12px] ml-[32px] mb-[24px]'>
			{/* For variant="text", adjust the height via font-size */}
			<Skeleton variant='circular' width={40} height={40} />
			<div className="flex flex-col gap-[8px]">
				<Skeleton variant='rectangular' width={210} height={20} />
				<Skeleton variant='rectangular' width={100} height={20} />
			</div>
		</div>
	);
}
