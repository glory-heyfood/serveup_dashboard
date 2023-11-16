"use client";
import TableComponent from "@/components/Table/Table";
import { campaignData, sendCampaignData } from "@/data";
import * as React from "react";

const Lab = ({ setData, setSelected, selected, setLength, length }) => {
	const selectedArray = [
		{
			label: "All",
			number: sendCampaignData(0, 10, "All").length,
		},
		{
			label: "Sent",
			number: sendCampaignData(0, 10, "Sent").length,
		},

		{
			label: "Pending",
			number: sendCampaignData(0, 10, "Pending").length,
		},
		{
			label: "Draft",
			number: sendCampaignData(0, 10, "Draft").length,
		},
	];
	return (
		<div className='flex space-x-[40px]'>
			{selectedArray.map((data, i) => (
				<div
					key={i}
					onClick={() => {
						setSelected(data.label);
						const dat = sendCampaignData(0, 10, data.label);
						setData(dat.data);
						setLength(dat.length);
					}}
					className={` ${
						selected === data.label
							? "border-transparent border-[2px] border-b-[#072A85]  "
							: "  "
					} flex space-x-[4px] pb-[12px] cursor-pointer items-center`}
				>
					<h3
						className={` ${
							selected === data.label ? "text-[#072A85]" : "text-[#7E8493]"
						} "tracking-[-0.24px] text-[12px]"`}
					>
						{data.label === "Pending" ? "Scheduled" : data.label}
					</h3>
					<div className='bg-[#F2F2F2] py-[2px] px-[6px] flex items-center rounded-[24px] justify-center '>
						<h3 className='text-[10px] sodo700 tracking-[-0.2px] '>
							{data.number}
						</h3>
					</div>
				</div>
			))}
		</div>
	);
};

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
			minWidth: 100,
			align: "left",
		},
	];

	function createData(Name, Status, Open, Clicks, DeliveryDate) {
		return { Name, Status, Open, Clicks, DeliveryDate };
	}

	const rows = [];

	console.log(data);

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
				lab={
					<Lab
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
