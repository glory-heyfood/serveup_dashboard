import React from "react";
import LabelInput from "../label/LabelInput";
import LabelText from "../label/LabelText";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import DiscountSelectModal from "./DiscountSelectItemsModal";
import DiscountSelectItemsModal from "./DiscountSelectItemsModal";

const DiscountSelectItems = ({label}) => {
	const dispatch = useDispatch();
	const outermodal = useSelector((state) => state.modal.showOuterModal);
	return (
		<LabelInput
			label={<LabelText label={label} />}
			padding='13px 0px 16px 16px'
			width='md:w-[34%]'
		>
			<h1
				className='text-[#072A85] text-[13px] tracking-[-0.56px] sodo600 cursor-pointer'
				onClick={() => {
					dispatch(
						toggleModal({
							modal: "outer",
							payload: true,
						}),
					);
				}}
			>
				Select Items
			</h1>

			{outermodal && <DiscountSelectItemsModal />}
		</LabelInput>
	);
};

export default DiscountSelectItems;
