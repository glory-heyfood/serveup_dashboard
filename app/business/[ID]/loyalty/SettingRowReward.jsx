import {
  deleteRewardAsync,
  toggleRewardStatusAsync,
} from "@/redux/features/business/loyaltySlice";
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const SettingRowReward = ({
  width,
  bold,
  col1,
  col2,
  col3,
  index,
  selectedIndex,
  handleDeactivate,
  data,
  handleEdit,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const groupRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupRef.current && !groupRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   useEffect(() => {
  //     console.log(selectedIndex);
  //     if (index === selectedIndex) {
  //       setDisabled(true);
  //     } else {
  //       setDisabled(false);
  //     }
  //   }, [selectedIndex]);

  useEffect(() => {
    if (data) {
      setDisabled(!data?.active);
    }
  }, [data]);
  const toggleStatus = () => {
    setLoader(true);
    dispatch(
      toggleRewardStatusAsync({
        rewardId: data?.id,
        status: !data.active,
      })
    )
      .unwrap()
      .then((res) => {
        setLoader(false);
      });
  };

  return (
    <div
      className={`${
        bold ? "border " : "border-[0.5px]"
      } border-transparent border-b-[#F0F0F0] flex items-center py-[12px] `}
    >
      <div
        className={` ${width ? width : "w-[30%]"} ${
          bold ? "sodo700" : "sodo600"
        } text-[12px] tracking-[-0.24px] ${
          disabled && !bold ? "text-[#B7B7B7]" : "text-black"
        }  `}
      >
        {" "}
        {col1} Points
      </div>

      <div
        className={`  ${
          bold ? "sodo700" : "sodo600"
        } text-[12px] tracking-[-0.24px]  w-[60%] ${
          disabled && !bold ? "text-[#B7B7B7]" : "text-black"
        }  `}
      >
        {" "}
        {col2}{" "}
      </div>
      <div
        className="relative w-[10%] group"
        ref={groupRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Handling both hover event on web and on click event on mobile */}
        <div
          onClick={() => setIsClicked(!isClicked)}
          className={`flex justify-end pr-[12px] cursor-pointer `}
        >
          {col3}
        </div>

        <div
          className={`flex-col items-start absolute top-[12px] right-0 z-[10] ${
            isHovered || isClicked ? "flex" : "hidden"
          } bg-white rounded-[4px] w-[140px]`}
          style={{
            boxShadow: "0px 4px 4px 0px #E6E6E6",
          }}
        >
          <Button
            onClick={() => {
              handleEdit(index, data);
              setIsClicked(false);
            }}
            sx={{
              color: "#072A85",
              fontFamily: " SoDoSans-Bold",
              fontSize: " 12px",
              letterSpacing: "-0.48px",
              padding: "12px 16px",
              alignItems: "start",
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "capitalize",
            }}
          >
            Edit
          </Button>

          <Button
            onClick={() => {
              // handleDeactivate(index);
              //   setDisabled(!disabled);
              toggleStatus();
              setIsClicked(false);
            }}
            sx={{
              color: "#072A85",
              fontFamily: " SoDoSans-Bold",
              fontSize: " 12px",
              letterSpacing: "-0.48px",
              padding: "12px 16px",
              alignItems: "start",
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "capitalize",
            }}
          >
            {loader ? "loading..." : disabled ? "Activate" : "Deactivate"}
          </Button>

          <Button
            onClick={() => {
              dispatch(deleteRewardAsync({ rewardId: data?.id }));
            }}
            sx={{
              color: "#F01C1C",
              fontFamily: " SoDoSans-Bold",
              fontSize: " 12px",
              letterSpacing: "-0.48px",
              padding: "12px 16px",
              alignItems: "start",
              width: "100%",
              justifyContent: "flex-start",
              textTransform: "capitalize",
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingRowReward;
