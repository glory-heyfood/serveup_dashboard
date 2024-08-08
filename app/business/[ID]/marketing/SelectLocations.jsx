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
import LabelSelectLocations from "@/components/label/LabelSelectLocations";
import EnterSms from "./EnterSms";

const SelectLocations = ({ handleCancel }) => {
  const [text, setText] = useState("");
  const [showNextPage, setShowNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [checkedStores, setCheckedStores] = useState([]);

  const data = {
    header: "Select Locations",
    btnText: "Next",
    linkText: "Back to choose a campaign",
    image: {
      width: 240,
      height: 480,
      alt: "sms template",
      url: "/images/sms-campaign-phone-template.svg",
    },
  };

  const handleBtnClick = () => {
    setNextPage(
      <EnterSms 
        linkText="Back to select locations"
        handleCancel={() => {
          setShowNextPage(false);
        }}
      />
    );
    setShowNextPage(true);
  };

  const handleLoactionsChange = (checkedStores) => {
    setCheckedStores(checkedStores);
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
        <div className="pr-[2.5rem] w-fit ">
          <CustomLabel header="What stores should this campaign apply to?">
            <LabelSelectLocations
              locations={null}
              showLabel={false}
              hideLabel={true}
              checkedValues={checkedStores}
              handleLoactionsChange={(checkedStores) => {
                handleLoactionsChange(checkedStores);
              }}
              fontweight="sodo600"
            />
          </CustomLabel>
        </div>
      </Xlayout>
    </div>
  );
};

export default SelectLocations;
