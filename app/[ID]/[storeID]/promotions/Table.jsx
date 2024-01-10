// "use client";
// import TableComponent from "@/components/Table/Table";
// import { sendPromotionsData } from "@/data";
// import * as React from "react";
// import TableTab from "./TableTab";

// export default function Table() {
// 	const [data, setData] = React.useState([]);
// 	const [selected, setSelected] = React.useState("Active");
// 	const [length, setLength] = React.useState([]);
// 	const columns = [
// 		{ id: "Name", label: "Name", minWidth: 250 },

// 		{
// 			id: "Discount",
// 			label: "Discount",
// 			minWidth: 120,
// 			align: "left",
// 		},

// 		{
// 			id: "DateCreated",
// 			label: "Date\u00a0 Created",
// 			minWidth: 250,
// 			align: "left",
// 		},

// 		{
// 			id: "Usage",
// 			label: "Usage",
// 			minWidth: 120,
// 			align: "left",
// 		},
// 		{
// 			id: "totalCost",
// 			label: "Total\u00a0 Cost",
// 			minWidth: 140,
// 			align: "left",
// 		},

// 		{
// 			id: "Status",
// 			label: "Status",
// 			minWidth: 150,
// 			align: "left",
// 		},
// 	];

// 	function createData(Name, Discount, DateCreated, Usage, totalCost, Status) {
// 		return { Name, Discount, DateCreated, Usage, totalCost, Status };
// 	}

// 	// const rows = [];
// 	// React.useEffect(() => {
// 	// 	data?.forEach((data) => {
// 	// 		rows.push(
// 	// 			createData(
// 	// 				data.Name,
// 	// 				data.Discount,
// 	// 				data.DateCreated,
// 	// 				data.Usage,
// 	// 				data.totalCost,
// 	// 				data.Status,
// 	// 			),
// 	// 		);
// 	// 	});
// 	// 	console.log(rows);
// 	// }, [data]);

// 	React.useEffect(() => {
// 		const dat = sendPromotionsData("Active", 10, 0)
//         setData(dat.data)
//         setLength(dat.length)
// 	}, []);

// 	const rows = data?.map((rowData) =>
// 		createData(
// 			rowData.Name,
// 			rowData.Discount,
// 			rowData.DateCreated,
// 			rowData.Usage,
// 			rowData.TotalCost,
// 			rowData.Status,
// 		),
// 	);

// 	if (rows?.length !== 0) {
// 		return (
// 			<TableComponent
// 				setData={setData}
// 				TableTab={
// 					<TableTab
// 						setData={setData}
// 						setSelected={setSelected}
// 						selected={selected}
// 						setLength={setLength}
// 						length={length}
// 					/>
// 				}
// 				column={columns}
// 				row={rows}
// 				length={length}
// 				tab={selected}
// 			/>
// 		);
// 	}

// 	return null; // Return null if rows.length is 0
// }

"use client";
import TableComponent from "@/components/Table/Table";
import { campaignData, sendCampaignData, sendPromotionsData } from "@/data";
import * as React from "react";
import TableTab from "./TableTab";

export default function Table() {
	const [data, setData] = React.useState([]);
	const [selected, setSelected] = React.useState("Active");
	const [length, setLength] = React.useState([]);
	const [rows, setRows] = React.useState([]);
	const columns = [
		{ id: "Name", label: "Name", minWidth: 250 },
		{
			id: "Discount",
			label: "Discount",
			minWidth: 120,
			align: "left",
		},
		{
			id: "DateCreated",
			label: "Date\u00a0 Created",
			minWidth: 250,
			align: "left",
		},
		{
			id: "Usage",
			label: "Usage",
			minWidth: 120,
			align: "left",
		},
		{
			id: "totalCost",
			label: "Total\u00a0 Cost",
			minWidth: 140,
			align: "left",
		},
		{
			id: "Status",
			label: "Status",
			minWidth: 150,
			align: "left",
		},
	];

	function createData(Name, Discount, DateCreated, Usage, totalCost, Status) {
		return { Name, Discount, DateCreated, Usage, totalCost, Status };
	}

	const addDatatoRows = () => {
		console.log(rows + "dsd");

		data?.forEach((dataItem) => {
			// If it doesn't exist, push a new row
			setRows((prevRows) => [
				...prevRows,
				createData(
					dataItem.Name,
					dataItem.Discount,
					dataItem.DateCreated,
					dataItem.Usage,
					dataItem.TotalCost,
					dataItem.Status,
				),
			]);
		});
		console.log(rows);
	};

	React.useEffect(() => {
		// Clear the rows array before populating
		setRows([]);
		addDatatoRows();
	}, [data]);

	React.useEffect(() => {
		const dat = sendPromotionsData(0, 10, "Active");
		console.log(dat);
		setData(dat.data);
		setLength(dat.length);
	}, []);

	if (rows?.length !== 0) {
		return (
			<TableComponent
				setData={setData}
				arr={sendPromotionsData}
				TableTab={
					<TableTab
						setData={setData}
						setSelected={setSelected}
						selected={selected}
						setLength={setLength}
						length={length}
					/>
				}
				column={columns}
				row={rows}
				length={length}
				tab={selected}
			/>
		);
	} else {
		
	}
}
