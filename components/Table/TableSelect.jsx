import { MenuItem, Select } from "@mui/material";
import React from "react";

const TableSelect = ({ page, rows, rowsPerPage, handleJumpToPage }) => {
	return (
		<div className="flex space-x-[12px] items-center">
            <h3 className="tracking-[-0.24px]">Jump to page</h3>
            <Select
			style={{
				backgroundColor: "#F2F2F2",
				border: "none",
				borderRadius: "4px",
				outline: "none",				
				height: "32px",
				dispalay: "flex",
				alignItems: "center",
				"&:focus": {
					border: "none",
				},
			}}
			sx={{
				"& .MuiSelect-select": {
					color: "#000",
					fontFamily: "sodoSans-SemiBold",
					letterSpacing: "-0.24px",
					fontSize: "0.75em",
					padding: "7px 12px",
				},

				boxShadow: "none",
				".MuiOutlinedInput-notchedOutline": { border: 0 },
				"&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
					{
						border: 0,
					},
			}}
			value={page + 1}
			onChange={handleJumpToPage}
		>
			{Array.from(
				{ length: Math.ceil(rows.length / rowsPerPage) },
				(_, index) => (
					<MenuItem key={index + 1} value={index + 1}>
						{index + 1}
					</MenuItem>
				),
			)}
		</Select>
        </div>
	);
};

export default TableSelect;
