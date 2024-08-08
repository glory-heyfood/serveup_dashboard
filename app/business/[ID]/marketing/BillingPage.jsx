import GridLayout from "@/components/GridLayout";
import React, { useState } from "react";
import GridComponent from "./GridComponent";
import EmptyState from "@/components/EmptyState";
import BreadCrumb from "@/components/BreadCrumb";
import CreateSmsCampaign from "./CreateSmsCampaign";
import Campaign from "./Campaign";
import { emailIcon, emailIcon1rem, mailIcon, smsIcon } from "@/SVGs";
import Modal from "@/components/modal/Modal";
import DashBtn from "@/components/buttons/DashBtn";
import Subscribers from "./Subscribers";
import { data } from "autoprefixer";
import { formatMoney } from "@/utils";

const BillingPage = () => {
  const [showCampaign, setShowCampaign] = useState(false);
  const [show, setShow] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  return (
    <GridLayout GridComponent={<GridComponent />}>
      <div className="w-full">
        <div className={` ${show ? "mb-[32px]" : "mb-[20px]"}`}>
          <BreadCrumb main="Marketing" link="Billilng" />
        </div>

        <div className="w-full flex items-center md:space-x-[1rem]">
          {[
            { text: "Total emails sent", subText: 1875 },
            { text: "Emails sent this month", subText: 343 },
            {
              text: (
                <span>
                  Amount due on{" "}
                  <span className="text-[#072A85]">Thu, 25 jul, 2024</span>
                </span>
              ),
              naira: true,
              subText: 5000,
            },
          ].map((data) => (
            <div className="md:w-1/3 w-full border h-[9rem] border-[#E6E6E6] rounded-[0.25rem] flex items-center md:px-[1.25rem] ">
              <div className="flex flex-col space-y-[0.25rem]">
                <h2 className="text-[#5F6370] text-[0.75rem] sodo400 tracking-[-0.015rem] ">
                  {data.text}
                </h2>
                <h2 className="tracking-[-0.06rem] text-[1.5rem] inter600 font-[600] ">
                  {" "}
                  {data?.naira ? "₦" : ""} {formatMoney(data.subText)}{" "}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className=" border border-[#E6E6E6] w-full mt-[2rem] rounded-[0.5rem] ">
          <div className="py-[1rem] px-[1.25rem] border border-b-[#E6E6E6] border-transparent ">
            <h2 className="text-black text-[0.875rem] sodo600 tracking-[-0.035rem] ">
              Pricing
            </h2>
            <h2 className="text-[#5F6370] sodo400 text-[0.75rem] tracking-[-0.03rem] ">
              You will be charged at the end of the month based on the number of
              emails/SMS you send
            </h2>
          </div>

          <div className="py-[1.75rem] flex flex-col space-y-[1rem]">
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
              <div className="flex items-center w-full justify-between pl-[1rem] pr-[1.5rem]  ">
                <div className="flex space-x-[0.75rem] w-[30%] items-center  ">
                  <span>{emailIcon1rem}</span>
                  <h2 className="text-black text-[0.75rem] sodo600 tracking-[-0.03rem] ">
                    {data.plan}
                  </h2>
                </div>

                <h2 className="text-black w-[40%] text-left text-[0.75rem] sodo600 tracking-[-0.03rem] ">
                  {data.text}
                </h2>

                <h2 className="text-black text-right text-[0.75rem] sodo600 w-[20%] tracking-[-0.03rem] ">
                  <span className="inter600 font-[600]">₦</span>{" "}
                  <span>{data.amount}</span>
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GridLayout>
  );
};

export default BillingPage;
