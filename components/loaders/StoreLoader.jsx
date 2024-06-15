import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function StoreLoader() {
	const arr = [1, 2, 3, 4, 4, 5, 6, 7, 78, 8, 6, 5];
	return (
		<div className="flex flex-col space-y-[1rem]">
			{arr.map((arr, i) => (
				<div className='flex gap-[12px] ' key={i}>
					{/* For variant="text", adjust the height via font-size */}
					<Skeleton variant='rectangular' width={20} height={20} />
					<div className='flex flex-col gap-[8px]'>
						<Skeleton variant='rectangular' width={200} height={20} />
					</div>
				</div>
			))}
		</div>
	);
}
