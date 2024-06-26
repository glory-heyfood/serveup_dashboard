import React from "react";
import KitchenOrderCardItem from "./KitchenOrderCardItem";

// console
const KitchenOrderCard = ({ data }) => {
  return (
    <div className=" w-full sm:w-[50%] md:w-[50%] lg:1/3 max-w-[400px] ">
      <div
        className="border-[0.5px] border-[#E6E6E6] p-[0.75rem]"
        style={{
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        }}
      >
        <h1 className="text-black sodo600 text-[0.825rem] tracking-[-0.56px]  ">
          {data.name}
        </h1>
      </div>
      <div className="border-[0.5px] border-[#E6E6E6] border-top-transparent border-bottom-transparent p-[0.75rem] ">
        {data.orders.map((dat, i) => (
          <KitchenOrderCardItem number={dat.number} item={dat.item} key={i} />
        ))}
      </div>

      <div
        className="bg-black py-[10px] px-[0.75rem] flex items-center justify-between "
        style={{
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      >
        <h1 className="text-[0.75rem] sodo600 text-white tracking-[-0.48px] ">
          Total Quantity - {data.packs}{" "}
        </h1>
        <h1 className="text-[0.75rem] inter600 text-white tracking-[-0.48px] ">
          {" "}
          ₦{data.amount}{" "}
        </h1>
      </div>
    </div>
  );
};

export default KitchenOrderCard;
