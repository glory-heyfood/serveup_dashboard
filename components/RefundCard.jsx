import { getDateAndTime } from "@/utils";
import React from "react";

const RefundsCard = ({ data }) => {
  return (
    <div className="border border-[#E6E6E6] p-[0.75rem] w-full  rounded-[0.25rem] flex flex-col space-y-[0.25rem] ">
      <h2 className="text-[#F01C1C] text-[0.75rem] sodo700 tracking-[-0.03rem] ">
        -<span className="inter600">₦</span>
        {data.amount}
      </h2>
      <h2 className="text-[#00000] text-[0.75rem] sodo400 tracking-[-0.03rem] ">
        {data.description}
      </h2>
      <h2 className="text-[#5F6370] text-[0.75rem] sodo600 tracking-[-0.015rem] ">
        {getDateAndTime(data.createdDate)}
      </h2>
    </div>
  );
};

export default RefundsCard;
