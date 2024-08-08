import { alarm1_5rem, cake1_5rem, gift1_5rem, ribbon1_5rem } from "@/SVGs";
import React from "react";

const AutomatedCampaign = ({ selected, setSelected }) => {
  const campaigns = [
    {
      id: 1,
      header: "Welcome a new customer",
      text: "This email is sent to newly subscribed customers within 24 hours of their first purchase, and encourages them to come back again.",
      icon: (color) => ribbon1_5rem(color),
    },
    {
      id: 2,
      header: "Wish a customer a happy birthday",
      text: "This email is sent to customers on their birthdays.",
      icon: (color) => cake1_5rem(color),
    },
    {
      id: 3,
      header: "Remind about available loyalty reward",
      text: "This email delivers to customers 14 days after they have enough points to redeem a loyalty reward.",
      icon: (color) => alarm1_5rem(color),
    },
    {
      id: 4,
      header: "Remind about nearing a loyalty reward",
      text: "These email campaigns go to customers whose Loyalty point balance is currently at least 90% of the first reward tier.",
      icon: (color) => gift1_5rem(color),
    },
  ];

  return (
    <div>
      <h2 className="text-black ml-[1rem] sodo600 tracking-[-0.035rem] text-[0.875rem] ">
        Automated Campaign
      </h2>

      <div className="flex flex-col space-y-[0.5rem] mt-[1.19rem] w-[90%] ">
        {campaigns.map((data) => (
          <div
            onClick={() => {
              setSelected(data?.id);
            }}
            className={`py-[1rem] pl-[1rem] cursor-pointer  pr-[3.75rem] flex items-center space-x-[0.75rem] ${
              selected === data?.id ? "bg-[#F2F4F9]" : ""
            } `}
          >
            <div
              className={` p-[0.75rem] rounded-[0.5rem] ${
                selected === data?.id ? "bg-[#E6EAF4]" : "bg-[#F0F0F0]"
              } `}
            >
              <span className="">
                {data?.icon(selected === data?.id ? "#072A85" : "#000000")}
              </span>
            </div>

            <div>
              <h2
                className={` ${
                  selected === data?.id ? "text-[#072A85]" : "text-[#0000"
                } sodo600 text-[0.75rem] tracking-[-0.015rem] `}
              >
                {data?.header}
              </h2>
              <h3 className="text-[#5F6370] text-[0.75rem] sodo400 tracking-[-0.015rem]  ">
                {data?.text}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomatedCampaign;
