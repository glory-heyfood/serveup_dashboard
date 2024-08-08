import { XIcon } from "@/SVGs";
import React, { useState } from "react";
import { formatMoney, getDateAndTime, getStore } from "@/utils";
import RefundsCard from "@/components/RefundCard";
import ItemOrderCard from "@/components/ItemOrderCard";
import SidebarText from "../[storeID]/order_history/SidebarText";

const CampaignTableSideBarDetails = ({ data }) => {
  console.log(data);
  return (
    <div className="pt-[2em] pl-[2.5em] pr-[1.5em]">
      <div className="flex items-center space-x-[0.5rem] mb-[1rem]">
        <h1 className="dashHeader tracking-[-0.8px] !mb-[0px]">
          {/* {data?.contact?.name} */}
          Weekly Newsletter
        </h1>{" "}
      </div>
      <div className="flex items-center space-x-[2rem] mb-[1.5rem]">
        <SidebarText header="Type" text="Email" textFontSize="text-[0.75rem]" />
        <SidebarText
          header="Delivery Date"
          text="Oct 4, 2023 . 10:00 AM"
          textFontSize="text-[0.75rem]"
        />
      </div>

      <div className="w-full md:w-[60%] lg:w-[170px] mb-[1.5rem]">
        <SidebarText
          header="Delivered"
          text={formatMoney(254)}
          textFontSize="text-[0.75rem]"
        />
      </div>

      <div className="flex items-start flex-col space-y-[1.5rem] mb-[2.25rem]">
        <SidebarText
          header="Campaign type"
          text="One-time"
          textFontSize="text-[0.75rem]"
        />
        <SidebarText
          header="Template"
          text="Newsletter"
          textFontSize="text-[0.75rem]"
        />
        <SidebarText
          header="Location"
          text="Toasties Ikeja, Toasties Lekki"
          textFontSize="text-[0.75rem]"
        />
        <SidebarText
          header="Subscribers"
          text="All Subscribers"
          textFontSize="text-[0.75rem]"
        />
      </div>
    </div>
  );
};

export default CampaignTableSideBarDetails;
