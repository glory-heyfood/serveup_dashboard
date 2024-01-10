"use client";
import ClickableTableComponent from "@/components/Table/ClickableTable";
import TableComponent from "@/components/Table/Table";
import { campaignData, sendOrderHistory } from "@/data";
import * as React from "react";
import TableSideBarDetails from "./TableSideBarDetails";

export default function StickyHeadTable() {
	const [data, setData] = React.useState([]);	
	const [length, setLength] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState() //this is the row that is selected, we need its data so as to display it in the sidebar when it shows
	const columns = [
		{ id: "Customer", label: "Customer", minWidth: 300 },

		{
			id: "Date",
			label: "Date",
			minWidth: 300,
			align: "left",
		},

		{
			id: "Items",
			label: "Items",
			minWidth: 150,
			align: "left",
		},

		{
			id: "NetPayout",
			label: "Net\u00a0 Payout",
			minWidth: 150,
			align: "left",
		},
		{
			id: "Status",
			label: "Status",
			minWidth: 100,
			align: "left",
		},
	];

	function createData(Customer, Date, Items, NetPayout, Status) {
		return { Customer, Date, Items, NetPayout, Status };
	}

	const rows = [];
	data?.forEach((data) => {
		rows.push(
			createData(
				data.customer,
                data.date,				
				data.items,
				data.netPayout,
                data.status,				
			),
		);
	});

	React.useEffect(() => {
		const dat = sendOrderHistory(0, 10 );
		setData(dat.data);
		setLength(dat.length);
	}, []);

	if (rows.length !== 0) {
		return (
			<ClickableTableComponent            
				setData={setData}
				arr={sendOrderHistory}		
                setSelectedRow={setSelectedRow}		
				column={columns}
				row={rows}
				length={length}	
                sideBarDetails = {<TableSideBarDetails selectedRow={selectedRow} />}			
			/>
		);
	}
}
