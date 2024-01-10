import { qrCodeIcon } from "@/SVGs";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import StoreHeader from "@/components/StoreHeader";
import DashBtn from "@/components/buttons/DashBtn";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import React from "react";

const CreateQrCodePage = ({ handleClose }) => {
	return (
        // Please note the classname here is for the child element of the component modal layout
		<ComponentModalLayout handleClose={handleClose} XIconHideMobile={true} className='  w-full md:w-[70%] h-full  mx-auto '>
			<div className='flex justify-between w-full space-x-[5rem] px-[1rem]'>
				<div className='flex flex-col space-y-[2.5rem] w-full md:w-[60%]'>
					<div className='max-w-[17rem] '>
						<StoreHeader
							header='Create ordering cards'
                            showXIconMobile={true}
                            handleClose={handleClose}
							headerClass='sodo700 text-[1.25rem] text-black tracking-[-0.8px]'
							subHeader='Enter the number of ordering cards for this section. Cards with a unique QR code will be created.'
						/>
					</div>

					<CustomLabel header='Section 1'>
						<LabelSearchInput label='Label' placeholder='Example: Table' />
						<LabelSearchInput label='Number of Tables' placeholder='0' />
					</CustomLabel>

					<div className='w-full flex md:space-x-[0.75rem] flex-col md:flex-row space-y-[1.25rem] md:space-y-0 '>
						<span className='w-full md:w-fit'>
							<DashBtn padding='9px 37px' text='Generate ordering cards' />
						</span>
						<span className='w-full md:w-fit'>
							<DashBtn
								padding='9px 35px'
								text='Generate QR Codes only'
								lightTheme={true}
							/>
						</span>
					</div>
				</div>

				<div className='border border-[#E6E6E6] hidden  rounded-[8px] py-[2rem] px-[4rem] md:flex flex-col items-center space-y-[2rem]  md:w-[40%]'>
					<h1 className='sodo400 text-[2.5rem] tracking-[-0.5px] text-black'>
						{" "}
						Toasties{" "}
					</h1>
					<div className='flex flex-col items-center  space-y-[1rem] '>
						<h2 className='text-[0.75rem] sodo600 tracking-[-0.48px] uppercase '>
							Scan to order
						</h2>
						<div className=''>{qrCodeIcon}</div>

						<div className='flex flex-col items-center space-y-[0.5rem]'>
							<h2 className='text-[0.75rem] sodo600 tracking-[-0.48px] uppercase '>
								SECTION 1
							</h2>
							<div className='border border-[#E6E6E6] rounded-[4px] flex items-center justify-center py-[6px] px-[1rem]'>
								<h3 className='text-[0.75rem] sodo400 tracking-[-0.48px] '>
									Table 5
								</h3>
							</div>
						</div>
					</div>
					<h1 className='text-[0.75rem] sodo400 tracking-[-0.48px] text-center '>
						Scan the QR code , place your order and <br /> wait for it to be
						brought to your table.
					</h1>
				</div>
			</div>
		</ComponentModalLayout>
	);
};

export default CreateQrCodePage;
