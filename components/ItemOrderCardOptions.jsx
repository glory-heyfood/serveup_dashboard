import { formatMoney } from "@/utils";
import React from "react";

const ItemOrderCardOptions = ({ number, item, amount, option }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <h2 className="text-[#5F6370] sodo400 tracking-[-0.03rem] text-[0.75rem] mb-[0.25rem] ">
          {option}
        </h2>
        <div className="flex space-x-[13px] items-center">
          <h1 className="text-[0.75rem] tracking-[-0.48px] sodo700 ">
            {number}x
          </h1>
          <h1 className="text-[0.75rem] tracking-[-0.48px] sodo400 ">{item}</h1>
        </div>
      </div>

      <h2 className=" text-black sodo400 text-[0.75rem] tracking-[-0.03rem] ">
        {" "}
        <span className="inter600">₦</span> {formatMoney(amount)}{" "}
      </h2>
    </div>
  );
};

export default ItemOrderCardOptions;
