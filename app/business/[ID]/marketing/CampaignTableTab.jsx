import { sendCampaignData } from "@/data";
import React from "react";

const TableTab = ({ setData, setSelected, selected, setLength, length }) => {
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
      label: "Scheduled",
      number: sendCampaignData(0, 10, "Scheduled").length,
    },
    {
      label: "Draft",
      number: sendCampaignData(0, 10, "Draft").length,
    },
  ];
  return (
    <div className="flex  w-full justify-between sm:justify-start sm:space-x-[24px] md:space-x-[40px]">
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
            {data.label}
          </h3>
          <div className="bg-[#F2F2F2] py-[2px] px-[6px] flex items-center rounded-[24px] justify-center ">
            <h3 className="text-[10px] sodo700 tracking-[-0.2px] ">
              {data.number}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTab;
