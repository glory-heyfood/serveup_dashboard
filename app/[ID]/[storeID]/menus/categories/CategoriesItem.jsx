import VerticalDotMenu from "@/components/VerticalDotMenu";
import React, { useState } from "react";
import MenuModal from "../MenuModal";
import { useDispatch, useSelector } from "react-redux";
import CustomLabel from "@/components/label/CustomLabel";
import { Button } from "@mui/material";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const CategoriesItem = ({ name, i, handleEdit }) => {
	const showModal = useSelector((state) => state.modal.showEarnModal);
	const [data, setData] = useState({});
	const dispatch = useDispatch();
	// const handleEdit = (index, data) => {
    //     setData({})
	// 	const dat = {
	// 		index,
	// 		name: data,
	// 	};
	// 	setData(dat);
	// 	dispatch(
	// 		toggleModal({
	// 			modal: "earn",
	// 			payload: true,
	// 		}),
	// 	);
	// };
	return (
		<div className='py-[1rem] items-center justify-between flex border-[0.5px] border-transparent border-b-[#E6E6E6] '>
			<h2 className='sodo400 text-[0.75rem] tracking-[-0.24px]  '>{name}</h2>

			<VerticalDotMenu handleEdit={handleEdit} index={i} name={name} />

			
		</div>
	);
};

export default CategoriesItem;
