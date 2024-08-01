import React, { useState } from "react";
import LabelInput from "./LabelInput";

const Label = ({ label }) => {
  return <h1 className="text-[13px] sodo700 tracking-[-0.52px]  ">{label}</h1>;
};

const LabelTime = ({
  label,
  name,
  handleChange,
  expiryDate,
  value,
  setExpiryDate,
}) => {
  return (
    <LabelInput
      width="md:w-[35%]"
      childWidth="md:w-[65%]"
      label={<Label label={label} />}
      padding="13px 0px 14px 16px"
    >
      <div className="flex justify-between items-center pr-[16px]">
        <input
          type="text"
          placeholder="0"
          value={value}
          className="outline-none sodo400 tracking-[-0.52px] text-[13px] w-full md:w-[40%] "
          name={name}
          onChange={(e) => handleChange(e)}
        />
        <div className=" flex space-x-[4px] ">
          <div
            className={`${
              expiryDate === "Days" ? "border-[1.5px] border-[#4971D9] " : ""
            } rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
            onClick={() => {
              setExpiryDate("Days");
            }}
          >
            <h3
              className={`${
                expiryDate === "Days" ? "text-[#072A85] " : "text-black"
              } tracking-[-0.48px] text-[12px] sodo600 `}
            >
              <span>Days</span>
            </h3>
          </div>

          <div
            className={`${
              expiryDate === "Weeks" ? "border-[1.5px] border-[#4971D9] " : ""
            } rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
            onClick={() => {
              setExpiryDate("Weeks");
            }}
          >
            <h3
              className={`${
                expiryDate === "Weeks" ? "text-[#072A85] " : "text-black"
              } tracking-[-0.48px] text-[12px] sodo600 `}
            >
              <span>Weeks</span>
            </h3>
          </div>

          <div
            className={`${
              expiryDate === "Months" ? "border-[1.5px] border-[#4971D9] " : ""
            } rounded-[4px] px-[9px] py-[7px] bg-[#F0F0F0] cursor-pointer`}
            onClick={() => {
              setExpiryDate("Months");
            }}
          >
            <h3
              className={`${
                expiryDate === "Months" ? "text-[#072A85] " : "text-black"
              } tracking-[-0.48px] text-[12px] sodo600 `}
            >
              <span>Months</span>
            </h3>
          </div>
        </div>
      </div>
    </LabelInput>
  );
};

export default LabelTime;
