import { uploadPhotoIcon } from "@/SVGs";
import React from "react";

const UploadImage = () => {
	return (
		<div className='border border-[#E6E6E6] flex items-center justify-center h-[210px]  rounded-[8px] '>
			<div className='flex flex-col space-y-[8px] items-center '>
				<span>{uploadPhotoIcon}</span>
				<h2 className='text-[#7E8493] sodo400 tracking-[-0.52px] text-[13px] '>
					Drag & drop or{" "}
					<span className='sodo700 text-[#072A85]'>choose file</span> to upload
				</h2>
				<h2 className='text-[#7E8493] sodo300 tracking-[-0.48px] text-[12px] '>
					Maximum file size: 1MB
				</h2>
				<h2 className='text-[#7E8493] sodo300 tracking-[-0.48px] text-[12px] '>
					JPG or PNG
				</h2>
			</div>
		</div>
	);
};

export default UploadImage;
