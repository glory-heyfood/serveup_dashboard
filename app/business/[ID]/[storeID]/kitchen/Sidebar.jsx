import { XIcon, bellIconSmall } from "@/SVGs";
import React, { useEffect, useState } from "react";
import SidebarTab from "./SidebarTab";
import CustomSearch from "@/components/CustomSearch";
import SidebarCard from "./SidebarCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";
import { fetchVendorOrdersForTheDay } from "@/redux/features/stores/kitchenSlice";
import { getTimeAgo } from "@/utils";

const Sidebar = ({
  handleClick,
  setTab,
  tab,
  orderSelected,
  setOrderSelected,
}) => {
  const dispatch = useDispatch();
  const pendingOrders = useSelector((state) => state.kitchen.pendingOrders);
  const preparingOrders = useSelector((state) => state.kitchen.preparingOrders);
  const readyOrders = useSelector((state) => state.kitchen.readyOrders);

  const [arr, setArr] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchVendorOrdersForTheDay());
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    let array = [];
    tab === "Needs Action"
      ? (array = pendingOrders)
      : tab === "Preparing"
      ? (array = preparingOrders)
      : (array = readyOrders);
    setArr(array);
  }, [tab, pendingOrders, preparingOrders, readyOrders]);

  return (
    <div className="shrink-0">
      <div className="flex items-center space-x-[1rem]">
        <span
          onClick={() => {
            handleClick();
          }}
        >
          {" "}
          {XIcon}{" "}
        </span>
        <h1 className="sodo700 tracking-[-0.8px] text-[1.25rem]">Kitchen</h1>
      </div>

      <div className="flex space-x-[0.75rem] items-center mt-[3rem] mb-[1.5rem] ">
        <SidebarTab
          handleClick={() => {
            setTab("Needs Action");
          }}
          name="Needs Action"
          number={pendingOrders?.length}
          status={tab === "Needs Action" && "active"}
          icon={(color) => {
            bellIconSmall(color);
          }}
        />
        <SidebarTab
          handleClick={() => {
            setTab("Preparing");
          }}
          name="Preparing"
          number={preparingOrders?.length}
          status={tab === "Preparing" && "active"}
          icon={(color) => {
            bellIconSmall(color);
          }}
        />
        <SidebarTab
          handleClick={() => {
            setTab("Ready");
          }}
          name="Ready"
          number={readyOrders?.length}
          status={tab === "Ready" && "active"}
          icon={(color) => {
            bellIconSmall(color);
          }}
        />
      </div>

      <CustomSearch placeholder="Search" fullWidth />

      <div className="flex flex-col space-y-[1.25rem] mt-[1.5rem]">
        {arr.map((order) => (
          <SidebarCard
            name={order?.contact?.name}
            time={getTimeAgo(order?.created_date)}
            type={order?.type}
            status={orderSelected?.id === order?.id && "active"}
            data={order}
            handleClick={(data) => {
              console.log(data, "da");
              setOrderSelected(data);
            }}
            scheduled={order?.is_schedule_order}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
