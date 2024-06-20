"use client";
import GridLayout from "@/components/GridLayout";
import React, { useEffect, useState } from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import LabelText from "@/components/label/LabelText";
import { browserIcon, domainIcon, redBrowserIcon } from "@/SVGs";
import DashBtn from "@/components/buttons/DashBtn";
import LabelSearchInput from "@/components/label/LabelSearchInput";

const DomainPage = () => {
	const [showDomainInput, setShowDomainInput] = useState(false);
	const [domainStatus, setDomainStatus] = useState("unverified");

	//     useEffect(()=>{
	// setTimeout(() => {
	//     setDomainStatus('verified')
	// }, 10000);
	//     }, [])
	return (
		<GridLayout GridComponent={<GridComponent />}>
			<div>
				<BreadCrumb main='Website' link='Domain' />
				<div className='flex flex-col space-y-[49px] mt-[28px] md:w-[60%]'>
					<CustomLabel header='Default Domain'>
						<LabelInput
							padding='13px 15px'
							label={<LabelText label='Your Domain' fontWeight='sodo600' />}
						>
							<div className='flex items-center space-x-[4px]'>
								<span> {domainIcon("#072A85")} </span>
								<h2 className='text-[13px] sodo600 tracking-[-0.52px] text-[#072A85] '>
									www.serveup.africa/toasties
								</h2>
							</div>
						</LabelInput>
					</CustomLabel>

					<CustomLabel header='Custom Domain'>
						{domainStatus === "unverified" && (
							<div className='border border-[#E6E6E6] rounded-[8px] p-[16px] flex flex-col items-center gap-[20px] '>
								<div className='flex w-full justify-between '>
									<div className='flex space-x-[12px] items-center'>
										<img src='/images/browserIcon.svg' alt='Browser icon' />
										<h2 className='text-[12px] tracking-[-0.24px] sodo400'>
											Replace your default domain with a custom domain
										</h2>
									</div>

									{!showDomainInput && domainStatus === "unverified" && (
										<div className='w-fit'>
											<DashBtn
												text='Add custom domain'
												handleClick={() => {
													setShowDomainInput(true);
												}}
											/>
										</div>
									)}
								</div>

								{showDomainInput && domainStatus === "unverified" && (
									<div className='flex flex-col space-y-[20px] items-start w-full '>
										<div className='w-full'>
											<LabelSearchInput
												label='New domain'
												placeholder='Enter domain URL'
											/>
										</div>
										<div className='flex items-center md:space-x-[12px]'>
											<span className='w-fit'>
												<DashBtn
													text='Submit'
													padding='9px 30px'
													handleClick={() => {
														setDomainStatus("verifying");
													}}
												/>
											</span>
											<span className='w-fit'>
												<DashBtn
													padding='12px 9px'
													text='Cancel'
													handleClick={() => {
														setShowDomainInput(false);
													}}
												/>
											</span>
										</div>
									</div>
								)}
							</div>
						)}

						{domainStatus !== "unverified" && (
							<div className='flex flex-col space-y-[12px]'>
								<LabelInput
									padding='13px 15px'
									label={<LabelText label='Your Domain' />}
									fontweight='sodo600'
								>
									<div className='flex items-center space-x-[4px]'>
										<span>
											{" "}
											{domainStatus === "vefified"
												? domainIcon("#072A85")
												: domainIcon("#A9ADB5")}
										</span>
										<h2
											className={`text-[13px] sodo400 tracking-[-0.52px] ${
												domainStatus === "verified"
													? "text-[#072A85]"
													: "text-[#A9ADB5]"
											}  `}
										>
											www.serveup.africa/toasties
										</h2>
									</div>
								</LabelInput>

								{domainStatus !== "verified" && (
									<div
										className={`rounded-[8px] p-[16px] flex items-center space-x-[12px]`}
										style={{
											background: "rgba(7, 42, 133, 0.05)",
										}}
									>
										<img src='/images/browserIcon.svg' alt='Browser icon' />
										<h2
											className={`text-[12px] tracking-[-0.06px] poppins font-[500] text-[#072A85]`}
										>
											Your submission for the custom domain{" "}
											<span className='poppins font-[600]'> “toasties” </span>{" "}
											is currently being verified and configured, you will be
											notified on updates and the completion of this process.
										</h2>
									</div>
								)}
							</div>
						)}
					</CustomLabel>
				</div>
			</div>
		</GridLayout>
	);
};

export default DomainPage;
