import MarketingLayout from "@/components/MarketingLayout";
import React from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import CustomLabel from "@/components/label/CustomLabel";
import Image from "next/image";
import DashBtn from "@/components/buttons/DashBtn";
import { colorPickerIcon, starBlueIcon } from "@/SVGs";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";

// Label for the primary color
const Label = () => {
	return (
		<div
			className='py-[4px] px-[8px] rounded-[2px] flex items-center justify-center'
			style={{
				background: "rgba(73, 113, 217, 0.10)",
			}}
		>
			<span>{starBlueIcon}</span>

			<h2 className='text-[#136FFB] sodo700 tracking-[-0.4px] text-[12px]  '>
				UPGRADE YOUR PLAN
			</h2>
		</div>
	);
};

const ThemePage = () => {
	return (
		<MarketingLayout GridComponent={<GridComponent />}>
			<div className=' md:w-[70%] max-w-[640px]'>
				<BreadCrumb main='Website' link='Theme' />
				<div className='mt-[37px] flex-col space-y-[72px] '>
					<CustomLabel header='Your current theme'>
						<div className='border-[0.5px] border-[#EAEAEA] w-full '>
							<img src='/images/website-theme.png' alt='theme' width='100%' />
						</div>
						<div className='flex w-full justify-end'>
							<span className='w-fit '>
								<DashBtn
									lightTheme={true}
									text='Change Theme'
									font='sodo700'
									padding='12px 14px'
								/>
							</span>
						</div>
					</CustomLabel>

					<CustomLabel
						header='Primary Color'
						subHeader='This color will be displayed most frequently across your website '
						label={<Label />}
					>
						<div className='border border-[#E6E6E6]  rounded-[8px] py-[17px] px-[24px] flex items-center justify-center  mb-[20px] w-fit space-x-[20px] '>
							<div className='h-[32px] w-[32px] bg-[#F01C1C] rounded-[8px]'></div>
							<div className='h-[32px] w-[32px] bg-[#9747FF] rounded-[8px]'></div>
							<div className='h-[32px] w-[32px] bg-[#136FFB] rounded-[8px]'></div>
							<div className='h-[32px] w-[32px] bg-[#FF5F00] rounded-[8px]'></div>
							<div className='h-[32px] w-[32px] bg-[#008F06] rounded-[8px]'></div>
							<div className='h-[32px] w-[32px] bg-[#000] rounded-[8px]'></div>
						</div>

						<div className='flex items-center space-x-[2px]'>
							<span>{colorPickerIcon}</span>
							<h2 className='text-[12px] sodo700 tracking-[-0.24px] text-[#072A85] '>
								Manually Select Color{" "}
							</h2>
						</div>
					</CustomLabel>
				</div>

				<SaveDiscardBtn padding='py-[70px]' />
			</div>
		</MarketingLayout>
	);
};

export default ThemePage;
