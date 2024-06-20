"use client";
import TableComponent from "@/components/Table/Table";
import { sendTransactionData } from "@/data";
import * as React from "react";
import TableTab from "./TableTab";

export default function StickyHeadTable() {
	const [data, setData] = React.useState([]);
	const [selected, setSelected] = React.useState("Payouts");
	const [length, setLength] = React.useState([]);
	const columns = [
		{ id: "Amount", label: "Amount", minWidth: 200 },

		{
			id: "Type",
			label: "Type",
			minWidth: 200,
			align: "left",
		},

		{
			id: "Date",
			label: "Date",
			minWidth: 250,
			align: "left",
		},

		{
			id: "InitaitedBy",
			label: "Initaited \u00a0 By",
			minWidth: 250,
			align: "left",
		},
		{
			id: "Status",
			label: "Status",
			minWidth: 150,
			align: "left",
		},
	];

	function createData(Amount, Type, Date, InitaitedBy, Status) {
		return { Amount, Type, Date, InitaitedBy, Status };
	}

	const rows = [];
	data?.forEach((data) => {
		rows.push(
			createData(
				data.amount,
				data.type,
				data.date,
				data.initiatedBy,
				data.status,
			),
		);
	});

	React.useEffect(() => {
		const dat = sendTransactionData(0, 10, "Payouts");
        console.log(dat.data)
		setData(dat.data);
		setLength(dat.length);
	}, []);

	if (rows.length !== 0) {
		return (
			<TableComponent
				setData={setData}
				arr={sendTransactionData}
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
	}
}
