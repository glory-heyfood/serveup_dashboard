import CustomLabel from "@/components/label/CustomLabel";
import React, { useState } from "react";
import SettingRow from "./SettingRow";
import { menuDotsBlue, plusIconBlue } from "@/SVGs";
import SettingRowReward from "./SettingRowReward";
import { useDispatch, useSelector } from "react-redux";
import RewardModal from "./RewardModal";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import { rewardOptions } from "@/data";

const RewardTable = () => {
	const dispatch = useDispatch();
	const modal = useSelector((state) => state.modal.showModal);
	const [selectedIndex, setSelectedIndex] = useState();
    
	const [edit, setEdit] = useState(null);

	const handleDeactivate = (index) => {
		if (index === selectedIndex) {
			setSelectedIndex(null);
		} else {
			setSelectedIndex(index);
		}
	};

	const handleEdit = (index, data) => {
		dispatch(toggleModal(true));
		setEdit(data);
	};

	const renderModal = () => {
		if (modal) {
			if (edit !== null) {
				console.log("edit called");
				return <RewardModal data={edit} />;
			} else {
				return <RewardModal />;
			}
		}
	};

	return (
		<div>
			<CustomLabel header='Redeeming Rewards'>
				<div>
					<SettingRowReward
						col1='Reward Value'
						col2='Reward Description'
						bold={true}
					/>
					<div>
						{rewardOptions.map((data, i) => (
							<SettingRowReward
								key={i}
								index={i}
								data={data}
                                name={data.name}
								col1={data.value}
								col2={data.description}
								col3={menuDotsBlue}
								handleDeactivate={handleDeactivate}
								handleEdit={handleEdit}
								selectedIndex={selectedIndex}
							/>
						))}
					</div>
					<div
						className='flex mt-[12px] cursor-pointer w-fit'
						onClick={() => {
							setEdit(null);
							dispatch(toggleModal(true));
						}}
					>
						<span> {plusIconBlue} </span>
						<h3 className='text-[#072A85] text-[12px] sodo700 tracking-[-0.24px]'>
							{" "}
							Add a new reward
						</h3>
					</div>
				</div>
			</CustomLabel>

			{renderModal()}
		</div>
	);
};

export default RewardTable;
