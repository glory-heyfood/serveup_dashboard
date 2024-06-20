import { storeColorIcon, storeRightIcon } from "@/SVGs";
import { setItemWithEvent } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const StoresItem = ({ data, businessID }) => {
  const router = useRouter();  

  return (
    <div
      className="w-full h-[3.56em] flex items-center justify-between my-[0.5px] cursor-pointer"
      style={{
        background: "#FFF",
        boxShadow: " 0px 1px 0px 0px #F0F0F0",
      }}
      onClick={() => {
        router.push(`/business/${businessID}/${data?.id}`);
        setItemWithEvent("serveup_store", JSON.stringify(data));
      }}
    >
      <div className="flex items-center justify-center space-x-[1.6em]">
        <div className="bg-[#F2F4F9] rounded-[4px] p-[0.375em] flex items-center justify-center ">
          {storeColorIcon}
        </div>
        <h3 className="text-[1em] tracking-[-0.32px] md:text-[0.875em] md:tracking-[-0.26px] sodo600 ">
          {data?.name}
        </h3>
      </div>
      <div className="hidden md:block">{storeRightIcon}</div>
    </div>
  );
};

export default StoresItem;
