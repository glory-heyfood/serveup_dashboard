import { Switch, withStyles } from "@mui/material";
import React from "react";

const CustomSwitch = ({ handleChange, checked }) => {  
  return (
    <Switch
      sx={{
        "& .MuiSwitch-thumb": {
          width: 12, // Adjust thumb width
          height: 12, // Adjust thumb height
          marginTop: 0.5, // Adjust to center thumb vertically within the track
          marginRight: "-20px",
          bgcolor: "white", // Thumb color when switched on
          boxShadow:"none"
        },
        "&.Mui-checked + .MuiSwitch-track": {
          opacity: "1 !important",
          backgroundColor: "#072A85 !important",
          bgcolor: "red !important",
          bgcolor: "red ",
          borderColor: "#072A85 !important",
          border: `1px solid #072A85 !important`,
          borderRadius: 16, // Adjust track border radius to match thumb size
          height: 18, // Adjust track height to be slightly larger than thumb height
          padding: 0,
        },
      }}
      checked={checked}
      onChange={(e) => {
        handleChange(e.target.checked);
      }}
    />
  );
};

export default CustomSwitch;
