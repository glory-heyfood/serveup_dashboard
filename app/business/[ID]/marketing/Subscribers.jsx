import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import React, { useEffect, useState } from "react";
import { plusIcon } from "@/SVGs";
import SubscriberTable from "./SubscriberTable";

const Subscribers = ({ handleClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className="flex flex-col  md:flex-row md:items-center justify-between mb-[32px]  ">
        <div className="order-2 md:order-1 w-full md:w-fit">
          <CustomSearch fullWidth placeholder="Search" />
        </div>
      </div>

      <SubscriberTable />
    </div>
  );
};

export default Subscribers;
