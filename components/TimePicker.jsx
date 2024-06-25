import React from "react";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TimePicker = ({
  handleTimeChange,
  color,
  disabled,
  data,
  defaultValue,
  dateAndTime,
  isTimePickerVisible,
  selectedTime,
  setTimePickerVisibility,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        {dateAndTime ? (
          <MobileTimePicker
            value={selectedTime}
            onChange={handleTimeChange}
            open={isTimePickerVisible}
            onAccept={(e) => {
              setTimePickerVisibility(false);
            }}
            onClose={() => {
              setTimePickerVisibility(false);
            }}
            sx={{
              display: "none",
            }}
          />
        ) : defaultValue ? (
          <>
            <MobileTimePicker
              disabled={disabled}
              onAccept={(e) => {
                const time =
                  e.$H > 12
                    ? `${e.$H - 12}:${e.$m} PM `
                    : e.$H === 12
                    ? `${e.$H}:${e.$m} PM`
                    : `${e.$H}:${e.$m} AM `;
                handleTimeChange(time, data);
              }}
              onClose={() => {
                setTimePickerVisibility(false);
              }}
              sx={{
                "& .MuiInputBase-root": {
                  outline: "none",
                  border: "none",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
                "& .MuiInputBase-input": {
                  padding: "0px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.81em",
                  fontFamily: "SodoSans-SemiBold",
                  letterSpacing: "-0.52px",
                  color: color ? color : "#072A85",
                },
              }}
              defaultValue={dayjs(
                `2022-04-17T${defaultValue.hour}:${defaultValue.minute}`
              )}
            />
          </>
        ) : (
          <MobileTimePicker
            disabled={disabled}
            onAccept={(e) => {
              const time =
                e.$H > 12 ? `${e.$H - 12}:${e.$m} PM ` : `${e.$H}:${e.$m} AM `;
              handleTimeChange(time, data);
            }}
            sx={{
              "& .MuiInputBase-root": {
                outline: "none",
                border: "none",
              },
              ".MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
              "& .MuiInputBase-input": {
                padding: "0px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.81em",
                fontFamily: "SodoSans-SemiBold",
                letterSpacing: "-0.52px",
                color: color ? color : "#072A85",
              },
            }}
            // defaultValue={dayjs("2022-04-17T10:20")}
          />
        )}
      </>
    </LocalizationProvider>
  );
};

export default TimePicker;
