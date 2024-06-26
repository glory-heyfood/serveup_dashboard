import React, { useEffect, useState } from "react";
import Modal from "./modal/Modal";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import dayjs from "dayjs";
import { chevronIconDownBlack } from "@/SVGs";
import DashBtn from "./buttons/DashBtn";
import OuterModal from "./modal/OuterModal";

const DateAndTimePicker = ({ handleChange, handleClick, handleCancel }) => {
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
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDisplayDate(formattedDate);
  };

  const handleTimeChange = (newTime) => {
    const date = new Date(newTime);
    console.log(date);
    setSelectedTime(date);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setDisplayTime(formattedTime);
  };

  return (
    <div className="">
      <OuterModal
        handleClick={handleClick}
        header="Select date and time"
        maxWidth=" md:max-w-[400px]"
        minHeight=" md:min-h-[600px]"
        relative={true}
        handleCancel={handleCancel}
      >
        <div className="flex flex-col space-y-[4px]">
          <h1 className="text-black text-[1rem] tracking-[-0.32px] sodo400 ">
            Choose a time
          </h1>
          <h2 className="text-[#535353] text-[0.75rem] sodo400  ">
            when will this order be ready.{" "}
          </h2>
        </div>

        <div className="mt-[2.5rem] flex flex-col space-y-[2rem]">
          <div>
            <div
              className="flex items-center justify-between border border-transparent border-b-[#D9D9D9] cursor-pointer"
              onClick={() => setDatePickerVisibility(true)}
            >
              <h1 className="text-black text-[0.75rem] sodo400 mb-[10px]">
                {displayDate === "" ? "Select a date" : displayDate}
              </h1>

              <span>{chevronIconDownBlack}</span>
            </div>

            <DatePicker
              isDatePickerVisible={isDatePickerVisible}
              setDatePickerVisibility={setDatePickerVisibility}
              selectedDate={selectedDate}
              disablePast={true}
              dateAndTime={true}
              handleDateChange={handleDateChange}
            />
          </div>

          <div>
            <div
              className="flex items-center justify-between border border-transparent border-b-[#D9D9D9] cursor-pointer"
              onClick={() => setTimePickerVisibility(true)}
            >
              <h1 className="text-black text-[0.75rem] sodo400 mb-[10px]">
                {displayTime === "" ? "Select Time" : displayTime}
              </h1>

              <span>{chevronIconDownBlack}</span>
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

        <div className=" w-[85%] absolute bottom-[2rem] right-[2.5rem] ">
          <DashBtn
            text="Continue"
            disabled={displayDate === "" || displayTime === ""}
            // bgColor={color}
            handleClick={() => {
              console.log(selectedDate.toString(), selectedTime.toString());
              handleChange(
                selectedDate.toString(),
                selectedTime.toString(),
                `${displayDate} . ${displayTime}`
              );
              handleClick();
            }}
            padding="11px 24px"
          />
        </div>
      </OuterModal>
    </div>
  );
};

export default DateAndTimePicker;
