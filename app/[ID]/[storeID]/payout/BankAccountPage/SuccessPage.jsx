import ComponentModalLayout from "@/components/ComponentModalLayout";
import StoreHeader from "@/components/StoreHeader";
import Success from "@/components/Success";
import DashBtn from "@/components/buttons/DashBtn";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import { options } from "@/data";
import React from "react";

const SuccessPage = ({ handleClose }) => {
	return (
		<ComponentModalLayout handleClose={handleClose}>
			<div className='flex items-center justify-center w-full'>
				<Success
					header='Bank account added'
					subHeader='Your bank account has been successfully added to your store'
					btnText='Continue'
					handleClick={handleClose}
				/>
			</div>
		</ComponentModalLayout>
	);
};

export default SuccessPage;
