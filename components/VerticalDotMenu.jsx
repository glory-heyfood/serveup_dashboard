import { verticalDotIconPlain } from "@/SVGs";
import { Button } from "@mui/material";
import React, { useState } from "react";

const VerticalDotMenu = ({ handleEdit, handleDelete, index, name, data }) => {
	const [isClicked, setIsClicked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [disabled, setDisabled] = useState(false);
	return (
		<div
			className='relative w-[10%] group'
			// ref={groupRef}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Handling both hover event on web and on click event on mobile */}
			<div
				onClick={() => setIsClicked(!isClicked)}
				className={`flex justify-end pr-[12px] cursor-pointer `}
			>
				{verticalDotIconPlain}{" "}
			</div>

			<div
				className={`flex-col items-start absolute top-[12px] right-0 z-[10] ${
					isHovered || isClicked ? "flex" : "hidden"
				} bg-white rounded-[4px] w-[140px]`}
				style={{
					boxShadow: "0px 4px 4px 0px #E6E6E6",
				}}
			>
				<Button
					onClick={() => {
						handleEdit(index, data);
						setIsClicked(false);
					}}
					sx={{
						color: "#072A85",
						fontFamily: " SoDoSans-Bold",
						fontSize: " 12px",
						letterSpacing: "-0.48px",
						padding: "12px 16px",
						alignItems: "start",
						width: "100%",
						justifyContent: "flex-start",
						textTransform: "capitalize",
					}}
				>
					Edit
				</Button>

				<Button
					onClick={() => {
						// handleDeactivate(index);
						setDisabled(!disabled);
						setIsClicked(false);
					}}
					sx={{
						color: "#072A85",
						fontFamily: " SoDoSans-Bold",
						fontSize: " 12px",
						letterSpacing: "-0.48px",
						padding: "12px 16px",
						alignItems: "start",
						width: "100%",
						justifyContent: "flex-start",
						textTransform: "capitalize",
					}}
				>
					{disabled ? "Activate" : "Deactivate"}
				</Button>

				<Button
					sx={{
						color: "#F01C1C",
						fontFamily: " SoDoSans-Bold",
						fontSize: " 12px",
						letterSpacing: "-0.48px",
						padding: "12px 16px",
						alignItems: "start",
						width: "100%",
						justifyContent: "flex-start",
						textTransform: "capitalize",
					}}
					onClick={() => {
						handleDelete(index);
					}}
				>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default VerticalDotMenu;
