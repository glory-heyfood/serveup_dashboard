"use client";
import { colorPickerIcon, starBlueIcon, checkIcon } from "@/SVGs";
import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import DashBtn from "./buttons/DashBtn";

const ColorPicker = ({ setSelectedColor }) => {
	const [color, setcolor] = useState("");
	const [colorPicked, setColorPicked] = useState("");
	const [colorPicker, setColorPicker] = useState(false);

	const colorPickerRef = useRef(null);

	const handleColorChange = (color) => {
		console.log(color);
		setcolor(color);
	};

	// const handleClickOutside = (event) => {
	// 	if (
	// 		colorPickerRef.current &&
	// 		!colorPickerRef.current.contains(event.target)
	// 	) {
	// 		// Click outside the ColorPicker component
	// 		setColorPicker(false);
	// 	}
	// };

	// useEffect(() => {
	// 	// Add global click event listener when component mounts
	// 	document.addEventListener("click", handleClickOutside);

	// 	// Remove the event listener when the component unmounts
	// 	return () => {
	// 		document.removeEventListener("click", handleClickOutside);
	// 	};
	// }, []); // Empty dependency array means the effect runs once when the component mounts

	return (
		<div className='flex flex-col space-y-[24px]'>
			<div className='border border-[#E6E6E6]  rounded-[8px] py-[17px] px-[24px] flex items-center justify-center  mb-[20px] w-fit space-x-[20px] '>
				{colorPicked !== "" ? (
					<div
						className={` cursor-pointer flex items-center justify-center  h-[38px] w-[38px] rounded-[8px] p-[2px] ${
							color === colorPicked && "border-[1.5px] border-[#072A85]"
						} `}
						onClick={() => {
							handleColorChange(colorPicked);
						}}
					>
						<div
							className={` cursor-pointer flex items-center justify-center  h-[32px] w-[32px] rounded-[8px]`}
							style={{
								backgroundColor: `${colorPicked}`,
							}}
						>
							{" "}
							{color === colorPicked && checkIcon}{" "}
						</div>
					</div>
				) : (
					<div
						className={` cursor-pointer flex items-center justify-center  h-[38px] w-[38px] rounded-[8px] p-[2px] ${
							color === "#F01C1C" && "border-[1.5px] border-[#072A85]"
						} `}
						onClick={() => {
							handleColorChange("#F01C1C");
						}}
					>
						<div
							className={` cursor-pointer flex items-center justify-center  h-[32px] w-[32px] bg-[#F01C1C] rounded-[8px]`}
						>
							{" "}
							{color === "#F01C1C" && checkIcon}{" "}
						</div>
					</div>
				)}
				<div
					className={` cursor-pointer flex items-center justify-center  h-[38px] w-[38px] rounded-[8px] p-[2px] ${
						color === "#9747FF" && "border-[1.5px] border-[#072A85]"
					} `}
					onClick={() => {
						handleColorChange("#9747FF");
					}}
				>
					<div
						className={` cursor-pointer flex items-center justify-center  h-[32px] w-[32px] bg-[#9747FF] rounded-[8px] `}
					>
						{" "}
						{color === "#9747FF" && checkIcon}{" "}
					</div>
				</div>
				<div
					className={` cursor-pointer flex items-center justify-center  h-[38px] w-[38px] rounded-[8px] p-[2px] ${
						color === "#136FFB" && "border-[1.5px] border-[#072A85]"
					} `}
					onClick={() => {
						handleColorChange("#136FFB");
					}}
				>
					<div
						className={` cursor-pointer flex items-center justify-center  h-[32px] w-[32px] bg-[#136FFB] rounded-[8px]`}
					>
						{" "}
						{color === "#136FFB" && checkIcon}{" "}
					</div>
				</div>
				<div
					className={` cursor-pointer flex items-center justify-center  h-[38px] w-[38px] rounded-[8px] p-[2px] ${
						color === "#FF5F00" && "border-[1.5px] border-[#072A85]"
					} `}
					onClick={() => {
						handleColorChange("#FF5F00");
					}}
				>
					<div
						className={` cursor-pointer flex items-center justify-center  h-[32px] w-[32px] bg-[#FF5F00] rounded-[8px] `}
					>
						{" "}
						{color === "#FF5F00" && checkIcon}{" "}
					</div>
				</div>
				<div
					className={` cursor-pointer flex items-center justify-center  h-[38px] w-[38px]  rounded-[8px] p-[2px] ${
						color === "#008F06" && "border-[1.5px] border-[#072A85]"
					} `}
					onClick={() => {
						handleColorChange("#008F06");
					}}
				>
					<div
						className={` cursor-pointer flex items-center justify-center  h-[32px] w-[32px] bg-[#008F06] rounded-[8px] p-[2px] `}
					>
						{" "}
						{color === "#008F06" && checkIcon}{" "}
					</div>
				</div>
				<div
					className={` cursor-pointer flex items-center justify-center  h-[38px] w-[38px] rounded-[8px]  ${
						color === "#000" && "border-[1.5px] border-[#072A85] p-[2px]"
					}`}
					onClick={() => {
						handleColorChange("#000");
					}}
				>
					<div
						className={` cursor-pointer flex items-center justify-center  h-[32px] w-[32px] bg-[#000] rounded-[8px]  `}
					>
						{" "}
						{color === "#000" && checkIcon}{" "}
					</div>
				</div>
			</div>
			<div className='relative' ref={colorPickerRef}>
				<div
					className='flex items-center space-x-[2px] w-fit cursor-pointer '
					onClick={() => {
						setColorPicker(true);
						console.log("hhey");
					}}
				>
					<span>{colorPickerIcon}</span>
					<h2 className='text-[12px] sodo700 tracking-[-0.24px] text-[#072A85] '>
						Manually Select Color{" "}
					</h2>
				</div>

				{colorPicker && (
					<div className='bg-white rounded-[8px] p-[12px] absolute top-0 left-0 z-50  h-fit w-fit colorPicker flex flex-col items-end border border-[#E6E6E6] '>
						<SketchPicker
							styles={{
								default: {
									picker: {
										border: "none", // Remove border
										boxShadow: "none", // Remove boxShadow
                                        padding:'none',
									},
								},
							}}
							color={color}
							onChange={(color) => {
								setColorPicked(color.hex);
								setcolor(color.hex);
								console.log(color.hex);
							}}
						/>
						{/* You can use color for further actions */}

						<span className='w-fit mt-[16px]'>
							<DashBtn
								text='Ok'
								handleClick={() => {
									setColorPicker(false);
								}}
							/>
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ColorPicker;
