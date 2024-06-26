import { clockBlueIcon, clockIconBlack } from "@/SVGs";
import React from "react";

const TimeComp = ({
  icon,
  text,
  handleClick,
  readyOrderTime,
  handleTime,
  activeIcon,
  time,
}) => {
  return (
    <div
      className={`flex items-center space-x-[4px] px-[10px] py-[15px] rounded-[4px] min:w-[140px]  hover:bg-[#F2F4F9] cursor-pointer ${
        readyOrderTime === text
          ? "border-[2px] border-[#4971D9] bg-[#F2F4F9]"
          : " border border-[#E6E6E6]"
      } `}
      onClick={() => {
        handleClick(text);
        if (time) {
          const date = new Date(Date.now() + time * 60 * 1000);
          handleTime(date);
        }
      }}
    >
      <span>
        {icon
          ? readyOrderTime === text
            ? activeIcon
            : icon
          : readyOrderTime === text
          ? clockBlueIcon
          : clockIconBlack}
      </span>
      <h2
        className={` text-[0.825rem] tracking-[-0.56px] sodo400 ${
          readyOrderTime === text ? "text-[#072A85]" : "text-black"
        } `}
      >
        {text}
      </h2>
    </div>
  );
};

export default TimeComp;
