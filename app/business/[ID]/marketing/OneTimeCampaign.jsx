import {
  alarm1_5rem,
  cake1_5rem,
  discount1_5rem,
  flag1_5rem,
  gift1_5rem,
  newLetter1_5rem,
  rewardIcon,
  ribbon1_5rem,
  storeIcon1_5rem,
} from "@/SVGs";
import React from "react";

const OneTimeCampaign = ({ selected, setSelected }) => {
  const campaigns = [
    {
      id: 1,
      header: "Offer a discount",
      icon: (color) => discount1_5rem(color),
    },
    {
      id: 2,
      header: "Wish a customer a happy birthday",
      icon: (color) => newLetter1_5rem(color),
    },
    {
      id: 3,
      header: "Remind about available loyalty reward",
      icon: (color) => flag1_5rem(color),
    },
    {
      id: 4,
      header: "Remind about nearing a loyalty reward",
      icon: (color) => storeIcon1_5rem(color),
    },
  ];

  return (
    <div>
      <h2 className="text-black ml-[1rem] sodo600 tracking-[-0.035rem] text-[0.875rem] ">
        One-time Campaigns
      </h2>

      <div className="flex flex-col space-y-[0.5rem] mt-[1.19rem] w-[90%] ">
        {campaigns.map((data) => (
          <div
            onClick={() => {
              setSelected(data?.id);
            }}
            className={`py-[0.8rem] pl-[1rem] cursor-pointer  pr-[3.75rem] flex items-center space-x-[0.75rem] ${
              selected === data?.id ? "bg-[#F2F4F9]" : ""
            } `}
          >
            <div>
              <span className="">{data?.icon("#072A85")}</span>
            </div>

            <div>
              <h2
                className={` ${
                  selected === data?.id ? "text-[#072A85]" : "text-[#0000"
                } sodo600 text-[0.75rem] tracking-[-0.015rem] `}
              >
                {data?.header}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OneTimeCampaign;
