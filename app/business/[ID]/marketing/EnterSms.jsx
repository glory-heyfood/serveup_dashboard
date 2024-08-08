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
import SetSchedule from "./SetSchedules";

const EnterSms = ({ handleCancel, linkText, isAutomated }) => {
  const [text, setText] = useState("");
  const [showNextPage, setShowNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const data = {
    header: "Enter SMS",
    btnText: "Next",
    linkText: linkText ? linkText : "Back to choose a campaign",
    image: {
      width: 240,
      height: 480,
      alt: "sms template",
      url: "/images/sms-campaign-phone-template.svg",
    },
  };

  const handleBtnClick = () => {
    setNextPage(
      isAutomated ? (
        <SelectCustomers
          handleCancel={() => {
            setShowNextPage(false);
          }}
        />
      ) : (
        <SetSchedule
          handleCancel={() => {
            setShowNextPage(false);
          }}
        />
      )
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
          <CustomLabel header="SMS">
            <LabelTextarea
              fontweight="sodo600"
              label="SMS Text"
              inputPadding="1rem 1rem 2rem 0"
              handleChange={(e) => setText(e.target.value)}
              placeholder={`Welcome to ${getBusiness()?.name.trim()} Thanks for your first order. Enjoy 10% off your next meal with code WELCOME10. Bon appétit! `}
            />
          </CustomLabel>
          {text.trim().length > 0 && (
            <h2 className="mt-[0.75rem] tracking-[-0.03rem] text-[0.75rem]  text-[#5F6370] ">
              {" "}
              {text.length} characters{" "}
            </h2>
          )}
        </div>
      </Xlayout>
    </div>
  );
};

export default EnterSms;
