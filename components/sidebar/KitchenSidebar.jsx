import { sidebarData, storeSideBarData } from "../../data";
import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import StoreSideBarItem from "./StoreSideBarItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/features/toggleSideBarSlice";
import { XIcon, menuGrid } from "../../SVGs";
import {
  toggleGridSidebar,
  toggleLoyaltyGridSidebar,
  toggleMarketingGridSidebar,
  toggleMobileAppGridSidebar,
  toggleWebsiteGridSidebar,
  toggleMenusGridSidebar,
  togglePayoutGridSidebar,
  toggleDineInGridSidebar,
  toggleKitchenSidebar,
} from "../../redux/features/gridSidebarSlice";
import Sidebar from "../../app/business/[ID]/[storeID]/kitchen/Sidebar";

const KitchenSidebar = ({
  btn,
  GridComponent,
  type,
  tab,
  setTab,
  orderSelected,
  setOrderSelected,
}) => {
  const [grid, setGrid] = useState(true);
  const [storeId, setStoreId] = useState();
  const [id, setId] = useState();

  const kitchenSidebar = useSelector(
    (state) => state.gridSidebar.showKitchenSidebar
  );

  const showSidebar = useSelector((state) => state.sidebar.showSidebar);

  const dispatch = useDispatch();

  const handleClick = () => {
    const url = window.location.href;
    const parts = url.split("/");
    console.log(parts, "part");
    const id = parts[parts.length - 3];
    const storeId = parts[parts.length - 2];

    if (window.location.pathname === `/business/${id}/${storeId}/kitchen`) {
      dispatch(toggleKitchenSidebar(false));
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const parts = url.split("/");
    const id = parts[parts.length - 3];
    setId(id);
    const storeId = parts[parts.length - 2];
    setStoreId(storeId);

    if (window.location.pathname === `/business/${id}/${storeId}/kitchen`) {
      setGrid(kitchenSidebar);
    }
  }, [kitchenSidebar]);

  return (
    <>
      <div
        className={`bg-[#00000096]  h-screen w-full fixed top-0 left-0 z-50  ${
          showSidebar ? "hidden" : "sidebarCont hidden"
        } `}
        onClick={() => {
          dispatch(toggleSidebar(true));
          setTimeout(() => {
            dispatch(toggleKitchenSidebar(true));
          }, 1000);
        }}
      ></div>
      <div
        className={`bg-white  animate05s overflow-auto scroll-hidden h-screen pt-[32px]  fixed top-0 left-0 z-50 sidebar px-[1.5rem] w-full sm:w-[380px] lg:w-full  pb-[2rem]   ${
          showSidebar ? "translate-x-[-100%]" : "translate-x-0  "
        } ${btn && " md:pt-[100px]"} `}
        style={{
          boxShadow: "1.1px 0px 0px 0px #E6E6E6",
        }}
      >
        {grid ? (
          <Sidebar
            handleClick={handleClick}
            tab={tab}
            setTab={setTab}
            orderSelected={orderSelected}
            setOrderSelected={setOrderSelected}
          />
        ) : (
          <div>
            <span
              className="sideXIcon flex items-center justify-center h-[32px] w-[32px] ml-[32px] mb-[32px]  cursor-pointer "
              onClick={() => {
                dispatch(toggleSidebar(true));
                setTimeout(() => {
                  dispatch(toggleKitchenSidebar(true));
                }, 1000);
              }}
            >
              {XIcon}
            </span>
            <div className=" grid grid-cols-4 md:grid-cols-3 gap-x-[32px] md:gap-x-[1.5em] gap-y-[50px] md:gap-y-[1.5em] ml-[20.2px]">
              {type === "store"
                ? storeSideBarData.map((data, i) => (
                    <StoreSideBarItem
                      noClick={
                        data.text === "Menus" ||
                        data.text === "Payout" ||
                        data.text === "Dine-in" ||
                        data.text === "Kitchen"
                      }
                      href={`/business/${id}/${storeId}${data.href}`}
                      icon={data.icon}
                      text={data.text}
                      key={i}
                      bgColor={data.bgColor}
                    />
                  ))
                : sidebarData.map((data, i) => (
                    <SidebarItem
                      noClick={
                        data.text === "Marketing" ||
                        data.text === "Loyalty rewards" ||
                        data.text === "Website" ||
                        data.text === "Mobile App"
                          ? true
                          : false
                      }
                      href={`/business/${id}${data.href}`}
                      icon={data.icon}
                      text={data.text}
                      key={i}
                    />
                  ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KitchenSidebar;
