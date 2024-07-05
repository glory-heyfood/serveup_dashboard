import React from "react";
import ItemOrderCardOptions from "./ItemOrderCardOptions";

const ItemOrderCard = ({ data }) => {
  return (
    <div className="flex items-start space-x-[0.5rem] ">
      <div className="flex items-center justify-center border-[0.5px] border-[#E6E6E6] rounded-[0.125rem] px-[0.19rem] py-[0.06rem] shrink-0">
        <h1 className="text-black text-[0.725rem] sodo600 tracking-[-0.03rem] ">
          {data?.quantity}x
        </h1>
      </div>

      <div className="w-full flex-grow">
        <h2 className="text-black text-[0.725rem] sodo600 tracking-[-0.03rem] ">
          {data?.name}
        </h2>

        <div className="mt-[0.75rem] ">
          <ItemOrderCardOptions
            amount={data?.price}
            number={data?.quantity}
            item={data?.name}
            option="Base Portion"
          />
          {data?.options.map((opt) => (
            <ItemOrderCardOptions
              amount={opt.amount}
              number={opt.quantity}
              option={opt.title}
              item={opt.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemOrderCard;
