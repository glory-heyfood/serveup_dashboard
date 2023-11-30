import { plusIconBlack, uploadPhotoIcon } from "@/SVGs";
import DashBtn from "@/components/buttons/DashBtn";
import DashLayout from "@/components/Dashboard/DashLayout";
import CustomLabel from "@/components/label/CustomLabel";
import LabelTextInputEdit from "@/components/label/LabelTextInputEdit";
import React from "react";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";

const Page = () => {
	return (
		<DashLayout>
			<div className=''>
				<h1 className='dashHeader'>Business Settings</h1>

				<div className='flex flex-col space-y-[48px] md:w-[70%] max-w-[677px]'>
					<CustomLabel
						header='Business Logo'
						subHeader='To display your custom branding please upload your logo, Upload images less than 5MB in size, that are either pngs or jpegs.'
					>
						<div className='flex flex-col space-y-[12px] w-[120px]'>
							<div className='border border-[#E6E6E6] h-[120px] w-[120px] flex items-center justify-center'>
								<span>{uploadPhotoIcon}</span>
							</div>
							<span className=''>
								<DashBtn
									lightTheme={true}
									text='Upload logo'
									icon={plusIconBlack}
									font='sodo700'
									padding='10px 14px'
								/>
							</span>
						</div>
					</CustomLabel>

					<CustomLabel
						header='Business Information'
						subHeader='Manage your business details and information'
					>
						<LabelTextInputEdit inputFont='sodo400' label='Business Name' initialValue='Toasies' />
						<LabelTextInputEdit inputFont='sodo400'
							label='Phone number'
							initialValue='+2347089280972'
						/>
						<LabelTextInputEdit inputFont='sodo400'
							label='Email address'
							initialValue='Toasties@toasties.ng'
						/>
					</CustomLabel>

					<CustomLabel
						header='Personal Information'
						subHeader='Manage your personal information'
					>
						<LabelTextInputEdit inputFont='sodo400' label='First name' initialValue='Fabiola' />
						<LabelTextInputEdit inputFont='sodo400' label='LAst name' initialValue='Peterson' />
					</CustomLabel>
				</div>

				<SaveDiscardBtn />
			</div>
		</DashLayout>
	);
};

export default Page;
