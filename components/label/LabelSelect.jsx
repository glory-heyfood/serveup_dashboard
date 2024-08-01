import React from "react";
import LabelInput from "./LabelInput";
import { FormControl, MenuItem, Select } from "@mui/material";
import { dropDownBlueIcon } from "@/SVGs";

const Label = ({ label }) => {
  return (
    <h1 className="text-black sodo700 tracking-[-0.52px] text-[0.81em] ">
      {label}
    </h1>
  );
};

const Icon = () => {
  return <span className="ml-[8px]">{dropDownBlueIcon}</span>;
};

const LabelSelect = ({
  label,
  option,
  handleChange,
  selectedValue,
  input,
  inputName,
  hideInput,
  inputFont,
  defaultValue,
  handleInputChange,
  width,
  name,
}) => {
  return (
    <LabelInput
      width={width}
      label={<Label label={label} />}
      padding="13px 0px 14px 16px"
    >
      <div className="flex items-center space-x-[12px]">
        <Select
          displayEmpty
          name={name}
          IconComponent={() => <Icon />}
          inputProps={{ "aria-label": "Without label" }}
          value={selectedValue}
          onChange={(e) => {
            handleChange(e);
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            "&:focus": {
              border: "none",
            },
          }}
          sx={{
            "& .MuiSelect-select": {
              color: "#072A85",
              fontFamily: "sodoSans-reg",
              letterSpacing: "-0.52px",
              fontSize: "0.81em",
              padding: "0px !important",
            },

            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },

            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
          }}
        >
          <MenuItem
            className="text-black tracking-[-0.26px] sudoBold font-[400] text-[0.9em]"
            value=""
            disabled
          >
            {defaultValue}
          </MenuItem>
          {option?.map((option, i) => (
            <MenuItem
              key={i}
              className="text-black tracking-[-0.26px] sudo700 p-4 text-[0.9em]"
              value={option.value}
              sx={{
                // width:"300px",
                "& ~ &": {
                  padding: "16px 120px 16px 12px ",
                },
              }}
            >
              {option.text}
            </MenuItem>
          ))}
        </Select>

        {!hideInput && (
          <input
            type="text"
            placeholder="0"
            value={input}
            name={inputName}
            className={`w-full placeholder:text-[#A9ADB5] placeholder:text-[13px] border-none outline-none  tracking-[-0.52px] bg-transparent p-0 text-[13px] text-[#000] ${
              inputFont ? inputFont : "sodo400"
            }`}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        )}
      </div>
    </LabelInput>
  );
};

export default LabelSelect;
