import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import LabelText from "./LabelText";
import CustomSwitch from "../CustomSwitch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const LabelSelectLocations = ({
  fontweight,
  locations,
  checkedValues,
  handleLoactionsChange,
}) => {
  const [checkedLocations, setCheckedLocations] = useState({});
  const [checkAllLocations, setCheckAllLocations] = useState(false);

  const Locations = locations
    ? locations
    : [
        "Toasties - Ikeja__1",
        "Toasties - Lekki__2",
        "Toasties - VI__3",
        "Toasties - Abuja__4",
      ];

  const handleSwitchChange = () => {
    // Update previousCheckedLocations before updating checkedLocations

    setCheckAllLocations(!checkAllLocations);
    const updatedLocations = {};

    Locations.forEach((location) => {
      updatedLocations[location] = !checkAllLocations;
    });

    console.log(updatedLocations, "ipdar");
    const storeArray = Object.keys(updatedLocations)
      .filter((key) => updatedLocations[key] === true) // Filter keys where value is true
      .map((key) => Number(key.split("__")[1]));
    console.log(storeArray);

    handleLoactionsChange(storeArray);
    setCheckedLocations(updatedLocations);

    // Log or use previousCheckedLocations after updating
  };

  const handleCheckboxChange = (location) => {
    const prevCheckedLocations = checkedLocations;
    const updatedLocations = {
      ...prevCheckedLocations,
      [location]: !prevCheckedLocations[location],
    };
    const storeArray = Object.keys(updatedLocations)
      .filter((key) => updatedLocations[key] === true) // Filter keys where value is true
      .map((key) => Number(key.split("__")[1]));
    if (locations.length === storeArray.length) {
      setCheckAllLocations(true);
    } else {
      setCheckAllLocations(false);
    }
    handleLoactionsChange(storeArray);
    setCheckedLocations(updatedLocations);
  };

  useEffect(() => {
    if (checkedValues) {
      locations.forEach((loc) => {
        if (checkedValues?.includes(Number(loc.split("__")[1]))) {
          setCheckedLocations((prev) => ({
            ...prev,
            [loc]: true,
          }));
        }
      });
    }
    if (locations.length === checkedValues?.length) {
      setCheckAllLocations(true);
    }
  }, [checkedValues, locations]);

  return (
    <LabelInput
      stretch={true}
      padding="16px 0px 16px 16px"
      label={<LabelText label="Locations" fontWeight={fontweight} />}
    >
      <div className="py-[20px] flex flex-col space-y-[2px]">
        {/* Switch button */}

        <div className="flex space-x-[4px] items-center  ">
          <CustomSwitch
            {...label}
            checked={checkAllLocations}
            handleChange={handleSwitchChange}
          />
          <h1
            className={`text-[13px]  tracking-[-0.52px] ${
              fontweight ? fontweight : "sodo700"
            }`}
          >
            Select all locations
          </h1>
        </div>
        <div className="flex flex-col space-y-[12px] ">
          {Locations?.map((data, i) => (
            <div
              key={i}
              className="flex items-center space-x-[1em] cursor-pointer"
              onClick={() => {
                handleCheckboxChange(data);
              }}
            >
              <span>
                <input type="checkbox" checked={checkedLocations[data]} />
              </span>
              <h2 className="text-[0.81em] sodo600 tracking-[-0.52px] text-[#000]">
                {data.split("__")[0]}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </LabelInput>
  );
};

export default LabelSelectLocations;
