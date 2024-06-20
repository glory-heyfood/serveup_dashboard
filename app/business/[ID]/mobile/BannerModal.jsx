import ColorPicker from "@/components/ColorPicker";
import UploadImage from "@/components/UploadImage";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelTextarea from "@/components/label/LabelTextarea";
import Modal from "@/components/modal/Modal";
import React from "react";

const BannerModal = () => {
	return (
		<Modal header='Add new banner'>
			<div className='flex flex-col space-y-[32px]'>
				<UploadImage
					border='border-dashed border-[2px] border-[#B6C7F2]'
					padding='py-[33px]'
				/>

				<div className='flex flex-col space-y-[16px]'>
					<LabelSearchInput
						label='Title'
						fontweight='sodo700'
						placeholder='Banner title'
					/>
					<LabelTextarea label='Description' placeholder='Banner description' />
				</div>

				<CustomLabel header='Background color'>
                    <ColorPicker/>
                </CustomLabel>
			</div>
		</Modal>
	);
};

export default BannerModal;
