import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { loaderData } from "@/data";
import { FadeLoader } from "react-spinners";

export default function FadeLoad() {
	return (
		<div className='flex items-center justify-center w-full h-[70%]  '>
			<FadeLoader color="#072A85" />
		</div>
	);
}
