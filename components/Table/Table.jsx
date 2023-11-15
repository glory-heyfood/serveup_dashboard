import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import CustomSelect from "../CustomSelect";
import TableSelect from "./TableSelect";

export default function TableComponent({ column, row }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [jumpToPage, setJumpToPage] = React.useState("");

	const columns = column;

	const rows = row;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// const handleJumpToPage = () => {
	// 	const newPage = jumpToPage - 1;
	// 	if (newPage >= 0 && newPage < Math.ceil(rows.length / rowsPerPage)) {
	// 		setPage(newPage);
	// 	}
	// };

	const handleJumpToPage = (event) => {
		setPage(event.target.value - 1);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440, border: "none" }}>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					mb={2}
				>
					<Box>
						Showing&nbsp;
						<Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={25}>25</MenuItem>
							<MenuItem value={100}>100</MenuItem>
						</Select>
						&nbsp; per page
					</Box>
				</Box>

				{/* <TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/> */}
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>

			<div className='flex items-center justify-center space-x-[4px]'>
				{Array.from(
					{ length: Math.ceil(rows.length / rowsPerPage) },
					(_, index) => {
						if (
							index < 5 ||
							index === Math.ceil(rows.length / rowsPerPage) - 1
						) {
							const currentPage = index + 1;
							return (
								<div
									key={currentPage}
									className={`${
										page === index ? "bg-[#F2F4F9]" : "bg-transparent"
									} w-[24px] p-[4px] rounded-[4px] cursor-pointer flex items-center justify-center hover:bg-[#F2F4F9]`}
									onClick={() => setPage(index)}
								>
									<h3 className='tracking-[-0.24px]'>{currentPage}</h3>
								</div>
							);
						} else if (index === 5) {
							return (
								<Box key='ellipsis' mx={1}>
									...
								</Box>
							);
						}
						return null;
					},
				)}
			</div>

			<TableSelect
				page={page}
				handleJumpToPage={handleJumpToPage}
				rows={rows}
				rowsPerPage={rowsPerPage}
			/>
		</Paper>
	);
}
