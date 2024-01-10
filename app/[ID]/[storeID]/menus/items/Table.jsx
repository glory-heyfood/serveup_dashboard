"use client";
import TableComponent from "@/components/Table/Table";
import { sendMenuItemsData } from "@/data";
import * as React from "react";

export default function StickyHeadTable() {
	const [data, setData] = React.useState([]);
	const [length, setLength] = React.useState([]);
	const columns = [
		{ id: "Name", label: "Name", minWidth: 200 },

		{
			id: "Price",
			label: "Price",
			minWidth: 150,
			align: "left",
		},

		{
			id: "Category",
			label: "Category",
			minWidth: 150,
			align: "left",
		},

		{
			id: "Stock",
			label: "Stock",
			minWidth: 150,
			align: "left",
		},
	];

	function createData(Name, Price, Category, Stock) {
		return { Name, Price, Category, Stock };
	}

	const rows = [];
	data?.forEach((data) => {
		rows.push(createData(data.name, data.price, data.category, data.stock));
	});

	React.useEffect(() => {
		const dat = sendMenuItemsData(0, 10);
		setData(dat.data);
		setLength(dat.length);
	}, []);

	if (rows.length !== 0) {
		return (
			<TableComponent
				setData={setData}
				arr={sendMenuItemsData}
				column={columns}
				row={rows}
				length={length}
			/>
		);
	}
}
