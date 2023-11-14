"use client";
import DashBtn from "@/components/Dashboard/DashBtn";
import RadioCheck from "@/components/RadioCheck";
import React, { useState } from "react";

const CampaignItems = ({header, subHeader, linkText, children}) => {
    const [show, setShow ] = useState(false)
	return (
		<div
			className='py-[22px] pr-[34px]   '           
			style={{
				boxShadow: " 0px 0.5px 0px 0px #F0F0F0",
			}}
		>
			<div className='flex justify-between items-center z-20 relative mb-[16px]'             
            >
				<div className='flex space-x-[16px]'>
					<RadioCheck isChecked={false} />
					<div>
                        <h2 className='text-[12px] sodo600 tracking-[-0.24px]'>{header}</h2>
                        <h3 className={`text-[#5F6370] text-[12px] tracking-[-0.24px] sodo400 ${show ? "block" : "hidden"} `} >{subHeader}</h3>
                    </div>
				</div>

				<div className='text-[#072A85] sodo600 text-[12px] tracking-[-0.24px] cursor-pointer '
                onClick={()=>{                    
                    setShow(true)
                }}
                >
					{linkText}
				</div>
			</div>            

			<div className={`relative  animate05s z-0 w-[100%]  ${show ? "translate-y-[0%] opacity-100 block" : " hidden translate-y-[-100%] opacity-0 "}`}>

                {children}

                <div className=" items-center space-x-[12px] mt-[20px] inline-flex w-fit">
                    <DashBtn text="Save" padding="7px 32px 7px 32px" />
                    <DashBtn text="Cancel" padding="7px 7px 7px 7px" handleClick={()=>setShow(false)} />
                </div>
            </div>
		</div>
	);
};

export default CampaignItems;
