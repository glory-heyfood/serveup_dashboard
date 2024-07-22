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
import { useSelector } from "react-redux";
import { formatMoney, getDateAndTime } from "@/utils";
import FadeLoad from "@/components/loaders/FadeLoader";
import EmptyState from "@/components/EmptyState";
import { bigSearchIcon } from "@/SVGs";
import { Switch } from "@mui/material";
import CustomSwitch from "@/components/CustomSwitch";

export default function Table({
  loading,
  prev,
  next,
  page,
  handleClick,
  setLoading,
}) {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState("Active");
  const [length, setLength] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const discounts = useSelector((state) => state.promotions.data);
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

  function createData(
    Name,
    Discount,
    DateCreated,
    Usage,
    totalCost,
    Status,
    data
  ) {
    return { Name, Discount, DateCreated, Usage, totalCost, Status, data };
  }

  const addDatatoRows = () => {
    console.log(rows + "dsd");

    data?.forEach((dataItem) => {
      // If it doesn't exist, push a new row
      setRows((prevRows) => [
        ...prevRows,
        createData(
          dataItem.name,
          dataItem.discount_value,
          getDateAndTime(dataItem.createdat),
          0,
          formatMoney(1000),
          <CustomSwitch checked={dataItem?.active} />,
          dataItem
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
    console.log(discounts, "ord");
    if (discounts) {
      setData(discounts.docs);
      setLength(discounts.totalDocs);
    }
  }, [discounts]);

  return (
    <TableComponent
      loading={loading}
      setData={setData}
      handleClick={handleClick}
      arr={sendPromotionsData}
      TableTab={
        <TableTab
          setData={setData}
          setSelected={setSelected}
          setLoading={setLoading}
          selected={selected}
          setLength={setLength}
          length={length}
        />
      }
      column={columns}
      row={rows}
      length={length}
      empty={discounts?.docs?.length === 0}
      start={(discounts?.page - 1) * (discounts?.limit + 1)}
      end={
        discounts?.limit > discounts?.totalDocs
          ? discounts?.totalDocs
          : discounts?.page * discounts?.limit > discounts?.totalDocs
          ? discounts?.totalDocs
          : discounts?.page * discounts?.limit
      }
      next={next}
      prev={prev}
      disableNext={discounts?.page * discounts?.limit >= discounts?.totalDocs}
      disablePrev={page <= 1}
      total={discounts?.totalDocs}
      tab={selected}
    />
  );
}
