import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "./GridComponent";
import EmptyState from "@/components/EmptyState";
import BreadCrumb from "@/components/BreadCrumb";
import CreateSmsCampaign from "./CreateSmsCampaign";
import Campaign from "./Campaign";
import { emailIcon, mailIcon, smsIcon } from "@/SVGs";
import Modal from "@/components/modal/Modal";
import DashBtn from "@/components/buttons/DashBtn";
import Subscribers from "./Subscribers";

const SubscribersPage = () => {
  const [showCampaign, setShowCampaign] = useState(false);
  const [show, setShow] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  return (
    <GridLayout GridComponent={<GridComponent />}>
      <div className="w-full">
        <div className={` ${show ? "mb-[32px]" : "mb-[20px]"}`}>
          <BreadCrumb main="Marketing" link="Subscribers" />
        </div>
        {show ? (
          <EmptyState
            icon={mailIcon}
            header="No Email Campaign"
            handleClick={() => setShowCampaignModal(true)}
            text="You have not created any campaigns"
          />
        ) : (
          <Subscribers handleClick={() => setShowCampaignModal(true)} />
        )}
      </div>     

      <h1 className="text-[12px] cursor-pointer" onClick={() => setShow(!show)}>
        Change Tabs
      </h1>
    </GridLayout>
  );
};

export default SubscribersPage;
