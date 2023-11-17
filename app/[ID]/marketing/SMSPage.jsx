"use client";
import { mailIcon } from "@/SVGs";
import BreadCrumb from "@/components/BreadCrumb";
import EmptyState from "@/components/EmptyState";
import MarketingLayout from "@/components/MarketingLayout";
import React, { useState } from "react";
import Campaign from "./Campaign";
import GridComponent from "./GridComponent";
import CreateSmsCampaign from "./CreateSmsCampaign";

const SMSPage = () => {
	const [showCampaign, setShowCampaign] = useState(false);
	const [show, setShow] = useState(false);
	return (
		<MarketingLayout GridComponent={<GridComponent />}>
			{showCampaign ? (
				<CreateSmsCampaign handleClick={() => setShowCampaign(false)} />
			) : (
				<div className='w-full'>
					<div className={` ${show ? "mb-[32px]" : "mb-[20px]"}`}>
						<BreadCrumb main='Marketing' link='SMS Campaign' />
					</div>
					{show ? (
						<EmptyState
							icon={mailIcon}
							btnText='Create new campaign'
							header='No Email Campaign'
							handleClick={() => setShowCampaign(true)}
							text='You have not created any campaigns'
						/>
					) : (
						<Campaign handleClick={() => setShowCampaign(true)} />
					)}
				</div>
			)}

			<h1 className='text-[12px] cursor-pointer' onClick={() => setShow(!show)}>
				Change Tabs
			</h1>
		</MarketingLayout>
	);
};

export default SMSPage;
