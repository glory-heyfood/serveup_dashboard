import { XIcon } from "@/SVGs";
import React from "react";
import DashBtn from "../buttons/DashBtn";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const OuterModal = ({
  btn,
  header,
  children,
  handleCancel,
  minHeight,
  relative,
  handleClick,
}) => {
  const dispatch = useDispatch();

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      dispatch(
        toggleModal({
          modal: "outer",
          payload: false,
        })
      );
      if (typeof handleCancel === "function") handleCancel();
    }
  };

  return (
    <div
      className="fixed flex justify-center pt-[87px] bg-[#000000b9] top-0 left-0 z-[65] overflow-y-auto scroll-hidden h-screen w-full overlay pb-[40px]"
      onClick={handleOverlayClick}
    >
      <div
        className={` rounded-[8px]  bg-white z-[70] w-[90%] max-w-[552px] pb-[32px] h-fit ${minHeight}  ${
          relative && "relative"
        } `}
      >
        <div
          className={`flex items-center justify-between ${
            btn ? "px-[24px] py-[10px]" : "px-[12px] py-[12px]"
          }`}
          style={{
            boxShadow: "0px 1px 0px 0px #E6E6E6",
          }}
        >
          {btn ? (
            <span
              className=" flex items-center justify-center h-[32px] w-[32px] cursor-pointer "
              onClick={() => {
                dispatch(
                  toggleModal({
                    modal: "outer",
                    payload: false,
                  })
                );
                if (typeof handleCancel === "function") handleCancel();
              }}
            >
              {XIcon}
            </span>
          ) : (
            <div></div>
          )}
          <h1 className="text-black text-[18px] sodo700 tracking-[-0.72px]">
            {header}
          </h1>
          {btn ? (
            <DashBtn text={btn} padding="9px 24px" />
          ) : (
            <span
              className=" flex items-center justify-center h-[32px] w-[32px] cursor-pointer "
              onClick={() => {
                if (typeof handleCancel === "function") handleCancel();
                dispatch(
                  toggleModal({
                    modal: "outer",
                    payload: false,
                  })
                );
              }}
            >
              {XIcon}
            </span>
          )}
        </div>
        <div className={`mt-[40px] px-[40px] `}>{children}</div>

        {/* <div className='flex justify-end px-[40px] mt-[24px]'>
					<div className='inline-block w-fit'>
						<DashBtn text='Save' padding='14px 32px' />
					</div>
				</div> */}
      </div>
    </div>
  );
};

export default OuterModal;
