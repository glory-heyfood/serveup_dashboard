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
import LabelDateInput from "@/components/label/LabelDateInput";

const SetSchedule = ({ handleCancel, linkText }) => {
  const [showNextPage, setShowNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [selectTab, setSelectedTab] = useState("Now");

  const data = {
    header: "Set Schedule",
    btnText: "Next",
    linkText: linkText ? linkText : "Back to Enter SMS",
    image: {
      width: 240,
      height: 480,
      alt: "sms template",
      url: "/images/sms-campaign-phone-template.svg",
    },
  };

  const handleBtnClick = () => {
    setNextPage(
      <SelectCustomers
        handleCancel={() => {
          setShowNextPage(false);
        }}
      />
    );
    setShowNextPage(true);
  };

  return showNextPage ? (
    nextPage
  ) : (
    <div>
      <Xlayout
        data={data}
        isLink={true}
        handleClick={() => {
          handleBtnClick();
        }}
        handleLinkClick={() => {
          handleCancel();
        }}
      >
        <div className="pr-[2.5rem]">
          <CustomLabel header="Set schedule for this email">
            <div className="flex items-center items-stretch  space-x-[0.75rem] ">
              {["Now", "Later"].map((data) => (
                <div
                  onClick={() => {
                    setSelectedTab(data);
                  }}
                  className={`${
                    selectTab === data
                      ? "bg-[#F2F4F9]"
                      : "bg-transparent border rounded-[0.25rem] border-[#E6E6E6]] "
                  } py-[0.5rem] w-[8.25rem] flex items-center justify-center cursor-pointer `}
                >
                  <h2
                    className={`${
                      selectTab === data ? "text-[#072A85]" : "text-[#000000]"
                    }`}
                  >
                    {data}
                  </h2>
                </div>
              ))}
            </div>
          </CustomLabel>

          {selectTab === "Now" ? (
            <h2 className="text-[0.75rem] tracking-[-0.03rem] sodo400 mt-[2.12rem] ">
              This email will be sent immediately
            </h2>
          ) : (
            <div>{/* <LabelDateInput label="Date"  /> */}</div>
          )}
        </div>
      </Xlayout>
    </div>
  );
};

export default SetSchedule;
