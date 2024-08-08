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
import ChooseACampaign from "./ChooseACampaign";
import { useDispatch, useSelector } from "react-redux";
import { toggleCampaignModal } from "@/redux/features/toggleModalSlice";

const CampaignPage = () => {
  // const [showCampaign, setShowCampaign] = useState(false);
  const [show, setShow] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const showCampaign = useSelector((state) => state.modal.campaignModal);
  const dispatch = useDispatch();
  return (
    <>
      {" "}
      {showCampaign ? (
        <ChooseACampaign
        // handleClick={() => dispatch(toggleCampaignModal(false))}
        />
      ) : (
        <GridLayout GridComponent={<GridComponent />}>
          <div className="w-full">
            <div className={` ${show ? "mb-[32px]" : "mb-[20px]"}`}>
              <BreadCrumb main="Marketing" link="Marketing Campaign" />
            </div>
            {show ? (
              <EmptyState
                icon={mailIcon}
                btnText="Create new campaign"
                header="No Email Campaign"
                handleClick={() => setShowCampaignModal(true)}
                text="You have not created any campaigns"
              />
            ) : (
              <Campaign handleClick={() => setShowCampaignModal(true)} />
            )}
          </div>

          {showCampaignModal && (
            <Modal
              maxWidth="md:max-w-[23.5rem]"
              header="Start a Campaign"
              hideUnderline={true}
              childClass=" px-[1rem] md:px-[1.5rem] mt-[1.75rem]"
              padding="pb-0"
              btnText="none"
              handleCancel={() => {
                setShowCampaignModal(false);
                 setSelectedCampaign(null);
              }}
            >
              <div className="flex items-center space-x-[0.75rem] mx-auto mb-[1.75rem] justify-center items-stretch">
                {[
                  { val: "email", icon: emailIcon, text: "Email Campaign" },
                  { val: "sms", icon: smsIcon, text: "SMS Campaign" },
                ].map((data) => (
                  <div
                    onClick={() => {
                      setSelectedCampaign(data.val);
                    }}
                    className={`border h-[10rem] w-1/2 flex items-center justify-center rounded-[0.5rem] cursor-pointer ${
                      selectedCampaign === data.val
                        ? "border-[#072a85]"
                        : "border-[#E6E6E6]"
                    }`}
                  >
                    <div className="flex flex-col space-y-[0.5rem] items-center justify-center">
                      <span>{data.icon}</span>
                      <h2 className="text-black sodo400 text-[0.875rem] tracking-[-0.0175rem]">
                        {data.text}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
              <DashBtn
                text="Continue"
                disabled={selectedCampaign === null}
                handleClick={() => {
                  dispatch(toggleCampaignModal(true));
                  setShowCampaignModal(false);
                  setSelectedCampaign(null);
                }}
                padding="0.625rem 0.75rem"
              />
            </Modal>
          )}

          <h1
            className="text-[12px] cursor-pointer"
            onClick={() => setShow(!show)}
          >
            Change Tabs
          </h1>
        </GridLayout>
      )}
    </>
  );
};

export default CampaignPage;
