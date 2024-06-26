import { riderInstructionIcon, storeInstructionIcon } from "@/SVGs";
import React from "react";

const Instructions = ({ text, type }) => {
  return (
    <div
      className={`p-[1rem] rounded-[0.25rem]  w-full sm:w-[50%] md:w-[50%] lg:1/3 max-w-[400px] ${
        type === "store" ? "bg-[#F01C1C0D]" : "bg-[#1185070D]"
      } `}
    >
      <div className="flex items-center space-x-[0.2rem]">
        <span>
          {" "}
          {type === "store" ? storeInstructionIcon : riderInstructionIcon}{" "}
        </span>
        <h2
          className={`text-[0.75rem] sodo600 tracking-[-0.015rem] ${
            type === "store" ? "text-[#F01C1C]" : "text-[#118507]"
          }  `}
        >
          INSTRUCTIONS FOR {type === "store" ? "STORE" : "RIDER"}
        </h2>
      </div>

      <h2 className="text-black text-[0.75rem] sodo400 teacking-[-0.015rem] mt-[0.5rem] ">
        {text}
      </h2>
    </div>
  );
};

export default Instructions;
