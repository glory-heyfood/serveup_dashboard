"use client";
import { campaignData, sendCampaignData } from "@/data";
import * as React from "react";
import TableTab from "./CampaignTableTab";
import ClickableTableComponent from "@/components/Table/ClickableTable";
import TableComponent from "@/components/Table/Table";

export default function SubscriberTable() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState("All");
  const [length, setLength] = React.useState([]);
  const columns = [
    { id: "check", label: <input type="checkbox" />, minWidth: 50 },
    { id: "Name", label: "Name", minWidth: 200 },

    {
      id: "Type",
      label: "Type",
      minWidth: 150,
      align: "left",
    },

    {
      id: "Delivered",
      label: "Delivered",
      minWidth: 150,
      align: "left",
    },
    {
      id: "DeliveryDate",
      label: "Delivery\u00a0 Date",
      minWidth: 220,
      align: "left",
    },
    {
      id: "Status",
      label: "Status",
      minWidth: 150,
      align: "left",
    },
  ];

  function createData(check, Name, Type, Delivered, DeliveryDate, Status) {
    return { check, Name, Type, Delivered, DeliveryDate, Status };
  }

  const rows = [];
  data?.forEach((data) => {
    rows.push(
      createData(
        data.check,
        data.name,
        data.Type,
        data.Delivered,
        data.DeliveryDate,
        data.Status
      )
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
        arr={sendCampaignData}
        shadeStatus={true}
        column={columns}
        handleClick={() => {}}
        row={rows}
        length={length}
        tab={selected}
      />
    );
  }
}
