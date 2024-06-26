import { XIcon, bellIconSmall, noOrderIcon, prepIcon, readyIcon } from "@/SVGs";
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

  const fetchOrdersRecursively = () => {
    dispatch(fetchVendorOrdersForTheDay())
      .unwrap()
      .then((res) => {
        setTimeout(fetchOrdersRecursively, 2000); // Schedule next fetch in 30 seconds ..on prod change to 30
      })
      .catch((err) => {
        setTimeout(fetchOrdersRecursively, 2000); // Schedule next fetch in 30 seconds ..on prod change to 30
      });
  };

  useEffect(() => {
    fetchOrdersRecursively(); // Initial call to start fetching recursively
    return () => {
      // Clear any pending timeouts when component unmounts
      clearTimeout(fetchOrdersRecursively);
    };
  }, []);

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
    <div className="shrink-0 ">
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
            if (pendingOrders.length > 0) {
              setOrderSelected(pendingOrders[0]);
            } else {
              setOrderSelected([]);
            }
          }}
          name="Needs Action"
          number={pendingOrders?.length}
          status={tab === "Needs Action" && "active"}
          icon={(color) => bellIconSmall(color)}
        />
        <SidebarTab
          handleClick={() => {
            setTab("Preparing");
            if (preparingOrders.length > 0) {
              setOrderSelected(preparingOrders[0]);
            } else {
              setOrderSelected([]);
            }
          }}
          name="Preparing"
          number={preparingOrders?.length}
          status={tab === "Preparing" && "active"}
          icon={(color) => prepIcon(color)}
        />
        <SidebarTab
          handleClick={() => {
            setTab("Ready");
            if (readyOrders.length > 0) {
              setOrderSelected(readyOrders[0]);
            } else {
              setOrderSelected([]);
            }
          }}
          name="Ready"
          number={readyOrders?.length}
          status={tab === "Ready" && "active"}
          icon={(color) => readyIcon(color)}
        />
      </div>

      <CustomSearch placeholder="Search" fullWidth />

      <div className="flex flex-col space-y-[1.25rem] mt-[1.5rem] h-full  ">
        {arr.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-[40%] space-y-[0.5rem] ">
            <span>{noOrderIcon}</span>
            <h2 className="text-[1rem] sodo600 tracking-[-0.04rem]  ">
              No ongoing orders
            </h2>
          </div>
        ) : (
          arr.map((order) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
