import React, { useState } from "react";
import Xlayout from "./Xlayout";
import AutomatedOneTimeTab from "./AutomatedOneTimeTab";
import AutomatedCampaign from "./AutomatedCampaign";
import OneTimeCampaign from "./OneTimeCampaign";
import EnterSms from "./EnterSms";
import SelectLocations from "./SelectLocations";

const ChooseACampaign = ({ nandleClick }) => {
  const [selectedTab, setSelectedTab] = useState("automated");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showNextPage, setShowNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const data = {
    header: "Choose a campaign",
    btnText: "Next",
    image: {
      width: 240,
      height: 480,
      alt: "sms template",
      url: "/images/sms-campaign-phone-template.svg",
    },
  };

  const handleBtnClick = () => {
    if (selectedTab === "automated") {
      setNextPage(
        <EnterSms
          isAutomated={true}
          handleCancel={() => {
            setShowNextPage(false);
          }}
        />
      );
    } else {
      setNextPage(
        <SelectLocations
          handleCancel={() => {
            setShowNextPage(false);
          }}
        />
      );
    }
    setShowNextPage(true);
  };

  return showNextPage ? (
    nextPage
  ) : (
    <div>
      <Xlayout
        data={data}
        isLink={false}
        handleClick={handleBtnClick}
        tab={
          <AutomatedOneTimeTab
            selected={selectedTab}
            setSelected={setSelectedTab}
          />
        }
      >
        {selectedTab === "automated" ? (
          <AutomatedCampaign
            selected={selectedCampaign}
            setSelected={setSelectedCampaign}
          />
        ) : (
          <OneTimeCampaign
            selected={selectedCampaign}
            setSelected={setSelectedCampaign}
          />
        )}
      </Xlayout>
    </div>
  );
};

export default ChooseACampaign;
