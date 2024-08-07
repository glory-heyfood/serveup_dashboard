import { plusIcon, shieldIcon } from "@/SVGs";
import { Button } from "@mui/material";
import React from "react";
import DashBtn from "./buttons/DashBtn";

const EmptyState = ({ header, text, btnText, handleClick, icon, border }) => {
  return (
    <div
      className={` ${
        border ? "border border-[#E6E6E6] rounded-[8px]" : ""
      } flex items-center justify-center flex-col space-y-[1em] py-[1.5em] ${
        btnText ? " py-[84px]  md:py-[2.5em]" : "md:py-[3.75em]"
      } `}
    >
      <div className="flex flex-col space-y-[1.25em] items-center">
        <div className="h-[80px] w-[80px] p-[16px] flex items-center justify-center border-[2px] rounded-[100px] border-black">
          {icon}
        </div>
        <div className="flex flex-col space-y-[0.25em] items-center justify-center">
          <h1 className="text-[1em] text-black tracking-[-0.64px] sodo700 ">
            {" "}
            {header}
          </h1>
          <p className="text-[#7E8493] text-[12px] tracking-[-0.48px] sodo400 ">
            {text}
          </p>
        </div>
      </div>
      {btnText && (
        <div className="inline">
          <DashBtn
            text={btnText}
            padding="8px 14px"
            handleClick={handleClick}
            icon={plusIcon}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
