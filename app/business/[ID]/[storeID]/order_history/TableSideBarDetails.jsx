import { XIcon } from "@/SVGs";
import React, { useState } from "react";
import SidebarText from "./SidebarText";
import SidebarOrderCard from "./SidebarOrderCard";
import { formatMoney, getDateAndTime, getStore } from "@/utils";
import RefundsCard from "@/components/RefundCard";
import ItemOrderCard from "@/components/ItemOrderCard";

const TableSideBarDetails = ({ data }) => {
  console.log(data);
  return (
    <div className="pt-[2em] pl-[2.5em] pr-[1.5em]">
      <div className="flex items-center space-x-[0.5rem] mb-[1rem]">
        <h1 className="dashHeader tracking-[-0.8px] !mb-[0px]">
          {data?.contact?.name}
        </h1>{" "}
      </div>
      <div className="flex items-center space-x-[0.75em] mb-[1.5rem]">
        {/* <div className="bg-[#F0F3FC] cursor-pointer rounded-[4px] flex items-center  justify-center py-[0.5em] px-[0.75em] ">
          <h3 className="text-[#072A85] text-[0.75em] sodo400 tracking-[-0.24px]">
           
            ezomonglory01@gmail.com
          </h3>
        </div> */}

        <div className="bg-[#F0F3FC] cursor-pointer rounded-[4px] flex items-center  justify-center py-[0.5em] px-[0.75em] ">
          <h3 className="text-[#072A85] text-[0.75em] sodo400 tracking-[-0.24px]">
            {data.contact?.phone}
            {/* 09074087328 */}
          </h3>
        </div>
      </div>

      <div className="w-full md:w-[60%] lg:w-[170px] mb-[1.5rem]">
        <SidebarText
          header={
            data?.type === "delivery"
              ? "Delivery Address"
              : data?.type === "pickup"
              ? "Pickup Address"
              : "Dine-in Details"
          }
          text={
            data?.type === "delivery"
              ? data?.end_location.address
              : data?.type === "pickup"
              ? data?.start_location.address
              : `${getStore()?.name} . ${data?.qr_code_details.label}`
          }
        />
      </div>

      <div className="flex items-center space-x-[2rem] mb-[2.25rem]">
        <SidebarText
          header="Order date"
          text={getDateAndTime(data?.created_date)}
          textFontSize="text-[0.75rem]"
        />
        <SidebarText
          header="Order Type"
          text={data?.type}
          textFontSize="text-[0.75rem]"
        />
        <SidebarText
          header="Order Channel"
          text={data?.channel}
          textFontSize="text-[0.75rem]"
        />
      </div>

      <div className="flex flex-col space-y-[1.25rem]">
        <h1 className="text-black sodo700 text-[0.825rem] tracking-[-0.56px] ">
          Order details{" "}
        </h1>

        {data?.items.map((item) => (
          <ItemOrderCard data={item} />
        ))}
      </div>

      <div className="w-full flex flex-col space-y-[0.5rem] mt-[2rem]">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-[0.75rem] tracking-[-0.48px] sodo700 ">
            Subtotal
          </h1>
          <h1 className="text-black text-[0.75rem] tracking-[-0.48px] inter600 ">
            ₦{formatMoney(data?.sub_total)}
          </h1>
        </div>
        {data?.type === "delivery" && (
          <div className="flex items-center justify-between">
            <h1 className="text-black text-[0.75rem] tracking-[-0.48px] sodo700 ">
              Delivery fee
            </h1>
            <h1 className="text-black text-[0.75rem] tracking-[-0.48px] inter600 ">
              ₦{formatMoney(data?.delivery_fee)}
            </h1>
          </div>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-black text-[0.75rem] tracking-[-0.48px] sodo700 ">
            Total
          </h1>
          <h1 className="text-black text-[0.75rem] tracking-[-0.48px] inter600 ">
            ₦{formatMoney(data?.store_total)}
          </h1>
        </div>
      </div>

      {data?.refund && (
        <div className="mt-[2rem] w-full">
          <h1 className="text-black sodo700 text-[0.825rem] tracking-[-0.56px] mb-[1rem] ">
            Refunds
          </h1>
          <div className="flex flex-col space-y-[1rem] w-full">
            {data?.refund.refundFees.map((fees) => (
              <RefundsCard data={fees} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSideBarDetails;
