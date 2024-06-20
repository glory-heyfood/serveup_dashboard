import { sidebarData, storeSideBarData } from "@/data";
import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import StoreSideBarItem from "./StoreSideBarItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";
import { XIcon, menuGrid } from "@/SVGs";
import {
  toggleGridSidebar,
  toggleLoyaltyGridSidebar,
  toggleMarketingGridSidebar,
  toggleMobileAppGridSidebar,
  toggleWebsiteGridSidebar,
  toggleMenusGridSidebar,
  togglePayoutGridSidebar,
  toggleDineInGridSidebar,
} from "@/redux/features/gridSidebarSlice";

const GridSideBar = ({ btn, GridComponent, type }) => {
  const [ID, setID] = useState();
  const [storeId, setStoreId] = useState();
  const [grid, setGrid] = useState(true);

  const marketingGrid = useSelector(
    (state) => state.gridSidebar.showMarketingGridSidebar
  );
  const loyaltyGrid = useSelector(
    (state) => state.gridSidebar.showLoyaltyGridSidebar
  );

  const websiteGrid = useSelector(
    (state) => state.gridSidebar.showWebsiteGridSidebar
  );
  const mobileAppGrid = useSelector(
    (state) => state.gridSidebar.showMobileAppGridSidebar
  );
  const menusGrid = useSelector(
    (state) => state.gridSidebar.showMenusGridSidebar
  );
  const payoutGrid = useSelector(
    (state) => state.gridSidebar.showPayoutGridSidebar
  );
  const dineInGrid = useSelector(
    (state) => state.gridSidebar.showDineInGridSidebar
  );

  const showSidebar = useSelector((state) => state.sidebar.showSidebar);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (window.location.pathname === `/business/${ID}/marketing`) {
      dispatch(toggleMarketingGridSidebar(false));
    }
    if (window.location.pathname === `/business/${ID}/loyalty`) {
      dispatch(toggleLoyaltyGridSidebar(false));
    }
    if (window.location.pathname === `/business/${ID}/website`) {
      dispatch(toggleWebsiteGridSidebar(false));
    }
    if (window.location.pathname === `/business/${ID}/mobile`) {
      dispatch(toggleMobileAppGridSidebar(false));
    }
    if (window.location.pathname === `/business/${ID}/${storeId}/menus`) {
      dispatch(toggleMenusGridSidebar(false));
    }
    if (window.location.pathname === `/business/${ID}/${storeId}/payout`) {
      dispatch(togglePayoutGridSidebar(false));
    }
    if (window.location.pathname === `/business/${ID}/${storeId}/dine_in`) {
      dispatch(toggleDineInGridSidebar(false));
    }
  };

  useEffect(() => {
    if (window.location.pathname === `/business/${ID}/marketing`) {
      setGrid(marketingGrid);
    }

    if (window.location.pathname === `/business/${ID}/loyalty`) {
      setGrid(loyaltyGrid);
    }
    if (window.location.pathname === `/business/${ID}/website`) {
      setGrid(websiteGrid);
    }
    if (window.location.pathname === `/business/${ID}/mobile`) {
      setGrid(mobileAppGrid);
    }
    if (window.location.pathname === `/business/${ID}/${storeId}/menus`) {
      setGrid(menusGrid);
    }
    if (window.location.pathname === `/business/${ID}/${storeId}/payout`) {
      setGrid(payoutGrid);
    }
    if (window.location.pathname === `/business/${ID}/${storeId}/dine_in`) {
      setGrid(dineInGrid);
    }
  }, [
    marketingGrid,
    loyaltyGrid,
    websiteGrid,
    mobileAppGrid,
    menusGrid,
    payoutGrid,
    dineInGrid,
  ]);

  useEffect(() => {
    const id = window.location.pathname;
    console.log(id);
    let [empty, empty2, ID, storeId] = id.split("/");
    console.log(ID, storeId);
    setID(ID);
    setStoreId(storeId);
  }, []);

  return (
    <>
      <div
        className={`bg-[#00000096]  h-screen w-full fixed top-0 left-0 z-50 ${
          showSidebar ? "hidden" : "sidebarCont hidden"
        } `}
        onClick={() => {
          dispatch(toggleSidebar(true));
        }}
      ></div>
      <div
        className={`bg-white  animate05s  h-screen pt-[32px]  fixed top-0 left-0 z-50 sidebar pr-[21px]  w-full sm:w-[345px] max-w-[350px]   ${
          showSidebar ? "translate-x-[-100%]" : "translate-x-0  "
        } ${btn && " md:pt-[100px]"} `}
        style={{
          boxShadow: "1.1px 0px 0px 0px #E6E6E6",
        }}
      >
        {grid ? (
          // I had to use an array for some reason the components display using arrays instead

          <>
            <div className="flex items-center justify-between">
              <div
                className="bg-[#F0F0F0] w-fit rounded-[4px] p-[8px] ml-[24px] cursor-pointer"
                onClick={handleClick}
              >
                {menuGrid}
              </div>

              <span
                className="sideXIcon flex items-center justify-center h-[32px] w-[32px] cursor-pointer "
                onClick={() => {
                  dispatch(toggleSidebar(true));
                }}
              >
                {XIcon}
              </span>
            </div>

            {GridComponent}
          </>
        ) : (
          <div>
            <span
              className="sideXIcon flex items-center justify-center h-[32px] w-[32px] ml-[32px] mb-[32px]  cursor-pointer "
              onClick={() => {
                dispatch(toggleSidebar(true));
                setTimeout(() => {
                  dispatch(toggleGridSidebar(true));
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
                        data.text === "Dine-in"
                      }
                      href={`/business/${ID}/${storeId}${data.href}`}
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
                      // data.text === "Marketing" || data.text === "Loyalty rewards"
                      // 	? window.location.href
                      // 	: data.href
                      href={`/business/${ID}${data.href}`}
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

export default GridSideBar;
