import React from "react";

const AutomatedOneTimeTab = ({ selected, setSelected }) => {
  return (
    <div className="flex items-center space-x-[2.5rem]">
      <h2
        onClick={() => {
          setSelected("automated");
        }}
        className={` ${
          selected === "automated"
            ? " text-[#072A85] sodo600 border border-transparent border-b-[#072A85]  "
            : "text-[#7E8493] sodo400"
        } text-[0.75rem]  tracking-[-0.015rem] pb-[0.5rem] cursor-pointer !my-0 `}
      >
        Automated
      </h2>

      <h2
        onClick={() => {
          setSelected("one-time");
        }}
        className={` ${
          selected === "one-time"
            ? " text-[#072A85] sodo600  border border-transparent border-b-[#072A85]  "
            : "text-[#7E8493] sodo400"
        } text-[0.75rem]  tracking-[-0.015rem] pb-[0.5rem] cursor-pointer !my-0 `}
      >
        One-time
      </h2>
    </div>
  );
};

export default AutomatedOneTimeTab;
