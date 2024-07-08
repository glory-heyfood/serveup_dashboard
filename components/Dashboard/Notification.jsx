import { circleXIcon, storeIcon, storeIconBlack, storeIconSmall } from "@/SVGs";
import { bellIconRed, getTimeAgo } from "@/utils";
import { useState, useEffect } from "react";

const Notification = ({ data, onCancel, index }) => {
  const [show, setShow] = useState(true);

  const handleCancel = () => {
    setShow(false);
    onCancel(index);
  };

  return (
    <div
      className={` bg-white slide-in  w-full slide-animation  rounded-[0.25rem] relative `}
      style={{
        boxShadow: "1px 1px 4px 1px #E6E6E6",
      }}
    >
      <span className="absolute top-[-5px] left-[-5px]" onClick={handleCancel}>
        {circleXIcon}
      </span>

      <div>
        <div className="flex justify-between items-center p-[0.75rem] ">
          <div className="flex flex-col items-start space-y-[0.5rem]">
            <div className="flex items-center space-x-[0.5rem]">
              <span>{bellIconRed}</span>
              <h2 className="text-[#5F6370] text-[0.75rem] tracking-[-0.03rem] sodo400 ">
                New order
              </h2>
            </div>
            <h2 className="text-black text-[0.75rem] tracking-[-0.03rem] sodo400 ">
              {data?.contact.name}
            </h2>
          </div>
          <div className="flex flex-col items-end space-y-[0.5rem]  ">
            <div className="flex items-center space-x-[0.5rem]">
              <span>{storeIconSmall}</span>
              <h2 className="text-[#000] text-[0.75rem] tracking-[-0.015rem] sodo400 ">
                {data?.store_name}
              </h2>
            </div>
            <h2 className="text-[#5F6370] text-[0.75rem] tracking-[-0.03rem] sodo400 ">
              <span className="capitalize" >{data?.type}</span> . {getTimeAgo(data?.created_date)}
            </h2>
          </div>
        </div>

        <hr className=" h-[0.5px] w-full bg-[#E6E6E6]  " />

        {data?.items.map((item) => (
          <div className="flex items-center space-x-[0.5rem] p-[0.75rem] ">
            <span className="border-[0.5px] border-[#E6E6E6] rounded-[0.125rem] text-[0.75rem] sodo600 text-black tracking-[-0.03rem] flex items-center justify-center py-[0.0635rem] px-[0.1875rem] ">
              {item.quantity}x
            </span>
            <h2 className="text-black text-[0.75rem] tracking-[-0.03rem] sodo400 ">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
