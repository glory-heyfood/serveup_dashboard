"use client";
import TableComponent from "@/components/Table/Table";
import { campaignData, sendCampaignData } from "@/data";
import * as React from "react";
import TableTab from "./TableTab";


export default function StickyHeadTable() {
	const [data, setData] = React.useState([]);
	const [selected, setSelected] = React.useState("All");
	const [length, setLength] = React.useState([]);
	const columns = [
		{ id: "Name", label: "Name", minWidth: 200 },

		{
			id: "Status",
			label: "Status",
			minWidth: 150,
			align: "left",
		},

		{
			id: "Open",
			label: "Open",
			minWidth: 150,
			align: "left",
		},

		{
			id: "Clicks",
			label: "Clicks",
			minWidth: 150,
			align: "left",
		},
		{
			id: "DeliveryDate",
			label: "Delivery\u00a0 Date",
			minWidth: 220,
			align: "left",
		},
	];

	function createData(Name, Status, Open, Clicks, DeliveryDate) {
		return { Name, Status, Open, Clicks, DeliveryDate };
	}

	const rows = [];
	data?.forEach((data) => {
		rows.push(
			createData(
				data.name,
				data.Status,
				data.Opens,
				data.Clicks,
				data.DeliveryDate,
			),
		);
	});

	React.useEffect(() => {
		const dat = sendCampaignData(0, 10, "All");
		setData(dat.data);
		setLength(dat.length);
	}, []);

	if (rows.length !== 0) {
		return (
			<TableComponent
				setData={setData}
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
