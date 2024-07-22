import { XIcon, plusIcon } from "@/SVGs";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import DiscountSelectItemsModal from "@/components/discount/DiscountSelectItemsModal";
import { searchArrayForStores } from "@/utils";

const MenuModal = ({
  btn,
  header,
  children,
  minHeight,
  subHeader,
  btnText,
  isBusiness,
  type,
  setItems,
  items,
  setFilteredArray,  
  maxWidth,
  handleClick,
  setNames,
  btnLoading,
}) => {
  const dispatch = useDispatch();
  const showOuterModal = useSelector((state) => state.modal.showOuterModal);  
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      header = "";
      dispatch(toggleModal(false));
      dispatch(
        toggleModal({
          modal: "earn",
          payload: false,
        })
      );
    }
  };

  const handleSearch = (val) => {
    const filteredArray = searchArrayForStores(items, val);
    setFilteredArray(filteredArray);
  };
 

  return (
    <div
      className="fixed flex justify-center md:pt-[87px] bg-[#0000001a] top-0 left-0 z-[55] overflow-y-auto scroll-hidden h-screen w-full overlay md:pb-[40px]"
      onClick={handleOverlayClick}
    >
      <div
        className={` rounded-[8px]  bg-white z-[60] w-screen md:w-[90%] h-screen overflow-y-auto scroll-hidden md:h-fit  px-[1.5rem]  pb-[32px]  ${minHeight} ${
          maxWidth ? maxWidth : "md:max-w-[552px]"
        } `}
      >
        <div className="relative">
          <span
            className=" absolute top-[0.75rem] right-[1rem] h-[32px] w-[32px] cursor-pointer mr-[-1.5rem] "
            onClick={() => {
              header = "";
              dispatch(toggleModal(false));
              dispatch(
                toggleModal({
                  modal: "earn",
                  payload: false,
                })
              );
            }}
          >
            {XIcon}
          </span>
        </div>
        <div className="flex flex-col space-y-[2rem] mt-[2.5rem]">
          <div>
            <h1 className="text-black text-[1.125rem] sodo700 tracking-[-0.72px]">
              {header}
            </h1>
            <h3 className="text-black text-[0.75rem] sodo400 tracking-[-0.24px]">
              {subHeader}
            </h3>
          </div>

          <div className="flex flex-col space-y-[1.5rem]">
            {btn && (
              <div className="w-fit">
                {" "}
                <DashBtn
                  icon={plusIcon}
                  text={btnText ? btnText : "Add Items to this category"}
                  handleClick={() => {
                    dispatch(
                      toggleModal({
                        modal: "outer",
                        payload: true,
                      })
                    );
                  }}
                />{" "}
              </div>
            )}
            <CustomSearch
              placeholder="Search"
              fullWidth
              handleChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-[40px]">{children}</div>
      </div>

      {showOuterModal && (
        <DiscountSelectItemsModal
          isBusiness={isBusiness}
          type={type}
          setNames={setNames}
          name={header}
          items={items}
          setItems={setItems}
        />
      )}
    </div>
  );
};

export default MenuModal;
