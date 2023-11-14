"use client";
import { mailIcon } from "@/SVGs";
import BreadCrumb from "@/components/BreadCrumb";
import EmptyState from "@/components/EmptyState";
import MarketingLayout from "@/components/MarketingLayout";
import React, { useState } from "react";
import CreateCampaign from "./CreateCampaign";
import Campaign from "./Campaign";


const Page = () => {
	const [showCampaign, setShowCampaign] = useState(false);
	return (
		<MarketingLayout>
			{showCampaign ? (
				<CreateCampaign handleClick={()=>setShowCampaign(false)} />
			) : (
				<div className='w-full'>
					<div className="mb-[32px]">
                    <BreadCrumb main='Marketing' link='Email Campaign' />
                    </div>


					<EmptyState
						icon={mailIcon}
						btnText='Create new campaign'
						header='No Email Campaign'
						handleClick={() => setShowCampaign(true)}
						text='You have not created any campaigns'
					/>

                    {/* <Campaign /> */}
				</div>
			)}
		</MarketingLayout>
	);
};

export default Page;
