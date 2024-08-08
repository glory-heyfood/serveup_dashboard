import React, { useState } from "react";
import Xlayout from "./Xlayout";
import AutomatedOneTimeTab from "./AutomatedOneTimeTab";
import AutomatedCampaign from "./AutomatedCampaign";
import OneTimeCampaign from "./OneTimeCampaign";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelTextarea from "@/components/label/LabelTextarea";
import { formatMoney, getBusiness } from "@/utils";
import { emailIcon1rem } from "@/SVGs";
import CampaignSent from "./CampaignSent";

const SelectCustomers = ({ handleCancel }) => {
  const [showNextPage, setShowNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const data = {
    header: "Select Customers",
    btnText: "Send Campaign",
    linkText: "Back to Enter SMS",
    image: {
      width: 240,
      height: 480,
      alt: "sms template",
      url: "/images/sms-campaign-phone-template.svg",
    },
  };
  const handleBtnClick = () => {
    setNextPage(<CampaignSent />);
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
        <div className="pr-[1.5rem] flex items-start flex-col space-y-[2rem] ">
          <CustomLabel header="This SMS will be sent to subscribers that meet the campaign criteria">
            <div className="border border-[#072A85] rounded-[0.25rem] p-[1rem] w-[85%] ">
              <h2 className="text-[#072A85] text-[0.75rem] sodo600 tracking-[-0.03rem] mb-[0.25rem] ">
                Customers after their first order
              </h2>
              <h2 className="text-[#5F6370]  sodo400 text-[0.75rem] ">
                This SMS will be sent to customers who have order from your
                store for the first time. It will be sent to them 24 hours after
                their first order.
              </h2>
            </div>
          </CustomLabel>

          <CustomLabel header="Payment" fullWidth={true}>
            <div className=" border border-[#E6E6E6] w-full mt-[2rem] rounded-[0.5rem] ">
              <div className="py-[1rem] px-[1.25rem] border border-b-[#E6E6E6] border-transparent ">
                <h2 className="text-black text-[0.875rem] sodo600 tracking-[-0.035rem] ">
                  Monthly Cost
                </h2>
                <h2 className="text-[#5F6370] sodo400 text-[0.75rem] tracking-[-0.03rem] ">
                  You will be charged at the end of the month based on the
                  number of emails/SMS you send
                </h2>
              </div>

              <div className="py-[1.75rem] flex flex-col space-y-[1rem] px-[1rem] w-full">
                {[
                  {
                    plan: "Starter",
                    text: "Send up to 100 emails/SMS per month",
                    amount: formatMoney(2000),
                  },
                  {
                    plan: "Growth",
                    text: "Send 100 - 500 SMS per month",
                    amount: formatMoney(10000),
                  },
                  {
                    plan: "Pro",
                    text: "Send up to 501 - 1,000 SMS per month",
                    amount: formatMoney(20000),
                  },
                  {
                    plan: "Enterprise",
                    text: "Send over 1,000 SMS per month",
                    amount: "10/SMS",
                  },
                ].map((data) => (
                  <div className="flex items-center w-full justify-between   ">
                    <div className="flex space-x-[0.5rem] w-fit items-start  ">
                      <span>{emailIcon1rem}</span>
                      <div className="w-full">
                        <h2 className="text-black text-[0.75rem] sodo600 tracking-[-0.03rem] ">
                          {data.plan}
                        </h2>
                        <h2 className="text-black text-left text-[0.75rem] sodo400 tracking-[-0.03rem] ">
                          {data.text}
                        </h2>
                      </div>
                    </div>

                    <h2 className="text-black text-right text-[0.75rem] sodo600 w-fit tracking-[-0.03rem] ">
                      <span className="inter600 font-[600]">₦</span>{" "}
                      <span>{data.amount}</span>
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </CustomLabel>
        </div>
      </Xlayout>
    </div>
  );
};

export default SelectCustomers;
