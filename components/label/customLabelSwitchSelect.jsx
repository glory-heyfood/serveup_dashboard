import { dropDownBlackIcon } from "@/SVGs";
import { MenuItem, Select, Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import LabelSwitchSelect from "./LabeSwitchSelect";

const CustomLabelSwitchSelect = ({
  selectedValue,
  handleChange,
  defaultValue,
  option,
  labelFontweight,
  data,
  textLabel,
  selectedData,
  selectedNames,
  //   setOpen,
  //   open,
  labelHeader,
  labelHeaderFontWeight,
  handleSelectCategories,
  labelWidth,
  hideLabel,
  height,
  ...props
}) => {
  const Icon = () => {
    return <span className="ml-[4px] mt-[-1px]">{dropDownBlackIcon}</span>;
  };

  const [checkedData, setCheckedData] = useState({});
  const [checkAllData, setCheckAllData] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesName, setSelectedCategoriesName] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSwitchChange = () => {
    console.log(data);
    setCheckAllData(!checkAllData);
    const updatedData = {};

    data.forEach((dat) => {
      updatedData[dat.id] = !checkAllData;
    });

    setCheckedData(updatedData);

    let updatedArr = [];
    let names = [];
    if (!checkAllData) {
      updatedArr = data;
      names = data.map((dat) => dat.name);
    } else {
      updatedArr = [];
      names = [];
    }

    setSelectedCategories(updatedArr);
    setSelectedCategoriesName(names);

    console.log(updatedArr, "switch");

    handleSelectCategories(option.id, updatedArr, names);
  };

  const handleCheckboxChange = (dat, option) => {
    console.log(checkedData);
    console.log(!checkedData[dat.id]);
    console.log(dat);
    console.log(selectedCategories);
    // handleSelectCategories(option.id);
    setCheckedData((prevCheckedData) => ({
      ...prevCheckedData,
      [dat.id]: !prevCheckedData[dat.id],
    }));

    const itemExist = selectedCategories.find((item) => item.id === dat.id);
    let updatedArr = [];
    let names = [];

    if (itemExist) {
      updatedArr = selectedCategories.filter((item) => item.id !== dat.id);
      names = selectedCategoriesName.filter((name) => name !== dat.name);
      console.log(names, "nname");
      setSelectedCategories(updatedArr);
      setSelectedCategoriesName(names);
    } else {
      const arr = selectedCategories;
      const initNames = selectedCategoriesName;

      updatedArr = [...arr, dat];
      names = [...initNames, dat.name];
      setSelectedCategories(updatedArr);
      setSelectedCategoriesName(names);
    }

    handleSelectCategories(option.id, updatedArr, names);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInsideDiv = event.target.closest(".show-categories");
      if (!isInsideDiv) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (selectedData) {
      setSelectedCategories(selectedData);
      setSelectedCategoriesName(selectedNames);
      const selectedId = selectedData.map((data) => data.id);
      selectedId.forEach((id) => {
        setCheckedData((prevCheckedData) => ({
          ...prevCheckedData,
          [id]: true,
        }));
      });
    }
  }, [selectedData]);

  return (
    <div
      className="px-[0.5rem] py-[0.31rem] relative w-[7.75rem] show-categories"
      style={{
        backgroundColor: "#F2F2F2",
        border: "none",
        borderRadius: "4px",
        outline: "none",
        height: height ? height : "44px",
      }}
    >
      {/* {option?.map((option, i) =>
        option.value === "custom" ? (
          <MenuItem key={i} className="" value={option.value}>
            <div className="flex space-x-[10px] items-center ">
              <span>{calenderIconBlue}</span>
              <h1 className="text-[#072A85] sodo600 tracking-[-0.24px] text-[0.75em]">
                {option.label}
              </h1>
            </div>
          </MenuItem>
        ) : (
          <MenuItem
            key={i}
            className="text-black tracking-[-0.24px] text-[0.75em] sodo400"
            value={option.value}
          >
            {option.label}
          </MenuItem>
        )
      )} */}

      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <h2 className="text-black sodo600 text-[0.75rem] tracking-[-0.03rem] truncate w-[100px]  ">
          {selectedValue}
        </h2>
        <Icon />
      </div>

      {open && (
        <div
          className="py-[1rem] flex flex-col space-y-[2px] absolute top-[34px] left-0  px-[1rem] z-[30] min-w-[200px] "
          style={{
            borderRadius: "0.25rem",
            background: "#FFF",
            boxShadow: "1px 1px 4px 1px #E6E6E6",
          }}
        >
          {/* Switch button */}

          <div className="flex space-x-[4px] items-center  ">
            <Switch
              // {...label}
              checked={checkAllData}
              onChange={handleSwitchChange}
            />
            <h1
              className={`text-[0.6875rem]   tracking-[-0.52px] ${
                labelHeaderFontWeight ? labelHeaderFontWeight : "sodo700"
              }`}
            >
              {labelHeader}
            </h1>
          </div>
          <div className="flex flex-col space-y-[12px] ml-[10px] ">
            {data.map((dat, i) => (
              <div
                key={i}
                className="flex items-center space-x-[1em] cursor-pointer"
                onClick={() => {
                  if (checkAllData) {
                    () => {};
                  } else {
                    handleCheckboxChange(dat, option);
                  }
                }}
              >
                <span>
                  <input type="checkbox" checked={checkedData[dat.id]} />
                </span>
                <h2 className="text-[0.68rem] sodo600 tracking-[-0.52px] text-[#000]">
                  {dat.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomLabelSwitchSelect;
