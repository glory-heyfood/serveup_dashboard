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
import InStock from "../InStock";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "@/redux/features/stores/menuSlice";
import FadeLoad from "../loaders/FadeLoader";

export default function TableComponent({
	TableTab,
	column,
	row,
	setData,
	sort,
	data,
	loading,
	tab,
	length,
	handleEdit,
	type,
	arr,
}) {
	const [page, setPage] = React.useState(1);
	const [selectedData, setSelectedData] = React.useState();
	const [clearSelectedData, setClearSelectedData] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [jumpToPage, setJumpToPage] = React.useState("");
	const dataLoading = useSelector((state) => state.menu.dataLoading);
	const dispatch = useDispatch();

	const columns = column;

	const rows = row;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(1);
	};

	const handleJumpToPage = (event) => {
		setPage(event.target.value);
	};

	React.useEffect(() => {
        const menu_id = JSON.parse(window.localStorage.getItem("serveup_store"))?.menu_id
		if (type === "items") {
			dispatch(
				getAllItems({
					menu_id: menu_id,
					page: page,
					pageSize: rowsPerPage,
					sortString: sort,
				}),
			);
		}
		// const dat = arr(page, rowsPerPage, tab);
		// console.log(page, rowsPerPage, tab);
		// setData(dat?.data);
	}, [page, rowsPerPage]);

	React.useEffect(() => {
		setSelectedData();
		console.log(selectedData);
	}, [clearSelectedData]);

	return loading ? (
		<div className='h-[50vh] w-full flex items-center justify-center'>
			<FadeLoad />
		</div>
	) : (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<div className='flex items-start justify-between border border-transparent border-b-[#E6E6E6] w-full'>
				<div className='w-full sm:w-fit'>{TableTab}</div>
				<div className='sm:flex items-center hidden   space-x-[12px]'>
					<h3 className='tracking-[-0.24px] '>Showing&nbsp;</h3>
					<CustomSelect
						selectedValue={rowsPerPage}
						handleChange={handleChangeRowsPerPage}
						height='32px'
						options={[
							{ value: 10, label: 10 },
							{ value: 25, label: 25 },
							{ value: 100, label: 100 },
						]}
					/>
					<h3 className='tracking-[-0.24px] w-full '>&nbsp; per page</h3>
				</div>
			</div>
			<TableContainer sx={{ border: "none" }} className='scroll-hidden'>
				<Table
					sx={{
						border: "none",
					}}
					stickyHeader
					aria-label='sticky table'
				>
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
						{rows?.map((row) => {
							return (
								<TableRow role='checkbox' tabIndex={-1} key={row.code} hover>
									{columns.map((column, i) => {
										const value = row[column.id];
										if (
											value === "Sent" ||
											value === "Active" ||
											value === "Success"
										) {
											return (
												<TableCell
													key={column.id}
													align={column.align}
													onClick={() => {
														data?.forEach((data) => {
															if (data.name === row.Name) {
																handleEdit(data);
															}
														});
													}}
												>
													<div
														className='inline-flex py-[3px] px-[10px] items-center justify-center  rounded-[20px]'
														style={{
															background: "rgba(6, 174, 104, 0.10)",
														}}
													>
														<h1 className='text-[#06AE68] text-[12px] tracking-[-0.48px] sodo600 '>
															{value}
														</h1>
													</div>
												</TableCell>
											);
										} else if (value === "Pending" || value === "Inactive") {
											return (
												<TableCell
													key={column.id}
													align={column.align}
													onClick={() => {
														data?.forEach((data) => {
															if (data.name === row.Name) {
																handleEdit(data);
															}
														});
													}}
												>
													<div
														className='inline-flex py-[3px] px-[10px] items-center justify-center  rounded-[20px]'
														style={{
															background: "rgba(245, 100, 18, 0.10)",
														}}
													>
														<h1 className='text-[#F56412] text-[12px] tracking-[-0.48px] sodo600 '>
															{value}
														</h1>
													</div>
												</TableCell>
											);
										} else if (value === "Draft") {
											return (
												<TableCell
													key={column.id}
													align={column.align}
													onClick={() => {
														data?.forEach((data) => {
															if (data.name === row.Name) {
																handleEdit(data);
															}
														});
													}}
												>
													<div
														className='inline-flex py-[3px] px-[10px] items-center justify-center  rounded-[20px]'
														style={{
															background: "#F0F0F0",
														}}
													>
														<h1 className='text-[#000] text-[12px] tracking-[-0.48px] sodo600 '>
															{value}
														</h1>
													</div>
												</TableCell>
											);
										} else if (column.typeof === "array") {											
											return (
												<TableCell
													key={column.id}
													align={column.align}
													onClick={() => {
														data?.forEach((data) => {
															if (data.name === row.Name) {
																handleEdit(data);
															}
														});
													}}
												>
													{value.join(", ")}
												</TableCell>
											);
										} else if (column.typeof === "date") {
											return (
												<TableCell
													key={column.id}
													onClick={(e) => {
														setSelectedData((prevSelectedData) => {
															if (prevSelectedData) {
																return prevSelectedData;
															}
															let dataSelected = data.find(
																(data) => data.name === row.Name,
															);
															return dataSelected;
														});
													}}
												>
													<InStock
														data={row.Stock}
														selectedData={selectedData}
                                                        type='item'
														setClearSelectedData={setClearSelectedData}
														clearSelectedData={clearSelectedData}
													/>
												</TableCell>
											);
										} else {
											return (
												<TableCell
													key={column.id}
													align={column.align}
													onClick={() => {
														data?.forEach((data) => {
															if (data.name === row.Name) {
																handleEdit(data);
															}
														});
													}}
												>
													{column.format && typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										}
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>

			<div className='flex flex-col space-y-[24px] sm:space-y-0 sm:flex-row sm:items-center justify-between mt-[24px] '>
				<div className='flex items-center sm:justify-center space-x-[4px]'>
					{Array.from(
						{ length: Math.ceil(length / rowsPerPage) },
						(_, index) => {
							if (index < 5 || index === Math.ceil(length / rowsPerPage) - 1) {
								const currentPage = index + 1;
								return (
									<div
										key={currentPage}
										className={`${
											page === currentPage ? "bg-[#F2F4F9]" : "bg-transparent"
										} w-[24px] p-[4px] rounded-[4px] cursor-pointer flex items-center justify-center hover:bg-[#F2F4F9]`}
										onClick={() => setPage(currentPage)}
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
					rows={length}
					rowsPerPage={rowsPerPage}
				/>
			</div>
		</Paper>
	);
}
