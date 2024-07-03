import { formatMoney } from "@/utils";
import React from "react";

const KitchenOrderCardItem = ({ number, item, amount }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-[13px] items-center">
        <h1 className="text-[0.75rem] tracking-[-0.48px] sodo700 ">{number}</h1>
        <h1 className="text-[0.75rem] tracking-[-0.48px] sodo400 ">{item}</h1>
      </div>

      <h2 className=" text-black sodo400 text-[0.75rem] tracking-[-0.03rem] ">
        {" "}
        <span className="inter600">₦</span> {formatMoney(amount)}{" "}
      </h2>
    </div>
  );
};

export default KitchenOrderCardItem;
