import { bikeIcon, rightArr } from "@/SVGs";
import { getTimeFromDate } from "@/utils";
import React from "react";

const NewOrderCard = ({ data }) => {
  return (
    <div className="border border-[#E6E6E6] rounded-[4px] pt-[1.25em] pb-[0.75em] pr-[1.2em] pl-[1.25em] ">
      <div className="w-full flex flex-col space-y-[0.3em]">
        <div className="flex justify-between items-center w-full">
          <h2 className="md:tracking-[-0.7px] text-[16px] tracking-[-0.64px]  sodo600">
            {data?.store_name}
          </h2>
          <h3 className="tracking-[-0.48px] sodo600 text-[#7E8493]">
            {getTimeFromDate(data?.created_date)}
          </h3>
        </div>
        <h3 className="text-[#5F6370]  sodo400 tracking-[-0.6px]">
          {data?.customer?.name}
        </h3>
        {data.items.map((item) => (
          <>
            <div className="flex items-start space-x-[0.5em]">
              <h3 className=" text-black text-[11.5px] sodo700 border-[0.5px] rounded-[2px] py-[1px] px-[2px]  border-[#E6E6E6]">
                {item.quantity}x
              </h3>
              <div className="flex flex-col space-y-[0.25em]">
                <h3 className="tracking-[-0.6px] sodo600 text-[#000]">
                  {item.name}
                </h3>
                {item.options.map((opt) => (
                  <h3 className="tracking-[-0.38px] sodo400 leading-[15px] text-[#7E8493] ">
                    {opt.quantity}x {opt.name}
                  </h3>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="flex items-center justify-between mt-[0.8em] ">
        <div className="flex space-x-[0.25em] items-start">
          <span> {bikeIcon} </span>
          <h3 className="tracking-[-0.48px] sodo600 font-[400] ">
            {data.type}
          </h3>
        </div>

        <div className="inline-flex space-x-[0.25em] py-[0.375em] px-[0.75em] bg-[#F0F0F0] rounded-[120px] items-center justify-center ">
          <h3 className="tracking-[-0.46px] sodo600 ">Go to store</h3>
          <span> {rightArr} </span>
        </div>
      </div>
    </div>
  );
};

export default NewOrderCard;
