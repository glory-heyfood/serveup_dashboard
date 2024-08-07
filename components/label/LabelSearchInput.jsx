import React from "react";
import LabelInput from "./LabelInput";
import { ClipLoader } from "react-spinners";

const LabelSearchInput = ({
  placeholder,
  label,
  handleChange,
  name,
  inputFont,
  fontweight,
  border,
  rounded,
  capitalise,
  width,
  value,
  loading,
  icon,
  ...props
}) => {
  return (
    <LabelInput
      {...props}
      rounded={rounded}
      border={border}
      width={width}
      padding="13px 0px 14px 16px"
      label={
        <h2
          className={`text-[0.81em] ${
            fontweight ? fontweight : "sodo600"
          } tracking-[-0.52px]`}
        >
          {label}
        </h2>
      }
    >
      <div className="flex items-center justify-between">
        <div className={`${icon && "flex space-x-[4px]"}`}>
          {icon && icon}
          <input
            type="text"
            placeholder={placeholder}
            name={name}
            value={value && value}
            className={` ${
              capitalise && "uppercase"
            } w-full placeholder:text-[#A9ADB5] placeholder:text-[13px] border-none outline-none  tracking-[-0.52px] bg-transparent p-0 text-[13px] text-[#000] ${
              inputFont ? inputFont : "sodo400"
            }`}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {loading && <ClipLoader className="mr-2" color="black" size={12} />}
      </div>
    </LabelInput>
  );
};

export default LabelSearchInput;
