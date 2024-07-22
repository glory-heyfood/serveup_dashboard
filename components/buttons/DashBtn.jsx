"use client";
import { Button } from "@mui/material";
import React from "react";
import { ClipLoader } from "react-spinners";

const DashBtn = ({
	text,
	padding,
	handleClick,
	disabled,
	icon,
	lightTheme,
	font,
	color,
	btnLoading,
	bgColor,
}) => {
	return text === "Cancel" || text === "Discard" || lightTheme === true ? (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={
        btnLoading
          ? () => {}
          : () => {
              handleClick();
            }
      }
      startIcon={icon}
      sx={{
        boxShadow: "none",
        backgroundColor: `${
          bgColor ? bgColor : !disabled && "#F2F2F2 !important"
        } `,
        padding: `${padding}`,
        width: "100%",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: `${
            bgColor ? bgColor : !disabled && "#F2F2F2 !important"
          } `,
        },
      }}
    >
      {btnLoading ? (
        <ClipLoader color="#fff" size={24} />
      ) : (
        <h1
          className={`text-[12px] ${
            font ? font : "sodo600"
          }  ml-[-4px] mt-[1px] tracking-[-0.48px] normal-case text-black `}
        >
          {text}
        </h1>
      )}
    </Button>
  ) : (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={
        btnLoading
          ? () => {}
          : () => {
              handleClick();
            }
      }
      startIcon={icon}
      sx={{
        boxShadow: "none",
        backgroundColor: `${
          bgColor ? bgColor : !disabled && "#072A85 !important"
        } `,
        padding: `${padding}`,
        width: "100%",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: `${
            bgColor ? bgColor : !disabled && "#072A85 !important"
          } `,
        },
      }}
    >
      {btnLoading ? (
        <ClipLoader color="#fff" size={24} />
      ) : (
        <h1
          className={`text-[12px] sodo600 ml-[-4px] mt-[1px] tracking-[-0.48px] normal-case ${
            color ? color : "text-white"
          } `}
        >
          {text}
        </h1>
      )}
    </Button>
  );
};

export default DashBtn;
