import GridLayout from "@/components/GridLayout";
import React from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import CustomLabel from "@/components/label/CustomLabel";
import LabelTextarea from "@/components/label/LabelTextarea";
import UploadImage from "@/components/UploadImage";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";

const AboutPage = () => {
	return (
		<GridLayout GridComponent={<GridComponent />}>
			<div className='md:w-[70%] max-w-[600px] '>
				<BreadCrumb main='Website' link='About Us' />

				<div className='flex flex-col space-y-[48px] mt-[32px]'>
					<CustomLabel header='About Us' subHeader='Ask him what is here'>
						<LabelTextarea width="md:w-[32%]"  label='Text' placeholder='Enter Text' rows={8} />
					</CustomLabel>

					<CustomLabel
						header='Banner Image'
						subHeader='To display your custom branding please upload a logo'
					>
						<UploadImage />
					</CustomLabel>
				</div>

				<SaveDiscardBtn padding='py-[74px]' />
			</div>
		</GridLayout>
	);
};

export default AboutPage;
