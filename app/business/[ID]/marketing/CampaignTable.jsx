"use client";
import { campaignData, sendCampaignData } from "@/data";
import * as React from "react";
import TableTab from "./CampaignTableTab";
import ClickableTableComponent from "@/components/Table/ClickableTable";
import CampaignTableSideBarDetails from "./CampaignTableSideBarDetails";

export default function StickyHeadTable() {
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState("All");
  const [selectedRow, setSelectedRow] = React.useState();
  const [length, setLength] = React.useState([]);
  const columns = [
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

  function createData(Name, Type, Delivered, DeliveryDate, Status, data) {
    return { Name, Type, Delivered, DeliveryDate, Status, data };
  }

  const rows = [];
  data?.forEach((data) => {
    rows.push(
      createData(
        data.name,
        data.Type,
        data.Delivered,
        data.DeliveryDate,
        data.Status,
        data
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
      <ClickableTableComponent
        setData={setData}
        arr={sendCampaignData}
        setSelectedRow={setSelectedRow}
        shadeStatus={true}
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
        handleClick={() => {}}
        row={rows}
        sideBarDetails={<CampaignTableSideBarDetails data={selectedRow} />}
        length={length}
        tab={selected}
      />
    );
  }
}
