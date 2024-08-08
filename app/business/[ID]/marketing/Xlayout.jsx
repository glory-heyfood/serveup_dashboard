// this is the layout file for the sms with the x-icon
import DashBtn from "@/components/buttons/DashBtn";
import DashHeader from "@/components/Dashboard/DashHeader";
import { toggleCampaignModal } from "@/redux/features/toggleModalSlice";
import { chevronLeftBlueIcon, XIcon } from "@/SVGs";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const Xlayout = ({
  data,
  handleCancel,
  handleClick,
  showHeader,
  tab,
  hideBtn,
  children,
  isLink,
  handleLinkClick,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="fixed top-0 w-full ">
      <DashHeader />
      <div className="pt-[88px] flex items-start ">
        <div
          className="bg-[#F0F0F0] mx-[4rem]  shrink-0 rounded-[4px] flex items-center justify-center h-[32px] w-[32px] cursor-pointer "
          onClick={() => {
            dispatch(toggleCampaignModal(false));
          }}
        >
          {XIcon}
        </div>
        <div className=" w-[80%] ">
          <h1 className="text-[16px] sodo700 tracking-[-0.64px] mb-[2.25rem] ">
            {data?.header}
          </h1>

          <div className="border border-b-[#E6E6E6] flex items-end justify-between border-transparent pb-[0px]  ">
            <div>
              {isLink ? (
                <div
                  className="cursor-pointer flex items-center pb-[0.5rem] space-x-[0.25rem]"
                  onClick={() => {
                    handleLinkClick();
                  }}
                >
                  <span>{chevronLeftBlueIcon("#072A85")}</span>
                  <h2 className="text-[#072A85] sodo600 text-[0.875rem]  ">
                    {data?.linkText}
                  </h2>
                </div>
              ) : (
                <div>{tab}</div>
              )}
            </div>

            {hideBtn ? null : (
              <div className="w-fit h-[2.43rem] flex items-center pb-[0.75rem] ">
                <DashBtn
                  text={data?.btnText}
                  handleClick={handleClick}
                  padding=""
                />
              </div>
            )}
          </div>

          <div className="flex ">
            <div className="h-[80vh] pb-[5rem] overflow-y-scroll pt-[1.25rem] scroll-hidden w-[50%]  border border-r-[#E6E6E6] border-transparent">
              {children}
            </div>
            <div className="flex justify-center overflow-y-scroll scroll-hidden h-[80vh] pb-[5rem] pt-[2.5rem] w-[50%]  ">
              {/* image */}

              <div className="relative h-full w-full pb-[1rem]">
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt={data?.image?.alt}
                  src={data?.image.url}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Xlayout;
