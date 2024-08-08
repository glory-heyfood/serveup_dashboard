import React, { useState } from "react";
import Xlayout from "./Xlayout";
import AutomatedOneTimeTab from "./AutomatedOneTimeTab";
import AutomatedCampaign from "./AutomatedCampaign";
import OneTimeCampaign from "./OneTimeCampaign";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelTextarea from "@/components/label/LabelTextarea";
import { getBusiness } from "@/utils";
import SelectCustomers from "./SelectCustomers";
import { airplaneBigGreen } from "@/SVGs";
import DashBtn from "@/components/buttons/DashBtn";
import { useDispatch } from "react-redux";
import { toggleCampaignModal } from "@/redux/features/toggleModalSlice";

const CampaignSent = ({ handleCancel }) => {
  const dispatch = useDispatch();
  const data = {
    image: {
      width: 240,
      height: 480,
      alt: "sms template",
      url: "/images/sms-campaign-phone-template.svg",
    },
  };
  return (
    <div>
      <Xlayout hideBtn={true} data={data}>
        <div className="h-full w-full flex items-center justify-center">
          <div className="h-full w-full flex flex-col items-center justify-center">
            <span>{airplaneBigGreen}</span>
            <h2 className="text-[1.25rem] sodo600 tracking-[-0.05rem] mt-[2.5rem] ">
              Campaign sent!
            </h2>
            <h3 className="text-[#7E8493] text-[0.875rem] tracking-[-0.035rem]  sodo400 ">
              You campaign has been sent to it’s target subscribers
            </h3>

            <div className="mt-[2rem]">
              <DashBtn
                text="Back to dashboard"
                handleClick={() => {
                  dispatch(toggleCampaignModal(false));
                }}
              />
            </div>
          </div>
        </div>
      </Xlayout>
    </div>
  );
};

export default CampaignSent;
