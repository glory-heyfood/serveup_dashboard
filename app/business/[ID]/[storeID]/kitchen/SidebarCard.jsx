import { calenderIconWhite } from "@/SVGs";
import React from "react";

const SidebarCard = ({
  data,
  name,
  time,
  type,
  status,
  scheduled,
  handleClick,
}) => {
  return (
    <div
      className={`${
        status === "active" ? "bg-[#F2F4F9]" : "border border-[#E6E6E6]"
      } rounded-[4px] relative p-[1rem] cursor-pointer hover:bg-[#F2F4F9]`}
      onClick={() => {
        handleClick(data);
      }}
    >
      {scheduled && (
        <div
          className="flex items-center space-x-[4px] bg-[#FF5F00] absolute top-0 right-0 p-[0.5rem] "
          style={{
            borderBottomLeftRadius: "10px",
            borderTopRightRadius: "5px",
          }}
        >
          <span>{calenderIconWhite}</span>
          <h2 className="text-white text-[10px] sodo600 tracking-[-0.4px]">
            Scheduled
          </h2>
        </div>
      )}
      <h1
        className={`${
          status === "active" ? "text-[#072A85]" : "text-black"
        } text-[0.845rem] sodo600 tracking-[-0.56px]`}
      >
        {name}
      </h1>
      <div className="flex items-center space-x-[4px]">
        <h2
          className={` tracking-[-0.48px] sodo400 text-[0.75rem] ${
            status === "active" ? "text-[#072AB5" : "text-black"
          } `}
        >
          {time}
        </h2>
        <span>.</span>
        <h2
          className={`tracking-[-0.48px] sodo400 text-[0.75rem] ${
            status === "active" ? "text-[#072AB5" : "text-black"
          } `}
        >
          {type}
        </h2>
      </div>
    </div>
  );
};

export default SidebarCard;
