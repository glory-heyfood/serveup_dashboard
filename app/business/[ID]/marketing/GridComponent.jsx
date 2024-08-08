import { menuGrid } from "@/SVGs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleGridSidebar } from "@/redux/features/gridSidebarSlice";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";

const GridComponent = () => {
  const dispatch = useDispatch();
  const [shaded, setShaded] = useState("campaigns");

  useEffect(() => {
    const url = window.location.hash.substr(1);
    console.log(url);

    if (url === "/campaigns") {
      setShaded("campaigns");
    } else if (url === "/billing") {
      setShaded("billing");
    } else {
      setShaded("subscribers");
    }
  }, []);
  return (
    <div>
      {" "}
      <div className="pr-[14px] mt-[20px] ">
        <a
          onClick={() => {
            dispatch(toggleSidebar(true));
          }}
          href="#/campaigns"
          className={`${
            shaded === "campaigns" ? "bg-[#F2F4F9]" : "bg-white"
          } pl-[24px] py-[16px] block   `}
        >
          <h2
            className={` ${
              shaded === "campaigns" ? "text-[#072A85]" : "text-black"
            } sodo600 tracking-[-0.28px] text-[14px]  `}
          >
            Campaigns
          </h2>
        </a>

        <a
          onClick={() => {
            dispatch(toggleSidebar(true));
          }}
          href="#/subscribers"
          className={`${
            shaded === "subscribers" ? "bg-[#F2F4F9]" : "bg-white"
          } pl-[24px] py-[16px] block   `}
        >
          <h2
            className={` ${
              shaded === "subscribers" ? "text-[#072A85]" : "text-black"
            } sodo600 tracking-[-0.28px] text-[14px]  `}
          >
            Subscribers
          </h2>
        </a>

        <a
          onClick={() => {
            dispatch(toggleSidebar(true));
          }}
          href="#/billing"
          className={`${
            shaded === "billing" ? "bg-[#F2F4F9]" : "bg-white"
          } pl-[24px] py-[16px] block   `}
        >
          <h2
            className={` ${
              shaded === "billing" ? "text-[#072A85]" : "text-black"
            } sodo600 tracking-[-0.28px] text-[14px]  `}
          >
            Billing
          </h2>
        </a>
      </div>
    </div>
  );
};

export default GridComponent;
