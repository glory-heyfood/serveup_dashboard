import React from "react";
import LabelInput from "./LabelInput";
import LabelText from "./LabelText";

const LabelAmountInput = ({
  label,
  labelWidth,
  inputFont,
  labelFont,
  rounded,
  value,
  name,
  inputSize,
  handleChange,
}) => {
  return (
    <LabelInput
      width={labelWidth}
      label={
        <LabelText
          label={label}
          fontWeight={labelFont ? labelFont : "sodo700"}
        />
      }
      padding="15px 16px"
      rounded={rounded}
    >
      <span className="inter600 text-[0.825rem]">₦</span>
      <input
        className={`border-none outline-none text-black ${
          inputFont ? inputFont : "sodo700"
        } ${inputSize ? inputSize : "text-[0.825rem] "} tracking-[-0.56px]`}
        name={name}
        value={value && value}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </LabelInput>
  );
};

export default LabelAmountInput;
