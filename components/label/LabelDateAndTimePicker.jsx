import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import {
  calenderIconBlue,
  chevronIconDownBlack,
  clockBlueIcon,
  clockIconDisabled,
} from "@/SVGs";

import LabelInput from "./LabelInput";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";

const LabelDateAndTimePicker = ({
  label,
  handleClick,
  disabled,
  defaultTime,
  defaultDate,
  setTime,
  setDate,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs(Date.now()));
  const [displayDate, setDisplayDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(dayjs(Date.now()));
  const [displayTime, setDisplayTime] = useState("");

  const handleDateChange = (newDate) => {
    // setDatePickerVisibility(t);
    setSelectedDate(newDate);
    const date = new Date(newDate);
    setDate(date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDisplayDate(formattedDate);
  };

  const handleTimeChange = (newTime) => {
    const date = new Date(newTime);
    setTime(date);
    setSelectedTime(date);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setDisplayTime(formattedTime);
  };

  const Label = ({ label, handleClick, data, checked }) => {
    const [check, setCheck] = useState(checked ? checked : false);
    return (
      <div
        className="flex items-center space-x-[1em] cursor-pointer"
        onClick={() => {
          //   handleClick(label);
          setCheck(!check);
          //   data.checked = !check;
        }}
      >
        {/* <span>{checkBoxIcon}</span> */}
        <span>
          <input type="checkbox" checked={true} onChange={() => {}} />
        </span>
        <h2 className="text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]">
          {label}
        </h2>
      </div>
    );
  };

  useEffect(() => {
    if (defaultDate) {
      setDisplayDate(defaultDate);
    }
    if (defaultTime) {
      setDisplayTime(defaultTime);
    }
  }, []);

  return (
    <LabelInput
      padding="13px 0px 14px 16px"
      label={<Label label={label} />}
      rounded="rounded-none"
    >
      <div className="w-[80%] flex items-center justify-between">
        <div className="">
          <div
            className="flex items-center space-x-[0.5rem] cursor-pointer"
            onClick={() => setDatePickerVisibility(true)}
          >
            {" "}
            <span>
              {" "}
              {disabled ? calenderIconWhite : calenderIconBlue}{" "}
            </span>{" "}
            <h2 className="text-[0.81rem] sodo400 tracking-[-0.0325rem] text-[#072A85]">
              {displayDate === "" ? "Select date" : displayDate}
            </h2>
          </div>

          <DatePicker
            isDatePickerVisible={isDatePickerVisible}
            setDatePickerVisibility={(e) => {
              console.log(e);
              setDatePickerVisibility(false);
            }}
            selectedDate={selectedDate}
            disablePast={true}
            dateAndTime={true}
            handleDateChange={handleDateChange}
          />
        </div>

        <div className="">
          <div
            className="flex items-center space-x-[0.5rem] cursor-pointer "
            onClick={() => setTimePickerVisibility(true)}
          >
            {" "}
            <span> {disabled ? clockIconDisabled : clockBlueIcon} </span>{" "}
            <h2 className="text-[0.81rem] sodo400 tracking-[-0.0325rem] text-[#072A85]">
              {displayTime === "" ? "Select time" : displayTime}
            </h2>
          </div>

          <TimePicker
            isTimePickerVisible={isTimePickerVisible}
            setTimePickerVisibility={setTimePickerVisibility}
            selectedTime={selectedTime}
            dateAndTime={true}
            disablePast={true}
            handleTimeChange={handleTimeChange}
          />
        </div>
      </div>
    </LabelInput>
  );
};

export default LabelDateAndTimePicker;
