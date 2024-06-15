"use client";
import { checkBoxIcon, clockBlueIcon, clockIconDisabled } from "@/SVGs";
import LabelInput from "@/components/label/LabelInput";
import { convertTimeToDayjsFormat, convertTo24Hour } from "@/utils";
import React, { useEffect, useState } from "react";

const Label = ({ label, handleClick, data, checked }) => {
  const [check, setCheck] = useState(checked ? checked : false);
  return (
    <div
      className="flex items-center space-x-[1em] cursor-pointer"
      onClick={() => {
        handleClick(label);
        setCheck(!check);
        data.workingDays = !check;
      }}
    >
      {/* <span>{checkBoxIcon}</span> */}
      <span>
        <input type="checkbox" checked={check} />
      </span>
      <h2 className="text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]">
        {label}
      </h2>
    </div>
  );
};

const LabelDateInput = ({
  label,
  time,
  handleClick,
  disabled,
  data,
  checked,
  timeValues,
}) => {
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();

  useEffect(() => {
    if (timeValues) {
      const openTime = convertTo24Hour(timeValues.open);
      const closeTime = convertTo24Hour(timeValues.close);
      setOpenTime(openTime);
      setCloseTime(closeTime);
    }
  }, [timeValues]);

  return (
    <LabelInput
      padding="13px 0px 14px 16px"
      label={
        <Label
          label={label}
          handleClick={handleClick}
          data={data}
          checked={checked}
        />
      }
    >
      <div className="w-[100%] flex items-center justify-between">
        <div
          className="flex items-center space-x-[0.5em]"
          onClick={() => {
            data.status = "open";
          }}
        >
          <h2 className="text-[0.81em] sodo300 tracking-[-0.52px] text-[#A9ADB5]">
            Open
          </h2>
          <div className="flex items-center space-x-[0.25em]">
            {" "}
            <span> {disabled ? clockIconDisabled : clockBlueIcon} </span>{" "}
            <h2 className="text-[0.81em] sodo600 tracking-[-0.52px] text-[#072A85]">
              {openTime ? time(openTime) : time()}
            </h2>{" "}
          </div>
        </div>

        <div
          className="flex items-center space-x-[0.5em]"
          onClick={() => {
            data.status = "close";
          }}
        >
          <h2 className="text-[0.81em] sodo300 tracking-[-0.52px] text-[#A9ADB5]">
            Close
          </h2>
          <div className="flex items-center space-x-[0.25em]">
            {" "}
            <span> {disabled ? clockIconDisabled : clockBlueIcon} </span>{" "}
            <h2 className="text-[0.81em] sodo600 tracking-[-0.52px] text-[#072A85]">
              {closeTime ? time(closeTime) : time()}
            </h2>{" "}
          </div>
        </div>
      </div>
    </LabelInput>
  );
};

export default LabelDateInput;
