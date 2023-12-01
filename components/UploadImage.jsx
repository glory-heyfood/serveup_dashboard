/* eslint-disable @next/next/no-img-element */
import { XIconRed, editIcon, uploadPhotoIcon } from "@/SVGs";
import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";

const UploadImage = ({padding, border}) => {
	const [uploadedImage, setUploadedImage] = useState("");
	const fileInputRef = useRef(null);

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			const image = event.target.result;
			setUploadedImage(image);
		};

		reader.readAsDataURL(file);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleChangeImage = () => {
		// Trigger the file input click
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className='w-[210px]'>
			<label
				{...getRootProps()}
				className={`  ${border ? border : "border border-[#E6E6E6] " }   rounded-[8px] cursor-pointer flex items-center justify-center w-[210px]  ${uploadedImage === '' ? (padding ? padding : "py-[40px]") : ''} `}
			>
				<input {...getInputProps()} ref={fileInputRef} />
				{uploadedImage ? (
					<img
						src={uploadedImage}
						alt='Uploaded'
						className='h-[210px] w-[210px] object-cover rounded-[8px]'
					/>
				) : (
					<div className='flex flex-col space-y-[8px] items-center'>
						<span>{uploadPhotoIcon}</span>
						<h2 className='text-[#7E8493] sodo400 tracking-[-0.52px] text-[13px] text-center'>
							Drag & drop <br /> or{" "}
							<span className='sodo700 text-[#072A85]'>choose file</span> to
							upload
						</h2>
						<h2 className='text-[#7E8493] sodo300 tracking-[-0.48px] text-[12px]'>
							Maximum file size: 1MB
						</h2>
						<h2 className='text-[#7E8493] sodo300 tracking-[-0.48px] text-[12px]'>
							JPG or PNG
						</h2>
					</div>
				)}
			</label>

			{uploadedImage && (
				<div className='flex items-center justify-between mt-[16px]'>
					<div
						className='flex items-center space-x-[4px] cursor-pointer'
						onClick={handleChangeImage}
					>
						<span> {editIcon} </span>
						<h2 className='text-[#072A85] text-[12px] tracking-[-0.48px] sodo700'>
							Change Image
						</h2>
					</div>
					<div
						className='flex items-center space-x-[4px] cursor-pointer'
						onClick={() => {
							setUploadedImage("");
						}}
					>
						<span> {XIconRed} </span>
						<h2 className='text-[#F01C1C] text-[12px] tracking-[-0.48px] sodo700'>
							Remove Image
						</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default UploadImage;
