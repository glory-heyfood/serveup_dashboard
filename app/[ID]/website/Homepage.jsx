import GridLayout from "@/components/GridLayout";
import React from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import CustomLabel from "@/components/label/CustomLabel";
import UploadImage from "@/components/UploadImage";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelTextarea from "@/components/label/LabelTextarea";
import LabelTextInputEdit from "@/components/label/LabelTextInputEdit";
import {
	twitterIcon,
	whatsappIcon,
	FBIcon,
	IGIcon,
	tiktokIcon,
	linkedInIcon,
} from "@/SVGs";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";

const Homepage = () => {
	return (
		<GridLayout GridComponent={<GridComponent />}>
			<div>
				<BreadCrumb main='Website' link='Homepage' />
				<div className='mt-[32px] flex flex-col space-y-[48px] md:w-[70%] max-w-[600px] '>
					<CustomLabel
						header='Banner Image'
						subHeader='Add a background image for your homepage '
					>
						<UploadImage />
					</CustomLabel>

					<CustomLabel
						header='Title and Description'
						subHeader='Add title and description text to your homepage'
					>
						<div>
							<LabelSearchInput
								label='Title'
								placeholder='Homepage title'
								fontweight='sodo700'
							/>
							<LabelTextarea
								label='Description'
								placeholder='Homepage description '
							/>
						</div>
					</CustomLabel>

					<CustomLabel
						header='Footer'
						subHeader='Manage your social media and contact information'
					>
						<div>
							<LabelTextInputEdit
								label='Whatsapp'
								icon={whatsappIcon}
								placeholder='Enter URL'
							/>
							<LabelTextInputEdit
								label='Twitter'
								icon={twitterIcon}
								placeholder='Enter URL'
							/>
							<LabelTextInputEdit
								label='Facebook'
								icon={FBIcon}
								placeholder='Enter URL'
							/>
							<LabelTextInputEdit
								label='Instagram'
								icon={IGIcon}
								placeholder='Enter URL'
							/>
							<LabelTextInputEdit
								label='Tiik Tok'
								icon={tiktokIcon}
								placeholder='Enter URL'
							/>
							<LabelTextInputEdit
								label='LinkedIn'
								icon={linkedInIcon}
								placeholder='Enter URL'
							/>
						</div>
					</CustomLabel>
				</div>

				<SaveDiscardBtn padding='py-[64px]' />
			</div>
		</GridLayout>
	);
};

export default Homepage;
